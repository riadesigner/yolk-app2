
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api"; // Путь к вашему API

export default function useFetchCompanyCard({setErrorMessage}) {
    const [user, setUser] = useState(null);
    const [company, setCompany] = useState(null);

    const [details, setDetails] = useState({});        
    
    const [fullName, setFullName] = useState('');
    const [shortName, setShortName] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');    
    const [webSite, setWebSite] = useState('');

    const [codeINN, setCodeINN] = useState('');
    const [codeKPP, setCodeKPP] = useState('');
    const [codeOGRN, setCodeOGRN] = useState('');
    const [codeOKPO, setCodeOKPO] = useState('');    

    const [bankName, setBankName] = useState('');
    const [bankRS, setBankRS] = useState('');
    const [bankKS, setBankKS] = useState('');
    const [bankBIK, setBankBIK] = useState('');
    
    const [contactFIO, setContactFIO] = useState('');        
    const [contactPhone, setContactPhone] = useState('');    
    const [contactJobTitle, setContactJobTitle] = useState('');    
    const [contactEmail, setContactEmail] = useState('');        
    
    const navigate = useNavigate();    

    const hdlSaveAll = async ()=>{           
        
        // setErrorMessage(null);

        // const userInput = { name:companyName, gallery, description, city, specialization }
        // const companyToSave = {
        //     ...company,
        //     ...userInput,
        // }

        // try {
        //     const response = await api.post('/company/save', companyToSave);
        //     console.log('Успешно:', response.data);
        //     navigate('/cp/company/info');

        // } catch (error) {
        //     console.error('Ошибка:', error.response?.data || error.message);            
        //     setErrorMessage('Не удалось сохранить')
        //     throw error; // Можно обработать ошибку в компоненте
        // }
    }

    useEffect(() => {
    const fetchUserCompanyCard = async () => {
        // try {
        // const response = await api.get("/user/full");
        // if (response.data.success) {
        //     const user = response.data.user;
        //     setUser(user);
        //     const userCompany = user.userCompany;
        //     setCompany(userCompany);            
        //     setCompanyName(userCompany?.name || "");
        //     setSpecialization(userCompany?.specialization || "");
        //     setDescription(userCompany?.description || "");
        //     setCity(userCompany?.city || "");
        //     setGallery(userCompany?.gallery || []);                                
            
        // }
        // } catch (err) {
        // console.error("Ошибка загрузки данных", err);
        // navigate("/");
        // }
    };
    fetchUserCompanyCard();
    }, []);

    return {
        company,
        details,
        setDetails,
        fullName,
        setFullName,
        shortName,
        setShortName,        
        fullAddress,
        setFullAddress,
        companyPhone,
        setCompanyPhone,        
        webSite,
        setWebSite,
        codeINN,
        setCodeINN,
        codeKPP,
        setCodeKPP,
        codeOGRN,
        setCodeOGRN,
        codeOKPO,
        setCodeOKPO,
        bankName,
        setBankName,        
        bankRS,
        setBankRS,
        bankKS,
        setBankKS,
        bankBIK,
        setBankBIK,
        contactFIO,
        setContactFIO,
        contactPhone,
        setContactPhone,
        contactJobTitle,
        setContactJobTitle,                
        contactEmail,
        setContactEmail,
        hdlSaveAll, 
    };
}