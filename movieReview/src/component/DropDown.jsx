function DropDown({children,handleChange,id,val}){
    //console.log(children)
    return<>
    
        <select className="selectGenre" defaultValue={"select"}   onChange={handleChange}>
        <option  value=' ' >Select {id}</option>
        {children.map((items,i)=>{
            
            return(<option key={i} value={items}>{items}</option>)
            
        })}
         
        
    </select>

    
    
    </>
}
export default DropDown;