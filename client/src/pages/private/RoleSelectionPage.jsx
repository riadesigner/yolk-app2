

export default function AboutPage(){
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
                    <button className="button is-large is-primary mr-2">Я дизайнер</button>
                    <button className="button is-large is-link">Я заказчик</button>
                </article>            
                </div>
            </div>
        </section>
        </>
    )
}