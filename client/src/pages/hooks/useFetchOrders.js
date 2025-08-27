
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { useLocation } from 'react-router-dom';

export default function useFetchOrders({userInput=null}) {             
      
    const [orders, setOrders] = useState(null);    
    const [userCategories, setUserCategories] = useState([]);
    
    const location = useLocation();

    useEffect(() => {              
        
        const searchParams = new URLSearchParams(location.search);        
        const date = searchParams.get('date') || '';
        const price = searchParams.get('price') || '';        
    
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

        const fetchCats = async () => {        
            try {
            
            const response = await api.get(`/categories`);            

            if (response.data.success) {            
                const all_categories = response.data.categories;                                
                    if(all_categories){
                        all_categories.map(cat=>cat.selected=true);
                        setUserCategories(all_categories);
                    }
                }
            } catch (err) {
                console.error("Ошибка загрузки разделов каталога заказов", err);                
            }

        };        

        fetchCats();
        fetchOrders();

    }, [userInput, location.search]);

    return {
        userCategories,
        setUserCategories,
        orders,
    };
}