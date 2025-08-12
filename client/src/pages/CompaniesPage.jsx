
import { Link, NavLink, useLocation } from 'react-router-dom';

import Breadcrumb from '../components/Breadcrumb'
import Pagination from '../components/Pagination' 
import CompanyPreview from '../components/CompanyPreview' 
import styles from './CompanyPage.module.css' 

export default function Companies(){

    const links = [
        {link:'/', title:'Главная'},
        {link:'#', title:' Все заказчики', isActive:true},
    ];

    const companies = [
        {
            id:'1',
            name:'divan.ru',
            city:'Москва',
            logo:'',
            description:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt nemo illo atque perspiciatis laudantium, deleniti ratione ex corrupti architecto suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis accusamus earum suscipit corrupti reprehenderit impedit possimus velit dolorem at tempora fugit necessitatibus aliquam modi a, quidem soluta tempore aut, optio cum! Expedita alias exercitationem, molestiae ex debitis molestias architecto obcaecati in, aspernatur nostrum non incidunt dolores laboriosam! Atque, aperiam veritatis.'
        },
        {
            id:'2',
            name:'Зеленый остров',
            city:'Владивосток',
            logo:'',
            description:'Sunt nemo illo atque perspiciatis laudantium, deleniti ratione ex corrupti architecto suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis accusamus earum suscipit corrupti reprehenderit impedit possimus velit dolorem at tempora fugit necessitatibus aliquam modi a, quidem soluta tempore aut, optio cum! Expedita alias exercitationem, molestiae ex debitis molestias architecto obcaecatiaperiam veritatis.'
        },
        {
            id:'3',
            name:'Спорттовары',
            city:'Владивосток',
            logo:'',
            description:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt nemo illo atque perspiciatis laudantium, deleniti ratione ex corrupti architecto suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis accusamus earum suscipit corrupti reprehenderit impedit possimus velit dolorem at tempora fugit necessitatibus aliquam modi a, quidem soluta tempore aut, optio cum! Expedita alias exercitationem, molestiae ex debitis molestias architecto obcaecati in, aspernatur nostrum non incidunt dolores laboriosam! Atque, aperiam veritatis.'
        },
        {
            id:'4',
            name:'Владхлеб',
            city:'Владивосток',
            logo:'',
            description:'Sunt nemo illo atque perspiciatis laudantium, deleniti ratione ex corrupti architecto suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis accusamus earum suscipit corrupti reprehenderit impedit possimus velit dolorem at tempora fugit necessitatibus aliquam modi a, quidem soluta tempore aut, optio cum! Expedita alias exercitationem, molestiae ex debitis molestias architecto obcaecatiaperiam veritatis.'
        },
        {
            id:'5',
            name:'divan.ru',
            city:'Москва',
            logo:'',
            description:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt nemo illo atque perspiciatis laudantium, deleniti ratione ex corrupti architecto suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis accusamus earum suscipit corrupti reprehenderit impedit possimus velit dolorem at tempora fugit necessitatibus aliquam modi a, quidem soluta tempore aut, optio cum! Expedita alias exercitationem, molestiae ex debitis molestias architecto obcaecati in, aspernatur nostrum non incidunt dolores laboriosam! Atque, aperiam veritatis.'
        },
        {
            id:'6',
            name:'Владстройзаказчик',
            city:'Владивосток',
            logo:'',
            description:'Sunt nemo illo atque perspiciatis laudantium, deleniti ratione ex corrupti architecto suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis accusamus earum suscipit corrupti reprehenderit impedit possimus velit dolorem at tempora fugit necessitatibus aliquam modi a, quidem soluta tempore aut, optio cum! Expedita alias exercitationem, molestiae ex debitis molestias architecto obcaecatiaperiam veritatis.'
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
                    <div className={styles.companies}>
                        {
                            companies.map((i, index)=>{
                                return(
                                    <CompanyPreview key={i.id} company={i}/>
                                )
                            })
                        }
                    </div>
                    <div className="block mt-6">
                        <Pagination />
                    </div>
                </article>                            
            </div>
        </section>
        </>
    )
}