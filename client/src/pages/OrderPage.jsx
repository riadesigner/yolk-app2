import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb.jsx'
import styles from './OrderPage.module.css'
import api from '../utils/api.jsx'

export default function OrderPage(){

    const links = [
        {link:'/', title:'Главная'},
        {link:'/orders', title:'Все заказы'},
        {link:'', title:'Заказ', isActive:true},        
    ];

    const { id } = useParams();

    const filesInit = [
            {title:'Название файла 1',link:''},
            {title:'Название файла 2',link:''}
        ]

    const [order, setOrder]= useState(null);
    const [files, setfiles] = useState(filesInit)

    useEffect(() => {

        const fetchOrder = async () => {         
            try {
                const response = await api.get(`/orders/${id}`);

                if(response.data.success){    
                    
                    const foundOrder =  response.data.order;                    
                    if(foundOrder){
                        setOrder(foundOrder);
                        setfiles(foundOrder.files)
                    }
                }
                
            } catch (err) {
                console.error('Ошибка загрузки профиля', err);
            }
        };
        
        fetchOrder();
    }, []);    

    // const linkToCompany = `/companies/${order.companyId}`
    const linkToCompany = `/companies/123`
    
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
                        <h2>{ order ? (<>{order.title}</>):(<>–</>) }</h2>
                        <p>{ order ? (<>{order.description}</>):(<>–</>) }</p>                                                
                        
                        <br />
                        <h3 className="title mt-5 mb-5">Файлы:</h3>     
                        <div >
                            {
                                order && files && files.map((file, index)=>{
                                    return(
                                        <div key={file.key || index}>
                                            <a target="_blank" href={file.url}><button className="button mb-2 mr-2">{file.originalName}</button></a>
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
                                    <div className="is-primary is-size-5">{order && order.price} руб.</div>
                                </div>
                                <div className="block">
                                    <div className="mb-1">Выполнить до</div>
                                    <div>{order && order.dateTo && order.dateTo.split('T')[0]}</div>
                                </div>                                
                                <div className="block">
                                    <div className="mb-1">Заказчик</div>
                                    {order && order.company && (                                        
                                        <Link to={'/companies/' + order.company.id}>{order.company.name}</Link>
                                        )}
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