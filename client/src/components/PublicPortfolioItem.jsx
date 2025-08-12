import styles from '../components/PublicPortfolioItem.module.css'

export default function PublicPortfolioItem(props){
    const {images, title} = props;
    return (                
        <div className={styles.portItem}>
            <div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <h1 className='title is-size-5 is-size-6-mobile mb-0 mt-3'>{title}</h1>
        </div>        
    )
}