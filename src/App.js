import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
const eg = [
    {
        id: 1,
        title: "first",
    },
    {
        id: 2,
        title: "second",
    },
];

const getLocalStorage = () => {
  let list = localStorage.getItem('list'); 
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{

    return []
  }
}
function App() {
  const [list, setList] = useState(getLocalStorage()); 
  const [name, setName] = useState(''); 
 
  const [isEditing, setIsEditing] = useState(false); 
  const [editID, setEditID] = useState(null); 

  const [alert, setAlert] = useState({show : false, msg : '', type : ''}); 

  const addItem = (e, id) => {
    e.preventDefault(); 

    if(!name){
      showAlert(true, 'danger', 'please enter values')
    }
    else if(name && isEditing){
       setList(list.map((item) => {
        if(item.id === editID){
          return {...item, title : name}
        }
        return item
       })) 
       setName(""); 
       setEditID(null); 
       setIsEditing(false); 
    }
    else{
      const newItem = {
        id : new Date().getTime().toString(), 
        title : name
      }
      const nameList = [...list, newItem];
      setList(nameList);
      setAlert(true);
      setName("");
      showAlert(true, "success", "added");
    }
    
  }

  const showAlert = (show = false, type = "", msg ="") => {
    setAlert({show, type, msg})
  }

  const clearList = () => {
    showAlert(true, "success", "cleared");
    setList([])
  }

  const removeItem = (id) => {
    const newList = list.filter((item) => {
                    return item.id !== id; 
                  })
    setList(newList); 
  }

  const editItem = (id) => {
    const item = list.find((item) => item.id == id); 
    setIsEditing(true); 
    setEditID(id); 
    setName(item.title); // to diaplay it on input screen 
  }

 useEffect(() => {
  localStorage.setItem('list', JSON.stringify(list))
 }, [list])

  return (
      <section className="section-center">
          <form className="grocery-form" onSubmit={addItem}>
              {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
              <h3> Grocery bud</h3>
              <div className="form-control">
                  <input
                      className="grocery"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g eggs"
                  />
                  <button className="submit-btn" type="submit">
                      {isEditing ? "edit" : "submit"}
                  </button>
              </div>
          </form>

          {list.length > 0 && (
              <div className="grocery-container">
                  <List list={list} removeItem = {removeItem}
                    editItem={editItem}
                  />
                  <button className="clear-btn" onClick={clearList}> clear list </button>
              </div>
          )}
      </section>
  );
}

export default App
