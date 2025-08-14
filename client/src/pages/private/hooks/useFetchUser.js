
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api"; // Путь к вашему API
import useSchools from './useSchools';
import useSoftSkills from './useSoftSkills';
import useHardSkills from './useHardSkills';


export default function useFetchUser() {
    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [webSite, setWebSite] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const { schools, setSchools, addSchool, removeSchool, handleSchoolChange } = useSchools([]);
    const { softSkills, setSoftSkills, addSoftSkill, removeSoftSkill, handleSoftSkillChange } = useSoftSkills();
    const { hardSkills, setHardSkills, addHardSkill, removeHardSkill, handleHardSkillChange } = useHardSkills();

    const saveUser = async (userData) => {
        try {
            const response = await api.post('/user/save', userData);
            console.log('Успешно:', response.data);
            return response.data;
        } catch (error) {
            console.error('Ошибка:', error.response?.data || error.message);
            throw error; // Можно обработать ошибку в компоненте
        }
    };

    const hdlSaveAll = ()=>{                
        const userInput = { firstName, secondName, middleName, softSkills, hardSkills, schools, webSite, phone }
        user.userInfo = {
            ...user.userInfo,
            ...userInput,
        }

        console.log('user = ', user );
        
        saveUser(user)
        .then(data => console.log('Данные сохранены:', data))
        .catch(err => console.error('Не удалось сохранить:', err));        
    }

    useEffect(() => {
    const fetchUser = async () => {
        try {
        const response = await api.get("/user-with-info");
        if (response.data.success) {
            const user = response.data.user;
            setUser(user);
            setAvatar(user.avatar);
            setSecondName(user?.userInfo?.secondName || "");
            setFirstName(user?.userInfo?.firstName || "");
            setMiddleName(user?.userInfo?.middleName || ""); 
            
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
        hdlSaveAll,
    };
}