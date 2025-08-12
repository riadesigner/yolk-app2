import styles from './Pagination.module.css'

export default function Pagination(){

    const links = [
        {link:'#page1', title:'Назад'},
        {link:'#page1', title:'1'},
        {link:'#page2', title:'2', isActive:true},
        {link:'#page3', title:'3'},
        {link:'#page4', title:'4'},
        {link:'#page3', title:'Вперед',},
    ]

    const linksMobile = [
        {link:'#page1', title:'Назад'},        
        {link:'#page2', title:'1 / 12', isActive:true},        
        {link:'#page3', title:'Вперед',},
    ]    

    return(
        <>
        <div className="desktop-only">
        <div className={styles.pageLinks}>        
            {
                links.map((el, index)=>{
                    return el.isActive ? (
                        <span key={index}>{el.title}</span>
                    ):(
                        <a key={index} href={el.link}>{el.title}</a>
                    )
                })
            }        
        </div>         
        </div>
        <div className="mobile-only">
        <div className={styles.pageLinks}>        
            {
                linksMobile.map((el)=>{
                    return el.isActive ? (
                        <span>{el.title}</span>
                    ):(
                        <a href={el.link}>{el.title}</a>
                    )
                })
            }        
        </div>       
        </div>
        </>
    )
}