import styles from './LogoLoader.module.css'
import useFetchLogoLoader from './hooks/useFetchLogoLoader'

export default function LogoLoader({companyId}){

    const {
        nowLoading,
        logoImage,
        hdlChangeLogo,
    } = useFetchLogoLoader(companyId);

    return (
        <div className={styles.logoBox}>                        
        <img className="is-max-4-mobile" src={logoImage} style={{
            width:'70%',
            borderRadius:'10px',
            objectFit:'cover',
            marginBottom:'10px',
        }} alt="" />                        
        <button className="button is-link is-small-mobile" 
            onClick={hdlChangeLogo}>Заменить лого</button>                                                   
        </div>        
    )
}