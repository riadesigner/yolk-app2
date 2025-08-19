import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';

import Breadcrumb from '../../components/Breadcrumb';
import CompanyGallery from '../../components/CompanyGallery';
import CompanyAboutHeader from '../../components/CompanyAboutHeader';
import CompanyAboutKeepInTouch from '../../components/CompanyAboutKeepInTouch';
import CompanyAboutOrders from '../../components/CompanyAboutOrders';
import TextWithBreaks from '../../components/TextWithBreaks';


export default function CompanyInfoPage(){

    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [gallery, setGallery] = useState(null);
    

    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/company', title:'Панель управления'},
        {link:'#', title:'О компании', isActive:true},
    ];    
    
    const orders = [
        {          
        id:'123123',
        title: 'Разработка фирменного стиля для Название компании',
        description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque autem accusamus dolorum, quidem aspernatur quod, facilis quasi ex esse, suscipit nobis illo dolore molestias. Nobis, doloribus. Ipsum non, obcaecati repellendus deserunt fugit fugiat quis dicta aperiam id molestias totam debitis, quaerat, magni ex! Atque molestias nam amet sit vel non.',
        requirements:[
            'Atque autem accusamus dolorum, quidem aspernatur quod',
            'facilis quasi ex esse, suscipit nobis illo dolore molestias. ',
            'Nobis, doloribus. Ipsum non, obcaecati repellendus deserunt fugit',
        ],          
        price: 10000,
        company:'Диван.ру',
        companyId:'12312',
        dateto:'21-09-2025',
        tags:'Веб-сайт, интерфейс, UI',
        files:[
            {title:'Название файла',link:''},
            {title:'Название файла',link:''}
        ]
        }
    ];


    useEffect(() => {

        const fetchUser = async () => {          
            try {
                const response = await api.get('/user/full');
                console.log('response', response);
                
                if(response.data.success){
                    const user = response.data.user;                    
                    const company = user.userCompany;
                    console.log('user', user);
                    if(company){
                        setCompany(company);
                        setGallery(company.gallery)
                    }
                    
                    // setAvatar(user.avatar);
                    // setSchools(user.userInfo.schools);
                    // setSpecialization(user.userInfo.specialization)
                }

            } catch (err) {
                console.error('Ошибка загрузки анкеты', err);
                // navigate('/login');
                navigate('/');
            }
        };
        
        fetchUser();
    }, []);

    return (
        <>
        <section className="container is-max-desktop desktop-only">
        <div className="section">
            <Breadcrumb links={links}/>
        </div>
        </section>
            <article>
            
            <CompanyAboutHeader company={company} privateMode="true"/>  
            
            <section className="container">                
                <div className="section">
                    <h2>Кто мы</h2>                    
                    
                    <p style={{'white-space': 'pre-line'}}>
                        {company && company.description}                                     
                    </p>

                </div>
                
                <div className="section">
                    {
                        gallery ? (
                            <CompanyGallery images={gallery}/>
                        ):(
                            <>Галерея не заполнена</>
                        )
                    }                    
                </div>

            </section>

            <CompanyAboutOrders orders={orders} />           
            <CompanyAboutKeepInTouch />

        </article>
        </>
    )
}