const {sq} = require("../config_db/db.js");
const DataTypes = require("sequelize");

const TodoLists = sq.define("todo_lists", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    title:{
        type:DataTypes.STRING(255),
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
}, {timestamps:false,});

const TodoItems = sq.define("todo_items",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    todo_list_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'todo_lists',
            key:'id'
        }
    },
    content:{
        type:DataTypes.STRING(255),
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    due_date:{
        type:DataTypes.DATEONLY,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    is_completed:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
}, {timestamps:false,});

TodoLists.hasMany(TodoItems,{
    foreignKey:'todo_list_id'
});
TodoItems.belongsTo(TodoLists,{
    foreignKey:'todo_list_id',
});

TodoLists.sync().then(function(){
    console.log("TodoLists Model synced");
});

TodoItems.sync().then(function(){
    console.log("TodoItems Model synced");
}).catch(function(error){
    console.error("Error in todoitem model", error);
});

module.exports = {TodoLists, TodoItems};