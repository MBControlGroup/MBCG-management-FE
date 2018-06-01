// @flow
import React, { Component } from 'react';
import { Table } from 'antd';
import { observer, inject } from 'mobx-react';

type Props = {
  message: Object
}

@inject(stores => ({
  message: stores.message,
}))
@observer
export default class MessageFeedbackTable extends Component<Props> {
//   getRowSelection = () => {
//     return {
//       onSelectAll: (selected) => {
//         const { orders, setSelectedRows } = this.props.checking
//         if (selected) {
//           setSelectedRows(orders.map(order => order.id))
//         } else {
//           setSelectedRows([])
//         }
//       },
//       selectedRowKeys: this.props.checking.selectedRows,
//       onChange: (selectedRowKeys, selectedRows) => {
//         this.props.checking.setSelectedRows(selectedRowKeys)
//         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
//       },
//       getCheckboxProps: record => ({
//         name: record.name,
//       }),
//     }
//   }

  render() {
    const { isInitingOpenedMessage, currentOpenedMessage } = this.props.message;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'Name',
      },
      {
        title: '手机号码',
        dataIndex: 'Phone_num',
      },
      {
        title: '级别',
        dataIndex: 'Rank',
      },
      {
        title: '回复内容',
        dataIndex: 'Rec_content',
      },
    ];
    if (isInitingOpenedMessage) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <Table
          dataSource={currentOpenedMessage.Soldiers}
          pagination={false}
          // bordered
          rowKey={record => record.Soldier_id}
          columns={columns}
          // rowSelection={this.getRowSelection()}
        />
      </div>
      
    );
  }
}
