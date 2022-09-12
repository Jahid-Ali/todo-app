import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';


const App = () => {

  const [text, setText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');


  //Create a function to add new todo item to database
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/item', { item: text })
      console.log(res);
      setListItems(prev => [...prev, res.data]);

      //! after submit clear input box
      setText("");
    } catch (err) {
      console.log(err);
    }
  }


  //Create a function to fetch all todo items from database
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get('/api/item')
        setListItems(res.data);

        // console.log(res);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getItemsList();
  }, []);


  //Create a function to Delete item when click on delete
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`/api/item/${id}`)
      const newListItems = listItems.filter(item => item._id !== id);
      setListItems(newListItems);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }


  //Create a function to Update item when click on update
  const updateItem = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`/api/item/${isUpdating}`, { item: updateItemText })
      console.log(res.data)
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      const updatedItem = listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating('');
      console.log(updatedItem);
    } catch (err) {
      console.log(err);
    }
  }

  //before updating item we need to show input field where we will create our updated item
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e) => { updateItem(e) }} >
      <input type="text" placeholder="New Item" onChange={e => { setUpdateItemText(e.target.value) }} value={updateItemText} />
      <button type="submit">Update</button>
    </form>
  )



  return (
    <div className="todoItem_container">
      <div className="todoItem_header">
        <h1>Manage your Task</h1>
        <form className="form" onSubmit={(e) => { addItem(e) }}>
          <input type="text" placeholder="Add Task" onChange={(e) => { setText(e.target.value) }} value={text} />
          <button type="submit">Add</button>
        </form>
      </div>

      <div className="todoItem_List">
        {listItems.map((item) => (

          <div className="todoItem" key={item._id}>
            {
              isUpdating === item._id
                ? renderUpdateForm()
                : <>
                  <p className="item_content">{item.item}</p>
                  <button className="update_item" onClick={() => { setIsUpdating(item._id) }}>update</button>
                  <button className="delete_item" onClick={() => { deleteItem(item._id) }}>Delete</button>
                </>
            }
          </div>

        ))}
      </div>
    </div>
  );
}

export default App;
