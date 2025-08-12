import { Link, NavLink, useLocation } from 'react-router-dom';

import styles from '../components/DesignerPreview.module.css'

export default function DesignerPreview({designer}){    

    const images = [];
    designer.portfolios.map((p)=>{
        p.images.map((i)=>{
            images.push(i);
        })
    });

    const headerImages = images.length > 3 ? images.slice(0,3): images;    

    const linkAnketa = '/designers/123/info';
    const linkPortfolio = '/designers/123/portfolio';
    
    return(
        <div className={styles.preview}>
            
            <div className={styles.previewHeader}>
                {
                    headerImages.map((i, index)=>{
                        return i && <div style={{
                            background:`url(${i}) no-repeat center/cover`
                        }}></div>                         
                    })
                }
            </div>

            <Link to={linkAnketa}>
            <div className={styles.avatar} style={{
                background:`red url(${designer.avatar}) no-repeat center/cover`
            }}></div>
            </Link>

            <div className={styles.fio}>                
                <p className="mb-0">{designer.name} {designer.surname}</p>
                <p className="is-size-7">г. {designer.city}</p>
            </div>
            
            <div className="block mt-5 mb-0">
                <div className="level is-1">
                    <div className="level-item">
                        <button className="button is-small is-link is-inverted">
                            <span><i className="fa-regular fa-at"></i></span>
                            <span>Написать</span>
                        </button>
                    </div>
                    <div className="level-item">
                        <Link to={linkAnketa}>
                        <button className="button is-small is-link is-inverted ">
                            <span><i className="fa-regular fa-user"></i></span>
                            <span>Анкета</span>
                        </button>
                        </Link>
                    </div>                    
                    <div className="level-item is-right">
                        <Link to={linkPortfolio}>
                        <button className="button is-small is-link is-inverted">Портфолио</button>                        
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}