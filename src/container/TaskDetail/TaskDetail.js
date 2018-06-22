import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { Map, Marker } from 'react-amap';
import { Table } from 'antd';


import unLoginRedirect from '../../component/hoc/unlogin-redirect';
import history from '../../component/History';

const Menu = styled.div`
    width: 100%;
    height: 60px;
    background-color: #FFF;
    box-shadow:  0 2px 10px #888888;
    display: flex;
    align-items: center;
    padding: 0 0 0 40px;
    z-index: 100;
`;

const Header = styled.header`
    height: 200px;
    background-color: #FFF;
    display: flex;
    margin: 0 -50px 0 -50px;
    flex-direction: column;
    margin-bottom: 40px;
`;

const Section = styled.section`
    background-color: #FFF;
`;

const SectionHeader = styled.header`
    border-bottom: solid #CCCCCC 0.5px;
    padding: 12px 0px 8px 20px;
`;

const MapContainer = styled.div`
    padding: 0 40px 0 40px;
    height: 600px;
`;

const SectionBody = styled.div`
    display: flex;
    padding: 20px 0 20px 0;
`;

const Section1LC = styled.div`
    flex: 5;
`;

const Section1RC = styled.div`
    flex: 2;
    padding-top: 60px;
    padding-right: 40px;
`;

const BSpan = styled.span`
    font-weight: bold;
`;

const BasicInfo = styled.div`
    padding: 30px 0 0px 40px;
`;

const Section1_InfoContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;

const InfoCell = styled.div`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    height: 50px;
    border-bottom: solid 0.5px #CCC;
`;

const HLRow = styled.div`
    display: flex;
    height: 50px;
    border-bottom: solid 0.5px #CCC;
    background-color: #ffb8b5;
`;

const HeaderRow = styled.div`
    display: flex;
    height: 50px;
    border-bottom: solid 0.5px #CCC;
    background-color: #DDDDDD;
`;

const TableCell = styled.span`
    flex: 1;
    height: 50px;
    line-height: 50px;
    text-align: left;
    padding-left: 10px;
    font-size: 14px;
`;

@inject(stores => ({
  isLogin: stores.user.isLogin,
  task: stores.task,
}))
@unLoginRedirect('/login')
@observer
class TaskDetail extends Component {
    state={
      time: new Date(),
    }

    componentWillMount() {
      this.props.task.setTaskID(history.location.pathname.slice(history.location.pathname.lastIndexOf('/') + 1, history.location.pathname.length));
    }
    componentDidMount() {
      this.props.task.getTaskDetail();
      setInterval(() => this.setState({ time: new Date() }), 1000);
    }
    render() {
      const styleC = {
        background: `url('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '30px',
        height: '40px',
        color: '#000',
        textAlign: 'center',
        lineHeight: '40px'
      }
     const styleAC = {
            background: `url('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '50px',
            height: '60px',
            color: '#000',
            textAlign: 'center',
            lineHeight: '60px'
      }
      const events = {
        click: (e) => {this.props.task.setSoldierID(e.target.Pg.extData.id)},
      }

      const columns = [{
        title: 'id号码',
        dataIndex: 'soldier_id',
        key: 'soldier_id',
      }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '手机',
        dataIndex: 'phone',
        key: 'phone',
      }, {
        title: '组织',
        dataIndex: 'serve_office',
        key: 'serve_office',
      }];

      if (this.props.task.isLoading) {
        return <p>Loading...</p>;
      }
      return (
        <div>
          <Header>
            <Menu>
              <span style={{ cursor: 'pointer'  }} onClick={() => history.goBack()}>进行中 > </span><span style={{ color: '#000' }}>{this.props.task.currentTaskDetail === null ? '' : this.props.task.currentTaskDetail.title}</span>
            </Menu>
            <BasicInfo>
              <h3>{this.props.task.currentTaskDetail === null ? '' : this.props.task.currentTaskDetail.title}</h3>
              <p><BSpan>创建时间：</BSpan>{this.props.task.currentTaskDetail === null ? '' : this.props.task.currentTaskDetail.launch_datetime}</p>
              <p><BSpan>任务编号：</BSpan>{this.props.task.currentTaskDetail === null ? '' : this.props.task.currentTaskDetail.task_id}</p>
              <p><BSpan>创建人：</BSpan>{this.props.task.currentTaskDetail === null ? '' : this.props.task.currentTaskDetail.launch_admin}</p>
            </BasicInfo>
          </Header>
          <Section>
            <SectionHeader>
              <h3>任务实时情况</h3>
            </SectionHeader>
            <SectionBody>
              <Section1LC>
                <Section1_InfoContainer>
                    <InfoCell>
                        <p>集合时间</p>
                        <h2>{this.props.task.currentTaskDetail === null ? '' : this.props.task.currentTaskDetail.gather_datetime.slice(this.props.task.currentTaskDetail.gather_datetime.indexOf(' ') + 1, this.props.task.currentTaskDetail.gather_datetime.length)}</h2>
                      </InfoCell>
                    <InfoCell>
                        <p>当前时间</p>
                        <h2>{`${this.state.time.getHours()}:${this.state.time.getMinutes()}:${this.state.time.getSeconds()}`}</h2>
                      </InfoCell>
                    <InfoCell>
                        <p>任务状态</p>
                        <h2>{this.props.task.currentTaskDetail === null ? '' : (this.props.task.currentTaskDetail.is_launcher ? '进行中' : '已结束')}</h2>
                      </InfoCell>
                    <InfoCell>
                        <p>集合地点</p>
                        <h2>{this.props.task.currentTaskDetail === null ? '' : this.props.task.currentTaskDetail.gather_place}</h2>
                      </InfoCell>
                  </Section1_InfoContainer>
                <MapContainer>
                    <Map
                          amapkey="c502550fa0c424f2a9903526d14bdbcd"
                          center={this.props.task.locationcenter}
                          zoom={16}
                        >
                        {this.props.task.currentPeopleLoc.slice().map((item, index) => {
                                if (item.soldier_id === this.props.task.activeSoldierID) {
                                    return(
                                        <Marker
                                            events={events}
                                            extData={{ id: item.soldier_id }}
                                            clickable
                                            title={item.soldier_id}
                                            key={"marker" + index}
                                            position={{ longitude: item.longitude, latitude: item.latitude }} >
                                            <div style={styleAC}>{item.name}</div>
                                        </Marker>
                                    )
                                }
                                return (
                                  <Marker
                                events={events}
                                extData={{id: item.soldier_id}}	
                                clickable
                                title={item.soldier_id}
                                key={"marker" + index} 
                                position={{ longitude: item.longitude, latitude: item.latitude }} >
                                    <div style={styleC}>{item.name}</div>
                                  </Marker>);
                            })}
                      </Map>
                  </MapContainer>
              </Section1LC>
              <Section1RC>
                <HeaderRow>
                  <TableCell>id号码</TableCell>
                  <TableCell>姓名</TableCell>
                  <TableCell>手机</TableCell>
                  <TableCell>组织</TableCell>
                </HeaderRow>
                          {this.props.task.currentPeopleLoc.slice().map((item, index) => {
                              if (item.soldier_id === this.props.task.activeSoldierID) {
                                  return (
                                      <HLRow>
                                          <TableCell>{item.soldier_id}</TableCell>
                                          <TableCell>{item.name}</TableCell>
                                          <TableCell>{item.phone}</TableCell>
                                          <TableCell>{item.serve_office}</TableCell>
                                      </HLRow>
                                  )
                              }
                              return (
                                  <Row>
                                      <TableCell>{item.soldier_id}</TableCell>
                                      <TableCell>{item.name}</TableCell>
                                      <TableCell>{item.phone}</TableCell>
                                      <TableCell>{item.serve_office}</TableCell>
                                  </Row>
                              )
                          })}
              </Section1RC>
            </SectionBody>
          </Section>
        </div>
      );
    }
}

export default TaskDetail;
