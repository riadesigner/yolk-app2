
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { useLocation } from 'react-router-dom';

export default function useFetchOrders({userInput=null}) {
        
    const [orders, setOrders] = useState(null);    

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const date = searchParams.get('date') || null;
    const price = searchParams.get('price') || null;

    useEffect(() => {
    
        const fetchOrders = async (userInput) => {        
            try {
            
            const response = await api.get(`/orders?date=${date}&price=${price}&rnd=${Date.now()}`);            

            if (response.data.success) {            
                const orders = response.data.orders;                                
                if(orders){
                    setOrders(orders);                
                }           
            }
            } catch (err) {
                console.error("Ошибка загрузки заказов", err);                
            }

        };

        fetchOrders(userInput);

    }, []);

    return {
        orders,
    };
}