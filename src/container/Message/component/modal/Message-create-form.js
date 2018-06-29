// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Button, Select, Checkbox,  } from 'antd';


import { observer, inject } from 'mobx-react';
import TextInput, { TextArea } from '../../../../component/Input';
import { MobxForm } from '../../../../utils/';
import post from '../../../../utils/fetch';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

// 对于引用类型的initial有可能是无效的,所以这个时候请用extra或者其他手段规避一下
export const fields = [
  {
    name: 'title',
    placeholder: '请输入消息主题',
    rules: 'string|required',
    label: '消息主题',
  },
  {
    name: 'num',
    placeholder: '请输入消息类型',
    label: '消息类型',
    value: '',
  },
  {
    name: 'bm_type',
    placeholder: '请输入消息类型',
    rules: 'string',
    label: '消息类型',
  },
  {
    name: 'notice_method',
    placeholder: '请输入通知类型',
    label: '通知类型',
    rules: 'required',
    value: [],
  },
];

const options = [
  { label: '公众号', value: 'wechat' },
  { label: '短信', value: 'sms' },
  { label: '语音', value: 'voice' },
];

type Props = {
    form: Object,
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 30px;
  width: 650px;
`;

const RowCt = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;


const ButtonRow = Row.extend`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

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
`;

@inject('message')
@observer
export default class MessageCreateForm extends React.Component<Props> {
  async clear() {
    this.props.form.clear();
  }

  render() {
    const { form } = this.props;
    return (
      <FormContainer>
        <ButtonRow>
          <Row>
            <TextInput field={form.$('title')} key="title" width={500} />
          </Row>
          <Row>
            <label style={{ width: 90, alignSelf: 'flex-start' }}>消息内容:</label>
            <textarea style={{ borderColor: '#CCC' }} disabled cols={70} rows={4} value={Number(form.$('num').value) > 0 ? this.props.message.template[Number(form.$('num').value) - 1].content : ''} />
          </Row>
          {
            this.props.message.variables.map((item, index) => {
              if (Number(form.$('num').value) > 0 && index < this.props.message.template[Number(form.$('num').value) - 1].vars) {
                return (
                  <Row key={"variable" + index}>
                    <label style={{ width: 90, alignSelf: 'flex-start' }}>{`参数${index + 1}`}</label>
                    <Inputfield value={this.props.message.variables[index]} onChange={(e) => { this.props.message.changeVariableValue(index, e.nativeEvent.target.value) }} />
                  </Row>
                )
              }
            })
          }
          <Row>
            <label style={{ width: 90, alignSelf: 'flex-start' }}>模版编号:</label>
            <Select defaultValue="" style={{ width: 500 }} {...form.$('num').bind()}>
              <Option value="1">邀请码</Option>
              <Option value="2">初始账号密码</Option>
              <Option value="3">集合通知</Option>
              <Option value="4">点名通知</Option>
              <Option value="5">回执消息</Option>
              <Option value="6">一般消息</Option>
            </Select>
          </Row>
          <Row>
            <label style={{ width: 90, alignSelf: 'flex-start' }}>消息类型:</label>
            <Select defaultValue="GT" style={{ width: 500 }} {...form.$('bm_type').bind()}>
              <Option value="GT">普通消息</Option>
              <Option value="Receipt">回执消息</Option>
              <Option value="Row">点名消息</Option>
            </Select>
          </Row>
          <Row>
            <label style={{ width: 90, alignSelf: 'flex-start' }}>通知方式:</label>
            <CheckboxGroup options={options} {...form.$('notice_method').bind()} />
          </Row>
        </ButtonRow>
        <RowCt>
          <Button type="primary" onClick={form.onSubmit} style={{ marginRight: 10 }}>
                        发送
          </Button>
        </RowCt>
      </FormContainer>
    );
  }
}

// 如果不需要重写内容就直接导入这个,不然自行通过导出的fields去new MobxForm 再传递下来。
export const messageCreateForm = new MobxForm({ fields });
