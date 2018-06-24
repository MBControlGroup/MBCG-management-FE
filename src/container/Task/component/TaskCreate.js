import React, {Component} from 'react';
import {Form, Row, Col, Input, InputNumber, Select, DatePicker, AutoComplete} from 'antd';
import {Map, MouseTool} from 'react-amap';
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
            place: {},
            orgInfo: {},
            officeInfo: {},

            locationOptions: [],
            orgOptions: [],
            officeOptions: [],

            "title": null,
            "mem_count": null,
            "launch_datetime": null,
            "accept_org_ids": [],
            "accept_office_ids": [],
            "detail": null,
            "finish_datetime": null,

            "place_id": -1,
            "place_name": null,
            position: {longitude: 0, latitude: 0},
        };

        this.toolEvents = {
            created: (tool) => {
                this.tool = tool;
            }
        }
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
            this.setState({place: responseData});
        }).catch((error) => {
            console.log(error);
        });

        fetch(url + '/task/orgs', header).then((response) => {
            return response.json();
        }).then((responseData) => {
            let options = [];
            responseData.detail.orgs.forEach(function (element) {
                options.push(<Option key={element.org_id}>{element.name}</Option>);
            });
            this.setState({orgOptions: options});
            this.setState({orgInfo: responseData});
        }).catch((error) => {
            console.log(error);
        });

        fetch(url + '/task/offices', header).then((response) => {
            return response.json();
        }).then((responseData) => {
            let options = [];

            let traverse = (node) => {
                options.push(<Option key={node.office_id}>{node.name}</Option>);
                node.lower_offices.forEach(function (element) {
                    traverse(element);
                });
            };
            traverse(responseData.office_detail);

            this.setState({officeOptions: options});
            this.setState({officeInfo: responseData});
        }).catch((error) => {
            console.log(error);
        });
    };

    clickOnMap = (event) => {
        let position = {longitude: event.lnglat.getLng(), latitude: event.lnglat.getLat()};
        this.setState({position: position});
        this.tool.close(true);
        this.tool.marker();
    };

    sendData = () => {
        let data = {
            title: this.state.title,
            "mem_count": this.state.mem_count,
            "launch_datetime": this.state.launch_datetime,
            "accept_org_ids": this.state.accept_org_ids,
            "accept_office_ids": this.state.accept_office_ids,
            "detail": this.state.detail,
            "finish_datetime": this.state.finish_datetime,

            "place_id": this.state.place_id,
            "place_name": this.state.place_name,
            place_lat: this.state.position.latitude,
            place_lng: this.state.position.longitude,
        };

        fetch(url + '/task', header).catch((error) => {
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
                                <Input onChange={(event) => {
                                    this.setState({title: event.target.value});
                                }}
                                />
                            </Form.Item>
                            <Form.Item label="人数" {...formItemLayout}>
                                <InputNumber onChange={(value) => {
                                    this.setState({mem_count: value});
                                }}
                                />
                            </Form.Item>
                            <Form.Item label="征集组织" {...formItemLayout}>
                                <Select mode="multiple" onChange={(value, option) => {
                                    let accept_org_ids = [];
                                    option.forEach(function (element) {
                                        accept_org_ids.push(element.key);
                                    });
                                    this.setState({accept_org_ids: accept_org_ids});
                                }}>
                                    {this.state.orgOptions}
                                </Select>
                            </Form.Item>
                            <Form.Item label="征集单位" {...formItemLayout}>
                                <Select mode="multiple" onChange={(value, option) => {
                                    let accept_office_ids = [];
                                    option.forEach(function (element) {
                                        accept_office_ids.push(element.key);
                                    });
                                    this.setState({accept_office_ids: accept_office_ids});
                                }}>
                                    {this.state.officeOptions}
                                </Select>
                            </Form.Item>
                            <Form.Item label="集合时间" labelCol={{span: 4}} wrapperCol={{span: 16}}>
                                <DatePicker format='YYYY-MM-DD hh:mm:ss' showTime onChange={(date, dateString) => {
                                    this.setState({launch_datetime: dateString});
                                }}
                                />
                            </Form.Item>
                            <Form.Item label="结束时间" labelCol={{span: 4}} wrapperCol={{span: 16}}>
                                <DatePicker format='YYYY-MM-DD hh:mm:ss' showTime onChange={(date, dateString) => {
                                    this.setState({finish_datetime: dateString});
                                }}
                                />
                            </Form.Item>
                            <Form.Item label="任务详情" labelCol={{span: 4}} wrapperCol={{span: 16}} colon>
                                <Input.TextArea autosize onChange={(event) => {
                                    this.setState({detail: event.target.value});
                                }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="集合地址" {...formItemLayout}>
                                <AutoComplete dataSource={this.state.locationOptions} onChange={(value) => {
                                    let number = Number(value);
                                    if (isNaN(number)) {
                                        this.setState({place_id: -1});
                                        this.setState({place_name: value});
                                    }
                                }} onSelect={(value, option) => {
                                    this.setState({place_id: Number(value)});
                                    this.setState({place_name: option.props.children});
                                }}
                                />
                            </Form.Item>
                            <div style={{width: '400px', height: '400px'}}>
                                <Map amapkey={'975bc9025e6c890dc6976b5e06812dd8'} events={{
                                    click: this.clickOnMap
                                }}>
                                    <MouseTool events={this.toolEvents}/>
                                </Map>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}

export default TaskCreate;
