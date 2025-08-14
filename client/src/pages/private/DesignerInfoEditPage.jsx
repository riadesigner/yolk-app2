import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';

import styles from '../../pages/private/DesignerInfoEditPage.module.css'
import Field from '../../components/Field'

import userPhoto from '/no-image.jpg';
import Breadcrumb from '../../components/Breadcrumb';

const noPhoto = '/no-image.jpg'; 

export default function DesignerEditInfoPage(){
    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/designer', title:'Панель управления'},
        {link:'/cp/designer/info', title:'Анкета'},
        {link:'#', title:'Редактирование', isActive:true},
    ];        

    const hdlSave = ()=>{
        console.log('firstName', firstName)
        console.log('secondName', secondName)
        console.log('middleName', middleName)
        console.log("Form data:", schools);
    }

    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState(noPhoto);

    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [middleName, setMiddleName] = useState("");

    const [schools, setSchools] = useState([{
      id: 1,
      title: "",
      year: "",
      speciality: "",
      city: "",
    },]);

    const addSchool = () => {
        const newId = schools.length > 0 ? Math.max(...schools.map(s => s.id)) + 1 : 1;
        setSchools([
        ...schools,
        {
            id: newId,
            title: "",
            year: "",
            speciality: "",
            city: "",
        },
        ]);
    };

    const removeSchool = (id) => {
        setSchools(schools.filter((s) => s.id !== id));
    };    
    
    const handleChange = (id, fieldName, value) => {
        setSchools(
        schools.map((school) =>
            school.id === id ? { ...school, [fieldName]: value } : school
        )
        );
    };

    const [userAge, setUserAge] = useState(null);    
    const [userEducation, setUserEducation] = useState('Не указано');
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    

    useEffect(() => {

        const fetchUser = async () => {          
            try {
                const response = await api.get('/user-with-info');
                console.log('response', response);
                
                if(response.data.success){
                    const user = response.data.user;
                    setUser(user);  
                    setAvatar(user.avatar);

                    setSecondName(user?.userInfo?.secondName || '');
                    setFirstName(user?.userInfo?.firstName || '');
                    setMiddleName(user?.userInfo?.middleName || '');                    
                }

            } catch (err) {
                console.error('Ошибка загрузки страницы редактирования анкеты', err);
                // navigate('/login');
                navigate('/');
            }
        };
        
        fetchUser();
    }, []);


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
                        <Field label="День рождения" />                        
                    </div>
                </div> 
            </div>
                
            <div className="block mb-6">
                <h2 className="subtitle is-size-7"><strong>Образование</strong></h2>

                <div className={styles.schools}>
                    {
                        schools.map((school) =>(                                                        
                            <div className="box" key={school.id}>        
                                <Field name="title" 
                                    label="Институт / Университет" 
                                    value={school.title}
                                    onChange={(val) => handleChange(school.id, "title", val)}
                                    />
                                <Field name="speciality" 
                                    label="Специальность"
                                    value={school.speciality}
                                    onChange={(val) => handleChange(school.id, "speciality", val)}
                                    />
                                <Field name="year" 
                                    label="Год окончания"
                                    value={school.year}
                                    onChange={(val) => handleChange(school.id, "year", val)}
                                    />
                                <Field name="city" 
                                    label="Город"
                                    value={school.sicy}
                                    onChange={(val) => handleChange(school.id, "city", val)}
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

            <div className="block mb-6">
                <h2 className="subtitle is-size-7"><strong>Контакты</strong></h2>
                <div className={styles.info2}>
                    <div className="box">
                        <Field label="Сайт" />
                    </div>
                    <div className="box">                        
                        <Field label="Телефон" />            
                    </div>                    
                </div>
            </div>                      

            <div className="block mb-6">
                <h2 className="subtitle is-size-7"><strong>Навыки</strong></h2>
                <div className={styles.info2}>
                    <div className="box">
                        <p className="title is-size-5 mb-0">Soft skills</p>
                        <div className="columns is-1">
                            <div className="column is-9"><Field placeHolder="Коммуникабельность" /></div>
                            <div className="column is-3"><Field placeHolder="100" /></div>
                        </div>
                        <button className="button is-link is-small">Добавить качество</button>
                    </div>
                    <div className="box">                        
                        <p className="title is-size-5 mb-0">Hard skills</p>
                        <div className="columns is-1">
                            <div className="column is-9"><Field placeHolder="UI/UX" /></div>
                            <div className="column is-3"><Field placeHolder="100" /></div>
                        </div>
                        <button className="button is-link is-small">Добавить навык</button>
                    </div>                    
                </div>
            </div>        

            <div className="block has-text-right">                
                <button className="button is-primary is-medium is-regular-mobile" onClick={hdlSave}>Сохранить</button>                            
            </div>                                

                        
            </div>
        </section>  
        </article>  

        </>
    )
}