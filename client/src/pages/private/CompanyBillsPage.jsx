import { Link } from 'react-router-dom';

import Breadcrumb from '../../components/Breadcrumb';
import {formatDateTime} from '../../utils/dateUtilits'
import useFetchCompanyBillsPage from './hooks/useFetchCompanyBillsPage'


export default function CompanyBillsPage(){
    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/company', title:'Панель управления'},
        {link:'#', title:'Счета компании', isActive:true},
    ];

    const {
        nowLoading,
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

            {
                nowLoading ? (
                    <>Загрузка...</>
                ):(            
                    bills && bills.length>0 ? (
                        <div >
                            {
                                bills.map((b)=>{
                                    const fromDate = formatDateTime(b.createdAt);
                                    return (                                        
                                    <div key={b.id}>
                                        <button className={`button ${b.paid?'is-primary':'is-link'} mb-3`}
                                        onClick={()=>{location.href=`/cp/company/bills/${b.id}`}}
                                        >
                                            <span>Счет № {b.key} от {fromDate}, {b.paid ? <span>Оплачен</span> : <span>Не оплачен</span>}</span>
                                        </button>                                                                                
                                    </div>                                        
                                    )
                                })       
                            }
                        </div>
                    ):(
                        <>Пока счетов нет</>
                    )
                )
            }

            </article> 
            </div>                                                                                     
        </section>
        
        
        </>
    )
}