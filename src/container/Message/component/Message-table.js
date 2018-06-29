// @flow
import React, { Component } from 'react';
import { Table, Modal } from 'antd';
import { observer, inject } from 'mobx-react';

type Props = {
  message: Object
}

@inject(stores => ({
  message: stores.message,
}))
@observer
export default class MessageTable extends Component<Props> {
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
    const { isLoadingMessages, getCurrentMessages, toggleModal, getCurrentOpenedMessage, setCurrentOpenMessage } = this.props.message;
    const columns = [
      {
        title: '消息主题',
        dataIndex: 'title',
      },
      {
        title: '消息内容',
        dataIndex: 'detail',
      },
      {
        title: '发送方式',
        dataIndex: 'send_method',
        render: text => (
          <div>
            {text.map((item, index) => {
                if (item === 'wechat_notice') {
                  return <span key={ 'mtype' + index }>微信公众号；</span>;
                }
                if (item === 'sms_notice') {
                  return <span key={'mtype' + index}>短信通知；</span>;
                }
                if (item === 'voice_notice') {
                  return <span key={'mtype' + index}>语音通知；</span>;
                }
              })}
          </div>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'send_time',
      },
      {
        title: '消息类型',
        dataIndex: 'bm_type',
      },
      {
        title: '操作',
        // dataIndex: 'actions',
        render: (text, record) => (
          <span>
            <a
              style={{ marginRight: 10 }}
              href="javascript:;"
              onClick={async () => {
              // alert(record.bm_id);
                toggleModal();
                setCurrentOpenMessage(record.bm_id);
                await getCurrentOpenedMessage();
              }}
            >
           详情
            </a>
          </span>
        ),
      },
    ];
    if (isLoadingMessages) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <Table
          dataSource={getCurrentMessages}
          pagination={false}
          // bordered
          rowKey={record => record.bm_id}
          columns={columns}
          // rowSelection={this.getRowSelection()}
        />
      </div> 
    );
  }
}
