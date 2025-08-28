import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';
import {formatDate} from '../../utils/dateUtilits';

import Breadcrumb from '../../components/Breadcrumb'
import InboxMessage from '../../components/InboxMessage'


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


    const inboxMessages = [
        {
            id:'inbox-message-1',
            title:'Заполните общую информацию о компании',
            readAt:'',
            createdAt:'20-07-2025 22:10',
            links:[
                {name:'ok', url:''},
            ],
            receiver:'id-user-1'
        },
        {
            id:'inbox-message-2',
            title:'Заполните реквизиты компании',
            readAt:'20-07-2025 22:20',
            createdAt:'20-07-2025 22:20',
            links:[
                {name:'ok', url:''},
            ],
            receiver:'id-user-1'
        },
        {
            id:'inbox-message-3',
            title:'Дизайнер Евгений откликнулся на заказ',
            readAt:'',
            createdAt:'20-07-2025 22:20',
            links:[
                {name:'утвердить как исполнителя', url:'/new-contractor/123', bright:true},
                {name:'заказ', url:'/orders/123'},
                {name:'дизайнер', url:'/designers/123'},
            ],
            receiver:'id-user-1'
        }              
                
    ];

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
                                companyId && (
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
                            <p className="is-size-7">{regDate}</p>
                            </div>

                        </div>
                        <div className="column is-6">
                            <h2 className="is-size-5-mobile">Сообщения</h2>                             
                            <div className="inbox-messages" id="inbox-messages">
                                {
                                    inboxMessages.length > 0 &&  inboxMessages.map((msg)=>{
                                        return (
                                            <InboxMessage key={msg.id} messageData={msg} />
                                        )
                                    })
                                }                                                                                                                      
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