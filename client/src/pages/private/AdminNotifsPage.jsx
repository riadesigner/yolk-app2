
import Breadcrumb from '../../components/Breadcrumb'
import NotifsList from '../../components/NotifsList'


export default function DesignerAdminNotifsPage(){
    const links = [
        {link:'/', title:'Главная'},
        {link:'/cp/yolk-admin', title:'Панель управления',},
        {link:'#', title:'Все сообщения', isActive:true},
    ];


    return (
        <>
        <section className="container is-max-desktop desktop-only">
        <div className="section">
            <Breadcrumb links={links}/>
        </div>
        </section>

        <NotifsList />

        </>
    )
}