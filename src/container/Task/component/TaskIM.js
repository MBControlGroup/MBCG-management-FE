import React, {Component} from 'react';
import {List, Avatar, Input, Button, Layout, Modal} from 'antd';
import {ChatFeed, Message} from 'react-chat-ui';
import styled from 'styled-components';

const {Header, Footer, Sider, Content} = Layout;
const {TextArea} = Input;

const Container = styled.div`
  background-color: #FFF;
  margin-top: 20px;
  padding: 20px;
`;

class TaskIM extends Component {
    constructor() {
        super();
        this.state = {
            currentMessages: [
                new Message({id: 0, message: 'Hello!'}),
                new Message({id: 1, message: 'World!'}),
            ],
            allMessages: null,
            contactData: [],
            whoToTalk: {name: '获取联系人中', user_id: -1},
            textToSend: null,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const url = 'http://private-3609bf-api497.apiary-mock.com';
        const parameter = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        };

        fetch(url + '/task/detail/mem/1', parameter).then((response) => {
            return response.json();
        }).then((responseData) => {
            let allMessages = new Map();


            let contactData = [];
            responseData.offices.forEach(function (office) {
                office.members.forEach(function (people) {
                    let info = {
                        "soldier_id": people.soldier_id,
                        "title": people.name,
                        "im_user_id": people.im_user_id,
                    };
                    contactData.push(info);
                    allMessages.set(people.im_user_id, [
                            new Message({id: 0, message: 'Hello!'}),
                            new Message({id: 1, message: 'World!'}),
                        ]
                    );
                });
            });

            responseData.orgs.forEach(function (org) {
                org.members.forEach(function (people) {
                    let info = {
                        "soldier_id": people.soldier_id,
                        "title": people.name,
                        "im_user_id": people.im_user_id,
                    };
                    contactData.push(info);
                    allMessages.set(people.im_user_id, [
                            new Message({id: 0, message: 'Hello!'}),
                            new Message({id: 1, message: 'World!'}),
                        ]
                    );
                });
            });

            responseData.indiv.forEach(function (indiv) {
                let info = {
                    "soldier_id": indiv.soldier_id,
                    "title": indiv.name,
                    "im_user_id": indiv.im_user_id,
                };
                contactData.push(info);
                allMessages.set(indiv.im_user_id, [
                        new Message({id: 0, message: 'Hello!'}),
                        new Message({id: 1, message: 'World!'}),
                    ]
                );
            });

            let who = {name: contactData[0].title, user_id: contactData[0].im_user_id};
            this.setState({whoToTalk: who});
            this.setState({currentMessages: allMessages.get(contactData[0].im_user_id)});
            this.setState({allMessages: allMessages});
            this.setState({contactData: contactData});
        }).catch((error) => {
            console.log(error);
        });
    };

    sendMessage = () => {
        let currentMessages = this.state.currentMessages;
        let allMessages = this.state.allMessages;
        currentMessages.push(new Message({id: 0, message: this.state.textToSend}));
        allMessages.set(this.state.whoToTalk.user_id, currentMessages);
        this.setState({currentMessages: currentMessages});
        this.setState({allMessages: allMessages});
    };

    render() {
        return (
            <Modal
                title="即时通讯"
                width={960}
                visible={this.props.visible}
                okText="发送"
                cancelText="关闭"
                onCancel={this.props.closeWindow}
                onOk={this.sendMessage}
            >
                <Layout>
                    <Sider style={{background: '#fff'}}>
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.contactData}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                        title={
                                            <Button onClick={() => {
                                                let who = {name: item.title, user_id: item.im_user_id};
                                                let currentMessages = this.state.allMessages.get(item.im_user_id);
                                                this.setState({whoToTalk: who});
                                                this.setState({currentMessages: currentMessages});
                                            }
                                            }>{item.title}
                                            </Button>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Sider>

                    <Content>
                        <Layout>
                            <Header style={{background: '#fff'}}>{this.state.whoToTalk.name}</Header>
                            <Content style={{background: '#fff'}}>
                                <ChatFeed
                                    messages={this.state.currentMessages}
                                    showSenderName
                                    bubblesCentered={false}
                                    maxHeight={256}
                                    bubbleStyles={
                                        {
                                            text: {
                                                fontSize: 14,
                                            },
                                            chatbubble: {
                                                borderRadius: 50,
                                                padding: 10,
                                            },
                                        }
                                    }
                                />
                            </Content>
                            <Footer style={{background: '#fff'}}>
                                <TextArea autosize={{minRows: 2, maxRows: 6}} onChange={(e) => {
                                    this.setState({textToSend: e.target.value});
                                }}/>
                            </Footer>
                        </Layout>
                    </Content>
                </Layout>
            </Modal>

        );
    }
}

export default TaskIM;
