import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import PublicPortfolioItem from '../components/PublicPortfolioItem'
import styles from '../pages/DseignerPortfolioPublicPage.module.css'
import useFetchDesignerPortfolioPublicPage from './hooks/useFetchDesignerPortfolioPublicPage' 

import Breadcrumb from '../components/Breadcrumb'


export default function PortfolioPage(){
    
    const { designerId } = useParams();
    
    const {
        designer,
        portfolios,
    } = useFetchDesignerPortfolioPublicPage(designerId);

    const links = [
        {link:'/', title:'Главная'},
        {link:'/designers', title:' Все дизайнеры'},
        {link:'#', title:designer ? designer.name : `&nbsp;`, isActive:true},
    ];

    return(
        <>

        <section className="container is-max-desktop desktop-only">
        <div className="section">
            <Breadcrumb links={links}/>
        </div>
        </section>
            
        <section className="container">
            <div className="section">
                
                <h1 className='title'>{designer ? designer.name : <>&nbsp;</>}</h1>
                
                <div className="level is-4 is-3-mobile mb-4" >                    
                    <p className='subtitle'>
                        <Link to={`/designers/${designerId}`}>Анкета</Link>                        
                    </p>
                    <p className='subtitle'>Портфолио</p>
                </div>
                
                <article>
                    <div className={styles.portfolios}>                        
                        {
                            designer && portfolios && portfolios.length>0 && portfolios.map((p)=>{
                                return(
                                    <PublicPortfolioItem 
                                        key={p.id} 
                                        images={p.images} 
                                        title={p.title} 
                                    />
                                )
                            })
                        }
                        {
                            designer && portfolios && portfolios.length == 0 && (
                                <>Портфолио не заполнено</>
                            )                            
                        }                                                                    
                    </div>
                </article>                            
            </div>
        </section>
        </>
    )
}