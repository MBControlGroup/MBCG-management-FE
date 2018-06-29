import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

import MessageFeedbackTable from './Message-feedback-table';

const Container = styled.div`
 display: flex;
 flex-direction: row;
`;

const SubContaienr = styled.div`
  display: flex;
  flex-direction: column;
  /* border: solid 1px red; */
  flex: 1;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const MessageDetail = ({ message }) => (
  <Container>
    <SubContaienr>
      <p><Bold>消息标题:</Bold>{message.currentOpenedMessage.data.title}</p>
      <p><Bold>消息详情:</Bold>{message.currentOpenedMessage.data.detail}</p>
      <p><Bold>消息类型:</Bold>{message.currentOpenedMessage.data.bm_type}</p>
      <p><Bold>发送方式:</Bold>{message.currentOpenedMessage.data.send_method ? message.currentOpenedMessage.data.send_method.map((item) => {
        // if (item === 'wechat_notice') {
        //   return <span>微信公众号；</span>;
        // }
        // if (item === 'sms_notice') {
        //   return <span>短信通知；</span>;
        // }
        // if (item === 'voice_notice') {
        //   return <span>语音通知；</span>;
        // }
        return <span>{item}, </span>
      }) : null}
      </p>
      <p><Bold>发送时间:</Bold>{message.currentOpenedMessage.data.send_time}</p>
    </SubContaienr>
    <SubContaienr>
      <MessageFeedbackTable />
    </SubContaienr>
  </Container>
);

export default inject('message')(observer(MessageDetail));
