import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";

import api from '../../utils/api'

export default function useFetchLogoLoader(companyId){

    const [logoImage, setLogoImage] = useState('/no-image.jpg');            
    const [nowLoading, setNowLoading] = useState(true);    
    
    const hdlChangeLogo = async ()=>{
        console.log('onCange!');
        }

    useEffect(() => {

        const fetchCompanyLogo = async ()=>{
            setNowLoading(true)

                const response = await api.get(query);
                setNowLoading(false)

                if (response && response.data.success) {            
                    ///
                }
        }

        fetchCompanyLogo();

    },[companyId]);

    return {
        nowLoading,
        logoImage,
        hdlChangeLogo,
        }

}