import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb'
import Field from '../../components/Field'
import OrderEditForm from '../../components/OrderEditForm'
import ErrorMessage from '../../components/ErrorMessage';
import useFetchOrder from './hooks/useFetchOrder'
import { useState } from 'react';

export default function OrderEditPage(){
    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/company', title:'Панель управления'},            
        {link:'#', title:'Добавление заказа', isActive:true},
    ];

    const { companyId } = useParams();
    const [errorMessage, setErrorMessage] = useState(null);    

    const {
        order,
        cats,
        setCats,
        title,
        setTitle,        
        description,
        setDescription,
        tags,
        setTags,        
        files,
        setFiles,        
        hdlSaveUser,        
    } = useFetchOrder({ orderId:null, companyId, errorMessage, setErrorMessage});


    const options = {
                    title, 
                    setTitle,
                    description,
                    setDescription,
                    cats,
                    setCats,
                    tags,
                    setTags,
                };

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
                
                <OrderEditForm options={options} />
                
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
                    <button className="button is-primary is-medium is-regular-mobile" onClick={(e)=>hdlSaveUser(e)}>Сохранить</button>
                </div>
            </section>


            {
                errorMessage && (
                    <ErrorMessage message={errorMessage} />
                )
            }                    
   

            </article>

        </>
    )
}