import React, { useState, ChangeEvent } from 'react';
import './App.css';
import Todo from './Todo';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { useDispatch } from 'react-redux';
import { addTodo } from './redux/features/todo/todoSlice';
import { Modal, Button, Input, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => {
    console.log(state.todos);
    return state.todos;
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todo, setIsTodo] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    dispatch(addTodo({ content: todo }));
    setIsTodo('');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTodo(e.target.value);
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <Row gutter={[0, 20]} align="middle" justify="center">
        {todos.map((todoObj) => {
          return (
            <Todo
              key={todoObj.id}
              id={todoObj.id}
              content={todoObj.content}
              completed={todoObj.completed}
            />
          );
        })}
      </Row>
      <Button
        size="large"
        style={{
          backgroundColor: '#1DE90D',
          marginTop: '1em',
        }}
        shape="circle"
        onClick={showModal}
      >
        <PlusOutlined
          style={{
            color: 'white',
          }}
        />
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Write what we need to do</p>
        <Input placeholder="What to do?" value={todo} onChange={handleInput} />
      </Modal>
    </div>
  );
}

export default App;
