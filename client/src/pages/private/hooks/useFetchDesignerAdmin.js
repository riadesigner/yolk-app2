import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../../../utils/api'

export default function useFetchCompanyAdmin(){

    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);    
    const [notifications, setNotifications] = useState([]);    
    
    const navigate = useNavigate();        

    useEffect(() => {

        const fetchNotifications = async ()=>{
            const response = await api.get(`/notifications`);
            if(response.data.success){                        
                 return response.data.notifications;
            }else{
                return [];
            }            
        }

        const fetchUserFull = async () => {     
            
            
            try {

                const response = await api.get('/users/me');                

                if(response.data.success){    
                    const usr =  response.data.user;
                    if(usr){                        
                        setUser(usr);
                        const arrNotifications = await fetchNotifications();
                        arrNotifications && arrNotifications.length>0 && setNotifications(arrNotifications);
                    }
                }
                
            } catch (err) {
                console.error('Ошибка загрузки профиля', err);
                navigate('/');
            }
        };        

        fetchUserFull();
    },[]);

    return {
        user,
        orders,        
        notifications,        
        }

}