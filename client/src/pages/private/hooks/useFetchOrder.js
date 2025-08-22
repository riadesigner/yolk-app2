
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import useFiles from './useFiles';

export default function useFetchOrder({orderId, companyId, setErrorMessage}) {
    
    const navigate = useNavigate();    
    const [cats, setCats] = useState([]);
    const [order, setOrder] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const {files, setFiles, addFile, removeFile, handleFileChange } = useFiles([]);
    

    const hdlSaveUser = async (e)=>{                   
        e.preventDefault();
        setErrorMessage(null);                               


        const orderData = { title, description } 

        // Проверка что хотя бы одно поле заполнено
        const hasContent = Object.values(orderData).some(
            value => value && value.trim() !== ''
        );        
        if (!hasContent) {
            setErrorMessage('Заполните обязательные поля перед сохранением')
            return;
        }        

        try {
            //
            const response = await api.put(`/orders/${companyId}`, { orderData });
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
        
            try {
            const response = await api.get(`/orders/${orderId}`);
            if (response.data.success) {            
                const order = response.data.order;                
                console.log('order', order)
                if(order){
                    setOrder(order);
                    setTitle(order.title || '');
                    setDescription(order.description || '');
                }
           
            }
            } catch (err) {
                console.error("Ошибка загрузки заказа", err);
                navigate("/");
            }

        };

        (orderId !== null) && fetchOrder();

        const fetchCategories = async () => {
            console.log('fetchCategories!')
            try {        
                const response = await api.get("/categories");        
                if (response.data.success) {
                    const allCats = response.data.categories;
                    allCats.map((cat)=>{cat.selected=true; return cat});
                    setCats(allCats);                
                    console.log('allCats', allCats);
                }
            } catch (err) {
                console.error("Ошибка загрузки категорий", err);            
            }
        };
        fetchCategories();

    }, []);

    return {
        order,
        cats, 
        setCats,       
        title,  
        setTitle,
        description,
        setDescription,
        files,
        setFiles,        
        hdlSaveUser,        
    };
}