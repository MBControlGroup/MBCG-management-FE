// @flow
import React from 'react';
import styled from 'styled-components';


// 样式模块，直接用css书写
const Container = styled.div`
  background-color: #FFF;
  margin-top: 20px;
  padding: 20px;
`;


type PropType = {
  match: Object,
}

function Message(props: PropType) {
  console.log('hi', props);
  return (
    <Container>
      <p>消息</p>
    </Container>
  );
}

export default Message;
