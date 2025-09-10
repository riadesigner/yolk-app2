import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../../../utils/api'

export default function useFetchDesignerPortfolioEdit(setErrorMessage){
    
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [portfolioItem, setPortfolioItem] = useState(null);
    const navigate = useNavigate();
    const portfolioId = '';

    // const hdlSavePortfolio = async (e)=>{    
    //     e.preventDefault();        
        
    //     setErrorMessage('');

    //     if(title.trim()===''){
    //         setErrorMessage('Название проекта не может быть пустым!');
    //         return;
    //     }

    //     try {
    //         const response = await api.patch('/portfolios/for/me', {title, description});

    //         if(response.data.success){    
    //             const resPortfolioItem = response.data.portfolio;
    //             setErrorMessage('');
    //             setPortfolioItem(resPortfolioItem);
    //             navigate('/cp/designer/portfolio');
    //         }
            
    //     } catch (err) {
    //         console.error('Ошибка сохранения портфолио', err);
    //         setErrorMessage('Ошибка сохранения портфолио');
    //     }
    // }    

    useEffect(() => {        
        const fetchPortfolioItem = async () => {
            try {
                setErrorMessage('');
                const response = await api.get(`/portfolios/${portfolioId}`);

                if(response.data.success){    
                    const portfolioItem = response.data.portfolio;
                    console.log('portfolioItem', portfolioItem);
                    setPortfolioItem(portfolioItem);
                }
                
            } catch (err) {
                console.error('Проект в портфолио не найден', err);
                setErrorMessage('Проект в портфолио не найден');
            }    
        }
        portfolioId && fetchPortfolioItem();
    
    },[]);

    return {
        portfolioItem,
        title, 
        setTitle,
        description, 
        setDescription,
        hdlSavePortfolio,
        }

}