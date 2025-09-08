import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Field from '../../components/Field';
import ImageUploader from '../../components/ImageUploader';
import styles from '../../pages/private/DesignerPortfolioEditPage.module.css'

import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';

export default function DesignerPortfolioEditPage(){

    const [user, setUser] = useState(null);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [portfolioItem, setPortfolioItem] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    
    const [gallery, setGallery] = useState([]);
    
    const hdlSaveAll = ()=>{

    }

    const navigate = useNavigate();

    // useEffect(() => {

    //     const fetchUser = async () => {          
    //         try {
    //             const response = await api.get('/users/me');
    //             console.log('response', response);
                
    //             if(response.data.success){
    //                 const user = response.data.user;
    //                 setUser(user);  

    //             }

    //         } catch (err) {
    //             console.error('Ошибка загрузки портфолио', err);
    //             navigate('/');
    //         }
    //     };
        
    //     fetchUser();
    // }, []);    
    
    return (
        <>
        <section className="container is-max-desktop desktop-only">
        <div className="section">
            <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><NavLink to="/">Главная</NavLink></li>
                <li ><NavLink to="/cp/designer">Панель управления</NavLink></li>
                <li className="is-active"><a href="#">Редактирование портфолио</a></li>
            </ul>
            </nav>
        </div>
        </section>
        <article>
        <section className="container">            
            <div className="section ">

            <div className="level mb-5">
                <div className="level-item">
                    <h2 className="mb-0 is-size-3">Редактирование портфолио</h2>
                </div>
                <div className="level-item is-right">
                    <Link to="/cp/designer/info/edit">
                    <button className="button is-link is-small">                        
                        <span className="fa-solid fa-share-from-square"><i></i></span>
                        <span>Смотреть на сайте</span>
                    </button>
                    </Link>
                </div>
            </div>

            <div className="block ">
                    <div className="box">
                        <h2>Проект</h2>  
                    <Field 
                        label="Название проекта" 
                        sublabel="(до 100 символов)" 
                        value={title} 
                        onChange={setTitle} 
                        />
                    <Field 
                        label="Краткое описание проекта" 
                        sublabel="(до 1500 символов)" 
                        type="textarea"
                        value={description}
                        onChange={setDescription}
                        /> 
                    </div>
            </div>
                       
            {
                portfolioItem && (
                    <div className="block mb-6">
                        <h2 className="subtitle is-size-7"><strong>Галерея изображений</strong></h2>
                        <div className={styles.gallery}>                                
                            {                                    
                                gallery.length > 0 && 
                                gallery.map((image, index) => (                                
                                    <div key={image.key} className="box" style={{ display:'flex', alignItems:'center', justifyContent:'center',}}>                                
                                        <ImageUploader 
                                            companyId={portfolioItem.id}
                                            setGallery={setGallery}
                                            image={image}
                                            />
                                    </div>
                                    ))                        
                            } 

                            {
                                (
                                    <div key={gallery.length} className="box" style={{ display:'flex', alignItems:'center', justifyContent:'center',}}>                                
                                    <ImageUploader 
                                        companyId={portfolioItem.id}
                                        setGallery={setGallery}                                    
                                        />
                                    </div>                        
                                )                            
                            }
                        </div>
                    </div>
                )
            }            

            <div className="block has-text-right">                
                <button className="button is-primary is-medium is-regular-mobile" onClick={hdlSaveAll}>Сохранить</button>                            
            </div>

            {
                errorMessage && (
                    <ErrorMessage message={errorMessage} />
                )
            }            

            </div>
        </section>          
        </article>
        </>
    )
}