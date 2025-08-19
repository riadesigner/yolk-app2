import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import styles from '../../pages/private/CompanyCardEditPage.module.css'
import Field from '../../components/Field'
import useFetchCompanyCard from './hooks/useFetchCompanyCard'

import Breadcrumb from '../../components/Breadcrumb';

// const logoImage = '/company-logo.jpg'; 


export default function CompanyCardEditPage(){
    
    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/company', title:'Панель управления'},
        {link:'/cp/company/card', title:'Карточка компании'},        
        {link:'#', title:'Редактирование', isActive:true},
    ];
    
    const [errorMessage, setErrorMessage] = useState(null);
    const [activeTab, setActiveTab] = useState('ИП');

    const {
        company,
        details,
        setDetails,
        fullName,
        setFullName,
        shortName,
        setShortName,        
        fullAddress,
        setFullAddress,
        companyPhone,
        setCompanyPhone,
        webSite,
        setWebSite,
        codeINN,
        setCodeINN,
        codeKPP,
        setCodeKPP,
        codeOGRN,
        setCodeOGRN,
        codeOKPO,
        setCodeOKPO,
        bankName,
        setBankName,
        bankRS,
        setBankRS,
        bankKS,
        setBankKS,
        bankBIK,
        setBankBIK,
        contactFIO,
        setContactFIO,
        contactPhone,
        setContactPhone,
        contactJobTitle,
        setContactJobTitle,        
        contactEmail,        
        setContactEmail,
        hdlSaveAll,     
    } = useFetchCompanyCard({errorMessage, setErrorMessage}); 


    const handleTabClick = (e, tabName) => {
        e.preventDefault()
        setActiveTab(tabName);
    }

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
            </div>
            
           
                <div className="section">              
                    <div className="box">
                        <div className="level">
                            <div className="level-item">
                                Тип юр. лица: 
                            </div>
                            <div className="level-item is-right">
                                <div className="tabs">                    
                                    <ul>
                                        <li className={activeTab === 'ООО' ? 'is-active' : ''}>
                                        <a href="#" onClick={(e) => handleTabClick(e, 'ООО')}>ООО</a>
                                        </li>
                                        <li className={activeTab === 'ИП' ? 'is-active' : ''}>
                                        <a href="#" onClick={(e) => handleTabClick(e, 'ИП')}>ИП</a>
                                        </li>
                                    </ul>
                                </div>                            
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section">
                <div className="box">
                    <h3 className="title">Общая информация</h3>
                    
                    <div className={styles.info}>
                    <p className="subtitle is-size-7">Полное наименование</p>
                    <Field value={fullName} onChange={setFullName} />

                    <p className="subtitle is-size-7">Краткое наименование</p>                        
                    <Field value={shortName} onChange={setShortName} />
                    
                    <p className="subtitle is-size-7">
                        {activeTab === 'ООО' && <>Полный юридический адрес</>}
                        {activeTab === 'ИП' && <>Адрес</>}
                    </p>
                    <Field value={fullAddress} onChange={setFullAddress} />

                    {activeTab === 'ООО' && <>
                        <p className="subtitle is-size-7">Номер телефона <br />(с указанием кода города)</p>
                        <Field value={companyPhone} onChange={setCompanyPhone} />
                    </>}

                    <p className="subtitle is-size-7">Ссылка на сайт</p>
                    <Field value={webSite} onChange={setWebSite} />

                    </div>  
                </div>

            </div>
                
            <div className="section">
                <div className={styles.info2}>
                    <div className="box">
                        <h3 className="title">Банковские реквизиты</h3>
                        <div className={styles.info}>
                        <p className="subtitle is-size-7">Наименование банка:</p><Field value={bankName} onChange={setBankName} />
                        <p className="subtitle is-size-7">Р/с:</p><Field value={bankRS} onChange={setBankRS} placeHolder="20 симолов"/>
                        <p className="subtitle is-size-7">К/с:</p><Field value={bankKS} onChange={setBankKS} placeHolder="20 симолов"/>
                        <p className="subtitle is-size-7">БИК:</p><Field value={bankBIK} onChange={setBankBIK} placeHolder="9 симолов"/>
                        </div>                            
                    </div>
                    <div className="box">
                        <h3 className="title">Идентификационные коды:</h3>
                        <div className={styles.info}>
                        {activeTab === 'ООО' && <>
                            <p className="subtitle is-size-7">ИНН:</p><Field value={codeINN} onChange={setCodeINN}  placeHolder="10 симолов"/>
                            <p className="subtitle is-size-7">КПП:</p><Field value={codeKPP} onChange={setCodeKPP} placeHolder="9 симолов"/>
                            <p className="subtitle is-size-7">ОГРН:</p><Field value={codeOGRN} onChange={setCodeOGRN} placeHolder="13 симолов"/>
                            <p className="subtitle is-size-7">ОКПО:</p><Field value={codeOKPO} onChange={setCodeOKPO} placeHolder="8 симолов"/>                        
                        </>}    
                        {activeTab === 'ИП' && <>
                            <p className="subtitle is-size-7">ИНН:</p><Field value={codeINN} onChange={setCodeINN} placeHolder="10 симолов"/>
                            <p className="subtitle is-size-7">ОГРНИП:</p><Field value={codeOGRN} onChange={setCodeOGRN} placeHolder="13 симолов"/>
                        </>}
                        </div>
                    </div>                            
                </div>                   
            </div>         

            <div className="section">
                <div className="box">
                    <h3 className="title">Контактное лицо</h3>
                    <div className={styles.info}>
                        <p className="subtitle is-size-7">ФИО</p>                      
                         <Field value={contactFIO} onChange={setContactFIO} />

                        {activeTab === 'ООО' && <>
                            <p className="subtitle is-size-7">Должность</p>
                            <Field value={contactJobTitle} onChange={setContactJobTitle} />
                        </>}    

                        <p className="subtitle is-size-7">Телефон</p>
                        <Field value={contactPhone} onChange={setContactPhone} />
                        <p className="subtitle is-size-7">Еmail</p>                    
                        <Field value={contactEmail} onChange={setContactEmail} />
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