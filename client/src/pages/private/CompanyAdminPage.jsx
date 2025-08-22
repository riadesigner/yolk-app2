import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';
import {formatDate} from '../../utils/dateUtilits';

import Breadcrumb from '../../components/Breadcrumb'

export default function CompanyAdminPage(){
    const links = [
        {link:'/', title:'Главная'},
        {link:'#', title:'Панель управления', isActive:true},
    ];    

    const [user, setUser] = useState(null);
    const [companyId, setCompanyId] = useState(null);
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();    

    const [regDate, setRegDate] = useState('-');

    const hdlNewOrder = (e)=>{
        e.preventDefault();
        navigate(`/cp/company/${companyId}/order-new`);       
    }

    const hdlOpenOrder = (e, orderId)=>{
        e.preventDefault();
        navigate(`/cp/company/${companyId}/order-edit/${orderId}`);
    }        

    useEffect(() => {

        const fetchUser = async () => {         
            try {
                const response = await api.get('/user');

                if(response.data.success){    
                    const newUser =  response.data.user;
                    setUser(newUser);                    
                    setRegDate(formatDate(newUser.createdAt))                    
                    const newCompanyId = newUser.userCompany;
                    setCompanyId(newCompanyId)

                    console.log('companyId', newCompanyId);

                    const responseOrders = await api.get(`/orders/by-company/${newCompanyId}`);
                    if(responseOrders.data.success){                        
                        setOrders(responseOrders.data.orders);
                    }
                }
                
            } catch (err) {
                console.error('Ошибка загрузки профиля', err);
                // navigate('/login');
                navigate('/');
            }
        };
        
        fetchUser();
    }, []);

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
                            <h2 className="is-size-5-mobile">Информация</h2> 
                            <div className="block">
                            <Link to="/cp/company/info">
                            <button className="button is-fluid is-medium is-regular-mobile is-link ">
                                <span>О компании</span>
                                <span className="icon"><i className="fa fa-angle-right"></i></span>
                            </button>                                                            
                            </Link>
                            </div> 
                            <div className="block mb-6 mb-5-mobile">
                            <Link to="/cp/company/card">
                            <button className="button  is-fluid is-medium is-regular-mobile is-link ">
                                <span>Реквизиты</span>    
                                <span className="icon"><i className="fa fa-angle-right"></i></span>
                            </button>
                            </Link>
                            </div>

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

                            {
                                companyId && (
                                <div className="block mb-6 mb-5-mobile">
                                    <a href="#" onClick={(e)=>hdlNewOrder(e)}>
                                    <button className="button is-fluid is-medium is-regular-mobile is-white">
                                        <span>Создать новый</span>
                                        <span className="icon"><i className="fa fa-angle-right"></i></span>
                                    </button>
                                    </a>
                                </div>
                                )
                            }

                            <h2 className="is-size-5-mobile">Статистика</h2> 

                            <p className="subtitle is-size-7 m-0">Дата регистрации</p>
                            <p className="is-size-7">{regDate}</p>

                        </div>
                        <div className="column is-6">
                            <h2 className="is-size-5-mobile">Новые сообщения</h2> 
                            <div className="inbox-messages" id="inbox-messages">
                                <a href="#">
                                <div className="inbox-message is-active" id="1">
                                    <div><i className="fa-regular fa-bell"></i></div>
                                    <h3>Заполните общую информацию о компании</h3>
                                    <small>23 Июля 2025</small>
                                    <span><i className="fa-solid fa-arrow-right"></i></span>
                                </div>
                                </a>
                                <a href="#">
                                <div className="inbox-message" id="1">
                                    <div><i className="fa-regular fa-bell"></i></div>
                                    <h3>Заполните реквизиты компании</h3>
                                    <small>23 Июля 2025</small>
                                    <span><i className="fa-solid fa-arrow-right"></i></span>
                                </div>                                
                                </a>
                                <a href="#">
                                <div className="inbox-message" id="1">
                                    <div><i className="fa-regular fa-bell"></i></div>
                                    <h3>Добавьте новый заказ</h3>
                                    <small>23 Июля 2025</small>                                    
                                    <span><i className="fa-solid fa-arrow-right"></i></span>
                                </div>   
                                </a>
                                <a href="#">
                                <div className="inbox-message" id="1">
                                    <div><i className="fa-regular fa-bell"></i></div>
                                    <h3>У вас есть 1 непрочтенное сообщение в чате заказа  №1231242345</h3>
                                    <small>23 Июля 2025</small>
                                    <span><i className="fa-solid fa-arrow-right"></i></span>
                                </div> 
                                </a>                                                                                               
                            </div> 
                            <p className="block has-text-centered"><a href="#">еще сообщения</a></p>
                        </div>
                    </div>        
                </article>
            </div>
        </section>    

        </>
    )
}