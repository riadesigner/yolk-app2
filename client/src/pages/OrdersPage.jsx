import { Link, NavLink, useLocation, useParams } from 'react-router-dom';

import styles from './OrdersPage.module.css'
import OrderPreview from '../components/OrderPreview.jsx'
import OrdersFilter from '../components/OrdersFilter.jsx'
import Pagination from '../components/Pagination.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'

import useFetchOrders from './hooks/useFetchOrders.js'


export default function PortfolioPage(){
   
    const params = useParams();
    const {userInput} = params;
    
    const links = [
        {link:'/', title:'Главная'},
        {link:'/orders', title:'Все заказы',},        
        {link:'', title:userInput, isActive:true},        
    ];

    const {
        orders,
    } = useFetchOrders({ userInput });
    
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
                                orders && orders.map((order)=>{
                                    console.log('order', order)
                                    return(
                                        <OrderPreview 
                                            key={order.id} 
                                            order={order} />
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