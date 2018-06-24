import React, {Component} from 'react';
import {Form, Row, Col, Input, InputNumber, Select, DatePicker, TimePicker} from 'antd';
import styled from 'styled-components';

const Option = Select.Option;

const url = 'http://private-3609bf-api497.apiary-mock.com';
const header = {
    'Content-Type': 'application/json',
    method: 'POST',
};

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


class TaskCreate extends Component {
    constructor() {
        super();
        this.state = {
            usedPlaces: [],
            orgInfo: [],
            officeInfo: [],

            locationOptions: [],
            callOptions: [],
        };
    }

    componentWillMount() {
        this.fetchDataNeeded();
    }

    fetchDataNeeded = () => {
        fetch(url + '/task/info', header).then((response) => {
            return response.json();
        }).then((responseData) => {
            let options = [];
            responseData.places.forEach(function (element) {
                options.push(<Option key={element.place_id}>{element.place_name}</Option>);
            });
            this.setState({locationOptions: options});
            this.setState({usedPlaces: responseData.places});

        }).catch((error) => {
            console.log(error);
        });

        fetch(url + '/task/orgs', header).then((response) => {
            return response.json();
        }).then((responseData) => {
            this.setState({orgInfo: responseData.detail});
        }).catch((error) => {
            console.log(error);
        });

        fetch(url + '/task/offices', header).then((response) => {
            return response.json();
        }).then((responseData) => {
            this.setState({officeInfo: responseData.office_detail});
        }).catch((error) => {
            console.log(error);
        });
    };

    render() {
        return (
            <Container>
                <Form>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="任务主题" {...formItemLayout}>
                                <Input value="任务主题" onChange={(event) => {
                                    this.setState({title: event.target.value});
                                }}
                                />
                            </Form.Item>
                            <Form.Item label="人数" {...formItemLayout}>
                                <InputNumber value={60} onChange={(value) => {
                                    this.setState({mem_count: value});
                                }}
                                />
                            </Form.Item>
                            <Form.Item label="征集范围" {...formItemLayout}>
                                <Select mode="multiple" onSelect={(value, option) => {
                                    this.setState({mem_count: value});
                                }}>
                                    {this.state.locationOptions}
                                </Select>
                            </Form.Item>
                            <Form.Item label="选择日期" {...formItemLayout}>
                                <DatePicker onChange={(date, dateString) => {
                                    this.setState({gather_datetime: dateString});
                                }}
                                />
                            </Form.Item>
                            <Form.Item label="集合时间" {...formItemLayout}>
                                <TimePicker onChange={(time, timeString) => {
                                    this.setState({gather_datetime: timeString});
                                }}
                                />
                            </Form.Item>
                            <Form.Item label="任务详情" labelCol={{span: 4}} wrapperCol={{span: 16}} colon>
                                <Input.TextArea autosize/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="集合地址" {...formItemLayout}>
                                <Input value="集合地点名称" onChange={(event) => {
                                    this.setState({title: event.target.value});
                                }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}

export default TaskCreate;
