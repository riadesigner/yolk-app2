import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import api from '../../utils/api.jsx'
import { useAuth } from '../../contexts/AuthContext';
import { getPayloads } from '../../utils/payloads'

export default function useFetchOrderPage() {    

    const { isAuthenticated } = useAuth();
    const savedUser = getPayloads();    
    const userRole = savedUser ? savedUser.role : 'unknown';     
    const {nowLoading, setNowLoading} = useState(true);

    const { id } = useParams();

    const [order, setOrder]= useState(null);
    const [files, setfiles] = useState([])
    const [responded, setResponded] = useState([]) 

    const hdlRespondToOrder = async (e)=>{
        e.preventDefault();        
        console.log('откликнуться...!')
        const response = await api.patch(`/orders/${id}/new-respond`);
        if(response.data.success){
            setResponded(response.data.responded);
        }        
        console.log('response', response)
    }

    useEffect(() => {

        const fetchOrder = async () => {         
            try {
                const response = await api.get(`/orders/${id}`);

                if(response.data.success){    
                    
                    const foundOrder =  response.data.order;                    
                    if(foundOrder){
                        setOrder(foundOrder);
                        setResponded(foundOrder.responded);
                        setfiles(foundOrder.files)
                    }
                }
                
            } catch (err) {
                console.error('Ошибка загрузки профиля', err);
            }
        };
        
        fetchOrder();
    }, []);     

    return {
        isAuthenticated,
        savedUser,
        userRole,
        order,
        files,
        responded,
        hdlRespondToOrder,
    };
}