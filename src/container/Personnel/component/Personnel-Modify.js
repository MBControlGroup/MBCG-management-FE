import * as React from 'react';
import styled from 'styled-components';
import { Modal, Input, Button, Popconfirm, message } from 'antd';


import PersonnelAreaQuery from './../component/Personnel-area-query';

const ModifyContainer = styled.div``;
// 水平垂直居中
const RowInput = styled.div`
  display:flex;
  justify-content:space-between;
  align-items: right;
  margin-bottom: 20px;
`;

type Props = {};

class PersonnelModify extends React.Component<Props> {
    state = {
        loading: false,
        visible: false,
    }
    setModifyVisible(modifyVisible) {
        this.setState({modifyVisible});
    }
    handleOk() {
        this.setState({ loading: true });
        setTimeout(() => {
        this.setState({ 
            loading: false,
            visible: this.setModifyVisible(false)
        });
        }, 3000);
    }
    cancelDelete() {
        message.error('cancel delete')
        setTimeout(()=> {
            this.setModifyVisible(false);
        }, 1000);
    }
    confirmDelete() {
        message.success('confirm delete')
        setTimeout(()=> {
            this.setModifyVisible(false);
        }, 1000);
    }
    render() {
        const {loading, visible} = this.state;
        return (
        <ModifyContainer>
            <a href="#" onClick={()=>this.setModifyVisible(true)}>修改</a>
            <Modal
                title='修改资料'
                visible={this.state.modifyVisible}
                onOk={()=>this.handleOk}
                onCancel={()=>this.setModifyVisible(false)}
                footer={[
                    <Button type='ghost' onClick={()=>this.setModifyVisible(false)}>取消</Button>,
                    <Button type='primary' loading={loading} onClick={()=>this.handleOk()}>修改</Button>,
                    <Popconfirm
                        title='你确定要删除该成员?'
                        cancelText='取消'
                        okText='确认'
                        placement='topRight'
                        onCancel={()=>this.cancelDelete()}
                        onConfirm={()=>this.confirmDelete()}
                    >
                        <Button type='danger'>删除</Button>
                    </Popconfirm>
                ]
                }
            >
                <RowInput>
                    <span>姓名　</span><Input type='text' placeholder='请输入' style={{width:'380px'}}/>
                </RowInput>
                <RowInput>
                    <span>手机号码　</span><Input type='text' placeholder='请输入' style={{width:'380px'}}/>
                </RowInput>
                <RowInput>
                    <span>身份证号码　</span><Input type='text' placeholder='请输入' style={{width:'380px'}}/>
                </RowInput>
                <RowInput>
                    <span>所属分支　</span><PersonnelAreaQuery />
                </RowInput>
            </Modal>
        </ModifyContainer>
        );
    }
}
export default PersonnelModify;