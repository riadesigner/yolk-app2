import { Link } from 'react-router-dom';

import styles from '../../pages/private/CompanyCardPage.module.css'
import Breadcrumb from '../../components/Breadcrumb';

import useFetchCompanyAdminCard from './hooks/useFetchCompanyAdminCard'


export default function CompanyCardPage(){
    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/company', title:'Панель управления'},
        {link:'#', title:'Карточка компании', isActive:true},
    ];    

    const {
        legalType,
    
        fullName,
        shortName,
        fullAddress,
        companyPhone,
        webSite,

        codeINN,
        codeKPP,
        codeOGRN,
        codeOKPO,

        bankName,
        bankRS,
        bankKS,
        bankBIK,
    
        contactFIO,
        contactPhone,
        contactJobTitle,
        contactEmail,
    } = useFetchCompanyAdminCard();   

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

            </div>
            
            <div className="section">              
                <div className="box">
                    <h2 className="title m-0">Тип юридического лица: {legalType} </h2>
                 </div>
            </div>

            <div className="section">

                <div className="box">
                    <h3 className="title">Общая информация</h3>
                    
                    <div className={styles.info}>

                    <p className="subtitle is-size-7">Полное наименование</p>
                    <p>{fullName}</p>

                    <p className="subtitle is-size-7">Краткое наименование</p>                        
                    <p >{shortName}</p>
                    
                    <p className="subtitle is-size-7">
                        {legalType === 'ООО' && <>Полный юридический адрес</>}
                        {legalType === 'ИП' && <>Адрес</>}
                    </p>
                    <p>{fullAddress}</p>

                    {legalType === 'ООО' && <>
                        <p className="subtitle is-size-7">Телефон компании <br/>(с указанием кода города) </p>
                        <p>{companyPhone}</p>
                    </>}


                    <p className="subtitle is-size-7">Ссылка на сайт</p>
                    <p><a href={"https://" + webSite} target="_blank">{webSite}</a></p>                        

                    </div>  
                </div>

            </div>
                
            <div className="section">
                <div className={styles.info2}>
                    <div className="box">
                        <h3 className="title">Банковские реквизиты</h3>
                        <div className={styles.info}>
                        <p className="subtitle is-size-7">Наименование банка:</p><p>{bankName}</p>
                        <p className="subtitle is-size-7">Р/с:</p><p>{bankRS}</p>
                        <p className="subtitle is-size-7">К/с:</p><p>{bankKS}</p>
                        <p className="subtitle is-size-7">БИК:</p><p>{bankBIK}</p>                                                    
                        </div>                            
                    </div>

                    <div className="box">
                        <h3 className="title">Идентификационные коды:</h3>
                        <div className={styles.info}>
                        {legalType === 'ООО' && <>
                            <p className="subtitle is-size-7">ИНН:</p><p>{codeINN}</p>
                            <p className="subtitle is-size-7">КПП:</p><p>{codeKPP}</p>
                            <p className="subtitle is-size-7">ОГРН:</p><p>{codeOGRN}</p>
                            <p className="subtitle is-size-7">ОКПО:</p><p>{codeOKPO}</p>                            
                        </>}
                        {legalType === 'ИП' && <>
                            <p className="subtitle is-size-7">ИНН:</p><p>{codeINN}</p>                            
                            <p className="subtitle is-size-7">ОГРНИП:</p><p>{codeOGRN}</p>
                        </>}
                        </div>
                    </div>
                </div>               
            </div>

            <div className="section">
                <div className="box">
                    <h3 className="title">Контактное лицо (руководитель)</h3>
                    <div className={styles.info}>
                        <p className="subtitle is-size-7">ФИО</p>                      
                        <p>{contactFIO}</p>

                        {legalType === 'ООО' && <>
                            <p className="subtitle is-size-7">Должность</p>
                            <p>{contactJobTitle}</p>
                        </>}

                        <p className="subtitle is-size-7">Телефон</p>
                        <p>{contactPhone}</p>
                        <p className="subtitle is-size-7">Еmail</p>                    
                        <p><a href={"mailto:" + contactEmail}>{contactEmail}</a></p>
                    </div>
                </div>
            </div> 
                                                                                    
        </section>
        </article>
        
        </>
    )
}