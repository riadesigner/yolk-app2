import { Link, NavLink, useLocation } from 'react-router-dom';

import styles from './OrdersPage.module.css'
import OrderPreview from '../components/OrderPreview.jsx'
import OrdersFilter from '../components/OrdersFilter.jsx'
import Pagination from '../components/Pagination.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'

export default function PortfolioPage(){
    
    const links = [
        {link:'/', title:'Главная'},
        {link:'/orders', title:'Все заказы', isActive:true},        
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
    
    return(
        <>
        <section className="container desktop-only is-max-desktop">
        <div className="section">
            <Breadcrumb links={links}/>
        </div>
        </section>
            
        <section className="container is-max-desktop">
            <div className="section">                                
                <article>
                    <div className={styles.ordersPage}>
                        <div>                            
                            <OrdersFilter />
                        </div>
                        <div  className="block">
                            <div className = {styles.orders} >
                            {
                                orders.map((ord, i)=>{
                                    return(
                                        <OrderPreview orderId={ord.id} title={ord.title} price={ord.price} company={ord.company}/>
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
        </>
    )
}