import React from 'react'
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home.js'
import ViewLists from './components/ViewLists.js'
import ViewItems from './components/ViewItems.js'
import AddItem from './components/AddItem.js'
import UpdateItem from './components/UpdateItem.js'

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/todolists" element={<ViewLists />}/>
          <Route path='/todolists/:listId/todoitems' element={<ViewItems/>}></Route>
          <Route path='/todolists/:listId/addtodoitem' element={<AddItem/>}></Route>
          <Route path='/todolists/:listId/updateitem/:itemId' element={<UpdateItem/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
