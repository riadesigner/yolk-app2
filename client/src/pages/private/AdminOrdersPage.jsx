import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './AdminOrdersPage.module.css'

import AdminOrdersFilter from '../../components/AdminOrdersFilter'
import Pagination from '../../components/Pagination'
import AdminOrderPreview from '../../components/AdminOrderPreview'


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
    

    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/yolk-admin', title:'Панель управления'},
        {link:'#', title:'Все заказы', isActive:true},
    ];

    const orders = [
        {          
          title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nulla inventore quia aut modi laborum tenetur nihil, rerum recusandae ',
          id:'1',
          price: 10000,
          company:'Владхлеб',
          companyId:'23123',
          dateto:'21-09-2025',
          tags:'Веб-сайт, интерфейс, UI',
        },{
          title: 'Разработка фирменного стиля для Название компании',
          id:'2',
          price: 1000,
          company:'Vladstroyzakachik',
          companyId:'2312323',
          dateto:'21-11-2025',
          tags:'Графический дизайн, фирменный стиль, логотип',
        },{
          title: 'Smagnam, reprehenderit officiis corrupti veritatis',
          id:'3',
          price: 3000,
          company:'Cудостроительный комплекс «Звезда»',
          companyId:'2312323sd',
          dateto:'21-10-2025',
          tags:'Анимация, 2д-анимация, видео',
        },{
          title: 'Разработка фирменного стиля для Название компании',
          id:'4',
          price: 1000,
          company:'Vladstroyzakachik',
          companyId:'2312323',
          dateto:'21-11-2025',
          tags:'Графический дизайн, фирменный стиль, логотип',
        },{
          title: 'Smagnam, reprehenderit officiis corrupti veritatis',
          id:'5',
          price: 3000,
          company:'Cудостроительный комплекс «Звезда»',
          companyId:'2312323sd',
          dateto:'21-10-2025',
          tags:'Анимация, 2д-анимация, видео',
        }, {          
          title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nulla inventore quia aut modi laborum tenetur nihil, rerum recusandae ',
          id:'6',
          price: 10000,
          company:'Владхлеб',
          companyId:'23123',
          dateto:'21-09-2025',
          tags:'Веб-сайт, интерфейс, UI',
        }               
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
            
        <section className="container is-max-desktop">
            <div className="section">                                
                <article>
                    <div className={styles.ordersPage}>
                        <div>                            
                            <AdminOrdersFilter />
                        </div>
                        <div  className="block">
                            <div className = {styles.orders} >
                            {
                                orders.map((ord, i)=>{
                                    return(                                    
                                        <AdminOrderPreview order={ord}/>
                                    )
                                })
                            }
                            </div>                            
                            <div className="block mt-6">
                                <Pagination />
                            </div>
                        </div>
                    </div>                    
                </article>                            
            </div>
        </section>

        </article>
        </>
    )
}