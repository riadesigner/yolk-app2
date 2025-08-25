
import styles from '../components/CompanyGallery.module.css'

export default function CompanyGallery({images}){
    return(
        <div className={styles.gallery}>
            {
                images.map((img, index)=>{
                    return(
                        <div key={img.key || index} style={{
                            background: `url(${img.url}) no-repeat center / cover`
                        }}></div>
                    )
                })
            }
        </div>
    )
}