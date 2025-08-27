import { useState, useEffect } from "react";
import api from "../../utils/api";

export default function useFetchCategories(){

    const [userCategories, setUserCategories] = useState([]);    

    useEffect(() => {
    
        const fetchCats = async () => {        
            try {
            
            const response = await api.get(`/categories`);            

            if (response.data.success) {            
                const all_categories = response.data.categories;                                
                    if(all_categories){
                        all_categories.map(cat=>cat.selected=true);
                        setUserCategories(all_categories);
                    }
                }
            } catch (err) {
                console.error("Ошибка загрузки разделов каталога заказов", err);                
            }

        };        

        fetchCats();

    }, []);

        return {
            userCategories,
            setUserCategories,            
        }

}