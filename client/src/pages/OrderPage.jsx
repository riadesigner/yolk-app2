import { Link, NavLink, useLocation } from 'react-router-dom';

import Breadcrumb from '../components/Breadcrumb.jsx'
import styles from './OrderPage.module.css'


export default function OrderPage(){

    const links = [
        {link:'/', title:'Главная'},
        {link:'/orders', title:'Все заказы'},
        {link:'/orders/123', title:'Заказ 123', isActive:true},        
    ];

    const order = {          
        id:'1',
        title: 'Разработка фирменного стиля для Название компании',
        description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque autem accusamus dolorum, quidem aspernatur quod, facilis quasi ex esse, suscipit nobis illo dolore molestias. Nobis, doloribus. Ipsum non, obcaecati repellendus deserunt fugit fugiat quis dicta aperiam id molestias totam debitis, quaerat, magni ex! Atque molestias nam amet sit vel non.',
        requirements:[
            'Atque autem accusamus dolorum, quidem aspernatur quod',
            'facilis quasi ex esse, suscipit nobis illo dolore molestias. ',
            'Nobis, doloribus. Ipsum non, obcaecati repellendus deserunt fugit',
        ],          
        price: 10000,
        company:'Диван.ру',
        companyId:'123',
        dateto:'21-09-2025',
        tags:'Веб-сайт, интерфейс, UI',
        files:[
            {title:'Название файла 1',link:''},
            {title:'Название файла 2',link:''}
        ]
        };

    const linkToCompany = `/companies/${order.companyId}`
    
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
                    <div className={styles.orderPage}>
                    <div>
                        <h2>{order.title}</h2>
                        <p>{order.description}</p>
                        
                        <h3 className="title mt-5 mb-2">Требования к заказу:</h3> 
                        <ul>{
                            order.requirements.map((i, index)=>{
                                return(
                                    <li key={index}>{i}</li>
                                )
                            })
                            }</ul>
                        <h3 className="title mt-5 mb-5">Файлы:</h3>     
                        <div >
                            {
                                order.files.map((i, index)=>{
                                    return(                                        
                                        <div>
                                            <a href={i.link}><button className="button mb-2 mr-2">{i.title}</button></a>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <div className={styles.details}>
                            <div className="box">
                                <h3>Детали заказа</h3>
                                <div className="block">
                                    <div className="mb-1">Стоимость</div>
                                    <div>{order.price}</div>
                                </div>
                                <div className="block">
                                    <div className="mb-1">Выполнить до</div>
                                    <div>{order.dateto}</div>
                                </div>                                
                                <div className="block">
                                    <div className="mb-1">Заказчик</div>
                                    <Link to={linkToCompany}>{order.company}</Link>
                                </div>
                                <div className="block mt-6 mt-5-mobile">
                                    <button className="button is-link">Откликнуться</button>
                                </div>                                
                            </div>
                        </div>
                    </div>
                    </div>                    
                </article>                            
            </div>
        </section>
        </>
    )
}