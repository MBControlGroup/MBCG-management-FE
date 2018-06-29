// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Button, Select, Checkbox } from 'antd';


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
    name: 'detail',
    placeholder: '请输入消息正文',
    label: '消息正文',
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
          {fields.map((field) => {
            if (field.name === 'detail') {
              return (
                <Row>
                  <TextArea field={form.$(field.name)} key={field.name} cols={60} rows={6} />
                </Row>
              );
            }
            if (field.name === 'bm_type') {
              return (
                <Row>
                  <label style={{ width: 90, alignSelf: 'flex-start' }}>消息类型:</label>
                  <Select defaultValue="GT" style={{ width: 500 }} {...form.$(field.name).bind()}>
                    <Option value="GT">普通消息</Option>
                    <Option value="Receipt">回执消息</Option>
                    <Option value="Row">点名消息</Option>
                  </Select>
                </Row>
              );
            }
            if (field.name === 'notice_method') {
              return (
                <Row>
                  <label style={{ width: 90, alignSelf: 'flex-start' }}>通知方式:</label>
                  <CheckboxGroup options={options} {...form.$(field.name).bind()} />
                </Row>
              );
            }
                       return (
                         <Row>
                           <TextInput field={form.$(field.name)} key={field.name} width={500} />
                         </Row>
                        )
                    })}
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
