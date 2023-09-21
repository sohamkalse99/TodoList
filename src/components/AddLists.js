import React, {useState, useEffect} from 'react'
import axios from 'axios'

function AddLists({callback}) {

    const[title, setTitle] = useState('');

    useEffect(()=>{

    }, [title]);

    async function add(e){

        const response = await axios.post("http://localhost:5000/addtodolist", {title});

        if(response.data.message == "An error occurred"){
            alert("An error occurred")
        }else{
            callback();
        }
    }
    return (
        <form className='w-full max-w-sm mx-auto'>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor='txtttl'>
                        Title
                    </label>
                </div>
                <div className="md:w-2/3 flex">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black-500" id="txtttl" type="text" placeholder="list"onChange={function(e){setTitle(e.target.value)}}></input>
                    <button type="button" onClick={add} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2'>Add</button>
                </div>
            </div>
            {/* <label htmlFor='txtttl'>Title: </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id='txtttl' onChange={function(e){setTitle(e.target.value)}}></input> */}
        </form>
    )
}

export default AddLists