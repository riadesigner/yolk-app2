
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
    const [tags, setTags] = useState("");
    const {files, setFiles, addFile, removeFile, handleFileChange } = useFiles([]);
    

    const hdlSaveUser = async (e)=>{                   
        e.preventDefault();
        setErrorMessage(null);                               

        const catsSelected = [];
        cats.map((cat)=>{cat.selected && catsSelected.push(cat.id)});

        const arrTags = tags.split(',');        
        const arrTrimmed = arrTags.map(el => el.trim()).filter(el => el !== '');

        console.log('catsSelected', catsSelected);
        const orderData = { title, description, categories:catsSelected, tags: arrTrimmed } 

        // Проверка что хотя бы одно поле заполнено
        const hasContent = Object.values(orderData).some(
            value => value && value.trim() !== ''
        );        
        if (!hasContent) {
            setErrorMessage('Заполните обязательные поля перед сохранением')
            return;
        }        

        try {            
            if(orderId){
                const response = await api.patch(`/orders/${orderId}`, { orderData });
                console.log('Успешно обновлен заказ:', response.data);
                navigate('/cp/company');                
            }else{
                const response = await api.put(`/orders/${companyId}`, { orderData });
                console.log('Успешно добавлен заказ:', response.data);
                navigate('/cp/company');     
            }
        } catch (error) {
            console.error('Ошибка:', error.response?.data || error.message);            
            setErrorMessage('Не удалось сохранить')
            throw error; // Можно обработать ошибку в компоненте
        }
    }    

    useEffect(() => {
    
        const fetchOrder = async (allCats) => {
        
            try {
            const response = await api.get(`/orders/${orderId}`);
            if (response.data.success) {            
                const order = response.data.order;                
                console.log('order', order)
                if(order){
                    setOrder(order);
                    setTitle(order.title || '');
                    setDescription(order.description || '');
                    const arrTags = order.tags;
                    setTags(arrTags ? arrTags.join(', ') : '');
                    
                    const updatedCats = [...allCats];
                    console.log('allCats', allCats)
                    console.log('updatedCats', updatedCats)
                    // выделяем выбранные категории
                    console.log('order.categories', order.categories)
                    console.log('order.categories.length > 0', order.categories.length > 0)
                    if(order.categories.length > 0){
                        updatedCats.map((cat)=>{ if(order.categories.includes(cat.id)){
                            console.log('cat', cat)
                            cat.selected = true;
                        } })
                    }

                }
           
            }
            } catch (err) {
                console.error("Ошибка загрузки заказа", err);
                navigate("/");
            }

        };

        const fetchCategories = async () => {                        
            try {        
                const response = await api.get("/categories");        
                if (response.data.success) {
                    const allCats = response.data.categories;
                    if(!orderId){
                        // если новый заказ
                        // выделяем все категории
                        allCats.map((cat)=>{cat.selected=true; return cat});
                    }                    
                    setCats(allCats);                                    
                    // если заказ существует
                    // то загружаем его
                    orderId && fetchOrder(allCats)
                }
            } catch (err) {
                console.error("Ошибка загрузки категорий", err);
                throw new Error("Ошибка загрузки категорий");
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
        tags,
        setTags,
        files,
        setFiles,        
        hdlSaveUser,        
    };
}