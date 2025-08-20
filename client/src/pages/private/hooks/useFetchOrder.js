
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import useFiles from './useFiles';

export default function useFetchOrder({setErrorMessage}) {
    
    const navigate = useNavigate();

    const orderId = null;

    const [order, setOrder] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { files, setFiles, addFile, removeFile, handleFileChange } = useFiles([]);

    const hdlSaveUser = async (e)=>{                   
        e.preventDefault();
        setErrorMessage(null);                
        
        const orderData = { title, description }        
        
        try {
            const response = await api.put(`/orders/${companyId}`, orderData);
            console.log('Успешно:', response.data);
            navigate('/cp/company');
        } catch (error) {
            console.error('Ошибка:', error.response?.data || error.message);            
            setErrorMessage('Не удалось сохранить')
            throw error; // Можно обработать ошибку в компоненте
        }
    }    

    useEffect(() => {
    
        const fetchOrder = async () => {
        
            // try {
            // const response = await api.get(`/orders/${orderId}`);
            // if (response.data.success) {            
            //     const user = response.data.order;
            //     setOrder(order);
            //     // setSpecialization(user?.userInfo?.specialization || "");                         
            //     // Education           
            //     // let userSchools = user?.userInfo?.schools || [{id:1, title:'', year:'', speciality:'', city:'',}];            
            //     // setSchools(userSchools);            
            // }
            // } catch (err) {
            //     console.error("Ошибка загрузки заказа", err);
            //     navigate("/");
            // }

        };

        (orderId !== null) && fetchOrder();

    }, []);

    return {
        order,
        title,  
        setTitle,
        description,
        setDescription,
        files,
        setFiles,        
        hdlSaveUser,        
    };
}