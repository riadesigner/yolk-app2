
export default function MainPageYoSlider(){
    return(
        <>
        <section className="container is-max-desktop desktop-only">             
            <div className="section">
                <div className="yo-slider">
                <svg width="4" height="1.5" viewBox="0 0 4 1.5"></svg>
                <div className="yo-slider-container">
                    <div className="p-6">
                        <h1 className="title is-size-3">Создай <br />свой<br /> профиль</h1>
                    </div> 
                    <div className="p-6">                    
                        <h1 className="title is-size-3">Заполни <br />свое<br /> портфолио</h1>
                    </div> 
                    <div className="p-6">                    
                        <h1 className="title is-size-3">Найди<br />свой<br />заказ</h1>
                    </div>
                </div> 
                </div>
            </div>        
        </section> 
        <div className="mobile-only">
        <section className="container mb-5">         
            <div className="section yo-main-tasks">                    
                <div className="block ">
                    <h1 className="title is-size-5">Создай свой профиль</h1>
                    <i className="fa-solid fa-arrow-right"></i>
                </div> 
                <div className="block ">                    
                    <h1 className="title is-size-5">Заполни свое портфолио</h1>
                    <i className="fa-solid fa-arrow-right"></i>
                </div> 
                <div className="block ">                    
                    <h1 className="title is-size-5">Найди свой заказ</h1>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
            </div>        
        </section> 
        </div>
        </>                 
    )
}