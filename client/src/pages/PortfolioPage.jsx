import { Link, NavLink, useLocation } from 'react-router-dom';
import PublicPortfolioItem from '../components/PublicPortfolioItem'
import styles from '../pages/PortfolioPage.module.css'

export default function PortfolioPage(){
    
    const jobs = [
        {
          images: [], 
          title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nulla inventore quia aut modi laborum tenetur nihil, rerum recusandae ',
          url:''
        },{
          images: [], 
          title: 'Проект 2',
          url:''
        },{
          images: [], 
          title: 'Smagnam, reprehenderit officiis corrupti veritatis',
          url:'',
        }        
    ];
    
    return(
        <>
        <section className="container desktop-only is-max-desktop">
        <div className="section">
            <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><a href="/">Главная</a></li>
                <li><a href="/designers">Дизайнеры</a></li>
                <li><a href="/portfolio">Портфолио</a></li>
                <li className="is-active"><a href="#" aria-current="page">Алексей Обухов</a></li>
            </ul>
            </nav>
        </div>
        </section>
            
        <section className="container">
            <div className="section">
                <h1 className='title'>Алексей Обухов</h1>
                <div className="level is-4 is-3-mobile" >
                    <p className='subtitle'>Портфолио</p>
                    <p className='subtitle'>
                        <Link to="/designers/123/info">Анкета</Link>                        
                    </p>
                </div>
                
                <article>
                    <div className={styles.portfolios}>                        
                        {
                            jobs.map((i)=>{
                                return(
                                    <PublicPortfolioItem images={i.images} title={i.title} url={i.url} />
                                )
                            })
                        }                                            
                    </div>
                </article>                            
            </div>
        </section>
        </>
    )
}