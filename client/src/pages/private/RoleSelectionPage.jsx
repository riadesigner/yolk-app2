import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import { useState } from 'react';
import  api from '../../utils/api';

export default function AboutPage(){


    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null);    

    const hdlClick = async (role)=>{

        try {
            const response = await api.post('/user/select-role', {role:role});
            console.log('Успешно:', response.data);

            if(role==='designer'){
                navigate('/cp/designer');
            }else{
                navigate('/cp/company');
            }

        } catch (error) {
            console.error('Ошибка:', error.response?.data || error.message);            
            setErrorMessage('Не удалось сохранить настройки')
            throw error; // Можно обработать ошибку в компоненте
        }
    }

    return(
        <>
        <section className="container is-max-desktop desktop-only">
        <div className="section">
            <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><a href="/">Главная</a></li>
                <li className="is-active"><a href="#" aria-current="page">Выбор админки</a></li>
            </ul>
            </nav>
        </div>
        </section>
            
        <section className="container">
            <div className="section">
                <div className="article">
                <article>
                    <h2>Выберите роль</h2>                    
                    <button className="button is-large is-primary mr-2" onClick={()=>{hdlClick('designer')}}>Я дизайнер</button>
                    <button className="button is-large is-link" onClick={()=>{hdlClick('company')}}>Я заказчик</button>

                    <div className="block">
                    {
                        errorMessage && (
                            <ErrorMessage message={errorMessage} />
                        )
                    }
                    </div>


                </article>            
                </div>
            </div>
        </section>            

        </>
    )
}