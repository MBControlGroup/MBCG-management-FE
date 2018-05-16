// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Button, DatePicker } from 'antd';

import { observer, inject } from 'mobx-react';
import TextInput from '../../../component/Input';
import { MobxForm } from '../../../utils/';
import post from '../../../utils/fetch';


// 对于引用类型的initial有可能是无效的,所以这个时候请用extra或者其他手段规避一下
export const fields = [
  {
    name: 'title',
    placeholder: '请输入消息主题',
    rules: 'string',
    label: '消息主题',
  },
  {
    name: 'send_time',
    placeholder: '请输入发送日期',
    label: '发送日期',
  },
  {
    name: 'author',
    placeholder: '请输入发送人',
    rules: 'string',
    label: '发送人',
  },

];

type Props = {
    form: Object,
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 15px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonRow = Row.extend`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

@inject('message')
@observer
export default class MessageQueryForm extends React.Component<Props> {
  async clearSearch() {
    this.props.form.clear();
  }

  render() {
    const { form } = this.props;
    return (
      <FormContainer>
        <ButtonRow>
          {fields.map((field) => {
                        if (field.name === 'send_time') {
                            return (
                              <Row style={{ marginTop: 0, marginBottom: 15, marginRight: 20 }} key={field.name}>
                                <span style={{ width: 80, marginTop: 7 }}>发送日期：</span>
                                <DatePicker
                                  key="picker"
                                  placeholder="请选择发送日期"
                                  value={form.$('send_time').value}
                                  onChange={(moments) => {
                                            form.$('send_time').onChange(moments);
                                        }}
                                />
                              </Row>
                            );
                        }
                       return <TextInput field={form.$(field.name)} key={field.name} width={190} />;
                    })}
        </ButtonRow>
        <Row>
          <Button type="primary" size="small" onClick={form.onSubmit} style={{ marginRight: 10 }}>
                        查询
          </Button>
          <Button
            size="small"
            onClick={() => {
                            this.clearSearch();
                        }}
          >
                        重置
          </Button>
        </Row>
      </FormContainer>
    );
  }
}

// 如果不需要重写内容就直接导入这个,不然自行通过导出的fields去new MobxForm 再传递下来。
export const messageQueryForm = new MobxForm({ fields });
