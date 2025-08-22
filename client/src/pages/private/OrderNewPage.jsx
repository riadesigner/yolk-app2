import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb'
import Field from '../../components/Field'
import ErrorMessage from '../../components/ErrorMessage';
import useFetchOrder from './hooks/useFetchOrder'
import { useState } from 'react';

export default function OrderEditPage(){
    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/company', title:'Панель управления'},            
        {link:'#', title:'Добавление заказа', isActive:true},
    ];

    const hdlCatClick = (e, catId)=>{
        e.preventDefault();
        const newCats = [...cats];
        newCats.map((cat)=>{
            if(cat.id===catId){
                return cat.selected ? cat.selected = false :  cat.selected = true;
            }else{
                return cat;
            }            
        })        
        setCats(newCats);
    }

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
        files,
        setFiles,        
        hdlSaveUser,        
    } = useFetchOrder({ orderId:null, companyId, errorMessage, setErrorMessage});

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
                    
                    <h3 >Краткое название<small>*</small></h3> 
                    <Field 
                        placeHolder="Разработать фирменный стиль для магазина одежды"
                        value={title}
                        onChange={(val) => setTitle(val)}
                        />                    
                    
                    <br />

                    <h3>Описание заказа<small>*</small></h3> 
                    <Field 
                        sublabel="(до 1500 символов)" 
                        value={description}
                        onChange={(val) => setDescription(val)}
                        type="textarea"/>
                    
                    <h3>Категории заказа:</h3> 
                    <div className="block">
                        {
                            cats && cats.length>0 && (
                                cats.map((cat)=>{
                                    return (
                                        cat.selected ? (
                                            <button key={cat.id} className="button is-small is-link mr-2 mb-2" 
                                                onClick={(e)=>hdlCatClick(e,cat.id)}>
                                                <span>{cat.name}</span>
                                                <span><i className="fa-solid fa-check"></i></span>                                            
                                            </button>
                                        ):(
                                            <button key={cat.id} className="button is-small mr-2 mb-2" 
                                                onClick={(e)=>hdlCatClick(e,cat.id)}>
                                                <span>{cat.name}</span>                                                
                                            </button>      
                                        )
                                    )
                                })
                            )
                        }
                    </div>     

                    <h3>Теги заказа:</h3>                    
                    <Field sublabel="Добавьте через запятую:"  placeHolder="реклама, верстка, полиграфия"/>
                    
                    <br />
                    <p><small>Поля со звездочкой (*) обязательные</small></p>
                    
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