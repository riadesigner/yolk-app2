import { useParams } from 'react-router-dom'
import styles from './OrdersFilter.module.css'

export default function OrdersFilter(){

    const params = useParams();
    const {userInput} = params;

    return(
        <>

        {
            userInput && (
                <>
                <div className="block mt-0">
                    <h2 className="subtitle is-size-6 mb-4">Найдено</h2>
                    <p>По запросу: {userInput}</p>                    
                </div>                
                <hr />
                </>
            )
        }

        <div className="block mt-0">
            <h2 className="subtitle is-size-6 mb-4">Сортировка</h2>
            <button className="button is-fluid mb-4 is-primary">
                <span>По дате</span>
                <span><i className="fa-solid fa-angle-down"></i></span>
            </button>
            <button className="button is-fluid mb-4 ">
                <span>По стоимости</span>
                <span><i className="fa-solid fa-angle-down"></i></span>                        
            </button>
        </div>
        
        <div className="block">
            <h2 className="subtitle is-size-6 mb-4">Категории</h2>
            <button className="button is-fluid mb-4 is-link is-left">
                <span><i className="fa-regular fa-square-check"></i></span>
                <span>Графический дизайн</span>                
            </button>
            <button className="button is-fluid mb-4 is-link is-left">
                <span><i className="fa-regular fa-square-check"></i></span>
                <span>Motion дизайн</span>                
            </button>            
            <button className="button is-fluid mb-4  is-left">
                <span><i className="fa-regular fa-square"></i></span>
                <span>Веб дизайн</span>                
            </button>
            <button className="button is-fluid mb-4  is-left">
                <span><i className="fa-regular fa-square"></i></span>
                <span>3D графика</span>                
            </button>            

        </div>

        <div className="block">
            <h2 className="subtitle is-size-6 mb-4">Теги</h2>
            <div className={styles.tags}>
            <button className="button is-small">Графический дизайн</button>
            <button className="button is-small">Веб</button>
            <button className="button is-small">Видео</button>
            <button className="button is-small">Фирменный стиль</button>               
            <button className="button is-small">UI Kit</button>
            <button className="button is-small">3D</button>
            </div> 
        </div>
        

        </>
    )
}