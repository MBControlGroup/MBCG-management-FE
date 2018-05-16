// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { Select, Form, Input } from 'antd'

const FormItem = Form.Item

const Option = Select.Option

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-right: 20px;
`

const InputContainerMB10 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-right: 20px;
  margin-bottom: 10px;
`
const Inputfield = styled.input`
  border: solid 0.5px ${props => props.borderColor};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: 5px;
  outline: none;
  padding: 0 10px 0 10px;
  &:focus {
    border: solid 0.5px #1890fc;
  }
`

const Textarea = styled.textarea`
  border: solid 0.5px ${props => props.borderColor};
  border-radius: 5px;
  outline: none;
  padding: 0 10px 0 10px;
  &:focus {
    border: solid 0.5px #1890fc;
  }
`

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export default observer(({
  width = 200, height = 34, field, type = 'text', placeholder = null, disable = false,
}) => {
  const isThereError = field.error !== null;
  return (
    <InputContainer>
      {field.label === '跳转标题' ? null : (
        <div style={{ paddingTop: 8, marginRight: 10, width: 80 }}>{`${field.label}:`}</div>
        )}

      <ColumnContainer>
        <Inputfield
          {...field.bind({ type, placeholder })}
          disabled={disable}
          height={height}
          width={width}
          borderColor={isThereError ? '#ff5851' : '#d9d9d9'}
        />
        <small style={{ marginTop: 5, color: '#ff5851' }}>{field.error}</small>
      </ColumnContainer>
    </InputContainer>
  )
})

export const TextArea = observer(({
  rows = 4, cols = 50, field, type = 'text', placeholder = null, disable = false,
}) => {
  const isThereError = field.error !== null
  return (
    <InputContainerMB10>
      <div
        style={{
            paddingTop: 8,
            marginRight: 10,
            alignSelf: 'flex-start',
            width: 40,
          }}
      >
        {field.label}:
      </div>
      <ColumnContainer>
        <Textarea
          cols={cols}
          rows={rows}
          {...field.bind({ type, placeholder })}
          disabled={disable}
          borderColor={isThereError ? '#ff5851' : '#d9d9d9'}
        />
        <small style={{ marginLeft: 14, color: '#ff5851' }}>{field.error}</small>
      </ColumnContainer>
    </InputContainerMB10>
  )
})

export const ComboBox = observer(({
  width = 200, height = 34, field, type = 'text', placeholder = null, children,
}) => {
  const isThereError = field.error !== null
  return (
    <InputContainer>
      <label style={{ width: 70, alignSelf: 'flex-start' }}>{field.label}:</label>
      <Select
        mode='combobox'
        {...field.bind({ type, placeholder })}
        style={{ width, borderColor: isThereError ? '#ff5851' : '#d9d9d9' }}
      >
        {children}
      </Select>
      <small style={{ marginLeft: 14, color: '#ff5851' }}>{field.error}</small>
    </InputContainer>
  )
})

export const SimpleInput = observer(({ width = 200, height = 34, value }) => {
  return (
    <InputContainer>
      <Inputfield disabled value={value} height={height} width={width} borderColor={'#d9d9d9'} />
    </InputContainer>
  )
})

export const SimpleTextArea = observer(({ cols = 100, rows = 10, value }) => {
  return (
    <InputContainerMB10>
      <Textarea disabled value={value} cols={cols} rows={rows} borderColor={'#d9d9d9'} />
    </InputContainerMB10>
  )
})

export const OldTextInput = (props) => {
  const {
    error,
    onErrorClick,
    icon,
    label,
    layout,
    validating,
    help,
    validateStatus,
    ...otherProps
  } = props
  return (
    <FormItem
      label={label}
      help={help}
      layout={layout}
      formItemLayout={layout}
      validateStatus={
        validateStatus ? validateStatus : validating ? 'validating' : error ? 'error' : ''
      }
    >
      <Input {...otherProps} />
    </FormItem>
  )
}
