
import { useState, useEffect, useRef } from "react";
import api from "../../utils/api";
import { useLocation } from 'react-router-dom';

export default function useFetchOrders({userInput, userCategories}) {    
    
      
    const [orders, setOrders] = useState(null);    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const date = searchParams.get('date') || '';
    const price = searchParams.get('price') || '';           
    
    const isFirstRender = useRef(true);    

    useEffect(() => {            
        
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // пропускаем первый рендер
        }        

        const calcCategories = ()=>{
            const arr_cats = [];
            userCategories.map((cat)=>{
                cat.selected && arr_cats.push(cat.id);
            });
            // если есть выбранные категории (но не все!), то перечисляем их Id
            return arr_cats.length > 0 && arr_cats.length < userCategories.length ? arr_cats.join(':') : '';
        }

    
        const fetchOrders = async () => {                    

            let response;

            try {
                            
                if(userInput){
                    response = await api.get(`/orders/search/${userInput}`);
                }else{
                    response = await api.get(`/orders?date=${date}&price=${price}&cats=${calcCategories()}&rnd=${Date.now()}`);
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

    }, [userInput, date, price, userCategories]);    

    return {
        orders,
    };
}