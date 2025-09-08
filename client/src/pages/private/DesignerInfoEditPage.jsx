
import styles from '../../pages/private/DesignerInfoEditPage.module.css'
import Field from '../../components/Field'
import Breadcrumb from '../../components/Breadcrumb';
import ErrorMessage from '../../components/ErrorMessage';
import useFetchDesigner from './hooks/useFetchDesigner';
import { useState } from 'react';

export default function DesignerEditInfoPage(){

    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/designer', title:'Панель управления'},
        {link:'/cp/designer/info', title:'Анкета'},
        {link:'#', title:'Редактирование', isActive:true},
    ];        
    
    const [errorMessage, setErrorMessage] = useState(null);

    const {
        user,
        avatar,
        firstName,
        setFirstName,
        secondName,
        setSecondName,
        middleName,
        setMiddleName,
        schools, 
        addSchool, 
        removeSchool, 
        handleSchoolChange,
        webSite,
        setWebSite,
        phone,
        setPhone,
        softSkills,
        addSoftSkill,
        removeSoftSkill,
        handleSoftSkillChange,
        hardSkills,
        addHardSkill,
        removeHardSkill,
        handleHardSkillChange,
        specialization,
        setSpecialization,
        hdlSaveUser,        
    } = useFetchDesigner({errorMessage, setErrorMessage});

    return (
        <>
        <section className="container is-max-desktop desktop-only">
        <div className="section">
            <Breadcrumb links={links}/>
        </div>
        </section>

        <article> 
        <section className="container">

            <div className="section mt-0">
            <h2 className="is-size-3 is-size-4-mobile mb-5">Анкета</h2>

            <div className="block mb-6">
                <div className={styles.info}>
                    <div className="box">    
                        <div className={styles.userPhotoBox}>
                        
                        <img className="is-max-4-mobile" src={avatar} style={{
                            width:'70%',
                            maxWidth:'200px',
                            borderRadius:'10px',
                            objectFit:'cover',
                        }} alt="" />
                        
                        <button className="button is-link is-small-mobile" >Заменить</button>                           
                        
                        </div>
                    </div>
                    <div className="userFio box">
                        <Field  label="Фамилия" value={secondName} onChange={setSecondName} />
                        <Field  label="Имя" value={firstName} onChange={setFirstName} />
                        <Field  label="Отчество" value={middleName} onChange={setMiddleName} />
                    </div>
                    <div className="box">
                        <Field disabled label="День рождения" />                        
                    </div>
                </div> 
            </div>
                
            {/* Блок образования */}

            <div className="block mb-6">
                <h2 className="subtitle is-size-7"><strong>Образование</strong></h2>

                <div className={styles.schools}>
                    {
                        schools.map((school) =>(                                                        
                            <div className="box" key={school.id}>        
                                <Field name="title" 
                                    label="Институт / Университет" 
                                    value={school.title}
                                    onChange={(val) => handleSchoolChange(school.id, "title", val)}
                                    />
                                <Field name="speciality" 
                                    label="Специальность"
                                    value={school.speciality}
                                    onChange={(val) => handleSchoolChange(school.id, "speciality", val)}
                                    />
                                <Field name="year" 
                                    label="Год окончания"
                                    value={school.year}
                                    onChange={(val) => handleSchoolChange(school.id, "year", val)}
                                    />
                                <Field name="city" 
                                    label="Город"
                                    value={school.city}
                                    onChange={(val) => handleSchoolChange(school.id, "city", val)}
                                    />
                                    <div className={styles.btnDelete}>
                                        <button className="button is-small is-link is-inverted" onClick={()=>removeSchool(school.id)}>x</button>
                                    </div>                            
                            </div>
                        ))
                    }
                    <div className={styles.addSchoolBox}>
                        <button className="button is-link is-inverted is-small-mobile" onClick={addSchool}>Добавить еще</button>
                    </div>                
                </div>

            </div>                

            {/* Блок специализации */}

            <div className="block mb-6">
                <h2 className="subtitle is-size-7"><strong>Специализация</strong></h2>
                <div className="box">
                    <Field 
                        name="specialization" 
                        value={specialization}
                        onChange={(val) => setSpecialization(val)}
                        placeHolder="Графический дизайн, веб дизайн, UI/UX, Презентации" />
                </div>
            </div>
            

            {/* Блок навыков */}

            <div className="block mb-6">
                <h2 className="subtitle is-size-7"><strong>Навыки</strong></h2>
                <div className={styles.info2}>
                    <div className="box">
                        <p className="title is-size-5 mb-3">Soft skills</p>
                        {
                            softSkills.map((s)=>{
                                return (
                                <div key={s.id} className="columns is-1 mb-3">
                                    <div className="column is-9 ">
                                        <Field 
                                            name="softSkillTitle" 
                                            value={s.title}
                                            onChange={(val) => handleSoftSkillChange(s.id, "title", val)}
                                            placeHolder="Коммуникабельность" /></div>
                                    <div className="column is-2">
                                        <Field 
                                            name="softSkillPercent" 
                                            value={s.percent} 
                                            onChange={(val) => handleSoftSkillChange(s.id, "percent", val)}
                                            placeHolder="100" /></div>
                                    <div className="column is-1">
                                        <button className="button is-small is-link is-inverted" onClick={()=>{removeSoftSkill(s.id)}}>x</button>
                                    </div>
                                </div>
                                )
                            })
                        }
                        <button className="button is-link is-small" onClick={addSoftSkill}>Добавить качество</button>
                    </div>
                    <div className="box">                        
                        <p className="title is-size-5 mb-3">Hard skills</p>
                        {
                            hardSkills.map((s)=>{
                                return (
                                <div key={s.id} className="columns is-1 mb-3">
                                    <div className="column is-9 ">
                                        <Field 
                                            name="softSkillTitle" 
                                            value={s.title}
                                            onChange={(val) => handleHardSkillChange(s.id, "title", val)}
                                            placeHolder="UI/UX" /></div>
                                    <div className="column is-2">
                                        <Field 
                                            name="softSkillPercent" 
                                            value={s.percent} 
                                            onChange={(val) => handleHardSkillChange(s.id, "percent", val)}
                                            placeHolder="100" /></div>
                                    <div className="column is-1">
                                        <button className="button is-small is-link is-inverted" onClick={()=>{removeHardSkill(s.id)}}>x</button>
                                    </div>
                                </div>
                                )
                            })
                        }                        
                        <button className="button is-link is-small" onClick={addHardSkill}>Добавить навык</button>
                    </div>                    
                </div>
            </div>        

            {/* Блок контактов */}

            <div className="block mb-6">
                <h2 className="subtitle is-size-7"><strong>Контакты</strong></h2>
                <div className={styles.info2}>
                    <div className="box">
                        <Field name="webSite" label="Сайт" value={webSite} onChange={(val)=>{setWebSite(val)}}/>
                    </div>
                    <div className="box">
                        <Field name="phone" label="Телефон" value={phone} onChange={(val)=>{setPhone(val)}} />            
                    </div>
                </div>
            </div>                  

            <div className="block has-text-right">                
                <button className="button is-primary is-medium is-regular-mobile" onClick={hdlSaveUser}>Сохранить</button>                            
            </div>                                

            {
                errorMessage && (
                    <ErrorMessage message={errorMessage} />
                )
            }
                        
            </div>
        </section>  
        </article>  

        </>
    )
}