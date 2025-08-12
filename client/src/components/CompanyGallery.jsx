
import styles from '../components/CompanyGallery.module.css'

export default function CompanyGallery({images}){
    return(
        <div className={styles.gallery}>
            {
                images.map((i, index)=>{
                    return(
                        <div key={index} style={{
                            background: `url(${i}) no-repeat center / cover`
                        }}></div>
                    )
                })
            }
        </div>
    )
}