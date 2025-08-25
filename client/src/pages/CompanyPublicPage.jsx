import { Link, NavLink, useLocation, useParams } from 'react-router-dom';

import Breadcrumb from '../components/Breadcrumb';
import CompanyGallery from '../components/CompanyGallery';
import CompanyAboutHeader from '../components/CompanyAboutHeader';
import CompanyAboutKeepInTouch from '../components/CompanyAboutKeepInTouch';    
import CompanyAboutOrders from '../components/CompanyAboutOrders';    
import useFetchCompany from '../pages/hooks/useFetchCompany';    

export default function CompanyPublicPage(){

    const params = useParams();
    const { companyId } = params;

    console.log('param companyId = ', companyId)
 
    const links = [
        {link:'/', title:'Главная'},
        {link:'/companies', title:'Все компании'},
        {link:'#', title:'О компании', isActive:true},
    ];    
    const images = [
        '/company-gallery/gallery-1.jpg',
        '/company-gallery/gallery-2.jpg',
        '/company-gallery/gallery-3.jpg',
    ];

    const orders = [
        {          
        id:'123123',
        title: 'Разработка фирменного стиля для Название компании',
        description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque autem accusamus dolorum, quidem aspernatur quod, facilis quasi ex esse, suscipit nobis illo dolore molestias. Nobis, doloribus. Ipsum non, obcaecati repellendus deserunt fugit fugiat quis dicta aperiam id molestias totam debitis, quaerat, magni ex! Atque molestias nam amet sit vel non.',
        requirements:[
            'Atque autem accusamus dolorum, quidem aspernatur quod',
            'facilis quasi ex esse, suscipit nobis illo dolore molestias. ',
            'Nobis, doloribus. Ipsum non, obcaecati repellendus deserunt fugit',
        ],          
        price: 10000,
        company:'Диван.ру',
        companyId:'12312',
        dateto:'21-09-2025',
        tags:'Веб-сайт, интерфейс, UI',
        files:[
            {title:'Название файла',link:''},
            {title:'Название файла',link:''}
        ]
        }
    ];

    const {
        company,
    } = useFetchCompany({companyId});

    return (
        <>
        <section className="container is-max-desktop desktop-only">
        <div className="section">
            <Breadcrumb links={links}/>
        </div>
        </section>
            <article>
            
            {company && <CompanyAboutHeader company={company} privateMode="false"/>} 
            
            <section className="container">                
                <div className="section">
                    <h2>Кто мы</h2>                    
                    <p>{company && company.description}</p>
                </div>
                <div className="section">
                    <CompanyGallery images={images} />
                </div>                                
            </section>

            <CompanyAboutOrders orders={orders} />
            <CompanyAboutKeepInTouch />

        </article>
        </>
    )
}