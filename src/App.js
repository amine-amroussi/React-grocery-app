import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = ()=> {
  let list = localStorage.getItem("list")
  if (list) {
    return JSON.parse(localStorage.getItem("list"))
  }else{
    return []
  }
}


function App() {

  const [name, setName] = useState("");
  const [list , setList] = useState(getLocalStorage());
  const [isEditing , setIsEditing] = useState(false);
  const [editID , setEditID] = useState(null);
  const [alert , setAlert] = useState({show : false , msg : " " , type : ""});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display alert
      showAlert(true , "please enter a value" , "danger");
    }
    else if (name && isEditing) {
      // deal with edit
      setList(list.map(item => {
        if (item.id === editID) {
            return {...item , title:name}
        }
        return item
      }))
      setName("")
      setEditID(null)
      setIsEditing(false)
      showAlert(true , "the item edited " , "success")
    }
    else {
      const newItem = { id : new Date().getTime().toString() , title : name }
      showAlert(true , "Items added to the list " , "success") 
      setList([...list , newItem]);
      setName("");
    }
  }

  const showAlert = ( show=false , msg = "" , type="" ) => {
    setAlert({show , type , msg })
  }

  const removeItem = (id) => {
    showAlert(true , "Item removed" , 'danger')
    setList(list.filter(item => item.id !== id))
  }

  const clearList = () => {
    showAlert(true , "empty list" , "danger")
    setList([])
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

  useEffect(()=> {
    localStorage.setItem("list" , JSON.stringify(list))
  },[list])

  return <section className="section-center" >
    <form className="grocery-form" onSubmit={handleSubmit} >

      {alert.show && <Alert {...alert} removeAlert={showAlert} /> }
      
      <h3>grocery bud</h3>
      <div className="form-control" >

        <input type="text" className="grocery" placeholder="e.g. eggs" value={name} onChange={(e)=> setName( e.target.value) } />

        <button className="submit-btn" type="submit" >
          {isEditing ? "Edit" : "Submit"}
        </button>

      </div>
    </form>
    {list.length > 0 && (
      <div className="grocery-container" >
        <List items={list} removeItem = {removeItem} editItem = {editItem} list={list} />
        <button className="clear-btn" onClick={ clearList }  >
         Clear items </button>
      </div>
    )}
    
  </section>
}

export default App
