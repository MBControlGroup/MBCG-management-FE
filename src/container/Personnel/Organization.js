import React, { Component } from 'react'
import { Tree, Icon, Input, Button, Modal, Table, Popconfirm, Upload, message } from 'antd';
import styled from 'styled-components'
import * as XLSX from 'xlsx';
import unLoginRedirect from '../../component/hoc/unlogin-redirect';
import { observer, inject } from 'mobx-react';

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

type PropType = {
  isLogin: boolean,
  nav: Object,
  personnel: Object
}
// @inject(stores => ({
//   isLogin: stores.user.isLogin,
//   nav: stores.nav,
//   personnel: stores.personnel
// }))
// @unLoginRedirect('/login')
// @observer
class Organization extends React.Component<PropType> {
  constructor(props: PropType) {
    super(props);
    // try {
    //   this.props.personnel.getOrgs();
    // } catch (err) {
    //   console.log(err);
    // } finally {
    //   console.log("finished");
    // }
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
    personIdentity: '',
    personPosition: '',
    personUnit:'',
    personAddress: '',
  }

  componentWillMount() {
    // this.props.nav.setSelectedKey('nav_2');
    this.state.areaData.push(
    {
      key: '0', isOrg: false, title: '广州市', leaderName: 'test', leaderPhone: '13719323393', children: [
        {key: '0-0', isOrg: false, title: '越秀区', leaderName: 'test', leaderPhone: '13719323393', children: [
          {key: '0-0-0', isOrg: false, title: '东山街道', leaderName: 'test', leaderPhone: '13719323393', children: [],soldiers: []},
          {key: '0-0-1', isOrg: false, title: '白云街道', leaderName: 'test', leaderPhone: '13719323393', children: [],soldiers: []},
        ],soldiers: []},
        {key: '0-1', isOrg: false, title: '海珠区', leaderName: 'test', leaderPhone: '13719323393', children: [
          {key: '0-1-0', isOrg: false, title: '琶洲街道', leaderName: 'test', leaderPhone: '13719323393', children: [],soldiers: []},
          {key: '0-1-1', isOrg: false, title: '官洲街道', leaderName: 'test', leaderPhone: '13719323393', children: [],soldiers: []},
        ],soldiers: []}
      ],
      soldiers: [
        { soldier_id: 0, name: '张大', phone: '13719323393', identity:'440582000000000000', position: 'MB', unit: '广州',
          address: '广州番禺'},
        { soldier_id: 1, name: '张二', phone: '13719323393', identity:'440582000000000001', position: 'MB', unit: '广州',
        address: '广州海珠'}
      ]
    })
    this.setState( {
      curNode: this.findCurNode(this.state.areaData),
      columns: [
        {title: '名字', dataIndex: 'name', key: 'name',
        sorter: (a, b) => this.compareByAlph(a.name, b.name) },
        {title: '手机号码', dataIndex: 'phone', key: 'phone',
        sorter: (a, b) => this.compareByAlph(a.phone, b.phone)},
        {title: '身份证', dataIndex: 'identity', key: 'identity',
        sorter: (a, b) => this.compareByAlph(a.identity, b.identity)},
        {title: '职务', dataIndex: 'position', key:'position',
        sorter: (a, b) => this.compareByAlph(a.position, b.position)},
        {title: '单位', dataIndex: 'unit', key: 'unit'},
        {title: '家庭住址', dataIndex: 'address', key: 'address'},
        {
          title: '操作',
          dataIndex: 'operation',
          render: (text, record) => {
            return (
              // this.state.curNode.soldiers.length > 1 ?
              (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.soldier_id)}>
                  <a href="javascript:;">Delete</a>
                </Popconfirm>
              )
            );
          },
        }
      ]
    })
  }
  // 批量导入人员信息
  uploadFile = (e) => {
    var files = e.target.files;
    let source = [...this.state.areaData];
    let temp = this.findCurNode(source);
    var fileReader = new FileReader();
    var that = this;
    fileReader.onload = function(ev) {
        try {
            var data = ev.target.result;
            var workbook = XLSX.read(data, {
                    type: 'binary'
            }); // 以二进制流方式读取得到整份excel表格对象
            var persons = []; // 存储获取到的数据
        } catch (e) {
            console.log('文件类型不正确');
            return;
        }
        // 表格的表格范围，可用于判断表头是否数量是否正确
        var fromTo = '';
        // 遍历每张表读取
        for (var sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
                fromTo = workbook.Sheets[sheet]['!ref'];
                console.log(fromTo);
                persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                // break; // 如果只取第一张表，就取消注释这行
            }
        }
        console.log(persons);
        let len = 0;
        if (temp.soldiers != null) len = temp.soldiers.length
        for (var i = 0; i < persons.length; ++i) {
          persons[i].soldier_id = len;
          temp.soldiers.push(persons[i]);
          len = len + 1
        }
        that.setState({
          areaData: source
        })
    };

    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
  }

  compareByAlph = (a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  }
  onDelete = (key) => {
    console.log('here');
    let source = [...this.state.areaData];
    let temp = this.findCurNode(source);
    temp.soldiers = temp.soldiers.filter(item => item.soldier_id !== key)
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
  // 可以删除，console.log是正确的，但是显示并没有更新，待解决，可能需要用数据库，删除后直接刷新
  deleteOrg = () => {
    let source = [...this.state.areaData];
    console.log(this.state.curSelectedKey);
    source = source.filter(item => item.key !== this.state.curSelectedKey)
    this.setState({
      areaData: source,
      curSelectedKey: '0'
    })
    message.success('delete organization successfully');
    this.setModifyOrgModal(false);
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
      message.error('please choose one level');
      this.setAddOrgModal(false);
      return;
    }
    if (this.state.orgName === '' || this.state.orgLeader === '' || this.state.orgLeaderPhone === '') {
      message.error("请填写完整信息");
      return;
    }

    var regex = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/;
    if (!regex.test(this.state.orgLeaderPhone)) {
      this.setState({
        orgLeaderPhone: ''
      })
      message.error('phone length should be 11(0-9)');
      return;
    }
    temp.children = temp.children || [];
    let len = temp.children.length;

    if (len != 0) {
      temp.children.push({key: temp.key+'-'+len, isOrg: true, title: this.state.orgName, 
      leaderName: this.state.orgLeader, leaderPhone: this.state.orgLeaderPhone, children: [],
      soldiers: []
    })
    } else {
      temp.children.push({key:temp.key+'-'+'0', isOrg: true, title: this.state.orgName, 
      leaderName: this.state.orgLeader, leaderPhone: this.state.orgLeaderPhone,children: [],
      soldiers: []
    })
    }
    // this.setState({
    //   orgName: '',
    //   orgLeader: '',
    //   orgLeaderPhone: ''
    // })
    this.setAddOrgModal(false);
  }
  // 修改组织信息
  modifyOrg = ()=> {
    let temp = this.findCurNode(this.state.areaData);
    if (temp == null) {
      message.error('please choose one level');
      this.setModifyOrgModal(false);
      return;
    }
    if (temp.isOrg == false) {
      message.error('不能修改单位信息');
      return;
    }
    var regex = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/;
    if (!regex.test(this.state.orgLeaderPhone)) {
      message.error(this.state.orgLeaderPhone);
      message.error('请输入11位手机号,只包含数字');
      return;
    }
    temp.title = this.state.orgName;
    temp.leaderName = this.state.orgLeader;
    temp.leaderPhone = this.state.orgLeaderPhone;
    this.setModifyOrgModal(false);
  }
  // 添加人员
  addPerson = ()=> {
    if (this.state.personName === '' || this.state.personPhone === '' ||
        this.state.personIdentity === '' || this.state.personAddress === ''
      || this.state.personPosition === '' || this.state.personUnit === '') {
      message.error('请填写完整信息')
      return;
    }
    let temp = this.findCurNode(this.state.areaData);
    if (temp == null) {
      message.error('please choose one level');
      this.setAddPersonModal(false);
      return;
    }
    var idReg = /^\d{17}(\d|x)$/;
    if ( !idReg.test(this.state.personIdentity)) {
      message.error('请输入18位身份证号码,只包含数字');
      this.setState({
        personIdentity: ''
      })
      return;
    }
    var phoneReg = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/;
    if (!phoneReg.test(this.state.personPhone)) {
      message.error('请输入11位手机号,只包含数字');
      this.setState({
        personPhone: ''
      })
      return;
    }
    let len = 0;
    if (temp.soldiers != null) len = temp.soldiers.length
    temp.soldiers.push({
      soldier_id: len, name: this.state.personName, phone: this.state.personPhone, 
      identity: this.state.personIdentity,
      position: this.state.personPosition, unit: this.state.personUnit,
      address: this.state.personAddress
    })
    this.setState({
      personName: '', personPhone: '', personIdentity: '',
      personPosition: '', personUnit: '', personAddress: ''
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
          <TreeNode title={item.isOrg ? <span style={{ color: '#009922' }}>{item.title}</span> : item.title} key={item.key} dataRef={item}>
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
  getPersonIdentity = (event) => {
    this.setState({
      personIdentity: event.target.value
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
  render() {
    let cur = this.findCurNode(this.state.areaData);
    return (
      <Container>
      <Button style={{  width: '10%', marginTop: 10, marginRight: '5%'}} type='primary' 
              onClick = {()=>this.setAddOrgModal(true)}
      >添加组织</Button>
      <Button style={{ width: '10%', marginTop: 10, marginRight: '25%'}} type='primary'
              onClick = {()=>this.setModifyOrgModal(true)}
      >修改组织信息</Button>
      <Button style={{ width: '10%', marginTop: 10, marginRight: '5%'}} type='primary'
              onClick = {()=>this.setAddPersonModal(true)}
      >添加人员</Button>

      <input type="file" onChange={this.uploadFile} 
      accept=".xlsx, .xls" />

      <div style={{overflow: 'hidden', float: 'left', width: '17%',marginRight: 30, marginTop:20, backgroundColor:'white' }}>
        <Tree
          defaultExpandAll
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
        dataSource={ cur.soldiers }
        columns={ this.state.columns}
        style={{ float: 'left', width: '80%', marginTop: 20 }}
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
            <span>身份证　</span><Input defaultValue={this.state.personIdentity} type='text' placeholder='请输入' style={{width:'380px'}}
            onChange={this.getPersonIdentity}
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
      </Modal>
      </Container>
    );
  }
}

export default Organization;
