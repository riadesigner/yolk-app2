
import { useState, useEffect } from "react";
import api from "../../utils/api";

export default function useFetchOrders({userInput=null}) {
        
    const [orders, setOrders] = useState(null);    

    useEffect(() => {
    
        const fetchOrders = async (userInput) => {
        
            console.log('userInput', userInput);

            try {
            const response = await api.get(`/orders`);
            if (response.data.success) {            
                const orders = response.data.orders;                
                console.log('orders', orders)
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