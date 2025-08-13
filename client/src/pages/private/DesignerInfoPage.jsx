import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';

import Progressbar from '../../components/ProgressBar';
import Portfolio from '../../components/Portfolio';

const noPhoto = '/no-image.jpg'; 

export default function DesignerInfoPage(){


    const [user, setUser] = useState(null);
    const [userAge, setUserAge] = useState(null);
    const [avatar, setAvatar] = useState(noPhoto);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {

        console.log('Auth status changed:', isAuthenticated);

        const fetchUser = async () => {          
            try {
                const response = await api.get('/user-with-info');
                console.log('response', response);
                
                if(response.data.success){
                    const user = response.data.user;
                    setUser(user);  
                    setAvatar(user.avatar);                              
                }

            } catch (err) {
                console.error('Ошибка загрузки анкеты', err);
                navigate('/login');
            }
        };
        
        fetchUser();
    }, []);

    return (
        <>
        <section className="container is-max-desktop desktop-only">
        <div className="section">
            <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><NavLink to="/">Главная</NavLink></li>
                <li ><NavLink to="/cp/designer">Панель управления</NavLink></li>
                <li className="is-active"><a href="#">Анкета</a></li>
            </ul>
            </nav>
        </div>
        </section>
            <article>
            <section className="container">            
                <div className="section ">
                <div className="level mb-5">
                    <div className="level-item">
                        <h2 className="mb-0 is-size-3">Анкета</h2>
                    </div>
                    <div className="level-item is-right">
                        <Link to="/cp/designer/info/edit">
                        <button className="button is-primary is-small-mobile">
                            <span><i className="fa-regular fa-pen-to-square"></i></span>
                            <span>Редактировать</span>
                        </button>
                        </Link>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-3">
                        <img src={avatar} alt="" 
                        className="is-max-3-mobile"
                            style={{
                            width:'80%', 
                            borderRadius:'8px'                            
                            }}/>                             
                    </div>
                    <div className="column is-9">
                        <h1 className="title is-size-3 mb-2">{user && user.name}&nbsp;</h1>
                        <p className="">Дизайнер{userAge && (<>, {userAge}</>)}</p>
                        <p className="is-size-7 mb-0 subtitle"><strong>Образование</strong></p>
                        <p className="mt-1 " style={{lineHeight:1.4}}>Высшее, ФБОУ ВО Владивостокский Государственный Университет, 2021</p>
                        <p className="is-size-7 mb-0 subtitle"><strong>Специальность</strong></p>
                        <p className="mt-1" style={{lineHeight:1.4}}>Дизайнер</p>
                        <p className="is-size-7 mb-2 is-primary"><strong>Статистика</strong></p>
                        <div className="is-size-7">
                            <span style={{marginRight:'10px'}} className="is-primary"><i className="fa-regular fa-face-smile"></i></span>
                            <span>Завершенных заказов: 0</span>
                        </div>
                    </div>
                </div>     
                </div>
            </section>    
            
            <section className="container">                
                <div className="section">
                    <h2>Портфолио</h2>
                    <Portfolio />
                </div>
            </section>

            <section className="container">                
                <div className="section">
                    <h2>Навыки</h2>

                    <div className="block">
                        <div className="columns ">
                            <div className="column is-5">
                                <h2 className="is-size-6 subtitle">Soft skills</h2>
                                <Progressbar title="Коммуникабельность" value="90" />
                                <Progressbar title="Ответственность" value="100" />
                                <Progressbar title="Внимательность" value="80" />                                
                            </div>                            
                            <div className="column is-5">
                                <h2 className="is-size-6 subtitle">Hard skills</h2>
                                <div className="block">
                                <Progressbar title="Дизайн графический" value="90" />
                                <Progressbar title="UI/UX" value="100" />
                                <Progressbar title="Веб-программирование" value="60" />    
                                </div>
                            </div>
                            <div className="column  desktop-only"></div>                            
                        </div>
                    </div>
                </div>
            </section>

            <section className="container">                
                <div className="section">

                    <h2>Контакты</h2>
                    <div className="level is-3 is-2-mobile">                        
                        
                        <div className="level-item ">
                            <button className="button is-small is-link is-inverted">
                            <span><i className="fa-regular fa-at"></i></span>
                            <span>asya.pri</span>
                            </button>
                        </div>
                        

                        
                        <div className="level-item ">
                            <button className="button is-small is-link is-inverted">
                            <span><i className="fa-regular fa-envelope"></i></span>
                            <span>p.asya.p@yandex.ru</span>
                            </button>
                        </div>
                        
                        
                        
                        <div className="level-item ">
                            <button className="button is-small is-link is-inverted">
                            <span><i className="fa-regular fa-face-smile"></i></span>
                            <span>+7 (914) 530-31-36</span>
                            </button>
                        </div>
                        
                    </div>                                        
                </div>
            </section>            

        </article>
        </>
    )
}