import React, { useState } from 'react';
import { Button, Row, Col, Typography } from 'antd';
import moment from 'moment';
import EditButton from './buttons/EditButton';
import { useDispatch } from 'react-redux';
import {
  deleteTodo,
  SucessTodo,
  NoSucessTodo,
} from './redux/features/todo/todoSlice';

import { DeleteFilled, CheckOutlined, CloseOutlined } from '@ant-design/icons';

interface TodoPropsType {
  id: number;
  content: string;
  completed: boolean;
}
function Todo(props: TodoPropsType) {
  const { id, content, completed } = props;
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  function handleDelete(id: number) {
    dispatch(deleteTodo({ id }));
  }
  function modalCheck(isModalVisible: boolean) {
    if (isModalVisible) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }
  function handleSuccess(id: number) {
    dispatch(SucessTodo({ id }));
  }
  function handleNoSuccess(id: number) {
    dispatch(NoSucessTodo({ id }));
  }

  return (
    <>
      <Col
        xs={20}
        sm={20}
        md={20}
        lg={20}
        xl={20}
        style={{
          backgroundColor: selected
            ? '#F0F0F0'
            : completed
            ? '#1DE90D'
            : '#EB3737',
          borderRadius: '15px',
          color: 'white',
        }}
        onClick={() => {
          if (modalVisible) {
            setSelected(0);
          } else if (selected === 0) {
            setSelected(id);
          } else {
            setSelected(0);
          }
        }}
      >
        <Row justify="space-between" align="middle" wrap={true}>
          <Col
            style={{
              color: 'white',
            }}
            push={1}
            xs={24}
            sm={24}
            md={20}
            lg={20}
            xl={20}
          >
            <Typography.Paragraph
              ellipsis={{
                rows: 5,
                expandable: true,
              }}
            >
              <p
                style={{
                  marginBottom: '0',
                  marginTop: '1em',
                  textAlign: 'left',
                  color: 'white',
                }}
              >
                {moment(Date.now()).format('MMMM Do YYYY, hh:mm a')}
              </p>
              <p
                style={{
                  marginBottom: '0',
                  textAlign: 'left',
                  color: 'white',
                }}
              >
                {content}
              </p>
            </Typography.Paragraph>
          </Col>
          <Col
            pull={2}
            xs={24}
            sm={24}
            md={selected !== id ? 2 : 4}
            lg={selected !== id ? 2 : 4}
            xl={selected !== id ? 2 : 4}
          >
            <Row
              justify={selected !== id ? 'end' : 'space-between'}
              align="middle"
            >
              <Col
                xs={selected !== id ? 18 : 10}
                sm={selected !== id ? 18 : 10}
                md={selected !== id ? 2 : 1}
                lg={selected !== id ? 2 : 1}
                xl={selected !== id ? 2 : 1}
              >
                <Button
                  style={{
                    backgroundColor: selected !== id ? 'white' : '#E13739',
                  }}
                  shape="circle"
                  icon={
                    <DeleteFilled
                      style={{ color: selected !== id ? '#E13739' : 'white' }}
                    />
                  }
                  onClick={() => handleDelete(id)}
                />
              </Col>

              <EditButton id={id} selected={selected} modalCheck={modalCheck} />

              <Col
                xs={selected !== id ? 0 : 2}
                sm={selected !== id ? 0 : 2}
                md={selected !== id ? 0 : 1}
                lg={selected !== id ? 0 : 1}
                xl={selected !== id ? 0 : 1}
              >
                <Button
                  style={{ backgroundColor: '#E13739' }}
                  shape="circle"
                  icon={<CloseOutlined style={{ color: 'white' }} />}
                  onClick={() => handleNoSuccess(id)}
                />
              </Col>

              <Col
                xs={selected !== id ? 0 : 8}
                sm={selected !== id ? 0 : 8}
                md={selected !== id ? 0 : 1}
                lg={selected !== id ? 0 : 1}
                xl={selected !== id ? 0 : 1}
              >
                <Button
                  style={{ backgroundColor: '#25E414' }}
                  shape="circle"
                  icon={<CheckOutlined style={{ color: 'white' }} />}
                  onClick={() => handleSuccess(id)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default Todo;
