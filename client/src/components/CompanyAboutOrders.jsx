import { Link, NavLink, useLocation } from 'react-router-dom';

export default function CompanyAboutOrders({orders}){
    return(
        <section className="container">                
            <div className="section">
                <h2>Размещенные заказы</h2>                    
                <div>
                    {
                        orders.map((i, index)=>{
                            return(
                                <div key={index} >Заказ (<strong>актуальный</strong>): <Link to='/orders/123'>{i.title}</Link></div>
                            )
                        })
                    }                        
                </div>
            </div>             
        </section>        
    )
}