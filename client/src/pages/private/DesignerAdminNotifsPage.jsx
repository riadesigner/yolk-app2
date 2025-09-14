import { Link, useNavigate } from 'react-router-dom';

import useFetchDesignerAdminNotifs from './hooks/useFetchDesignerAdminNotifs'

import Breadcrumb from '../../components/Breadcrumb'
import InboxMessage from '../../components/InboxMessage'
import styles from './DesignerAdminNotifsPage.module.css'

export default function DesignerAdminPage(){
    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/designer', title:'Панель управления',},
        {link:'#', title:'Все сообщения', isActive:true},
    ];

    const {
        notifications,
    } = useFetchDesignerAdminNotifs();

    return (
        <>
        <section className="container is-max-desktop desktop-only">
        <div className="section">
            <Breadcrumb links={links}/>
        </div>
        </section>

        <section className="container">
            <div className="section">
                <article>
                    <div className={styles.inboxMessages}>
                        {
                            notifications.length > 0 ? notifications.map((msg)=>{
                                return (
                                    <InboxMessage key={msg.id} messageData={msg} />
                                )
                            }):(
                                <p className="block has-text-centered">Сообщений нет</p>
                            )
                        }                                
                    </div> 
                
                </article>
            </div>
        </section>
        </>
    )
}