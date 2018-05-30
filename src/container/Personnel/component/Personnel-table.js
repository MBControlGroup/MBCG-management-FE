import * as React from 'react';
import { Table } from 'antd';

import PersonnelModify from './../component/Personnel-Modify';


const personInfo = [];
for (let i = 0; i < 80; ++i) {
  personInfo.push({
    key: '1',
    name: 'xxx',
    phone: '12345678900',
    idnum: '44010000000000',
    status: (i % 2 === 0) ? '已关注' : '未关注',
    branch: '番禺大学城街道',
    officer: 'officer',
    operation: '',
  });
};

const personColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '手机号码',
    dataIndex: 'phone',
    key: 'phone',
  }, {
    title: '身份证号',
    dataIndex: 'idnum',
    key: 'idnum',
  }, {
    title: '公众号状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '所属分支',
    dataIndex: 'branch',
    key: 'branch',
  }, {
    title: '直属指挥官',
    dataIndex: 'officer',
    key: 'officer',
  }, {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render() {
        return (
            <PersonnelModify />
        );
    }
  },
];

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];

class PersonnelTable extends React.Component<Props> {
    render() {
        return (
            <Table pagination={{ pageSize: 5 }} 
            style={{ marginTop: '20px' }} dataSource={personInfo} columns={personColumns} />
        );
    }
}
export default PersonnelTable;