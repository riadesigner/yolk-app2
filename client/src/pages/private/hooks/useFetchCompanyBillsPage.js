
import { useState, useEffect } from "react";
import api from "../../../utils/api"; // Путь к вашему API
import {getPayloads} from '../../../utils/payloads'


export default function useFetchCompanyCard() {
    
    const [bills, setBills] = useState([]);    
    
    const pl = getPayloads();
    const receiverId = pl.id;    

    useEffect(() => {
        
        const companyId = ''

        const fetchCompanyBills = async () => {
            try {                    
                const response = await api.get(`/bills/to/company/${receiverId}`);
            if (response.data.success) {
                const user = response.data.user;
                const company = user.userCompany;
                if(company){
                    setCompany(company);
                    const details = company.details || {};

                }
            }
            } catch (err) {
                console.error("Ошибка загрузки данных", err);                
            }
        };
        fetchCompanyBills();
    }, []);

    return {
        bills,
    };
}