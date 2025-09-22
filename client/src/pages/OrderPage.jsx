import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.jsx'
import styles from './OrderPage.module.css'
import useFetchOrderPage from './hooks/useFetchOrderPage.js'

export default function OrderPage(){

    const links = [
        {link:'/', title:'Главная'},
        {link:'/orders', title:'Все заказы'},
        {link:'', title:'Заказ', isActive:true},        
    ];

    const {
        isAuthenticated,
        savedUser,
        userRole,        
        order,
        files,
        responded,
        hdlRespondToOrder,
    } = useFetchOrderPage();
    
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