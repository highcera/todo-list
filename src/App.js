import './App.css';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtdkaMPLsC8NW8eiAFOiXwr5YH5gvBJVQ",
  authDomain: "todo-list-app-demo-be6a4.firebaseapp.com",
  projectId: "todo-list-app-demo-be6a4",
  storageBucket: "todo-list-app-demo-be6a4.appspot.com",
  messagingSenderId: "690090942307",
  appId: "1:690090942307:web:4ed8fe97097947a6143d56",
  measurementId: "G-4V2F3HNF90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

let todoItemId = 0;

const TodoItemInputField = (props) => {
  const [input, setInput] = useState("");

  const onSubmit = () => {
    props.onSubmit(input);
    setInput("");
  };

  return (<div>
    <TextField
      id="todo-item-input"
      label="Todo Item"
      variant="outlined"
      onChange={(e) => setInput(e.target.value)} value={input}
    />    
    <Button variant="outlined" onClick={onSubmit}>Submit</Button>
  </div>);
};

const TodoItem = (props) => {
  const style = props.todoItem.isFinished ? { textDecoration: 'line-through'} : {};
  return (<li>
    <span style={style} onClick={() => props.onTodoItemClick(props.todoItem)}>
      {props.todoItem.todoItemContent}</span>
    <Button variant="outlined" onClick={() => props.onRemoveClick(props.todoItem)}>Remove</Button>
  </li>);
};

const TodoItemList = (props) => {
  const todoList = props.todoItemList.map((todoItem, index) => {
    return <TodoItem
      key={index} 
      todoItem={todoItem} 
      onTodoItemClick={props.onTodoItemClick}
      onRemoveClick={props.onRemoveClick}
    />;
  });
  return (<div>
    <ul>{todoList}</ul>
  </div>);
};

function App() {
  const [todoItemList, setTodoItemList] = useState([]);

  const onSubmit = (newTodoItem) => {
    setTodoItemList([...todoItemList, {
      id: todoItemId++,
      todoItemContent: newTodoItem,
      IsFinished: false,
    }]);
  };

  const onTodoItemClick = (clickedTodoItem) => {
    setTodoItemList(todoItemList.map((todoItem) => {
      if (clickedTodoItem.id === todoItem.id) {
        return {
          id: clickedTodoItem.id,
          todoItemContent: clickedTodoItem.todoItemContent,
          isFinished: !clickedTodoItem.isFinished,
        };
      } else {
        return todoItem;
      }
    }));
  };

  const onRemoveClick = (removedTodoItem) => {
    setTodoItemList(todoItemList.filter((todoItem) => {
      return todoItem.id !== removedTodoItem.id;
    }));
  };

  return (
    <div className="App">
      <TodoItemInputField onSubmit={onSubmit} />     
      <TodoItemList 
        todoItemList={todoItemList}
        onTodoItemClick={onTodoItemClick}
        onRemoveClick={onRemoveClick}
      /> 
    </div>
  );
}

export default App;