import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb.jsx'
import styles from './OrderPage.module.css'
import api from '../utils/api.jsx'

export default function OrderPage(){

    const links = [
        {link:'/', title:'Главная'},
        {link:'/orders', title:'Все заказы'},
        {link:'/orders/123', title:'Заказ 123', isActive:true},        
    ];

    const { id } = useParams();

    const filesInit = [
            {title:'Название файла 1',link:''},
            {title:'Название файла 2',link:''}
        ]

    const [order, setOrder]= useState(null);
    const [companyName, setCompanyName] = useState('');
    const [files, setfiles] = useState(filesInit)

    const order1 = {          
        id:'1',
        title: 'Разработка фирменного стиля для Название компании',
        description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque autem accusamus dolorum, quidem aspernatur quod, facilis quasi ex esse, suscipit nobis illo dolore molestias. Nobis, doloribus. Ipsum non, obcaecati repellendus deserunt fugit fugiat quis dicta aperiam id molestias totam debitis, quaerat, magni ex! Atque molestias nam amet sit vel non.',
        requirements:[
            'Atque autem accusamus dolorum, quidem aspernatur quod',
            'facilis quasi ex esse, suscipit nobis illo dolore molestias. ',
            'Nobis, doloribus. Ipsum non, obcaecati repellendus deserunt fugit',
        ],          
        price: 10000,
        company:'Диван.ру',
        companyId:'123',
        dateto:'21-09-2025',
        categories:[],
        tags:'Веб-сайт, интерфейс, UI',
        files:[
            {title:'Название файла 1',link:''},
            {title:'Название файла 2',link:''}
        ]
        };

    useEffect(() => {

        const fetchOrder = async () => {         
            try {
                const response = await api.get(`/orders/${id}`);

                if(response.data.success){    
                    console.log('response.data', response.data)
                    const foundOrder =  response.data.order;
                    setOrder(foundOrder);        
                    const resCompany = await api.get(`/company/${foundOrder.companyId}`);
                    if(resCompany.data.success){
                        console.log('resCompany = ', resCompany)
                        setCompanyName(resCompany.data.company.name)
                    }
                }
                
            } catch (err) {
                console.error('Ошибка загрузки профиля', err);
                // navigate('/login');
                navigate('/');
            }
        };
        
        fetchOrder();
    }, []);    

    // const linkToCompany = `/companies/${order.companyId}`
    const linkToCompany = `/companies/123`
    
    return(
        <>
        <section className="container desktop-only is-max-desktop">
        <div className="section">
            <Breadcrumb links={links}/>
        </div>
        </section>
            
        <section className="container is-max-desktop">
            <div className="section">                                
                <article>
                    <div className={styles.orderPage}>
                    <div>
                        <h2>{ order ? (<>{order.title}</>):(<>–</>) }</h2>
                        <p>{ order ? (<>{order.description}</>):(<>–</>) }</p>                                                

                        <h3 className="title mt-5 mb-5">Файлы:</h3>     
                        <div >
                            {
                                order && files && files.map((i, index)=>{
                                    return(
                                        <div>
                                            <a href={i.link}><button className="button mb-2 mr-2">{i.title}</button></a>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <div className={styles.details}>
                            <div className="box">
                                <h3>Детали заказа</h3>
                                <div className="block">
                                    <div className="mb-1">Стоимость</div>
                                    <div>{order && order.price}</div>
                                </div>
                                <div className="block">
                                    <div className="mb-1">Выполнить до</div>
                                    <div>{order && order.dateto}</div>
                                </div>                                
                                <div className="block">
                                    <div className="mb-1">Заказчик</div>
                                    {order && companyName && (                                        
                                        <Link to={'/companies/' + order.companyId}>{companyName}</Link>
                                        )}                                    
                                </div>
                                <div className="block mt-6 mt-5-mobile">
                                    <button className="button is-link">Откликнуться</button>
                                </div>                                
                            </div>
                        </div>
                    </div>
                    </div>                    
                </article>                            
            </div>
        </section>
        </>
    )
}