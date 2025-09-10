import { useState } from 'react';
import styles from '../components/PublicPortfolioItem.module.css'


export default function PublicPortfolioItem(props){

    const {id, images, title, forEdit, hdlDelete} = props;        

    const [showConfirm, setShowConfirm] = useState(false);
    const hdlConfirmShow = (e)=>{
        e.preventDefault();
        setShowConfirm(true);
    }
    const hdlConfirmHide = (e)=>{
        e.preventDefault();
        setShowConfirm(false);
    }    

    return (               
        <div className="box p-5">
        <div className={styles.portItem}>
            <div className={styles.imagesBlock}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <h1 className='title is-size-5 is-size-6-mobile mb-0 mt-3'>{title}</h1>            
            {
                forEdit && (
                    <div className="level mt-3">
                        <div className="level-item">                    
                            <button onClick={(e)=>hdlConfirmShow(e)} className="button is-small">X</button>
                        </div>
                        <div className="level-item is-right">
                            <button className="button is-primary is-small">Редактировать</button>
                        </div>
                    </div>
                )
            }
            {
                showConfirm && (
                <div className={styles.confirmWindow}>
                    <div className="has-text-centered">
                        <h2 className="title">Действительно удалить?</h2>
                        <button className="button mr-5 is-primary" onClick={(e)=>hdlConfirmHide(e)} >Отмена</button>
                        <button className="button is-danger" onClick={(e)=>hdlDelete(e, id)}>Да, удалить</button>                    
                    </div>
                </div>
                )
            }
        </div>    
        </div>     
    )
}