export default function AddButton(props){
    const {label} = props;
    return (
        <div style={{
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center',                        
        }}>
            <button className="button is-primary is-large">{label}</button>
        </div>
    )
}


