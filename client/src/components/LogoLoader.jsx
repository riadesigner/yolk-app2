import styles from './LogoLoader.module.css'
import useFetchLogoLoader from './hooks/useFetchLogoLoader'

export default function LogoLoader({companyId}){

    const {
        error,
        nowLoading,
        uploadedImage,
        previewUrl,
        handleUpload,
        fileInputRef,
        selectedFile,
        handleFileChange,        
        handleButtonClick,
    } = useFetchLogoLoader(companyId);

    return (
        <div className={styles.logoBox}>
            {
                nowLoading ? (
                    <div className={styles.loader}><span></span></div>
                ):(
                    <>

                    {
                        previewUrl && (                                                        
                            <img className="is-max-4-mobile" src={previewUrl} alt="preview" style={{
                            width:'70%',
                            borderRadius:'10px',
                            objectFit:'cover',
                            marginBottom:'10px',
                            }}/>
                        )
                    }

                    {
                        uploadedImage && (
                            <img className="is-max-4-mobile" src={uploadedImage} style={{
                                width:'70%',
                                borderRadius:'10px',
                                objectFit:'cover',
                                marginBottom:'10px',
                            }} alt="" />
                        )
                    }

                    <input type="file" onChange={handleFileChange} accept="image/*" ref={fileInputRef} style={{display:'none'}}/>                    
                    <button className="button is-link is-small-mobile" onClick={handleButtonClick}>Заменить лого</button>

                    {selectedFile && (
                        <button 
                        onClick={handleUpload} 
                        disabled={nowLoading}
                        className="button is-primary mt-2"
                        >
                        {nowLoading ? 'Загрузка...' : 'Загрузить'}
                        </button>
                    )}                    

                    {error && <div className="is-size-7" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}                    

                    </>
                )
            }                                            
        </div>        
    )
}