import { Link, NavLink, useLocation } from 'react-router-dom';

import styles from '../../pages/private/CompanyInfoEditPage.module.css'
import Field from '../../components/Field'

import Breadcrumb from '../../components/Breadcrumb';

const logoImage = '/company-logo.jpg'; 
const noimage = '/no-image.jpg'; 

export default function CompanyInfoEditPage(){
    
    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/company', title:'Панель управления'},
        {link:'/cp/company/info', title:'О компании'},        
        {link:'#', title:'Редактирование', isActive:true},
    ];
    const images = [];
    
 return(
    <>
        <section className="container is-max-desktop desktop-only">
        <div className="section">
            <Breadcrumb links={links}/>
        </div>
        </section>    
        <section className="container">
            <div className="section mt-0">
            
            <h2 className="is-size-3 is-size-4-mobile mb-5">О компании</h2>

            <article>                

            <div className="block mb-6">
                <div className={styles.info3}>
                    <div className="box">    
                        <div className={styles.logoBox}>
                        
                        <img className="is-max-4-mobile" src={logoImage} style={{
                            width:'70%',
                            borderRadius:'10px',
                            objectFit:'cover',
                        }} alt="" />
                        
                        <button className="button is-link is-small-mobile" >Заменить лого</button>                           
                        
                        </div>
                    </div>
                    <div className="userFio box">
                        <Field label="Название компании" />
                        <Field label="Город" />                        
                    </div>
                </div> 
            </div>
            <div className="block mb-6">
                <h2 className="subtitle is-size-7"><strong>Краткая информация</strong></h2>                
                <div className="box">
                    <Field label="Специализация" sublabel="(до 100 символов)" />                    
                    <Field label="Кто мы" sublabel="(до 1500 символов)" type="textarea"/>                    
                </div>               
            </div>                
                     
            <div className="block mb-6">
                <h2 className="subtitle is-size-7"><strong>Галерея изображений</strong></h2>
                <div className={styles.gallery}>
                    
                    {
                        images.length>0 && images.map((image, index) => (
                            <div className="box">
                            <img src={image} alt="" style={{
                                width:'100%',
                                height:'130px',                            
                                objectFit:'cover',
                                borderRadius:'10px',
                            }}/>
                            </div>
                        ))
                    }
                    
                    <div className="box" style={{
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                    }}>
                        <button className='button'>Добавить изображение</button>
                    </div>                    
                </div>
            </div>       

            <div className="block has-text-right">                
                <button className="button is-primary is-medium is-regular-mobile">Сохранить</button>                            
            </div>

            </article>            
            </div>
        </section>            
    </>
 )
}