import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AdminDesignerPreview from '../../components/AdminDesignerPreview'
import Pagination from '../../components/Pagination'

import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';

import Breadcrumb from '../../components/Breadcrumb';
// import CompanyGallery from '../../components/CompanyGallery';
// import CompanyAboutHeader from '../../components/CompanyAboutHeader';
// import CompanyAboutKeepInTouch from '../../components/CompanyAboutKeepInTouch';
// import CompanyAboutOrders from '../../components/CompanyAboutOrders';
// import TextWithBreaks from '../../components/TextWithBreaks';

const designersData = [
    {id:'1', name:'Евгений П',city:'Уссурийск',specialization:'expedita voluptatibus sit sint, ', ordersAmount: 6},
    {id:'2', name:'Дмитрий М',city:'Находка',specialization:'deserunt commodi hic molestiae', ordersAmount: 6},
    {id:'3', name:'Елена К',city:'Владивосток',specialization:' ea voluptates minus quam dolor aliquid', ordersAmount: 6},
    {id:'4', name:'Кристина З',city:'Сергеевка',specialization:'tates minus quam dolor aliquid eveniet deserunt', ordersAmount: 6},
];   

export default function CompanyInfoPage(){

    const navigate = useNavigate();
    // const [company, setCompany] = useState(null);
    // const [gallery, setGallery] = useState(null);
    

    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/yolk-admin', title:'Панель управления'},
        {link:'#', title:'Все дизайнеры', isActive:true},
    ];


    useEffect(() => {

        const fetchUser = async () => {          
            // try {
            //     const response = await api.get('/users/me');
            //     console.log('response', response);
                
            //     if(response.data.success){
            //         const user = response.data.user;                    
            //         const company = user.userCompany;
            //         console.log('user', user);
            //         if(company){
            //             setCompany(company);
            //             setGallery(company.gallery)
            //         }                    
            //     }

            // } catch (err) {
            //     console.error('Ошибка загрузки анкеты', err);
            //     // navigate('/login');
            //     navigate('/');
            // }
        };
        
        // fetchUser();
    }, []);

    return (
        <>
        <section className="container is-max-desktop desktop-only">
        <div className="section">
            <Breadcrumb links={links}/>
        </div>
        </section>
            <article>                        
            
            <section className="container">                
                <div className="section">
                    <h2>Все дизайнеры</h2>                    
                    <div>
                        {
                            designersData && designersData.length>0 && designersData.map((designer)=>{
                                return (
                                    <AdminDesignerPreview key={designer.id}  designer={designer} />
                                )
                            })
                        }
                    </div>
                    <div className="block mt-6">
                        <Pagination />
                    </div>
                </div>  
            </section>

        </article>
        </>
    )
}