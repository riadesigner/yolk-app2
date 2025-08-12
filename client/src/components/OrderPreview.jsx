import { Link, NavLink, useLocation } from 'react-router-dom';

import styles from '../components/OrderPreview.module.css'

export default function OrderPreview({title, price, company}){
    return (
        <div className={styles.order}>
            <Link to="/orders/123">
                <h2 className="subtitle is-size-6">{title}</h2>
                <p>
                    {price}
                    &nbsp;<i className="fa-solid fa-ruble-sign is-size-6 is-primary" style={{opacity:.6}}></i>
                </p>
            </Link>
            <hr />
            <div className={styles.company}>
                <span>
                    <a href="/companies/123">{company}</a>
                </span>                
                <div className="level mt-4">
                    <div className="level-item ">
                        <span className="is-size-7">
                            <i className="fa-solid fa-eye is-primary"></i> 2
                        </span>                        
                    </div>
                    <div className="level-item is-right is-size-7">
                        <span style={{opacity:.4}}><i className="fa-regular fa-calendar-days"></i></span>
                        <span>12-08-2025</span>
                    </div>
                </div>
            </div>
        </div>
    )
}