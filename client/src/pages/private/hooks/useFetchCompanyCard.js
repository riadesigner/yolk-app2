
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api"; // Путь к вашему API

export default function useFetchCompanyCard({setErrorMessage}) {

    const [company, setCompany] = useState(null);    

    const [legalType, setLegalType] = useState('ИП');
    
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

    const hdlSaveAll = async (e)=>{           
        
        e.preventDefault();

        setErrorMessage(null);

        const detailsToSave = {
            ...company.details,
            legalType,
            fullName,
            shortName,
            fullAddress,
            companyPhone,
            webSite,
            codeINN,
            codeKPP,
            codeOGRN,
            codeOKPO,
            bankName,
            bankRS,
            bankKS,
            bankBIK,
            contactFIO,
            contactPhone,
            contactJobTitle,
            contactEmail,
        }

        const companyData = {
            details: detailsToSave,
        }

        try {

            if(company.id){
                const response = await api.patch(`/companies/${company.id}`, {companyData} );
                console.log('Успешно обновлена:', response.data);
            }else{
                const response = await api.put(`/companies/me`, {companyData});
                console.log('Компания успешно создана:', response.data);                
            }            
            navigate('/cp/company/card');

        } catch (error) {
            console.error('Ошибка:', error.response?.data || error.message);            
            setErrorMessage('Не удалось сохранить')
            throw error; // Можно обработать ошибку в компоненте
        }
    }

    useEffect(() => {
    const fetchCompanyCard = async () => {
        try {                    
            const response = await api.get("/users/me");
        if (response.data.success) {
            const user = response.data.user;
            const company = user.userCompany;
            if(company){
                setCompany(company);
                const details = company.details || {};
                setLegalType(details.legalType || 'ИП');
                setFullName(details.fullName || '');
                setShortName(details.shortName || '');
                setFullAddress(details.fullAddress || '');
                setCompanyPhone(details.companyPhone || '');
                setWebSite(details.webSite || '');
                setCodeINN(details.codeINN || '');
                setCodeKPP(details.codeKPP || '');
                setCodeOGRN(details.codeOGRN || '');
                setCodeOKPO(details.codeOKPO || '');
                setBankName(details.bankName || '');
                setBankRS(details.bankRS || '');
                setBankKS(details.bankKS || '');
                setBankBIK(details.bankBIK || '');
                setContactFIO(details.contactFIO || '');
                setContactPhone(details.contactPhone || '');
                setContactJobTitle(details.contactJobTitle || '');
                setContactEmail(details.contactEmail || '');
            }
        }
        } catch (err) {
        console.error("Ошибка загрузки данных", err);
        navigate("/");
        }
    };
    fetchCompanyCard();
    }, []);

    return {
        company,
        legalType,
        setLegalType,
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