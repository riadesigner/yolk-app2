import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../../../utils/api'

export default function useFetchCompanyAdmin(){

    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);    
    const [company, setCompany] = useState(null);    
    const [notifications, setNotifications] = useState([]);    
    

    const navigate = useNavigate();        

    const inboxMessages = [
        {
            id:'inbox-message-1',
            title:'Заполните общую информацию о компании',
            readAt:'',
            createdAt:'20-07-2025 22:10',
            links:[
                {name:'ok', url:''},
            ],
            receiver:'id-user-1'
        },
        {
            id:'inbox-message-2',
            title:'Заполните реквизиты компании',
            readAt:'20-07-2025 22:20',
            createdAt:'20-07-2025 22:20',
            links:[
                {name:'ok', url:''},
            ],
            receiver:'id-user-1'
        },
        {
            id:'inbox-message-3',
            title:'Дизайнер Евгений откликнулся на заказ',
            readAt:'',
            createdAt:'20-07-2025 22:20',
            links:[
                {name:'утвердить как исполнителя', url:'/new-contractor/123', bright:true},
                {name:'заказ', url:'/orders/123'},
                {name:'дизайнер', url:'/designers/123'},
            ],
            receiver:'id-user-1'
        }              
                
    ];

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
                const response = await api.get('/user/full');

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
                        const arrNotifications = await fetchNotifications();
                        arrNotifications.length>0 && setNotifications(arrNotifications);
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
        company,
        notifications,        
        }

}