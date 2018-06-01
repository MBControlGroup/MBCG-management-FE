// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Button, Modal } from 'antd';

import unLoginRedirect from '../../component/hoc/unlogin-redirect';
import MessageTable from './component/Message-table';
import Pagination from '../../component/Pagination';
import MessageDetail from './component/modal/MessageDetail';

import post from '../../utils/fetch';

import Form, { messageQueryForm } from './component/Message-query-form';
import MessageCreateForm, { messageCreateForm } from './component/modal/Message-create-form';

// 样式模块，直接用css书写
const Container = styled.div`
  background-color: #FFF;
  margin-top: 20px;
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`;

type PropType = {
  message: Object,
  isLogin: boolean,
  nav: Object
}

@inject(stores => ({
  isLogin: stores.user.isLogin,
  message: stores.message,
  nav: stores.nav,
}))
@unLoginRedirect('/login')
@observer
class Message extends Component<PropType> {
  constructor(props: PropType) {
    super(props);
    messageQueryForm.$hooks.onSuccess = (form) => {
      console.log(form.values());
    };
    messageCreateForm.$hooks.onSuccess = async (form) => {
      try {
        console.log(form.values());
        const { notice_method, ...other } = form.values();
        await post('https://private-240e1-messagemanagement.apiary-mock.com/BMmanage/createMes', {
          ...other,
          wechat_notice: notice_method.indexOf('wechat') !== -1 ? 1 : 0,
          sms_notice: notice_method.indexOf('sms') !== -1 ? 1 : 0,
          voice_notice: notice_method.indexOf('voice') !== -1 ? 1 : 0,
        });
      } catch(err) {
        console.log(err);
      } finally {
        this.props.message.toggleNewMessageModal();
      }
      
      
    };
  }

  componentDidMount() {
    this.props.message.getMessages();
    this.props.nav.setSelectedKey('nav_3');
  }

  render() {
    const {
      messageSum, currentPage, setPage, setPageSize, showModal, toggleModal, showNewMessageModal, toggleNewMessageModal, isInitingOpenedMessage,
    } = this.props.message;
    return (
      <Container>
        <Row>
          <Button
            type="primary"
            onClick={() => {
              toggleNewMessageModal();
            }}
          >
            + 新建消息
          </Button>
        </Row>
        <Form form={messageQueryForm} />
        <MessageTable />
        <Pagination
          total={messageSum}
          current={currentPage}
          onChange={(pageNumber) => {
            setPage(pageNumber);
          }}
          onShowSizeChange={(current, pageSize) => {
            setPageSize(pageSize);
          }}
        />
        <Modal
          title="消息详情"
          visible={showModal}
          footer={null}
          width={800}
          onCancel={() => toggleModal()}
        >
          {isInitingOpenedMessage ?
            <p>Loading...</p>
            : <MessageDetail />
          }
        </Modal>
        <Modal
          title="新建消息"
          visible={showNewMessageModal}
          footer={null}
          width={800}
          onCancel={() => toggleNewMessageModal()}
        >
          <MessageCreateForm form={messageCreateForm} />
        </Modal>
      </Container>
    );
  }
}

export default Message;
