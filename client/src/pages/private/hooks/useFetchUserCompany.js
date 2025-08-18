
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api"; // Путь к вашему API
import useGallery from './useGallery';

export default function useFetchUserCompany({setErrorMessage}) {
    const [user, setUser] = useState(null);
    const [company, setCompany] = useState(null);
    const [companyName, setCompanyName] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [description, setDescription] = useState("");    
    const [city, setCity] = useState("");    
    const navigate = useNavigate();

    const { gallery, setGallery, addImage, removeImage, handleGalleryChange } = useGallery([]);

    const hdlSaveAll = async ()=>{           
        
        setErrorMessage(null);

        const userInput = { name:companyName, gallery, description, city, specialization }
        const companyToSave = {
            ...company,
            ...userInput,
        }

        try {
            const response = await api.post('/company/save', companyToSave);
            console.log('Успешно:', response.data);
            navigate('/cp/company/info');

        } catch (error) {
            console.error('Ошибка:', error.response?.data || error.message);            
            setErrorMessage('Не удалось сохранить')
            throw error; // Можно обработать ошибку в компоненте
        }
    }

    useEffect(() => {
    const fetchUserCompany = async () => {
        try {
        const response = await api.get("/user/full");
        if (response.data.success) {
            const user = response.data.user;
            setUser(user);
            const userCompany = user.userCompany;
            setCompany(userCompany);            
            setCompanyName(userCompany?.name || "");
            setSpecialization(userCompany?.specialization || "");
            setDescription(userCompany?.description || "");
            setCity(userCompany?.city || "");
            
            
            
            // // Education           
            // let userSchools = user?.userInfo?.schools || [{id:1, title:'', year:'', speciality:'', city:'',}];            
            // setSchools(userSchools);
            
            // // Soft Skills
            // const userSoftSkills = user?.userInfo?.softSkills || [{
            //     id:1, title:'', percent:'',
            // }];            
            // setSoftSkills(userSoftSkills);

            // // Hard Skills
            // const userHardSkills = user?.userInfo?.hardSkills || [{
            //     id:1, title:'', percent:'',
            // }];            
            // setHardSkills(userHardSkills);
            
            // // Contacts
            // setWebSite(user?.userInfo?.webSite || "");
            // setPhone(user?.userInfo?.phone || "");
            
        }
        } catch (err) {
        console.error("Ошибка загрузки данных", err);
        navigate("/");
        }
    };
    fetchUserCompany();
    }, []);

    return {
        company,
        companyName,
        setCompanyName,        
        specialization, 
        setSpecialization,
        description,
        setDescription,
        city,
        setCity,
        gallery,
        setGallery, 
        addImage,
        removeImage,
        handleGalleryChange,
        hdlSaveAll,
    };
}