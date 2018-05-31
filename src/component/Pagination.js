import React from 'react'
import styled from 'styled-components'
import { Pagination } from 'antd'

import { BaseText } from './base-style-component'
import { observer, inject } from 'mobx-react'

const PaginationText = BaseText.extend`
  color: #c4c4c4;
  font-size: 13px;
`

const PaginationContainer = styled.div`
  /* position: absolute;
  bottom: 15px;
  left: 15px;
  right: 15px; */
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const CustomPagination = (props) => {
  return (
    <PaginationContainer>
      <PaginationText>共{props.total}条记录</PaginationText>
      <Pagination showSizeChanger showQuickJumper {...props} />
    </PaginationContainer>
  )
}

export default CustomPagination
