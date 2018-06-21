import React, { Component } from 'react'
import { Tree, Icon, Input, Button, Modal, Table, Popconfirm, Upload, message } from 'antd';
import styled from 'styled-components'
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

const Container = styled.div``;
// 水平垂直居中
const RowInput = styled.div`
  display:flex;
  justify-content:space-between;
  align-items: right;
  margin-bottom: 20px;
`;
// 批量导入
const files = {
  name: 'file',
  ListType: 'excel',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

type PropType = {
  // areaData: Array
};

class Organization extends React.Component {
  constructor() {
    super();
  }
  state = {
    addOrgModalVisible: false,
    modifyOrgModalVisible: false,
    addPersonModalVisible: false,
    curSelectedKey: '0',
    curNode: null,
    areaData: [],
    columns: [],
    orgName: '',
    orgLeader: '',
    orgLeaderPhone: '',
    personName: '',
    personPhone: '',
    personPosition: '',
    personUnit:'',
    personAddress: '',
    personReserveContact:'',
    personResConPhone: ''
  }
  componentWillMount() {
    this.state.areaData.push(
    {
      key: '0', title: '广州市', leaderName: 'test', leaderPhone: '123456', children: [],
      soilders: [
        { key: 0, name: 'test1', phone: '123', position: '民兵', unit: '广州番禺部门',
          address: '广州番禺', reserveContact: 'xxx', reserveContactPhone:'123456' },
        { key: 1, name: 'test2', phone: '234', position: '民兵', unit: '广州海珠部门',
        address: '广州海珠', reserveContact: 'xxx', reserveContactPhone:'123456' }
      ]
    })
    this.setState( {
      curNode: this.findCurNode(this.state.areaData),
      columns: [
        {title: '名字', dataIndex: 'name', key: 'name',
        sorter: (a, b) => this.compareByAlph(a.name, b.name) },
        {title: '手机号码', dataIndex: 'phone', key: 'phone',
        sorter: (a, b) => this.compareByAlph(a.phone, b.phone)},
        {title: '职务', dataIndex: 'position', key:'position'},
        {title: '单位', dataIndex: 'unit', key: 'unit'},
        {title: '家庭住址', dataIndex: 'address', key: 'address',
        sorter: (a, b) => this.compareByAlph(a.phone, b.phone)},
        {title: '备用联系人', dataIndex: 'reserveContact', key: 'reserveContact'},
        {title: '备用联系号码', dataIndex: 'reserveContactPhone', key: 'reserveContactPhone'},
        {
          title: '操作',
          dataIndex: 'operation',
          render: (text, record) => {
            return (
              // this.state.curNode.soilders.length > 1 ?
              (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                  <a href="javascript:;">Delete</a>
                </Popconfirm>
              )
              // :null
            );
          },
        }
      ]
    })
  }
  compareByAlph = (a, b) => { 
    if (a > b) { return 1; } 
    if (a < b) { return -1; } 
    return 0; 
  }
  onDelete = (key) => {
    console.log('here');
    let source = [...this.state.areaData];
    let temp = this.findCurNode(source);
    temp.soilders = temp.soilders.filter(item => item.key !== key)
    this.setState({
      areaData: source
    })
    message.success(`delete successfully`);
  }
  setAddOrgModal = (val) => {
    this.setState({
      addOrgModalVisible: val
    }); 
  }
  setModifyOrgModal = (val) => {
    this.setState({
      modifyOrgModalVisible: val
    });
  }
  setAddPersonModal = (val) => {
    this.setState({
      addPersonModalVisible: val
    })
  }

  handleCancel = () => {
    this.setAddOrgModal(false);
    this.setModifyOrgModal(false);
    this.setAddPersonModal(false);
  }
  // 根据当前选中节点的key寻找当前选中的节点
  findCurNode = (data) => {
    let temp = null;
    for (let i = 0; i < data.length; ++i) {
      if (temp != null) return temp;
      if　(data[i].key == this.state.curSelectedKey) {
        temp = data[i];
      } else {
        if (data[i].children) {
          temp = this.findCurNode(data[i].children)
        }
      }
    }
    return temp;
  }
  // 树状人事组织的动态添加
  addOrg = () => {
    let temp = this.findCurNode(this.state.areaData);
    console.log(this.state.areaData);
    if (temp == null) {
      alert('please choose one level');
      return;
    }
    temp.children = temp.children || [];
    let len = temp.children.length;

    if (len != 0) {
      temp.children.push({key: temp.key+'-'+len, title: this.state.orgName, 
      leaderName: this.state.orgLeader, leaderPhone: this.state.orgLeaderPhone, children: [],
      soilders: []
    })
    } else {
      temp.children.push({key:temp.key+'-'+'0', title: this.state.orgName, 
      leaderName: this.state.orgLeader, leaderPhone: this.state.orgLeaderPhone,children: [],
      soilders: []
    })
    }
    this.setAddOrgModal(false);
  }
  // 修改组织信息
  modifyOrg = ()=> {
    let temp = this.findCurNode(this.state.areaData);
    if (temp == null) {
      alert('please choose one level');
      return;
    }
    temp.title = this.state.orgName;
    temp.leaderName = this.state.orgLeader;
    temp.leaderPhone = this.state.orgLeaderPhone;
    this.setModifyOrgModal(false);
  }
  // 添加人员
  addPerson = ()=> {
    let temp = this.findCurNode(this.state.areaData);
    if (temp == null) {
      alert('please choose one level');
      return;
    }
    let len = 0;
    if (temp.soilders != null) len = temp.soilders.length
    temp.soilders.push({
      key: len, name: this.state.personName, phone: this.state.personPhone, 
      position: this.state.personPosition, unit: this.state.personUnit,
      address: this.state.personAddress, reserveContact: this.state.personReserveContact,
      reserveContactPhone: this.state.personResConPhone
    })
    this.setAddPersonModal(false);
  }

  onSelect = (selectedKeys, info) => {
    this.setState({
      curSelectedKey: selectedKeys
    })
    this.state.curNode = this.findCurNode(selectedKeys)
    console.log('selected', selectedKeys,info);
  }
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }
  loop = (areaData) => {
    return areaData.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }
  getOrgName = (event) => {
    this.setState({
      orgName: event.target.value
    })
  }
  getOrgLeader = (event) => {
    this.setState({
      orgLeader: event.target.value
    })
  }
  getOrgLeaderPhone = (event) => {
    this.setState({
      orgLeaderPhone: event.target.value
    })
  }
  getPersonName = (event) => {
    this.setState({
      personName: event.target.value
    })
  }
  getPersonPhone = (event) => {
    this.setState({
      personPhone: event.target.value
    })
  }
  getPersonPosition = (event) => {
    this.setState({
      personPosition: event.target.value
    })
  }
  getPersonUnit = (event) => {
    this.setState({
      personUnit: event.target.value
    })
  }
  getPersonAddress = (event) => {
    this.setState({
      personAddress: event.target.value
    })
  }
  getReserveContact = (event) => {
    this.setState({
      personReserveContact: event.target.value
    })
  }
  getReserveContactPhone = (event) => {
    this.setState({
      personResConPhone: event.target.value
    })
  }
  render() {
    let cur = this.findCurNode(this.state.areaData);
    return (
      <Container>
      <Button style={{  width: '10%', marginTop: 10, marginRight: '5%'}} type='primary' 
              onClick = {()=>this.setAddOrgModal(true)}
      >添加单位</Button>
      <Button style={{ width: '10%', marginTop: 10, marginRight: '25%'}} type='primary'
              onClick = {()=>this.setModifyOrgModal(true)}
      >修改单位信息</Button>
      <Button style={{ width: '10%', marginTop: 10, marginRight: '5%'}} type='primary'
              onClick = {()=>this.setAddPersonModal(true)}
      >添加人员</Button>
      <Upload {...files} accept='file' >
            <Button type='primary' style={{ margin: '0 5px'}} >
              <Icon type='upload' />批量导入
            </Button>
      </Upload>

      <div style={{float: 'left', width: '25%',marginRight: 30, marginTop:20, backgroundColor:'white' }}>
        <Tree
          showLine
          defaultSelectedKeys={ this.state.selectedKeys }
          onSelect={this.onSelect}
          onCheck={this.onCheck}
        >
          {this.loop(this.state.areaData)}
        </Tree>
      </div>
      {/* 对应节点的表格显示 */}
      <Table
        dataSource={ cur.soilders }
        columns={ this.state.columns}
        style={{ float: 'left', width: '70%', marginTop: 20 }}
      >
      </Table>

      {/* 添加单位弹窗 */}
      <Modal 
        title = '添加单位'
        destroyOnClose='true'
        visible = {this.state.addOrgModalVisible}
        onOk = {this.addOrg}
        onCancel = {this.handleCancel}
      >
        <RowInput>
            <span>组织名称　</span><Input value={this.state.orgName} id='org_name' type='text' placeholder='请输入' style={{width:'380px'}}
            onChange={this.getOrgName}
            />
          </RowInput>
          <RowInput>
            <span>负责人　</span><Input value={this.state.orgLeader} type='text' placeholder='请输入' style={{width:'380px'}}
            onChange={this.getOrgLeader}
            />
          </RowInput>
          <RowInput>
            <span>负责人手机　</span><Input value={this.state.orgLeaderPhone} type='text' placeholder='请输入' style={{width:'380px'}}
            onChange={this.getOrgLeaderPhone}
            />
          </RowInput>
      </Modal>
      
      {/* 修改单位弹窗 */}
      <Modal 
        title = '修改单位信息'
        destroyOnClose='true'
        visible = {this.state.modifyOrgModalVisible}
        onOk = {this.modifyOrg}
        onCancel = {this.handleCancel}
      >
        <RowInput>
            <span>组织　</span><Input defaultValue ={ cur.title } type='text' style={{width:'380px'}}
            onChange={this.getOrgName}
            />
          </RowInput>
          <RowInput>
            <span>负责人　</span><Input defaultValue={cur.leaderName} type='text' placeholder='请输入' style={{width:'380px'}}
            onChange={this.getOrgLeader}
            />
          </RowInput>
          <RowInput>
            <span>负责人手机　</span><Input defaultValue={cur.leaderPhone} type='text' placeholder='请输入' style={{width:'380px'}}
            onChange={this.getOrgLeaderPhone}
            />
          </RowInput>
      </Modal>

      {/* 添加人员弹窗 */}
      <Modal 
        title = '添加人员'
        destroyOnClose = 'true'
        visible = {this.state.addPersonModalVisible}
        onOk = {this.addPerson}
        onCancel = {this.handleCancel}
      >
        <RowInput>
            <span>姓名　</span><Input defaultValue={this.state.personName} type='text' placeholder='请输入' style={{width:'380px'}}
            onChange={this.getPersonName}
            />
          </RowInput>
          <RowInput>
            <span>手机号码　</span><Input defaultValue={this.state.personPhone} type='text' placeholder='请输入' style={{width:'380px'}}
            onChange={this.getPersonPhone}
            />
          </RowInput>
          <RowInput>
            <span>职务　</span><Input defaultValue={this.state.personPosition} type='text' placeholder='请输入' style={{width:'380px'}}
            onChange={this.getPersonPosition}
            />
          </RowInput>
          <RowInput>
            <span>单位　</span><Input defaultValue={this.state.personUnit} type='text' placeholder='请输入' style={{width:'380px'}}
            onChange={this.getPersonUnit}
            />
          </RowInput>
          <RowInput>
            <span>家庭住址　</span><Input defaultValue={this.state.personAddress} type='text' placeholder='请输入' style={{width:'380px'}}
            onChange={this.getPersonAddress}
            />
          </RowInput>
          <RowInput>
            <span>备用联系人　</span><Input defaultValue={this.state.personReserveContact} type='text' placeholder='请输入' style={{width:'380px'}}
            onChange={this.getReserveContact}
            />
          </RowInput><RowInput>
            <span>备用联系方式　</span><Input defaultValue={this.state.personResConPhone} type='text' placeholder='请输入' style={{width:'380px'}}
            onChange={this.getReserveContactPhone}
            />
          </RowInput>
      </Modal>
      </Container>
    );
  }
}

export default Organization;
