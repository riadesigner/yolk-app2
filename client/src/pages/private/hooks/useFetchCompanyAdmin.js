import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import api from '../../../utils/api'

export default function useFetchCompanyAdmin(){

    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);    
    const [company, setCompany] = useState(null);    
    const [notifications, setNotifications] = useState([]);
    const [nowLoading, setNowLoading] = useState(true);    

    const navigate = useNavigate();    

    useEffect(() => {

        const fetchNotifications = async ()=>{
            const response = await api.get(`/notifications/me/limit/4`);
            if(response.data.success){                        
                const arrNotifications = response.data.notifications;                
                arrNotifications && arrNotifications.length>0 && setNotifications(arrNotifications);
            }        
        }

        const fetchUserFull = async () => {         
            try {
                const response = await api.get('/users/me');

                if(response.data.success){    
                    const usr =  response.data.user;
                    if(usr){
                        setUser(usr);
                        if(usr.userCompany){
                            setCompany(usr.userCompany)
                            const responseOrders = await api.get(`/orders/by-company/${usr.userCompany.id}`);
                            if(responseOrders.data.success){
                                setOrders(responseOrders.data.orders);
                            }                                                    
                        }
                        await fetchNotifications();
                        setNowLoading(false);
                    }
                }
                
            } catch (err) {
                setNowLoading(false);
                console.error('Ошибка загрузки профиля', err);
                // navigate('/');
            }
        };
        
        fetchUserFull();
    },[]);

    return {
        user,
        orders,        
        company,
        notifications,        
        nowLoading,
        }

}