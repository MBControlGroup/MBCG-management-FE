import React, { Component } from 'react';
import { Table, Progress, Badge } from 'antd';

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
    state: <Badge dot status="processing" text="集合中" />,
    date: '2018-5-12 13:51',
    operation: '',
  });
}

const pagination = {
  total: 666,
  showTotal: total => `总共 ${total} 个任务`,
};

class TaskTable extends Component {
  render() {
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
      />
    );
  }
}

export default TaskTable;
