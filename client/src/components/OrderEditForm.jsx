import Field from '../components/Field'

export default function OrderEditForm({options}){
    
    const {
        title,
        setTitle,
        description,
        setDescription,
        cats,
        setCats,
        tags,
        setTags,
    } = options;    

    const hdlCatClick = (e, catId)=>{
        e.preventDefault();
        const newCats = [...cats];
        newCats.map((cat)=>{
            if(cat.id===catId){
                return cat.selected ? cat.selected = false :  cat.selected = true;
            }else{
                return cat;
            }            
        })        
        setCats(newCats);
    }

    return (
        <div className="box">
            
            <h3 >Краткое название<small>*</small></h3> 
            <Field 
                placeHolder="Разработать фирменный стиль для магазина одежды"
                value={title}
                onChange={(val) => setTitle(val)}
                />                    
            
            <br />

            <h3>Описание заказа<small>*</small></h3> 
            <Field 
                sublabel="(до 1500 символов)" 
                value={description}
                onChange={(val) => setDescription(val)}
                type="textarea"/>
            
            <h3>Категории заказа:</h3> 
            <div className="block">
                {
                    cats && cats.length>0 && (
                        cats.map((cat)=>{
                            return (
                                cat.selected ? (
                                    <button key={cat.id} className="button is-small is-link mr-2 mb-2" 
                                        onClick={(e)=>hdlCatClick(e,cat.id)}>
                                        <span>{cat.name}</span>
                                        <span><i className="fa-solid fa-check"></i></span>                                            
                                    </button>
                                ):(
                                    <button key={cat.id} className="button is-small mr-2 mb-2" 
                                        onClick={(e)=>hdlCatClick(e,cat.id)}>
                                        <span>{cat.name}</span>                                                
                                    </button>      
                                )
                            )
                        })
                    )
                }
            </div>     

            <h3>Теги заказа:</h3>                    
            <Field 
                sublabel="Добавьте через запятую:"  
                placeHolder="реклама, верстка, полиграфия"
                value={tags}
                onChange={(val) => setTags(val)}                        
                />
            
            <br />
            <p><small>Поля со звездочкой (*) обязательные</small></p>
            
        </div>        
    )
}