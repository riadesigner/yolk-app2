import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AdminCompanyPreview from '../../components/AdminCompanyPreview'
import Pagination from '../../components/Pagination'

import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';

import Breadcrumb from '../../components/Breadcrumb';
// import CompanyGallery from '../../components/CompanyGallery';
// import CompanyAboutHeader from '../../components/CompanyAboutHeader';
// import CompanyAboutOrders from '../../components/CompanyAboutOrders';
// import TextWithBreaks from '../../components/TextWithBreaks';



export default function CompanyInfoPage(){

    const navigate = useNavigate();
    // const [company, setCompany] = useState(null);
    // const [gallery, setGallery] = useState(null);
    
    const companies = [
        {name:'21324356',city:'sadfgfhj',specialization:'expedita voluptatibus sit sint, ', ordersAmount: 6},
        {name:'ywu098er aaf',city:'sadfgfhj',specialization:'deserunt commodi hic molestiae', ordersAmount: 6},
        {name:'Skjl-haldk',city:'sadfgfhj',specialization:' ea voluptates minus quam dolor aliquid', ordersAmount: 6},
        {name:'Harum',city:'sadfgfhj',specialization:'tates minus quam dolor aliquid eveniet deserunt', ordersAmount: 6},
    ];    
    
    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/yolk-admin', title:'Панель управления'},
        {link:'#', title:'Все компании', isActive:true},
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
                    <h2>Все компании</h2>                    
                    <div>
                        {
                            companies && companies.length>0 && companies.map((company)=>{
                                return (
                                    <AdminCompanyPreview  company={company} />                                                                            
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