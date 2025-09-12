import { useState, useEffect } from "react";
import api from "../../utils/api";

export default function useFetchCategories({categoryId}){

    const [userCategories, setUserCategories] = useState([]);     

    useEffect(() => {
    
        const fetchCats = async () => {        
            try {
            
            const response = await api.get(`/categories`);            

            if (response.data.success) {            
                const all_categories = response.data.categories;                                
                    if(all_categories){
                        if(!categoryId){
                            // все категории активны
                            all_categories.map(cat=>cat.selected=true);
                        }else{
                            // если в строке поиска указана категория
                            // активна только выбранная категория
                            // например при переходе по соответстующей ссылке с главной страницы                            
                            all_categories.map(                                
                                cat=>{
                                    return cat.id===categoryId ? cat.selected=true : cat.selected=false; 
                                }
                            );
                        }                        
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