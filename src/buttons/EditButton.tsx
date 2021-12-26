import React, { useState, ChangeEvent } from 'react';
import { Button, Input, Modal, Col } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { editTodo } from '../redux/features/todo/todoSlice';

interface EditButtonPropsType {
  id: number;
  selected: number;
  modalCheck: Function;
}

function EditButton({ id, selected, modalCheck }: EditButtonPropsType) {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todo, setIsTodo] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
    modalCheck(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    dispatch(editTodo({ id, content: todo }));
    setIsTodo('');
    modalCheck(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    modalCheck(false);
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTodo(e.target.value);
  };

  return (
    <>
      <Col
        xs={selected !== id ? 0 : 2}
        sm={selected !== id ? 0 : 2}
        md={selected !== id ? 0 : 1}
        lg={selected !== id ? 0 : 1}
        xl={selected !== id ? 0 : 1}
      >
        <Button
          style={{
            backgroundColor: '#408FD4',
          }}
          shape="circle"
          icon={<EditFilled style={{ color: 'white' }} />}
          onClick={showModal}
        />
      </Col>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Edit to do</p>
        <Input placeholder="What to do?" value={todo} onChange={handleInput} />
      </Modal>
    </>
  );
}

export default EditButton;
