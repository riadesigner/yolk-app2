
import Breadcrumb from '../../components/Breadcrumb';
import ErrorMessage from '../../components/ErrorMessage';

import useFetchCompanySetContractor from './hooks/useFetchCompanySetContractor'

export default function CompanySetContractorPage(){ 

    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/company', title:'Панель управления'},
        {link:'#', title:'Назначение исполнителя', isActive:true},
    ];    

    const hdlClickAction = (e)=>{
        e.preventDefault();
        console.log('Утверждаю!');
    }

    const {
        user,
        order,
        contractor,
        hasContractor,
        errorMessage,
    } = useFetchCompanySetContractor();   

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
                    <h2 className="title">Назначение исполнителя для заказа:</h2>                    
                    <div className={StyleSheet.data}>                        
                        <div className="box mb-3">
                            {
                                order && (
                                    <>
                                        <h2>Заказ № {order.id}</h2>
                                        <p>{order.title}</p>
                                        <p className="mb-0" style={{textAlign:'right'}}><a href={`/orders/${order.id}`}>Страница Заказа</a></p>
                                    </>
                                )
                            }                            
                        </div>
                        <div className="box mb-3" >
                            {
                                contractor && (
                                    <>
                                        <h2>Дизайнер:</h2>
                                        <p>{contractor.name}</p>
                                        <p className="mb-0" style={{textAlign:'right'}}><a href={`/designers/${contractor.id}`}>Анкета дизайнера</a></p>
                                    </>
                                )
                            }
                        </div>
                        <div className="block" style={{textAlign:'right'}}>
                            <button className="button is-large is-link" onClick={(e)=>{hdlClickAction(e)}}>Утвердить</button>
                        </div>                        
                    </div>                
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