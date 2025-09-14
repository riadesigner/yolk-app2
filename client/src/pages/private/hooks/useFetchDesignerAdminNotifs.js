import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../../../utils/api'

export default function useFetchCompanyAdminNotifs(){

    const [notifications, setNotifications] = useState([]);    

    useEffect(() => {

        const fetchNotifications = async ()=>{
            const response = await api.get(`/notifications`);
            if(response.data.success){                        
                const arrNotifications = response.data.notifications;                
                arrNotifications && arrNotifications.length>0 && setNotifications(arrNotifications);
            }        
        }

        fetchNotifications();

    },[]);

    return {
        notifications,
        }

}