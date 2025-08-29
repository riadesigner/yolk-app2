import { Link, useNavigate } from 'react-router-dom';

import {formatDate} from '../../utils/dateUtilits';

import Breadcrumb from '../../components/Breadcrumb'
import InboxMessage from '../../components/InboxMessage'

import useFetchCompanyAdmin from './hooks/useFetchCompanyAdmin'


export default function CompanyAdminPage(){
    const links = [
        {link:'/', title:'Главная'},
        {link:'#', title:'Панель управления', isActive:true},
    ];    


    const {
        user,
        orders,
        company,
        notifications,
    } = useFetchCompanyAdmin();


    const navigate = useNavigate();    

    const hdlNewOrder = (e)=>{
        e.preventDefault();
        navigate(`/cp/company/${company ? company.id : ''}/order-new`);       
    }

    const hdlOpenOrder = (e, orderId)=>{
        e.preventDefault();
        navigate(`/cp/company/${company ? company.id : ''}/order-edit/${orderId}`);
    }        


    return (
        <>
        <section className="container is-max-desktop desktop-only">
        <div className="section">
            <Breadcrumb links={links}/>
        </div>
        </section>

        <section className="container">
            <div className="section mt-0">
                <div className="banner is-primary">
                    <div className="banner-body">
                        <h1 className='sub-title is-size-5-mobile mb-0'>Добро, пожаловать <nobr>{ user && user.name }!</nobr></h1>     
                    </div>                     
                </div>
            </div>
        </section>    


        <section className="container">
            <div className="section">
                <article>
                    <div className="columns">
                        <div className="column is-6">
                            
                            <div className="block">
                            <h2 className="is-size-5-mobile">Информация</h2> 
                            <Link to="/cp/company/info">
                            <button className="button is-fluid is-medium is-regular-mobile is-link mb-3">
                                <span>О компании</span>
                                <span className="icon"><i className="fa fa-angle-right"></i></span>
                            </button>                                                            
                            </Link>
                                                        
                            <Link to="/cp/company/card">
                            <button className="button  is-fluid is-medium is-regular-mobile is-link ">
                                <span>Реквизиты</span>    
                                <span className="icon"><i className="fa fa-angle-right"></i></span>
                            </button>
                            </Link>
                            </div>

                            <div className="block">                            
                            <h2 className="is-size-5-mobile">Заказы</h2> 
                            {
                                orders && orders.length > 0 && orders.map((order)=>{
                                    return  (
                                    <button key={order.id} className="button is-fluid is-medium is-regular-mobile is-primary is-left mb-3"
                                    onClick={(e)=>hdlOpenOrder(e, order.id)}
                                    >
                                        <span>{order.title}</span>
                                    </button>
                                    )
                                })
                            }
                            </div>

                            {
                                company && (
                                <div className="block">
                                    <a href="#" onClick={(e)=>hdlNewOrder(e)}>
                                    <button className="button is-fluid is-medium is-regular-mobile is-white">
                                        <span>Создать новый</span>
                                        <span className="icon"><i className="fa fa-angle-right"></i></span>
                                    </button>
                                    </a>
                                </div>
                                )
                            }

                            <div className="block">
                            <h2 className="is-size-5-mobile">Статистика</h2> 
                            <p className="subtitle is-size-7 m-0">Дата регистрации</p>
                            <p className="is-size-7">{company ? formatDate(company.createdAt) : '-'}</p>
                            </div>

                        </div>
                        <div className="column is-6">
                            <h2 className="is-size-5-mobile">Сообщения</h2>                             
                            <div className="inbox-messages" id="inbox-messages">
                                {
                                    notifications.length > 0 ? notifications.map((msg)=>{
                                        return (
                                            <InboxMessage key={msg.id} messageData={msg} />
                                        )
                                    }):(
                                        <p className="block has-text-centered">Сообщений нет</p>
                                    )
                                }                                                                                                                      
                            </div> 
                            
                        </div>
                    </div>        
                </article>
            </div>
        </section>    

        </>
    )
}