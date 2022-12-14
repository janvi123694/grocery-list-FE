import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({list, removeItem,editItem}) => {
   return (
    <div className='grocery-list'>
      {
       list.map((item) => {
          const {id, title} = item; 
          console.log(id, title)
           return (
               <article className="grocery-item" key={id}>
                   <p className="title"> {title}</p>
                   <div className="btn-container">
                       <button
                           className="edit-btn"
                           type="button"
                           onClick={() => editItem(id)}
                       >
                           <FaEdit />
                       </button>
                       <button
                           className="delete-btn"
                           type="button"
                           onClick={() => removeItem(id)}
                       >
                           <FaTrash />
                       </button>
                   </div>
               </article>
           );
       })
      }
    </div>
   )
}

export default List
