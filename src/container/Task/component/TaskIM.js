import React, {Component} from 'react';
import {List, Avatar, Input, Button, Layout} from 'antd';
import {ChatFeed, Message} from 'react-chat-ui';
import styled from 'styled-components';

const {Header, Footer, Sider, Content} = Layout;
const {TextArea} = Input;

const Container = styled.div`
  background-color: #FFF;
  margin-top: 20px;
  padding: 20px;
`;

const MessageButton = styled(Button)`
  float: right;
  margin-top: 10px;
`;

const contactData = [
    {
        title: '张三',
    },
    {
        title: '李四',
    },
    {
        title: '王五',
    },
    {
        title: '赵六',
    },
];

class ContactList extends Component {
    render() {
        return (
            <List
                itemLayout="horizontal"
                dataSource={contactData}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                            title={<Button>{item.title}</Button>}
                        />
                    </List.Item>
                )}
            />
        );
    }
}

class MessageWindow extends Component {
    state = {
        messages: [
            new Message({id: 0, message: 'Hello!'}),
            new Message({id: 1, message: 'World!'}),
        ],
    };

    render() {
        return (
            <Layout>
                <Header style={{background: '#fff'}}>Who</Header>
                <Content style={{background: '#fff'}}>
                    <ChatFeed
                        messages={this.state.messages}
                        showSenderName
                        bubblesCentered={false}
                        maxHeight={512}
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
                    <TextArea autosize={{minRows: 2, maxRows: 6}}/>
                    <MessageButton>发送</MessageButton>
                </Footer>
            </Layout>
        );
    }
}

const borderStyle = {
    background: '#fff',
    'border-style': 'solid',
    'border-color': 'lightgray',
    'border-width': '1px',
};

class TaskIM extends Component {
    render() {
        return (
            <Layout>
                <Sider style={borderStyle}><ContactList/></Sider>
                <Content style={borderStyle}><MessageWindow/></Content>
            </Layout>
        );
    }
}

export default TaskIM;
