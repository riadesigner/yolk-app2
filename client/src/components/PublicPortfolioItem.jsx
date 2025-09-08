import styles from '../components/PublicPortfolioItem.module.css'

export default function PublicPortfolioItem(props){
    const {images, title, forEdit} = props;
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
                            <button className="button is-dangerous is-small">X</button>
                        </div>
                        <div className="level-item is-right">
                            <button className="button is-primary is-small">Редактировать</button>
                        </div>
                    </div>
                )
            }
        </div>    
        </div>     
    )
}