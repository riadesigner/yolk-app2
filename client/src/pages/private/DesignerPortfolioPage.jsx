import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// import { useAuth } from '../../contexts/AuthContext';
// import api from '../../utils/api';

import AddButton from '../../components/AddButton'
import PublicPortfolioItem from '../../components/PublicPortfolioItem'
import styles from '../private/DesignerPortfolioPage.module.css'

const portfolios = [
    {
        id:'1',
        images: [], 
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nulla inventore quia aut modi laborum tenetur nihil, rerum recusandae ',
        url:''
    },
    // {
    //     id:'2',
    //     images: [], 
    //     title: 'Проект 2',
    //     url:''
    // },
    // {
    //     id:'3',
    //     images: [], 
    //     title: 'Smagnam, reprehenderit officiis corrupti veritatis',
    //     url:'',
    // }        
];

export default function DesignerInfoPage(){

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    console.log('portfolios', portfolios);

    useEffect(() => {

        // const fetchUser = async () => {          
        //     try {
        //         const response = await api.get('/users/me');
        //         console.log('response', response);
                
        //         if(response.data.success){
        //             const user = response.data.user;
        //             setUser(user);  

        //         }

        //     } catch (err) {
        //         console.error('Ошибка загрузки анкеты', err);
        //         // navigate('/login');
        //         navigate('/');
        //     }
        // };
        
        // fetchUser();
    }, []);
    
    return (
        <>
        <section className="container is-max-desktop desktop-only">
        <div className="section">
            <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><NavLink to="/">Главная</NavLink></li>
                <li ><NavLink to="/cp/designer">Панель управления</NavLink></li>
                <li className="is-active"><a href="#">Портфолио</a></li>
            </ul>
            </nav>
        </div>
        </section>

        <section className="container">            
            <div className="section ">
            <div className="level mb-5">
                <div className="level-item">
                    <h2 className="mb-0 is-size-3">Портфолио</h2>
                </div>
                <div className="level-item is-right">
                    <Link to="/designers/125476578767989899/portfolio">
                    <button className="button is-link is-small">
                        <span className="fa-solid fa-share-from-square"><i></i></span>
                        <span>Смотреть на сайте</span>
                    </button>
                    </Link>
                </div>
            </div>        
            </div>
        </section>                 
                
        <section className="container">
            <div className="section">
            <article>
                {
                    (portfolios && portfolios.length>0) ? (

                        <div className={styles.portfolios}>                        
                            {
                                portfolios.map((i)=>{
                                    return(
                                        <PublicPortfolioItem key={i.id} images={i.images} title={i.title} url={i.url} forEdit/>
                                    )
                                })
                            }
                            <AddButton label="Добавить проект"/>
                        </div>

                    ):(
                        <div style={{marginTop:'2vw'}}>
                            <p>Добавьте в портфолио проекты с примерами ваших работ.</p>
                            <br />
                            <AddButton label="Добавить проект"/>                            
                        </div>                        
                    )
                }
            </article>
            </div>                
        </section>
        </>
    )
}