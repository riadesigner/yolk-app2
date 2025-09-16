
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import api from "../../../utils/api"; // Путь к вашему API

export default function useFetchBillToPrintPage() {
    
    const [bill, setBill] = useState(null);    
    const [nowLoading, setNowLoading] = useState(true);    
    const params = useParams();
    const {billId} = params;
    
    useEffect(() => {            

        const fetchBill = async () => {            
            console.log('try to loading ', billId)
            try {                    
                const response = await api.get(`/bills/${billId}`);
                console.log('response', response)
                if (response.data.success) {
                    const resBill = response.data.bill;
                    console.log('resBill', resBill);
                    if(resBill){                        
                        setBill(resBill);                    
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
        fetchBill();
    }, [billId]);

    return {
        nowLoading,
        bill,
    };
}