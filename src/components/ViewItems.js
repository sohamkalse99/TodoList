"use client"

import React, {useState, useEffect} from 'react'
import Additem from './AddItem.js'
import axios from 'axios';
import {useParams} from 'react-router-dom'
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import {Link} from 'react-router-dom';

function ViewItems() {
  const {listId} = useParams();

  // console.log(listId);
  const [items, setItems] = useState([]);

  async function fetchItems(){

    try{
      const response = await axios.get(`http://localhost:5000/todolist/${listId}/todoitems`)
      // console.log(response.data);
      setItems(response.data.message);

    }catch(e){
      console.error(e)
    }

  }
  useEffect(()=>{

    fetchItems();

  },[]);

  const handleNewItem = ()=>{
    fetchItems();
  }

  async function handleDelete(itemId){
    try{

      const response = await axios.delete(`http://localhost:5000/todolist/${listId}/deleteitem/${itemId}`)

      if(response.data.message == "Todo item not found"){
        alert('Todo item not found')
      }else if(response.data.message == "Todo item deleted successfully"){
        setItems(items.filter(item=>item.id!==itemId))
      }
    } catch(e){
      console.log(e)
    } 
    
  }
  return (
      // <div className='todolist bg-gray-100 p-4'>
      //       <Additem callback={handleNewItem}/>
      //       <h1 className="text-2xl font-bold mb-4 text-center">Todo Items</h1>
      //           <ul className="list-none pl-4 text-center">
      //               {items.map((item)=>(
      //                 <li key={item.id} className="py-1">
      //                     <span className="text-gray-800">{item.content}</span>
      //                     <span className="text-gray-800">{item.due_date}</span>
      //                     <span className="text-gray-800">{item.is_completed}</span>
      //                 </li>
      //               ))}
      //           </ul>
      //   </div>
      <div className="container bg-gray-100 p-4">
        <Additem callback={handleNewItem} />
        <h1 className="text-2xl font-bold mb-4 text-center">Todo Items</h1>
        <ul className="list-unstyled pl-4 text-center">
          {items.map((item) => (
            <li key={item.id} className="py-1">
              <div className="d-flex justify-content-between">
                <span className="text-gray-800">{item.content}</span>
                <span className="text-gray-800">{item.due_date}</span>
                <span className="text-gray-800">{item.is_completed}</span>
                <span><button className="btn btn-danger" onClick={() => handleDelete(item.id)}><BsTrash /></button></span>
                <span><Link to={`/todolists/${listId}/updateitem/${item.id}`} className="btn btn-secondary mr-2"><BsPencilSquare /></Link></span>
                
              </div>
            </li>
          ))}
        </ul>
      </div>

  )


}


export default ViewItems