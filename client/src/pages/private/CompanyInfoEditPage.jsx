import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../../pages/private/CompanyInfoEditPage.module.css'
import Field from '../../components/Field'
import Breadcrumb from '../../components/Breadcrumb';
import ErrorMessage from '../../components/ErrorMessage';
import Logoloader from '../../components/LogoLoader';
import useFetchCreatingCompany from './hooks/useFetchCreatingCompany';
import ImageUploader from '../../components/ImageUploader';

export default function CompanyInfoEditPage(){
    
    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/company', title:'Панель управления'},
        {link:'/cp/company/info', title:'О компании'},        
        {link:'#', title:'Редактирование', isActive:true},
    ];    

    const [errorMessage, setErrorMessage] = useState(null);

    const {
        company,
        companyName,
        setCompanyName,        
        specialization, 
        setSpecialization,
        description,
        setDescription,
        city,
        setCity,
        gallery,
        setGallery,        
        hdlSaveAll,     
    } = useFetchCreatingCompany({errorMessage, setErrorMessage});        
    
 return(
    <>
        <section className="container is-max-desktop desktop-only">
        <div className="section">
            <Breadcrumb links={links}/>
        </div>
        </section>    
        <section className="container">
            <div className="section mt-0">
            
            <h2 className="is-size-3 is-size-4-mobile mb-5">О компании</h2>

            <article>                

            <div className="block mb-6">
                <div className={styles.info3}>
                    <div className="box">    

                        <Logoloader companyId={company}/>

                    </div>
                    <div className="userFio box">
                        
                        <Field label="Название компании" 
                            value={companyName} 
                            onChange={setCompanyName} />

                        <Field label="Город" value={city} onChange={setCity} />
                    </div>
                </div> 
            </div>
            <div className="block mb-6">
                <h2 className="subtitle is-size-7"><strong>Краткая информация</strong></h2>                
                <div className="box">                    
                    <Field 
                        label="Специализация" 
                        sublabel="(до 100 символов)" 
                        value={specialization} 
                        onChange={setSpecialization} 
                        />
                    <Field 
                        label="Кто мы" 
                        sublabel="(до 1500 символов)" 
                        type="textarea"
                        value={description}
                        onChange={setDescription}
                        />                    
                </div>               
            </div>                    

            <div className="block mb-6">
                <h2 className="subtitle is-size-7"><strong>Галерея изображений</strong></h2>
                <div className={styles.gallery}>
                    
                    {
                        company && 
                        gallery.length > 0 && 
                        gallery.map((image, index) => (                                
                            <div key={image.key} className="box" style={{ display:'flex', alignItems:'center', justifyContent:'center',}}>                                
                                <ImageUploader 
                                    companyId={company.id}
                                    setGallery={setGallery}
                                    image={image}
                                    />
                            </div>
                            ))                        
                    } 

                    {
                        company && (
                                <div key={gallery.length} className="box" style={{ display:'flex', alignItems:'center', justifyContent:'center',}}>                                
                                <ImageUploader 
                                    companyId={company.id}
                                    setGallery={setGallery}                                    
                                    />
                            </div>                        
                        )                            
                    }

                </div>
            </div>       

            <div className="block has-text-right">                
                <button className="button is-primary is-medium is-regular-mobile" onClick={hdlSaveAll}>Сохранить</button>                            
            </div>

            {
                errorMessage && (
                    <ErrorMessage message={errorMessage} />
                )
            }

            </article>            
            </div>
        </section>            
    </>
 )
}