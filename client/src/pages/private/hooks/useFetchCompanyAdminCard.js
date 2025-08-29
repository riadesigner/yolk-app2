import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import api from '../../../utils/api'

export default function useFetchCompanyAdminCard(){

    const navigate = useNavigate();    
    
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

    useEffect(() => {

        const fetchCompanyByUser = async () => {          

            try {
                const response = await api.get('/users/me');                
                if(response.data.success){
                    const user = response.data.user;
                    const company = user.userCompany;                    
                    if(company){
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
                console.error('Ошибка загрузки данных компании', err);                
                navigate('/');
            }
        };
        
        fetchCompanyByUser();
    }, []);


    return {
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
}
