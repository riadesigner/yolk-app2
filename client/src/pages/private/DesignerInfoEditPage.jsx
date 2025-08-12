import { Link, NavLink, useLocation } from 'react-router-dom';

import styles from '../../pages/private/DesignerInfoEditPage.module.css'
import Field from '../../components/Field'

import userPhoto from '/no-image.jpg';
import Breadcrumb from '../../components/Breadcrumb';

export default function DesignerEditInfoPage(){
    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/designer', title:'Панель управления'},
        {link:'/cp/designer/info', title:'Анкета'},
        {link:'#', title:'Редактирование', isActive:true},
    ];        

    return (
        <>
        <section className="container is-max-desktop desktop-only">
        <div className="section">
            <Breadcrumb links={links}/>
        </div>
        </section>

        <article> 
        <section className="container">
            <div className="section mt-0">
            <h2 className="is-size-3 is-size-4-mobile mb-5">Анкета</h2>

            <div className="block mb-6">
                <div className={styles.info}>
                    <div className="box">    
                        <div className={styles.userPhotoBox}>
                        
                        <img className="is-max-4-mobile" src={userPhoto} style={{
                            width:'70%',
                            borderRadius:'10px',
                            objectFit:'cover',
                        }} alt="" />
                        
                        <button className="button is-link is-small-mobile" >Заменить</button>                           
                        
                        </div>
                    </div>
                    <div className="userFio box">
                        <Field label="Фамилия" />
                        <Field label="Имя" />
                        <Field label="Отчество" />                    
                    </div>
                    <div className="box">
                        <Field label="День рождения" />                        
                    </div>
                </div> 
            </div>
                
            <div className="block mb-6">
                <h2 className="subtitle is-size-7"><strong>Образование</strong></h2>
                <div className={styles.schools}>
                    <div className="school box">
                        <Field label="Институт / Университет" />
                        <Field label="Специальность" />
                        <Field label="Год окончания" />
                        <Field label="Город" />                    
                    </div>
                    <div className={styles.addSchoolBox}>
                        <button className="button is-link is-inverted is-small-mobile">Добавить еще</button>
                    </div>                
                </div>
            </div>                

            <div className="block mb-6">
                <h2 className="subtitle is-size-7"><strong>Контакты</strong></h2>
                <div className={styles.info2}>
                    <div className="box">
                        <Field label="Почта" />
                    </div>
                    <div className="box">                        
                        <Field label="Телефон" />            
                    </div>                    
                </div>
            </div>                      

            <div className="block mb-6">
                <h2 className="subtitle is-size-7"><strong>Навыки</strong></h2>
                <div className={styles.info2}>
                    <div className="box">
                        <p className="title is-size-5 mb-0">Soft skills</p>
                        <div className="columns is-1">
                            <div className="column is-9"><Field placeHolder="Коммуникабельность" /></div>
                            <div className="column is-3"><Field placeHolder="100" /></div>
                        </div>
                        <button className="button is-link is-small">Добавить качество</button>
                    </div>
                    <div className="box">                        
                        <p className="title is-size-5 mb-0">Hard skills</p>
                        <div className="columns is-1">
                            <div className="column is-9"><Field placeHolder="UI/UX" /></div>
                            <div className="column is-3"><Field placeHolder="100" /></div>
                        </div>
                        <button className="button is-link is-small">Добавить навык</button>
                    </div>                    
                </div>
            </div>        

            <div className="block has-text-right">                
                <button className="button is-primary is-medium is-regular-mobile">Сохранить</button>                            
            </div>                                

                        
            </div>
        </section>  
        </article>  

        </>
    )
}