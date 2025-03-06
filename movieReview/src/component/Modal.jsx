import './modal.css'

export default function Modal({children,handle}){
    return(
    <div className="modal">
        <div className="modal-container"> 
            
                <p>{children}</p>

            
            <div className="modal-footer">
                <button style={{float:'right',backgroundColor:"blue"}} onClick={()=>handle(false)} >Cancel</button>
                <button style={{float:'right',backgroundColor:'red',color:"black"}} onClick={()=>handle(true)} >Confirm</button>
            </div>
        </div>
    </div>
    
    )
}