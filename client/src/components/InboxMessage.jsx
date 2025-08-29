
import styles from './InboxMessage.module.css'

const hdlClick = (e, url)=>{
    console.log('!!!!!, ', url, e)
    e.preventDefault()
    console.log('url', url)
    document.location.href=url;
}

export default function InboxMessage({messageData}){    
    return (         
        <div className={styles.message} id={messageData.id}>            
            
            <div className={styles.messageBell} ><i className={`fa-regular fa-bell is-primary`}></i></div>
            <h3>{messageData.title}</h3>
            <small>23 Июля 2025</small>
            <div className={styles.messageLinks}>
                {
                    messageData.links && messageData.links.length>0 && messageData.links.map((link, index)=>{
                        return (
                            <button key={index} 
                                className={`button ml-2 mt-2 is-small ${link.bright ? 'is-link' : 'is-primary'}`}
                                onClick={(e)=>hdlClick(e, link.url)} >
                                {link.name}
                            </button>
                        )
                    })
                }                     
            </div>
        </div>
    )
}