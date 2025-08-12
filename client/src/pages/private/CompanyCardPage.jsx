import { Link, NavLink, useLocation } from 'react-router-dom';

import styles from '../../pages/private/CompanyCardPage.module.css'
import Breadcrumb from '../../components/Breadcrumb';

export default function CompanyCardPage(){
    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/company', title:'Панель управления'},
        {link:'#', title:'Карточка компании', isActive:true},
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

            <div className="section">
                
                <div className="level mb-5">
                    <div className="level-item">
                        <h2 className="is-size-3 is-size-4-mobile mb-0 mb-1-mobile">Карточка компании</h2>
                    </div>
                    <div className="level-item is-right">
                        <Link to="/cp/company/card/edit">
                        <button className="button is-primary is-small-mobile">
                            <span><i className="fa-regular fa-pen-to-square"></i></span>
                            <span>Редактировать</span>
                        </button>
                        </Link>
                    </div>
                </div>

                <div className="box">
                    <h3 className="title">Общая информация</h3>
                    
                    <div className={styles.info}>
                    <p className="subtitle is-size-7">Полное наименование</p>
                    <p>Общество с ограниченной ответственностью "ТехноПромСервис"</p>

                    <p className="subtitle is-size-7">Краткое наименование</p>                        
                    <p >ООО "ТПС"</p>
                    
                    <p className="subtitle is-size-7">Полный юридический адрес</p>
                    <p>123456, г. Москва, ул. Ленина, д. 45, оф. 301</p>

                    {/* <p className="subtitle is-size-7">Фактический адрес, если он отличается от юридического</p>                        
                    <p>–</p> */}

                    <p className="subtitle is-size-7">Номера телефонов с указанием кода города</p>
                    <p>+7 (495) 123-45-67, +7 (495) 123-45-68</p>

                    <p className="subtitle is-size-7">Ссылка на официальный сайт</p>
                    <p><a href="#">www.tps.ru</a></p>                        

                    {/* <p className="subtitle is-size-7">Ссылка на VK (ВКонтакте) канал компании</p>
                    <p>–</p>                         */}

                    <p className="subtitle is-size-7">Адрес электронной почты</p>
                    <p><a href="mailto:info@tps.ru">info@tps.ru</a></p>

                    </div>  
                </div>

            </div>
                
            <div className="section">
                <div className={styles.info2}>
                    <div className="box">
                        <h3 className="title">Банковские реквизиты</h3>
                        <div className={styles.info}>
                        <p className="subtitle is-size-7">Наименование банка:</p><p>ПАО "Сбербанк России"</p>
                        <p className="subtitle is-size-7">Р/с:</p><p>40702810500000012345</p>
                        <p className="subtitle is-size-7">К/с:</p><p>30101810400000000225</p>
                        <p className="subtitle is-size-7">БИК:</p><p>044525225</p>                                                    
                        </div>                            
                    </div>
                    <div className="box">
                        <h3 className="title">Идентификационные коды:</h3>
                        <div className={styles.info}>
                        <p className="subtitle is-size-7">ИНН:</p><p>7701234567</p>
                        <p className="subtitle is-size-7">КПП:</p><p>770101001</p>
                        <p className="subtitle is-size-7">ОГРН:</p><p>1123456789012</p>
                        <p className="subtitle is-size-7">ОКПО:</p><p>12345678</p>                                                    
                        </div>
                    </div>                            
                </div>                   
            </div>         

            <div className="section">
                <div className="box">
                    <h3 className="title">Контактное лицо</h3>
                    <div className={styles.info}>
                        <p className="subtitle is-size-7">ФИО</p>                      
                        <p>Иванов Иван</p>
                        <p className="subtitle is-size-7">Должность</p>
                        <p>Менеджер</p>
                        <p className="subtitle is-size-7">Телефон</p>
                        <p>+7 (924) 456-45-67</p>
                        <p className="subtitle is-size-7">Еmail</p>                    
                        <p><a href="mailto:ivanov.i@mail.ru">ivanov.i@mail.ru</a></p>
                    </div>                            
                </div>
            </div> 
                                                                                    
        </section>

        <section className="container">                
            <div className="section">

                <h2>Связаться</h2>
                <div className="level is-3 is-2-mobile">                        
                    
                    <div className="level-item ">
                        <button className="button is-small is-link is-inverted">
                        <span><i className="fa-regular fa-at"></i></span>
                        <span>Написать сообщение</span>
                        </button>
                    </div>
                    
                </div>                                        
            </div>
        </section>            
        </article>
        
        </>
    )
}