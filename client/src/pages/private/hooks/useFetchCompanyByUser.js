

import { useState, useEffect } from "react";
import api from '../../../utils/api'

export default function useFetchCompanyByUser(){

    const [company, setCompany] = useState(null)
    const [gallery, setGallery] = useState([])
    const [orders, setOrders] = useState([])    

    useEffect(() => {

        const fetchOrders = async (companyId) =>{
            try{
                const resOrders = await api.get(`/orders/by-company/${companyId}`);
                if(resOrders.data.success){                    
                    setOrders(resOrders.data.orders);
                }
            }catch(err){
                console.error("Ошибка загрузки информации о заказах компании", err);                  
            }
        }        

        const fetchCompanyByUser = async () => {          
            try {
                const response = await api.get('/user/full');                                
                if(response.data.success){
                    const user = response.data.user;                    
                    const company = user.userCompany;                    
                    if(company){
                        setCompany(company)
                        setGallery(company.gallery)
                        fetchOrders(company.id)
                    }                    
                }

            } catch (err) {
                console.error('Ошибка загрузки информации о компании пользователя', err);                 
            }
        };
        
        fetchCompanyByUser();
    }, []);

    return {
        company,
        gallery,
        orders,        
    }
}