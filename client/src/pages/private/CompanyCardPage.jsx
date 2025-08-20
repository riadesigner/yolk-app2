import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../../pages/private/CompanyCardPage.module.css'
import Breadcrumb from '../../components/Breadcrumb';
import api from "../../utils/api";


export default function CompanyCardPage(){
    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/company', title:'Панель управления'},
        {link:'#', title:'Карточка компании', isActive:true},
    ];    

    const navigate = useNavigate();    
    
    const [legalType, setLegalType] = useState('ИП');
    
    const [fullName, setFullName] = useState('');
    const [shortName, setShortName] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');    
    const [webSite, setWebSite] = useState('');

    const [codeINN, setCodeINN] = useState('');
    const [codeKPP, setCodeKPP] = useState('');
    const [codeOGRN, setCodeOGRN] = useState('');
    const [codeOKPO, setCodeOKPO] = useState('');    

    const [bankName, setBankName] = useState('');
    const [bankRS, setBankRS] = useState('');
    const [bankKS, setBankKS] = useState('');
    const [bankBIK, setBankBIK] = useState('');
    
    const [contactFIO, setContactFIO] = useState('');        
    const [contactPhone, setContactPhone] = useState('');    
    const [contactJobTitle, setContactJobTitle] = useState('');    
    const [contactEmail, setContactEmail] = useState('');      

    useEffect(() => {

        const fetchCompany = async () => {          
            try {
                const response = await api.get('/company/by-user');                
                
                if(response.data.success){                    
                    const company = response.data.company;                    
                    if(company){
                        const details = company.details;
                        setLegalType(details.legalType || 'ИП');
                        setFullName(details.fullName || '');
                        setShortName(details.shortName || '');
                        setFullAddress(details.fullAddress || '');
                        setCompanyPhone(details.companyPhone || '');
                        setWebSite(details.webSite || '');
                        setCodeINN(details.codeINN || '');
                        setCodeKPP(details.codeKPP || '');
                        setCodeOGRN(details.codeOGRN || '');
                        setCodeOKPO(details.codeOKPO || '');
                        setBankName(details.bankName || '');
                        setBankRS(details.bankRS || '');
                        setBankKS(details.bankKS || '');
                        setBankBIK(details.bankBIK || '');
                        setContactFIO(details.contactFIO || '');
                        setContactPhone(details.contactPhone || '');
                        setContactJobTitle(details.contactJobTitle || '');
                        setContactEmail(details.contactEmail || '');
                    }                    
                }

            } catch (err) {
                console.error('Ошибка загрузки данных компании', err);                
                navigate('/');
            }
        };
        
        fetchCompany();
    }, []);


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