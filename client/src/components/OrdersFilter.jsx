import { useParams } from 'react-router-dom'
import styles from './OrdersFilter.module.css'
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import api from "../utils/api"; 

export default function OrdersFilter(){

    const params = useParams();
    const {userInput} = params;

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const date = searchParams.get('date') || null;
    const price = searchParams.get('price') || null;    
    const cats =  searchParams.get('cats') || null
    const userCats = cats?cats.split(':'):[];    

    const [categories, setCategories] = useState([]);    

    const hdlDateFilter = ()=>{
        window.location.href = `/orders?date=${date==='up'?'down':'up'}`;
    } 

    const hdlPriceFilter = ()=>{
        window.location.href = `/orders?price=${price==='up'?'down':'up'}`;
    }     

    useEffect(() => {
    
        const fetchCats = async () => {        
            try {
            
            const response = await api.get(`/categories`);            

            if (response.data.success) {            
                const all_categories = response.data.categories;                                
                if(all_categories){
                    setCategories(all_categories);                
                }           
            }
            } catch (err) {
                console.error("Ошибка загрузки заказов", err);                
            }

        };

        fetchCats(userInput);

    }, []);



    return(
        <>

        {
            userInput && (
                <>
                <div className="block mt-0">
                    <h2 className="subtitle is-size-6 mb-4">Найдено</h2>
                    <p>По запросу: {userInput}</p>                    
                </div>                
                <hr />
                </>
            )
        }

        <div className="block mt-0">
            <h2 className="subtitle is-size-6 mb-4">Сортировка</h2>
            <button className={`button is-fluid mb-4 ${date && 'is-primary'}`} onClick={hdlDateFilter}>
                <span>По дате</span>
                <span><i className={`fa-solid ${date==='up' ? 'fa-angle-up' : 'fa-angle-down'}`}></i></span>
            </button>
            <button className={`button is-fluid mb-4 ${price && !date && 'is-primary'}`} onClick={hdlPriceFilter}>
                <span>По стоимости</span>
                <span><i className={`fa-solid ${price==='up' ? 'fa-angle-up' : 'fa-angle-down'}`}></i></span>
            </button>
        </div>
        
        <div className="block">
            <h2 className="subtitle is-size-6 mb-4">Категории</h2>
            {
                categories.length > 0 &&                     
                    categories.map((cat)=>{
                        return (                            
                            userCats.includes(cat.id) ? (
                            <button key={cat.id} className="button is-fluid mb-4 is-left is-link">
                                <span><i className="fa-regular fa-square-check"></i></span>
                                <span>{cat.name}</span>                
                            </button>                            
                            ):(
                            <button key={cat.id} className="button is-fluid mb-4 is-left">                                
                                <span>{cat.name}</span>                
                            </button>
                            )
                        )
                    })               
            }

        </div>

        <div className="block">
            <h2 className="subtitle is-size-6 mb-4">Теги</h2>
            <div className={styles.tags}>
            <button className="button is-small">Графический дизайн</button>
            <button className="button is-small">Веб</button>
            <button className="button is-small">Видео</button>
            <button className="button is-small">Фирменный стиль</button>               
            <button className="button is-small">UI Kit</button>
            <button className="button is-small">3D</button>
            </div> 
        </div>
        

        </>
    )
}