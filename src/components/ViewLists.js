"use client"

import React, {useState, useEffect} from 'react'
import axios from "axios";
import AddLists from './AddLists.js';
import {Link} from 'react-router-dom';
import ViewItems from './ViewItems.js';
import { BsPencilSquare, BsTrash } from "react-icons/bs";

function TodoList() {

    const [lists, setLists] = useState([]);

    async function fetchLists(){

        try{
            const response = await axios.get("http://localhost:5000/todolist");
            setLists(response.data);
        }catch(e){
            console.error(e)
        }
        
    }
    useEffect(()=>{
        
        fetchLists();

    }, []);

    const handleNewTitle =()=>{
        fetchLists();
    }


    async function handleDelete(listId){
      try{
        
        const response = await axios.delete(`http://localhost:5000/deletelist/${listId}`)
  
        if(response.data.message == "List not found"){
          alert('List not found')
        }else if(response.data.message == "Todo list deleted successfully"){
          setLists(lists.filter(list=>list.id!==listId))
        }
      } catch(e){
        console.log(e)
      } 
      
    }
    return (
        // <div className='todolist bg-gray-100 p-4'>
        //     <AddLists callback={handleNewTitle}/>
        //     <h1 className="text-2xl font-bold mb-4 text-center">Todo Lists</h1>
        //     <ul className="list-none pl-4 text-center">
        //         {lists.map((list)=>(
        //           <Link key={list.id} to={`/todolists/${list.id}/todoitems`} >
        //             <li key={list.id} className="py-1">
        //             <span className="text-gray-800">{list.title}</span>
        //             </li>
        //           </Link>
        //         ))}
        //     </ul>
        // </div>

        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="bg-gray-100 p-4">
                <AddLists callback={handleNewTitle} />
                <h1 className="text-2xl font-bold mb-4 text-center">Todo Lists</h1>
                <ul className="list-unstyled pl-4 text-center">
                  {lists.map((list) => (
                    <li key={list.id} className="py-1">
                      <Link to={`/todolists/${list.id}/todoitems`} className="text-decoration-none">
                        <span className="text-gray-800">{list.title}</span>
                      </Link>
                      <span><button className="btn btn-danger" onClick={() => handleDelete(list.id)}><BsTrash /></button></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
    )

}

export default TodoList