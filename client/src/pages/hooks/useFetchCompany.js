
import { useState, useEffect } from "react";
import api from "../../utils/api";

export default function useFetchCompany({companyId}) {        

    const [company, setCompany] = useState(null);    

    console.log('useFetch companyId', companyId)

    useEffect(() => {
    
        const fetchOrders = async (companyId) => {      
                        
            
            try {
            const response = await api.get(`/company/${companyId}`);
            if (response.data.success) {            
                const company = response.data.company;                                
                console.log('company = ', company)
                if(company){
                    setCompany(company);
                }           
            }
            } catch (err) {
                console.error("Ошибка загрузки заказов", err);                
            }

        };

        companyId && fetchOrders(companyId);

    }, []);

    return {
        company,
    };
}