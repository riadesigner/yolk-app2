
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api"; // Путь к вашему API
import useSchools from './useSchools';
import useSoftSkills from './useSoftSkills';
import useHardSkills from './useHardSkills';


export default function useFetchUser({setErrorMessage}) {
    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [webSite, setWebSite] = useState("");
    const [phone, setPhone] = useState("");
    const [specialization, setSpecialization] = useState("");
    const navigate = useNavigate();

    const { schools, setSchools, addSchool, removeSchool, handleSchoolChange } = useSchools([]);
    const { softSkills, setSoftSkills, addSoftSkill, removeSoftSkill, handleSoftSkillChange } = useSoftSkills();
    const { hardSkills, setHardSkills, addHardSkill, removeHardSkill, handleHardSkillChange } = useHardSkills();


    const hdlSaveUser = async ()=>{           
        
        setErrorMessage(null);

        const userData = null
        const userInfo = { id:user.userInfo.id, firstName, secondName, middleName, softSkills, hardSkills, schools, webSite, phone, specialization }

        try {
            const response = await api.patch(`/users/${user.id}`, {userData, userInfo});
            console.log('Успешно:', response.data);
            navigate('/cp/designer/info');

        } catch (error) {
            console.error('Ошибка:', error.response?.data || error.message);            
            setErrorMessage('Не удалось сохранить')
            throw error; // Можно обработать ошибку в компоненте
        }
    }

    useEffect(() => {
    const fetchUser = async () => {
        try {
        const response = await api.get("/users/me");
        if (response.data.success) {
            
            const user = response.data.user;

            console.log('user', user);

            setUser(user);
            setAvatar(user.avatar);
            setSecondName(user?.userInfo?.secondName || "");
            setFirstName(user?.userInfo?.firstName || "");
            setMiddleName(user?.userInfo?.middleName || ""); 
            setSpecialization(user?.userInfo?.specialization || "");             
            
            // Education           
            let userSchools = user?.userInfo?.schools || [{id:1, title:'', year:'', speciality:'', city:'',}];            
            setSchools(userSchools);
            
            // Soft Skills
            const userSoftSkills = user?.userInfo?.softSkills || [{
                id:1, title:'', percent:'',
            }];            
            setSoftSkills(userSoftSkills);

            // Hard Skills
            const userHardSkills = user?.userInfo?.hardSkills || [{
                id:1, title:'', percent:'',
            }];            
            setHardSkills(userHardSkills);
            
            // Contacts
            setWebSite(user?.userInfo?.webSite || "");
            setPhone(user?.userInfo?.phone || "");
            
        }
        } catch (err) {
        console.error("Ошибка загрузки данных пользователя", err);
        navigate("/");
        }
    };
    fetchUser();
    }, []);

    return {
        user,
        avatar,
        firstName,
        setFirstName,
        secondName,
        setSecondName,
        middleName,
        setMiddleName,
        schools, 
        addSchool, 
        removeSchool, 
        handleSchoolChange,
        webSite,
        setWebSite,
        phone,
        setPhone,        
        softSkills,
        addSoftSkill,
        removeSoftSkill,
        handleSoftSkillChange,
        hardSkills,
        setHardSkills,
        addHardSkill,
        removeHardSkill,
        handleHardSkillChange,
        specialization, 
        setSpecialization,
        hdlSaveUser,
    };
}