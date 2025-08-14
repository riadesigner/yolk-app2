
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api"; // Путь к вашему API
import useSchools from './useSchools';
import useSoftSkills from './useSoftSkills';

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
            const userSchools = user?.userInfo?.schools || [{
                id:1, title:'', year:'', speciality:'', city:'',
            }];
            setSchools(userSchools);
            // const userSoftSkills = user?.userInfo?.softSkills || [{
            //     id:1, title:'', percent:'',
            // }];            
            // setSoftSkills(userSoftSkills);
            setSoftSkills([{ id:1, title:'', percent:''}]);

            // console.log('user?.userInfo?.softSkills' , user?.userInfo?.softSkills)
            // console.log('softSkills' , softSkills)            
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
    };
}