
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { useLocation } from 'react-router-dom';

export default function useFetchOrders({userInput=null}) {             
      
    const [orders, setOrders] = useState(null);    

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const date = searchParams.get('date') || '';
    const price = searchParams.get('price') || '';

    useEffect(() => {              
    
        const fetchOrders = async () => {                    

             console.log(' --------- userInput ---------- ', userInput)

            let response;

            try {
            
                if(userInput){
                    response = await api.get(`/orders/search/${userInput}`);
                }else{
                    response = await api.get(`/orders?date=${date}&price=${price}&rnd=${Date.now()}`);            
                }            

                if (response && response.data.success) {            
                    const foundOrders = response.data.orders;                                
                    if(foundOrders){
                        console.log('foundOrders',foundOrders)
                        setOrders(foundOrders);
                    }
                }

            } catch (err) {
                console.error("Ошибка загрузки заказов", err);                
            }

        };

        fetchOrders();

    }, [userInput, date, price]);

    return {
        orders,
    };
}