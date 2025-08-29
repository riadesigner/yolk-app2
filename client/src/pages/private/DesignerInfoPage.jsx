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
    const [schools, setSchools] = useState([]);
    const [specialization, setSpecialization] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        const fetchUser = async () => {          
            try {
                const response = await api.get('/users/me');
                console.log('response', response);
                
                if(response.data.success){
                    const user = response.data.user;
                    setUser(user);  
                    setAvatar(user.avatar);
                    setSchools(user.userInfo.schools);
                    setSpecialization(user.userInfo.specialization)
                }

            } catch (err) {
                console.error('Ошибка загрузки анкеты', err);
                // navigate('/login');
                navigate('/');
            }
        };
        
        fetchUser();
    }, []);

    // Высшее, ФБОУ ВО Владивостокский Государственный Университет, 2021
    
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
                        <p className="mt-1 " style={{lineHeight:1.4}}>{
                            (schools && schools.length > 0 && schools[0].title ) ? (
                                schools.map((s)=>{
                                    return (
                                        <><span key={s.id}>{s.title} ({s.speciality}), {s.year}, {s.city}</span><br /></>
                                    ) 
                                })
                            ) : (
                                <>Не указано</>
                            )
                        }</p>
                        <p className="is-size-7 mb-0 subtitle"><strong>Специализация</strong></p>
                        <p className="mt-1" style={{lineHeight:1.4}}>{
                            specialization ? (
                                <>{specialization}</>
                            ):(
                                <>Не указано</>
                            )
                            }</p>
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
                                { (user?.userInfo?.softSkills 
                                    && user.userInfo.softSkills.length > 0
                                    && user.userInfo.softSkills[0].title !=='') ? (
                                    user.userInfo.softSkills.map((s)=>{                                        
                                        return (                                            
                                            <Progressbar title={s.title} value={s.percent} />
                                        )
                                    })
                                ):(
                                    <>Не указано</>
                                )}
                            </div>                            
                            <div className="column is-5">
                                <h2 className="is-size-6 subtitle">Hard skills</h2>
                                <div className="block">
                                { (user?.userInfo?.hardSkills 
                                    && user.userInfo.hardSkills.length > 0 
                                    && user.userInfo.hardSkills[0].title!=='' ) ? (
                                    user.userInfo.hardSkills.map((s)=>{                                        
                                        return (                                            
                                            <Progressbar title={s.title} value={s.percent} />
                                        )
                                    })
                                ):(
                                    <>Не указано</>
                                )}   
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
                        
                        { user?.name && (
                            <div className="level-item ">
                                <button className="button is-small is-link is-inverted">
                                <span><i className="fa-regular fa-at"></i></span>
                                <span>{user.name}</span>
                                </button>
                            </div>
                        )}
                        
                        { user?.email && (
                            <div className="level-item ">
                                <button className="button is-small is-link is-inverted">
                                <span><i className="fa-regular fa-envelope"></i></span>
                                <span>{user?.email}</span>
                                </button>
                            </div>
                        )}
                        
                        { user?.userInfo?.phone && (
                            <div className="level-item ">
                                <button className="button is-small is-link is-inverted">
                                <span><i className="fa-regular fa-face-smile"></i></span>
                                <span>{user.userInfo.phone}</span>
                                </button>
                            </div>
                        )}                                                
                        
                    </div>                                        
                </div>
            </section>            

        </article>
        </>
    )
}