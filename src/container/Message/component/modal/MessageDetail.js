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
      <p><Bold>消息标题:</Bold>{message.currentOpenedMessage.Data.Title}</p>
      <p><Bold>消息详情:</Bold>{message.currentOpenedMessage.Data.Detail}</p>
      <p><Bold>消息类型:</Bold>{message.currentOpenedMessage.Data.Bm_type}</p>
      <p><Bold>发送方式:</Bold>{message.currentOpenedMessage.Data.Send_method.map((item) => {
        if (item === 'wechat_notice') {
          return <span>微信公众号；</span>;
        }
        if (item === 'sms_notice') {
          return <span>短信通知；</span>;
        }
        if (item === 'voice_notice') {
          return <span>语音通知；</span>;
        }
      })}
      </p>
      <p><Bold>发送时间:</Bold>{new Date(parseInt(message.currentOpenedMessage.Data.Send_time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')}</p>
    </SubContaienr>
    <SubContaienr>
      <MessageFeedbackTable />
    </SubContaienr>
  </Container>
);

export default inject('message')(observer(MessageDetail));
