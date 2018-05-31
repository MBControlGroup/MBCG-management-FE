import * as React from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';

import TextInput from '../../../component/Input';


type Props = {};

const FromContainer = styled.div`
    margin-top: 18px;
    margin-right: 10px;
`;

const InputInfo = styled.div`
  margin-bottom: 25px;
  margin-right: 50px;
  float: left;
`;

const Btn = styled.div`
  float: right;
`;

class PersonnelQueryForm extends React.Component<Props> {
    render() {
        return (
            <FromContainer>
                <InputInfo>
                <span>姓名　</span><Input type='text' placeholder='请输入' style={{ width: '130px' }} />
                </InputInfo>
                <InputInfo>
                <span>手机号码　</span><Input type='text' placeholder='请输入' style={{ width: '130px' }} />
                </InputInfo>
                <InputInfo>
                <span>身份证号码　</span><Input type='text' placeholder='请输入' style={{ width: '230px', }} />
                </InputInfo>
                <Btn>
                    <Button type='primary' size='small' style={{ margin: '0 6px' }}>查找</Button>
                    <Button type='ghost' size='small' style={{ margin: '0 6px' }}>重置</Button>
                </Btn>
            </FromContainer>
        );
    }
}
export default PersonnelQueryForm;