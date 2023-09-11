const express = require("express");
const router = express.Router();
const {TodoLists, TodoItems} = require("./models/TodoLists.js");

router.post("/addtodolist", async(req, res)=>{
    const {title} = req.body;
    console.log(req.body);
    try{

        TodoLists.create({
            title: title
        }).catch((e)=>{
            if(e){
                console.log(e);
            }
        });

        res.status(200).json({message:"ToDoList Created"});

    }catch(e){
        console.log(e);
        res.status(500).json({message:"An error occurred"});
    }
})

router.post("/todolist/:id/addtodoitem", async(req, res)=>{
    try{
        // console.log(req.body.due_date);
        const {content, due_date} = req.body;
        // console.log(due_date);
        
        const todolistid = req.params.id;

        const isList = await TodoLists.findByPk(todolistid);
        // console.log(isList);

        if(!isList){
            res.status(404).json({message:"Todo list not found"});
        }

        const todoItem = await TodoItems.create({
            todo_list_id: todolistid,
            content: content,
            due_date:due_date
        })
        
        res.status(200).json("Item added successfully to the list");
    }catch(e){
        res.status(500).json({message:"An error occurred"});
    }
})
router.get("/todolist", async(req, res)=>{

    try{
        await TodoLists.findAll().then((records)=>{
            res.status(200).json({message:records})
        })
    }catch(e){
        res.status(500).json({message:"An error occurred"})
    }
});

router.get("/todolist/:id/todoitems", async(req, res)=>{
    try{
        const todolistId = req.params.id;

        await TodoItems.findAll({
            where:{
                todo_list_id:todolistId,
            },
        }).then((records)=>{
            res.status(200).json({message:records})
        }).catch((error)=>{
            res.status(500).json({message:"Cannot find Todo Item"});
        })
    }catch(e){
        res.status(500).json({message:"An error occurred"});
    }
})
module.exports = router