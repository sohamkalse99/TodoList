import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateItem() {

    const navigate = useNavigate();

    const {listId, itemId} = useParams();


    const [itemDetails, setItemDetails] = useState({
        content:"",
        dueDate:null,
    });

    useEffect(()=>{
        axios.get(`http://localhost:5000/todolist/${listId}/updateitem/${itemId}`).then((response)=>{
            console.log(response.data)
            setItemDetails(
                {
                    content:response.data.message[0].content,
                    dueDate:response.data.message[0].due_date
                }
            );
        })
        // const fetchData = async () => {
        //     try {
        //       const response = await axios.get(`http://localhost:5000/todolist/${listId}/updateitem/${itemId}`);
        //       console.log(response.data.message);
        //       setItemDetails(response.data);
        //     } catch (error) {
        //       console.error(error);
        //     }
        //   };
      
        //   fetchData();
    }, [listId, itemId]);


    const handleUpdate=async (event)=>{
        event.preventDefault();

        // axios.put(`http://localhost:5000/todolist/${listId}/updateitem/${itemId}`, itemDetails).then((response)=>{
        //     navigate(`/todolists/${listId}/todoitems`);
        // })

        try {
            await axios.put(`http://localhost:5000/todolist/${listId}/updateitem/${itemId}`, itemDetails);
            navigate(`/todolists/${listId}/todoitems`);
          } catch (error) {
            console.error(error);
          }
    }
  return (
    <div className='updateitem'>
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className='col-md-6'>
                    <h1 className='text-center'>Update Car Details</h1>
                    <br />
                    <form >
                        <div className='form-group'>
                            <label htmlFor='txtct'>Content</label>
                            <input type='text' id='txtct' className='form-control' placeholder='Content' value={itemDetails.content} onChange={(e) => setItemDetails({ ...itemDetails, content: e.target.value })}></input>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='dtdue'>Due Date </label>
                            <input type='date' id='dtdue' className='form-control' placeholder='Date' value={itemDetails.dueDate || ''} onChange={(e) => setItemDetails({ ...itemDetails, dueDate: e.target.value })}></input>
                        </div>
                        <input type='button' value="update" onClick={handleUpdate}></input>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateItem