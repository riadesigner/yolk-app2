import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../../../utils/api'

export default function useFetchDesignerPortfolioEdit(setErrorMessage){

    const { portfolioId } = useParams();

    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [portfolioItem, setPortfolioItem] = useState(null);
    const [gallery, setGallery] = useState([]);
    
    const navigate = useNavigate();    

    const hdlSavePortfolio = async (e)=>{    
        e.preventDefault();        
        
        setErrorMessage('');

        if(title.trim()===''){
            setErrorMessage('Название проекта не может быть пустым!');
            return;
        }

        try {
            const response = await api.patch('/portfolios/for/me', {portfolioId, title, description});

            if(response.data.success){    
                const resPortfolioItem = response.data.portfolio;                
                setPortfolioItem(resPortfolioItem);
                navigate('/cp/designer/portfolio');
            }
            
        } catch (err) {
            console.error('Ошибка сохранения портфолио', err);
            setErrorMessage('Ошибка сохранения портфолио');
        }
    }    

    useEffect(() => {        
        const fetchPortfolioItem = async () => {
            try {
                setErrorMessage('');
                const response = await api.get(`/portfolios/${portfolioId}`);

                if(response.data.success){    
                    const portfolioItem = response.data.portfolio;                    
                    setPortfolioItem(portfolioItem);
                    setDescription(portfolioItem.description)
                    setTitle(portfolioItem.title)
                    setGallery(portfolioItem.images)
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
        gallery, 
        setGallery,
        hdlSavePortfolio,
        }

}