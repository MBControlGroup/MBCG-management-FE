// @flow
import React from 'react';
import styled from 'styled-components';
import { Menu, Button, Table, Progress } from 'antd';

const columns = [
  {
    title: '任务编号',
    dataIndex: 'taskID',
  },
  {
    title: '任务主题',
    dataIndex: 'taskGoal',
  },
  {
    title: '集合地点',
    dataIndex: 'location',
  },
  {
    title: '响应情况',
    dataIndex: 'response',
  },
  {
    title: '状态',
    dataIndex: 'state',
  },
  {
    title: '集合时间',
    dataIndex: 'date',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render: () => <a href="javascript:">详情</a>,
  },
];

const data = [];
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    taskID: `XX-${i}`,
    taskGoal: '写代码',
    location: '大学城',
    response: <Progress percent={30} />,
    state: <span role="img">©️集合中</span>,
    date: '2018-5-12 13:51',
    operation: '',
  });
}

const pagination = {
  total: 666,
  showTotal: total => `总共 ${total} 个任务`,
};

// 样式模块，直接用css书写
const Container = styled.div`
  background-color: #FFF;
  margin-top: 20px;
  padding: 20px;
`;

const TaskButton = styled(Button)`
  float: right;
  clear: both;
  margin-bottom: 10px;
`;

const MenuStyled = styled(Menu)`
  background-color: lightgray; 
  clear: both;
`;

type PropType = {}

function Task(props: PropType) {
  console.log('hi', props);
  return (
    <Container>
      <div>
        <TaskButton type="primary">+发布任务</TaskButton>
      </div>
      <div>

        <MenuStyled mode="horizontal">
          <Menu.Item key="1">正在进行</Menu.Item>
          <Menu.Item key="2">已完成</Menu.Item>
        </MenuStyled>

        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
        />

      </div>
    </Container>

  );
}

export default Task;
