import React, { Component } from 'react';
import { Table, Progress, Badge } from 'antd';
import { observer, inject } from 'mobx-react';
import history from '../../../component/History';

const url = 'http://private-3609bf-api497.apiary-mock.com';
const parameter = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
};

type PropType = {
    type: string,
}

@inject(stores => ({
  task: stores.task,
}))
@observer
class TaskTable extends Component<PropType> {
  constructor() {
    super();
    this.state = {
      workingTab: true,
      data: [],
      pagination: {
        total: 0,
        showTotal:
                    total => `总共 ${total} 个任务`,
      },
    };

    this.getWorkingData();
  }

  componentWillReceiveProps(props) {
    switch (props.type) {
      case 'working':
        this.setState({ workingTab: true });
        this.getWorkingData();
        break;
      case 'done':
        this.setState({ workingTab: false });
        this.getWorkingData();
        this.getDoneData();
        break;
    }
  }

  getWorkingData() {
    fetch(`${url  }/task/working/1/5`, parameter).then((response) => response.json()).then((responseData) => {
      const fetchData = [];
      responseData.data.forEach((element, index) => {
                let state = null;
                switch (element.status) {
                    case 'zj':
                        state = <Badge dot status="processing" text="人员征集"/>;
                        break;
                    case 'jh':
                        state = <Badge dot status="processing" text="集合中"/>;
                        break;
                    case 'zx':
                        state = <Badge dot status="processing" text="已集合"/>;
                        break;
                }
                fetchData.push({
                    key: index,
                    task_id: element.task_id,
                    title: element.title,
                    gather_place: element.gather_place,
                    detail: <Progress percent={element.detail * 100}/>,
                    status: <Badge dot status="processing" text="集合中"/>,
                    gather_datetime: element.gather_datetime,
                    operation: '',
                });
            });
      this.setState({ data: fetchData });
      const pagination = this.state.pagination;
      pagination.total = responseData.total_tasks;
      this.setState({ pagination });
    }).catch((error) => {
      console.log(error);
    });
  }

  getDoneData() {
    fetch(`${url  }/task/done/1/5`, parameter).then((response) => response.json()).then((responseData) => {
      const fetchData = [];
      responseData.data.forEach((element, index) => {
                fetchData.push({
                    key: index,
                    task_id: element.task_id,
                    title: element.title,
                    gather_place: element.gather_place,
                    launch_datetime: element.launch_datetime,
                    finish_datetime: element.finish_datetime,
                    operation: '',
                });
            });
      this.setState({ data: fetchData });
      const pagination = this.state.pagination;
      pagination.total = responseData.total_tasks;
      this.setState({ pagination });
    }).catch((error) => {
      console.log(error);
    });
  }

  handleClick(id) {
    console.log(id);
    this.props.task.setTaskID(id);
    history.push(`/task-detail/${id}`);
  }

  render() {
    

    const workingColumns = [
    {
        title: '任务编号',
        dataIndex: 'task_id',
    },
    {
        title: '任务主题',
        dataIndex: 'title',
    },
    {
        title: '集合地点',
        dataIndex: 'gather_place',
    },
    {
        title: '响应情况',
        dataIndex: 'detail',
    },
    {
        title: '状态',
        dataIndex: 'status',
    },
    {
        title: '集合时间',
        dataIndex: 'gather_datetime',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => (<a
                href="javascript:"
                onClick={() => this.handleClick(record.task_id)}
            >详情</a>),
    },
    ];

    const doneColumns = [
    {
        title: '任务编号',
        dataIndex: 'task_id',
    },
    {
        title: '任务主题',
        dataIndex: 'title',
    },
    {
        title: '集合地点',
        dataIndex: 'gather_place',
    },
    {
        title: '开始时间',
        dataIndex: 'launch_datetime',
    },
    {
        title: '结束时间',
        dataIndex: 'finish_datetime',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => (<a
                href="javascript:"
                onClick={() => this.handleClick(record.task_id)}
            >详情</a>),
    },
    ];
    return (
          <Table
              columns={this.state.workingTab ? workingColumns : doneColumns}
              dataSource={this.state.data}
              pagination={this.state.pagination}
            />
    );
  }
}

export default TaskTable;
