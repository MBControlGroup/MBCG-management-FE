import React, {Component} from 'react';
import {Form, Row, Col, Input, InputNumber, Select, DatePicker, TimePicker} from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #FFF;
  margin-top: 20px;
  padding: 20px;
`;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 8},
    colon: true,
};

const locationOptions = [
    <Select.Option key="东校区">东校区</Select.Option>,
    <Select.Option key="南校区">南校区</Select.Option>,
    <Select.Option key="北校区">北校区</Select.Option>,
    <Select.Option key="珠海校区">珠海校区</Select.Option>,
];

class TaskCreate extends Component {
    render() {
        return (
            <Container>
                <Form>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="任务主题" {...formItemLayout}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="人数" {...formItemLayout}>
                                <InputNumber/>
                            </Form.Item>
                            <Form.Item label="征集范围" {...formItemLayout}>
                                <Select mode="multiple">{locationOptions}</Select>
                            </Form.Item>
                            <Form.Item label="选择日期" {...formItemLayout}>
                                <DatePicker/>
                            </Form.Item>
                            <Form.Item label="集合时间" {...formItemLayout}>
                                <TimePicker/>
                            </Form.Item>
                            <Form.Item label="任务详情" labelCol={{span: 4}} wrapperCol={{span: 16}} colon>
                                <Input.TextArea autosize/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="集合地址" {...formItemLayout}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}

export default TaskCreate;
