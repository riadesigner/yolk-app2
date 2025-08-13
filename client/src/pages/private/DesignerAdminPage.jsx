import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';

import Breadcrumb from '../../components/Breadcrumb'

export default function DesignerAdminPage(){
    const links = [
        {link:'/', title:'Главная'},
        {link:'#', title:'Панель управления', isActive:true},
    ];

    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {

        console.log('Auth status changed:', isAuthenticated);

        const fetchUser = async () => {         
            try {
                const response = await api.get('/user');

                if(response.data.success){                    
                    setUser(response.data.user);
                }
                
            } catch (err) {
                console.error('Ошибка загрузки профиля', err);
                navigate('/login');
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

                            <h2 className="is-size-5-mobile">Резюме</h2> 
                            <div className="block">
                            <Link to="/cp/designer/info">
                            <button className="button is-fluid is-medium is-regular-mobile  is-link ">
                                <span>Анкета</span>
                                <span className="icon"><i className="fa fa-angle-right"></i></span>
                            </button>                                                            
                            </Link>
                            </div> 
                            <div className="block mb-6 mb-5-mobile">
                            <Link to="/designers/123/portfolio">
                            <button className="button  is-fluid is-medium is-regular-mobile is-link ">
                                <span>Портфолио</span>    
                                <span className="icon"><i className="fa fa-angle-right"></i></span>
                            </button>
                            </Link>
                            </div>
                            
                            <h2 className="is-size-5-mobile">Заказы</h2> 
                            <div className="block mb-6 mb-5-mobile">
                            <button className="button disabled is-fluid is-medium is-regular-mobile is-white">
                                <span>Мои заказы</span>
                                <span className="icon"><i className="fa fa-angle-right"></i></span>
                            </button>              
                            </div>          
                            <h2 className="is-size-5-mobile">Мой статус</h2> 
                            <div className="block mb-6 mb-5-mobile">
                                <div className="stars-block">
                                    <div className="stars-block-label">Новенький</div>
                                    <div className="stars-block-items">
                                        <span className="is-active"></span><span></span><span></span><span></span><span></span>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div className="column is-6">
                            <h2 className="is-size-5-mobile">Новые сообщения</h2> 
                            <div className="inbox-messages" id="inbox-messages">
                                <a href="#">
                                <div className="inbox-message is-active" id="1">
                                    <div><i className="fa-regular fa-bell"></i></div>
                                    <h3>Заполни свой профиль полностью и получи 10 баллов!</h3>
                                    <small>23 Июля 2025</small>
                                    <span><i className="fa-solid fa-arrow-right"></i></span>
                                </div>
                                </a>
                                <a href="#">
                                <div className="inbox-message" id="1">
                                    <div><i className="fa-regular fa-bell"></i></div>
                                    <h3>Вы выбраны в качестве исполнителя в заказе “Заказ №120931801”</h3>
                                    <small>23 Июля 2025</small>
                                    <span><i className="fa-solid fa-arrow-right"></i></span>
                                </div>                                
                                </a>
                                <a href="#">
                                <div className="inbox-message" id="1">
                                    <div><i className="fa-regular fa-bell"></i></div>
                                    <h3>У вас есть 3 непрочтенных сообщения в чате с менеджером YOLK</h3>
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