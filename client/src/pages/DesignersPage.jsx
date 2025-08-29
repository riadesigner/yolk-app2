
import { Link, NavLink, useLocation } from 'react-router-dom';

import Breadcrumb from '../components/Breadcrumb'
import Pagination from '../components/Pagination' 
import DesignerPreview from '../components/DesignerPreview'

import styles from './DesignersPage.module.css'


export default function Designer(){

    const links = [
        {link:'/', title:'Главная'},
        {link:'#', title:' Все дизайнеры', isActive:true},
    ];

    const designers = [
        {
            id:'123', name:'Дмитрий', surname:'Печкорин', 
            city:'Владивосток',
            portfolios:[
                {id:'1234', title:'Название проекта 1', images:['/portf/p-1.jpg', '/portf/p-2.jpg', '/portf/p-3.jpg']},
                {id:'1235', title:'Название проекта 2', images:['/portf/p-1.jpg', '/portf/p-2.jpg', '/portf/p-3.jpg']}
            ],
            avatar:'/photo.jpg'
        },
        {
            id:'1234', name:'Марина', surname:'Курочкина', 
            city:'Владивосток',
            portfolios:[
                {id:'1234', title:'Название проекта 1', images:['/portf/p-1.jpg', '/portf/p-2.jpg', '/portf/p-3.jpg']},
                {id:'1235', title:'Название проекта 2', images:['/portf/p-1.jpg', '/portf/p-2.jpg', '/portf/p-3.jpg']}
            ],
            avatar:'/photo.jpg'
        },
        {
            id:'1235', name:'Алексей', surname:'Петров', 
            city:'Находка',
            portfolios:[
                {id:'1234', title:'Название проекта 1', images:['/portf/p-1.jpg', '/portf/p-2.jpg', '/portf/p-3.jpg']},
                {id:'1235', title:'Название проекта 2', images:['/portf/p-1.jpg', '/portf/p-2.jpg', '/portf/p-3.jpg']}
            ],
            avatar:'/photo.jpg'
        },
        {
            id:'123', name:'Алина', surname:'Павлова', 
            city:'Владивосток',
            portfolios:[
                {id:'1234', title:'Название проекта 1', images:['/portf/p-1.jpg', '/portf/p-2.jpg', '/portf/p-3.jpg']},
                {id:'1235', title:'Название проекта 2', images:['/portf/p-1.jpg', '/portf/p-2.jpg', '/portf/p-3.jpg']}
            ],
            avatar:'/photo.jpg'
        },
        {
            id:'1234', name:'Александра', surname:'Новгородцева', 
            city:'Хабаровск',
            portfolios:[
                {id:'1234', title:'Название проекта 1', images:['/portf/p-1.jpg', '/portf/p-2.jpg', '/portf/p-3.jpg']},
                {id:'1235', title:'Название проекта 2', images:['/portf/p-1.jpg', '/portf/p-2.jpg', '/portf/p-3.jpg']}
            ],
            avatar:'/photo.jpg'
        },
        {
            id:'1235', name:'Константин', surname:'Эрнст', 
            city:'Большой Камень',
            portfolios:[
                {id:'1234', title:'Название проекта 1', images:['/portf/p-1.jpg', '/portf/p-2.jpg', '/portf/p-3.jpg']},
                {id:'1235', title:'Название проекта 2', images:['/portf/p-1.jpg', '/portf/p-2.jpg', '/portf/p-3.jpg']}
            ],
            avatar:'/photo.jpg'
        }      
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
                <article>
                    <div className={styles.items}>            
                        {
                            designers.map((i, index)=>{
                                return <DesignerPreview  key={index} designer={i} />
                            })
                        }
                    </div>                    
                    <div className="block mt-6">
                        {/* <Pagination /> */}
                    </div>
                </article>                            
            </div>
        </section>
        </>
    )
}