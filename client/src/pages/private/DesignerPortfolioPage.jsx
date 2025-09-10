import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// import { useAuth } from '../../contexts/AuthContext';
// import api from '../../utils/api';

import AddButton from '../../components/AddButton'
import PublicPortfolioItem from '../../components/PublicPortfolioItem'
import ErrorMessage from '../../components/ErrorMessage'
import styles from '../private/DesignerPortfolioPage.module.css'
import useFetchDesignerPortfolio from './hooks/useFetchDesignerPortfolio'

export default function DesignerInfoPage(){
    
    // const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
        
    const {
        hdlAddToPortfolio,
        hdlDelete,
        portfolios,        
    } = useFetchDesignerPortfolio(setErrorMessage);
    
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
                                        <PublicPortfolioItem 
                                            key={i.id} 
                                            id={i.id}
                                            images={i.images} 
                                            title={i.title} 
                                            description={i.description} 
                                            hdlDelete={hdlDelete}
                                            forEdit
                                            />
                                    )
                                })
                            }
                            <AddButton label="Добавить проект" onClick={(val)=>hdlAddToPortfolio(val)}/>
                        </div>

                    ):(
                        <div style={{marginTop:'2vw'}}>
                            <p>Добавьте в портфолио проекты с примерами ваших работ.</p>
                            <br />
                            <AddButton label="Добавить проект" onClick={(val)=>hdlAddToPortfolio(val)}/>
                        </div>                        
                    )
                }

            {
                errorMessage && (
                    <ErrorMessage message={errorMessage} />
                )
            }

            </article>
            </div>                
        </section>
        </>
    )
}