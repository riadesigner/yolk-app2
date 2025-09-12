import { Link } from 'react-router-dom';

import styles from '../../pages/private/CompanyCardPage.module.css'
import Breadcrumb from '../../components/Breadcrumb';

import useFetchCompanyBillsPage from './hooks/useFetchCompanyBillsPage'


export default function CompanyCardPage(){
    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/company', title:'Панель управления'},
        {link:'#', title:'Счета компании', isActive:true},
    ];    

    const companyId = '';

    const {
        bills,
    } = useFetchCompanyBillsPage();   

    return (
        <>
        <section className="container is-max-desktop desktop-only">
        <div className="section">
            <Breadcrumb links={links}/>
        </div>
        </section>
        
        <section className="container">   
            <div className="section">
            <article>

            Счета

            </article> 
            </div>                                                                                     
        </section>
        
        
        </>
    )
}