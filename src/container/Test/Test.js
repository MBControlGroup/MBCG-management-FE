// @flow
import React from 'react';
import styled from 'styled-components';


// 样式模块，直接用css书写
const Container = styled.div`
  border: solid 1px red;
`;


type PropType = {
  match: Object,
}

function Test(props: PropType) {
  console.log('hi', props);
  return (
    <Container>
      <p>!!!!</p>
    </Container>
  );
}

export default Test;
