import { Link, NavLink, useLocation } from 'react-router-dom';

import Breadcrumb from '../../components/Breadcrumb'
import Field from '../../components/Field'

export default function OrderEditPage({companyId}){
        const links = [
            {link:'/', title:'Главная'},
            {link:'/cp/company', title:'Панель управления'},            
            {link:'#', title:'Добавление заказа', isActive:true},
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
                    <div className="section ">                    
                    <h2 className="is-size-3 is-size-4-mobile mb-5">Новый заказ</h2>
                    
                    <div className="box">                                                                        
                        <h3>Описание заказа</h3> 
                        <Field sublabel="(до 1500 символов)" type="textarea"/>                        
                        
                        <h3>Особые требования к заказу:</h3>
                        <ul>
                            <li>Соблюдение сроков </li>
                        </ul>
                        <Field placeHolder="Оригинальность"/>
                        <button className="button is-small is-link">Добавить требование</button>
                    </div>
                    
                    </div>
                </section>

                <section className="container">
                    <div className="section "> 
                        <div className="box">
                        <ul>
                            <li>Название файла 1</li>
                        </ul>                        
                        <button className="button is-small is-link">Добавить файл</button>
                        </div>
                    </div>
                </section> 
                
                <section className="container">
                    <div className="section has-text-right"> 
                        <button class="button is-primary is-medium is-regular-mobile">Сохранить</button>
                    </div>
                </section>

                </article>

            </>
        )
}