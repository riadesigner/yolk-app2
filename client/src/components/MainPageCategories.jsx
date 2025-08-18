
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from '../components/MainPageCategories.module.css'

export default function MainPageCategories(){
    const cats = [
        {id:'123123', title:'Графический дизайн'},
        {id:'123124', title:'Motion дизайн'},
        {id:'123125', title:'Веб-дизайн'},
        {id:'123126', title:'3D графика'},
    ]
return (
    <section className="container is-max-desktop">
        <div className="section ">
            <h1 className="title is-size-2 is-size-4-mobile ">Категории</h1>
            <section className={styles.cats}>
                <ul>                
                {
                    cats.map((i, index)=>{
                        return (
                            <Link key={index} to='/orders'>
                                <li key={index} ><span>{i.title}</span></li>
                            </Link>
                        )
                    })
                }                
                </ul>
            </section>
        </div>
    </section>
)
}