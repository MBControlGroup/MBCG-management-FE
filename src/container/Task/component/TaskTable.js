import React, {Component} from 'react';
import {Table, Progress, Badge} from 'antd';
import history from '../../../component/History';

const url = 'http://private-3609bf-api497.apiary-mock.com';
const header = {
    'Content-Type': 'application/json',
    method: 'POST',
};

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
        render: (text, record) => <a
            href="javascript:"
            onClick={() => this.handleClick(record.taskID)}
        >详情</a>,
    },
];

@inject(stores => ({
    task: stores.task,
}))
@observer
class TaskTable extends Component {
    constructor() {
        super();
        this.state = {
            dataType: 'working',
            data: [],
            pagination: {
                total: 0,
                showTotal:
                    total => `总共 ${total} 个任务`,
            },
        };

    }

    componentDidMount() {
        this.getWorkingData();
    }

    getWorkingData() {
        fetch(url + '/task/working/1/5', header).then((response) => {
            return response.json();
        }).then((responseData) => {
            const fetchData = [];
            responseData.data.forEach(function (element, index) {
                var state = null;
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
            this.setState({data: fetchData});
        }).catch((error) => {
            console.log(error);
        });
    }

    getDoneData() {
    }

    handleClick(id) {
        console.log(id);
        this.props.task.setTaskID(id);
        history.push(`/task-detail/${id}`);
    }

    render() {
        return (
            <Table
                columns={workingColumns}
                dataSource={this.state.data}
                pagination={this.state.pagination}
            />
        );
    }
}

export default TaskTable;
