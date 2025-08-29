import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb.jsx'
import styles from './OrderPage.module.css'
import api from '../utils/api.jsx'
import { useAuth } from '../contexts/AuthContext';
import { getPayloads } from '../utils/payloads'

export default function OrderPage(){

    const { isAuthenticated } = useAuth();
    const savedUser = getPayloads();    
    const userRole = savedUser ? savedUser.role : 'unknown';     

    const links = [
        {link:'/', title:'Главная'},
        {link:'/orders', title:'Все заказы'},
        {link:'', title:'Заказ', isActive:true},        
    ];

    const { id } = useParams();

    const [order, setOrder]= useState(null);
    const [files, setfiles] = useState([])
    const [responded, setResponded] = useState([]) 

    const hdlRespondToOrder = async (e)=>{
        e.preventDefault();        
        console.log('откликнуться...!')
        const response = await api.patch(`/orders/${id}/new-respond`);
        if(response.data.success){
            setResponded(response.data.responded);
        }        
        console.log('response', response)
    }

    useEffect(() => {

        const fetchOrder = async () => {         
            try {
                const response = await api.get(`/orders/${id}`);

                if(response.data.success){    
                    
                    const foundOrder =  response.data.order;                    
                    if(foundOrder){
                        setOrder(foundOrder);
                        setResponded(foundOrder.responded);
                        setfiles(foundOrder.files)
                    }
                }
                
            } catch (err) {
                console.error('Ошибка загрузки профиля', err);
            }
        };
        
        fetchOrder();
    }, []); 
    
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
                                {
                                    isAuthenticated && userRole==='designer' && (
                                        
                                            responded.includes(savedUser.id) ? (
                                                <span className="is-size-7">
                                                    Вы откликнулись на данный заказ
                                                </span>                                                                           
                                            ):(
                                                <div className="block mt-6 mt-5-mobile">
                                                    <button className="button is-link" onClick={(e)=>hdlRespondToOrder(e)}>Откликнуться</button>
                                                </div>
                                            )                                        
                                    )
                                }
                                {
                                    !isAuthenticated && (
                                        <span className="is-size-7">
                                            Войдите как Дизайнер, чтобы откликнуться на заказ
                                        </span>
                                    )
                                }
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