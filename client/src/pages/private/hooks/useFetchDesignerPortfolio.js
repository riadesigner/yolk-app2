
import { useEffect, useState } from 'react';

import api from '../../../utils/api'

export default function useFetchDesignerPortfolio(setErrorMessage){
    
    const hdlAddToPortfolio = (e)=>{    
        e.preventDefault();        
        window.location.href = '/cp/designer/portfolio/add';
    }

    const [portfolios, setPortfolios] = useState([]);            

    useEffect(() => {

        const fetchPortfoliosForMe = async () => {         
            try {
                const response = await api.get('/portfolios/me');

                if(response.data.success){    
                    const arrPortfolios = response.data.portfolios;
                    setPortfolios(arrPortfolios);
                }
                
            } catch (err) {
                console.error('Ошибка загрузки портфолио', err);
                setErrorMessage('Ошибка загрузки портфолио');
            }
        };
        
        fetchPortfoliosForMe();
    },[]);

    return {
        hdlAddToPortfolio,
        portfolios,
        }

}