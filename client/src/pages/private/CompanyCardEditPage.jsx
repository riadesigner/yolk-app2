import { Link, NavLink, useLocation } from 'react-router-dom';

import styles from '../../pages/private/CompanyCardEditPage.module.css'
import Field from '../../components/Field'

import Breadcrumb from '../../components/Breadcrumb';

// const logoImage = '/company-logo.jpg'; 


export default function CompanyCardEditPage(){
    
    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/company', title:'Панель управления'},
        {link:'/cp/company/card', title:'Карточка компании'},        
        {link:'#', title:'Редактирование', isActive:true},
    ];
    
 return(
    <>
        <section className="container is-max-desktop desktop-only">
        <div className="section">
            <Breadcrumb links={links}/>
        </div>
        </section>  

        <article>
        <section className="container">   

            <div className="section">
                
                <div className="level mb-5">
                    <div className="level-item">
                        <h2 className="is-size-3 is-size-4-mobile mb-0 mb-1-mobile">Карточка компании</h2>
                    </div>
                </div>

                <div className="box">
                    <h3 className="title">Общая информация</h3>
                    
                    <div className={styles.info}>
                    <p className="subtitle is-size-7">Полное наименование</p>
                    <Field />

                    <p className="subtitle is-size-7">Краткое наименование</p>                        
                    <Field />
                    
                    <p className="subtitle is-size-7">Юридический адрес</p>
                    <Field />

                    <p className="subtitle is-size-7">Фактический адрес (если отличается)</p>
                    <Field />                    

                    <p className="subtitle is-size-7">Номера телефонов с указанием кода города</p>
                    <Field />

                    <p className="subtitle is-size-7">Ссылка на официальный сайт</p>
                    <Field />

                    <p className="subtitle is-size-7">Адрес электронной почты</p>
                    <Field />

                    </div>  
                </div>

            </div>
                
            <div className="section">
                <div className={styles.info2}>
                    <div className="box">
                        <h3 className="title">Банковские реквизиты</h3>
                        <div className={styles.info}>
                        <p className="subtitle is-size-7">Наименование банка:</p><Field />
                        <p className="subtitle is-size-7">Р/с:</p><Field placeHolder="20 симолов"/>
                        <p className="subtitle is-size-7">К/с:</p><Field placeHolder="20 симолов"/>
                        <p className="subtitle is-size-7">БИК:</p><Field placeHolder="9 симолов"/>
                        </div>                            
                    </div>
                    <div className="box">
                        <h3 className="title">Идентификационные коды:</h3>
                        <div className={styles.info}>
                        <p className="subtitle is-size-7">ИНН:</p><Field placeHolder="10 симолов"/>
                        <p className="subtitle is-size-7">КПП:</p><Field placeHolder="9 симолов"/>
                        <p className="subtitle is-size-7">ОГРН:</p><Field placeHolder="13 симолов"/>
                        <p className="subtitle is-size-7">ОКПО:</p><Field placeHolder="8 симолов"/>
                        </div>
                    </div>                            
                </div>                   
            </div>         

            <div className="section">
                <div className="box">
                    <h3 className="title">Контактное лицо</h3>
                    <div className={styles.info}>
                        <p className="subtitle is-size-7">ФИО</p>                      
                         <Field />
                        <p className="subtitle is-size-7">Должность</p>
                        <Field />
                        <p className="subtitle is-size-7">Телефон</p>
                        <Field />
                        <p className="subtitle is-size-7">Еmail</p>                    
                        <Field />
                    </div>                            
                </div>
            </div> 
                                                                                    
        </section>

        <section className="container">                
            <div className="section">

            <div className="block has-text-right">                
                <button className="button is-primary is-medium is-regular-mobile">Сохранить</button>                            
            </div>  

            </div>
        </section>            
        </article>

    </>
 )
}