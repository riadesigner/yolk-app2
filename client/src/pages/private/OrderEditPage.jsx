import { Link, NavLink, useLocation, useParams } from 'react-router-dom';

import Breadcrumb from '../../components/Breadcrumb'
import Field from '../../components/Field'
import OrderEditForm from '../../components/OrderEditForm'
import FileUploader from '../../components/FileUploader'
import ErrorMessage from '../../components/ErrorMessage';
import useFetchOrder from './hooks/useFetchOrder'
import { useState } from 'react';
import styles from './OrderEditPage.module.css'

export default function OrderEditPage(){
        const links = [
            {link:'/', title:'Главная'},
            {link:'/cp/company', title:'Панель управления'},            
            {link:'#', title:'Редактирование заказа', isActive:true},
        ];
    
    const { companyId, orderId } = useParams();
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
        price,
        setPrice,
        dateTo,
        setDateTo,        
        files,
        setFiles,        
        hdlSaveOrder,    
        hdlRemoveOrder,
        hdlRemoveOrderConfirmed,        
        showConfirmToDeleteOrder,
        setShowConfirmToDeleteOrder,
    } = useFetchOrder({ orderId, companyId, errorMessage, setErrorMessage});

    const options = {
        title,
        setTitle,
        description,
        setDescription,
        cats,
        setCats,
        tags,
        setTags,        
        price,
        setPrice,
        dateTo,
        setDateTo,
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
                <h2 className="is-size-3 is-size-4-mobile mb-5">Редактирование заказа</h2>
                
                    <OrderEditForm options={options} />
                
                </div>
            </section>

            <section className="container">
                <div className="section "> 
                    <div className={styles.files}>
                            {
                                order && !order.contractor &&
                                files.length > 0 && 
                                files.map((file, index) => (
                                    <div key={file.key || index} className="box" style={{ display:'flex', alignItems:'center', justifyContent:'center',}}>
                                        <FileUploader 
                                            orderId={order.id}
                                            setFiles={setFiles}
                                            file={file}
                                            nodelete
                                            />
                                    </div>
                                    ))                        
                            } 

                            {
                                order && !order.contractor && (
                                        <div key={files.length} className="box" style={{ display:'flex', alignItems:'center', justifyContent:'center',}}>                                
                                        <FileUploader 
                                            orderId={order.id}
                                            setFiles={setFiles}
                                            />
                                    </div>
                                )                            
                            }

                            {
                                order && order.contractor && files && files.length>0 && (
                                    <>
                                        <h2>Прикрепленные файлы: </h2>
                                        <ul>
                                            {
                                                files.map((file)=>{
                                                    <li><a href={file.url}>{file.key}</a></li>
                                                })
                                            }
                                        </ul>
                                    </>
                                )
                            }

                    </div>
                </div>
            </section> 
            

            {
                order && order.contractor && (
                    <section className="container">
                        <div className="section has-text-left"> 
                            <p>Заказу назначен исполнитель. Редактировать заказ запрещено.</p>
                        </div>
                    </section>                    
                    
                )
            }

            {
                order && !order.contractor && (
                    <section className="container">
                        <div className="section has-text-right"> 
                            <button className="button is-primary is-medium is-regular-mobile" onClick={(e)=>hdlSaveOrder(e)}>Сохранить</button>
                        </div>
                    </section>
                )
            }

            {
                errorMessage && (
                    <ErrorMessage message={errorMessage} />
                )
            }                    
   
            <hr />

            {
                order && !order.contractor && (
                    <section className="container">
                        <div className="section"> 
                            <p>Вы можете <a href="#" onClick={(e)=>hdlRemoveOrder(e)}>удалить заказ</a>, пока не назначен Исполнитель</p>
                            {
                                showConfirmToDeleteOrder && (
                                    <p>Подтвердите удаление: &nbsp;&nbsp; 
                                        <a href="#" className='is-danger' 
                                        onClick={(e)=>hdlRemoveOrderConfirmed(e)}>Удалить Заказ</a> 
                                        &nbsp;&nbsp;|&nbsp;&nbsp;  
                                        <a href="#" onClick={(e)=>{e.preventDefault();setShowConfirmToDeleteOrder(false);}}>Отмена</a></p>
                                )
                            }
                        </div>
                    </section>
                )
            }
            {
                order && order.contractor && (
                    <section className="container">
                        <div className="section"> 
                            <p>Заказу назначен исполнитель. Удалять заказ запрещено.</p>
                        </div>
                    </section>    
                )                
            }

            </article>




        </>
    )
}