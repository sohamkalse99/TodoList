import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AddTodoItem({callback}) {

    const {listId} = useParams();
    const [content ,setContent] = useState("");
    const [dueDate ,setDueDate] = useState(null);


    useEffect(()=>{

    }, [content, dueDate]);
    async function add(e){
        try{
            const response = await axios.post(`http://localhost:5000/todolist/${listId}/addtodoitem`,{listId,content, dueDate});

            if(response.data.message == "Todo list not found"){
                alert("An error occurred");
            }else{
                callback();
            }
        }catch(e){
            console.error("An error occurred in catch");
        }
        
        
    }
  return (
    <form className='w-full max-w-sm mx-auto'>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor='txtct'>
                        Content
                    </label>
                </div>
                <div className="md:w-2/3 flex">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black-500" id="txtct" type="text" onChange={function(e){setContent(e.target.value)}}></input>
                </div>

                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor='txtdt'>
                        Due Date
                    </label>
                </div>
                <div className="md:w-2/3 flex">
                    <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="txtdt"  placeholder="Select Date" onChange={function(e){setDueDate(e.target.value)}}></input>
                </div>
                <button type="button" onClick={add} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2'>Add</button>

            </div>
            {/* <label htmlFor='txtttl'>Title: </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id='txtttl' onChange={function(e){setTitle(e.target.value)}}></input> */}
        </form>
  )
}

export default AddTodoItem