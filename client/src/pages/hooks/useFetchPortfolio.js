
import { useState, useEffect } from "react";
import api from "../../utils/api";

export default function useFetchPortfolio({designerId}) {        
    
    const [portfolioItems, setPortfolioItems] = useState([]);    

    useEffect(() => {
    
        const fetchPortfolio = async (designerId) =>{
            try{
                
                const response = await api.get(`/users/${designerId}`);
                if(response.data.success){                    
                    const user = response.data.user;
                    if(user){
                        setDesigner(user);
                        setAvatar(user.avatar);
                        setSchools(user.userInfo.schools);
                        setSpecialization(user.userInfo.specialization)
                    }                    
                }
            }catch(err){
                console.error("Ошибка загрузки информации о пользователе", err);                  
            }
        }

        designerId && fetchPortfolio(designerId);

    }, []);

    return {
        designer,
        schools,
        avatar,
        specialization,
    };
}