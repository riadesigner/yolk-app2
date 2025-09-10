import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Field from '../../components/Field';
import ErrorMessage from '../../components/ErrorMessage';
import Breadcrumb from '../../components/Breadcrumb';

import useFetchDesignerPortfolioAdd from './hooks/useFetchDesignerPortfolioAdd'


export default function DesignerPortfolioAddPage(){
    
    const [errorMessage, setErrorMessage] = useState('');

    const {
        portfolioItem,
        title, 
        setTitle,
        description, 
        setDescription,
        hdlSavePortfolio,
    } = useFetchDesignerPortfolioAdd(setErrorMessage)

    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/designer', title:'Панель управления'},            
        {link:'/cp/designer/portfolio', title:'Портфолио'},
        {link:'#', title:'Добавление проекта', isActive:true},
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
            <div className="section ">

            <div className="level mb-5">
                <div className="level-item">
                    <h2 className="mb-0 is-size-3">Добавление проекта в портфолио</h2>
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

            <div className="block mb-6">
                <p>После сохранения описания, вы сможете добавить изображения.</p>
            </div>         

            <div className="block has-text-right">                
                <button className="button is-primary is-medium is-regular-mobile" onClick={(val)=>hdlSavePortfolio(val)}>Сохранить</button>                            
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