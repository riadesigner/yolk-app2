
import { useState, useEffect } from "react";
import api from "../../../utils/api"; // Путь к вашему API
import {getPayloads} from '../../../utils/payloads'


export default function useFetchCompanyCard() {
    
    const [bills, setBills] = useState([]);    
    const [nowLoading, setNowLoading] = useState(true);    
    
    const pl = getPayloads();
    const receiverId = pl.id;    

    useEffect(() => {            

        const fetchCompanyBills = async () => {
            console.log('receiverId = ', receiverId)
            try {                    
                const response = await api.get(`/bills/to/company/${receiverId}`);
                if (response.data.success) {
                    const resBills = response.data.bills;
                    if(resBills){
                        console.log('resBills',resBills)
                        setBills(resBills);                    
                        setNowLoading(false);
                    }
                }else{
                    console.log('response.data', response.data)
                }
            } catch (err) {
                console.error("Ошибка загрузки данных", err);                
                setNowLoading(false);
            }
        };
        fetchCompanyBills();
    }, []);

    return {
        nowLoading,
        bills,
    };
}