
import { useState, useEffect } from "react";
import api from "../../utils/api";

export default function useFetchDesignerPortfolioPublicPage(designerId) {        

    const [designer, setDesigner] = useState(null);
    const [portfolios, setPortfolios] = useState([]);

    useEffect(() => {
    
        const fetchDesigner = async (designerId) =>{
            try{                
                const response = await api.get(`/users/${designerId}`);
                if(response.data.success){                    
                    const resDesigner = response.data.user;
                    if(resDesigner){                        
                        setDesigner(resDesigner);
                        setPortfolios(resDesigner.portfolios)
                    }                    
                }
            }catch(err){
                console.error("Ошибка загрузки информации о пользователе", err);                  
            }
        }

        designerId && fetchDesigner(designerId);

    }, [designerId]);

    return {
        designer,
        portfolios,
    };
}