

export default function Field(props){
    const {type, label, sublabel, placeHolder} = props;
    const strPlaceHolder = placeHolder??'Введите текст';

    return(
        <div className="field">
        {
            label ? (
                sublabel ? (
                    <>
                        <label className="label mb-1">{label}</label>                    
                        <div className="subtitle is-size-7 mb-2">{sublabel}</div>
                    </>                    
                ):(
                    <label className="label">{label}</label>
                )                
            ): sublabel && (
                <div className="subtitle is-size-7 mb-2">{sublabel}</div>
            ) 
        }
        <div className="control">
            {
                type && type==='textarea' ? (
                    <textarea className="input" rows="8" placeholder={strPlaceHolder}></textarea>
                ):(
                    <input className="input" type="text" placeholder={strPlaceHolder} />
                )
            }            
        </div>
        </div>        
    )
}