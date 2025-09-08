export default function AddButton(props){
    const {label, onClick} = props;
    console.log('onClick = ', onClick)
    return (
        <div style={{
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center',                        
        }}>
            <button onClick={(e)=>onClick(e)} className="button is-primary is-large">{label}</button>
        </div>
    )
}


