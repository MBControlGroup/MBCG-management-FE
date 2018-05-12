// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Cascader, Button, InputNumber, Table } from 'antd';

import unLoginRedirect from '../../component/hoc/unlogin-redirect';

// 样式模块，直接用css书写
const Container = styled.div`
  background-color: #FFF;
  margin-top: 20px;
  padding: 20px;
`;

const InputInfo = styled.div`
  margin-bottom: 25px;
  margin-right: 50px;
  float: left;
`;

const yuexiuInfo = [
  {
    value: 'dongshan',
    label: '东山街道',
  }, {
    value: 'meihuacun',
    label: '梅花村街道',
  }, {
    value: 'nonglin',
    label: '农林街道',
  }, {
    value: 'huanghuagang',
    label: '黄花岗街道',
  }, {
    value: 'hongqiao',
    label: '洪桥街道',
  }, {
    value: 'beijing',
    label: '北京街道',
  }, {
    value: 'liurong',
    label: '六榕街道',
  }, {
    value: 'liuhua',
    label: '流花街道',
  }, {
    value: 'guangta',
    label: '光塔街道',
  }, {
    value: 'renmin',
    label: '人民街道',
  }, {
    value: 'dadong',
    label: '大东街道',
  }, {
    value: 'datang',
    label: '大塘街道',
  }, {
    value: 'zhuguagn',
    label: '珠光街道',
  }, {
    value: 'jianshe',
    label: '建设街道',
  }, {
    value: 'baiyun',
    label: '白云街道',
  }, {
    value: 'huale',
    label: '华乐街道',
  }, {
    value: 'meihuacun',
    label: '梅花村街道',
  }, {
    value: 'kuangquan',
    label: '矿泉街道',
  }, {
    value: 'dengfeng',
    label: '登峰街道',
  },
];
const haizhuInfo = [
  {
    value: 'jianghai',
    label: '江海街道',
  }, {
    value: 'binjiang',
    label: '滨江街道',
  }, {
    value: 'shayuan',
    label: '沙园街道',
  }, {
    value: 'huazhou',
    label: '华洲街道',
  }, {
    value: 'guanzhou',
    label: '官洲街道',
  }, {
    value: 'haizhuang',
    label: '海幢街道',
  }, {
    value: 'sushe',
    label: '素社街道',
  }, {
    value: 'ruibao',
    label: '瑞宝街道',
  }, {
    value: 'changgang',
    label: '昌岗街道',
  }, {
    value: 'jiangnanzhong',
    label: '江南中街道',
  }, {
    value: 'chigang',
    label: '赤岗街道',
  }, {
    value: 'nanhuaxi',
    label: '南华西街道',
  }, {
    value: 'fengyang',
    label: '凤阳街道',
  }, {
    value: 'nanzhou',
    label: '南洲街道',
  }, {
    value: 'xingang',
    label: '新港街道',
  }, {
    value: 'longfeng',
    label: '龙凤街道',
  }, {
    value: 'nanshitou',
    label: '南石头街道',
  }, {
    value: 'pazhou',
    label: '琶洲街道',
  },
];

const areaOptions = [
  {
    value: 'guangzhou',
    label: '广州',
    children: [
      {
        value: 'yuexiu',
        label: '越秀区',
        children: yuexiuInfo,
      }, {
        value: 'haizhu',
        label: '海珠区',
        children: haizhuInfo,
      }, {
        value: 'liwan',
        label: '荔湾区',
      }, {
        value: 'tianhe',
        label: '天河区',
      }, {
        value: 'baiyun',
        label: '白云区',
      }, {
        value: 'huangpu',
        label: '黄埔区',
      }, {
        value: 'huadu',
        label: '花都区',
      }, {
        value: 'panyu',
        label: '番禺区',
      }, {
        value: 'luogang',
        label: '萝岗区',
      }, {
        value: 'nansha',
        label: '南沙区',
      }, {
        value: 'conghua',
        label: '从化市',
      }, {
        value: 'zengcheng',
        label: '增城市',
      },
    ],
  }, {
    value: 'shenzhen',
    label: '深圳',
    children: [
      {
        value: 'futian',
        label: '福田区',
        children: [{
          value: 'futian',
          label: '福田街道',
        }],
      },
    ],
  }
];

const personInfo = [];
for (let i = 0; i < 80; ++i) {
  personInfo.push({
    key: '1',
    name: '陈嘉健',
    phone: '12345678900',
    idnum: '44010000000000',
    status: (i % 2 == 0) ? '已关注' : '未关注',
    branch: '番禺大学城街道',
    officer: '陈典',
    operation: '',
  });
};

const personColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '手机号码',
    dataIndex: 'phone',
    key: 'phone',
  }, {
    title: '身份证号',
    dataIndex: 'idnum',
    key: 'idnum',
  }, {
    title: '公众号状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '所属分支',
    dataIndex: 'branch',
    key: 'branch',
  }, {
    title: '直属指挥官',
    dataIndex: 'officer',
    key: 'officer',
  }, {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render(text) {
      return <a href="#">修改</a>;
    }
  },
];

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];

function onChange(value) {
  console.log(value);
}

type PropType = {
}

@inject(stores => ({
  isLogin: stores.user.isLogin,
}))
@unLoginRedirect('/login')
@observer
class Personnel extends Component<PropType> {
  componentDidMount() {
    console.log('hi');
  }

  render() {
    return (
      <Container>
        <div id="inAndout" style={{ float: 'right' }}>
          <Button type='ghost' style={{ margin: '0 10px' }}>批量导出</Button>
          <Button type='ghost' style={{ margin: '0 10px' }}>批量导入</Button>
          <Button type='primary' style={{ margin: '0 10px' }}>新增</Button>
        </div>

        <div id="select">
          <span>区域　</span>
          <Cascader style={{ width: '32%' }} defaultValue={['guangzhou', 'yuexiu', 'dongshan']} options={areaOptions} onChange={onChange}>
          </Cascader>
        </div>

        <div id="search" style={{ marginTop: '10px', marginRight: '5px' }}>
          <InputInfo>
            <span>姓名　</span><InputNumber placeholder='请输入' style={{ width: '130px' }} />
          </InputInfo>
          <InputInfo>
            <span>手机号码　</span><InputNumber placeholder='请输入' style={{ width: '130px' }} />
          </InputInfo>
          <InputInfo>
            <span>身份证号码　</span><InputNumber placeholder='请输入' style={{ width: '230px', }} />
          </InputInfo>

          <div id="btn" style={{ float: 'right' }}>
            <Button type='primary' style={{ margin: '0 6px' }}>查找</Button>
            <Button type='ghost' style={{ margin: '0 6px' }}>重置</Button>
          </div>
        </div>

        <Table pagination={{ pageSize: 5 }} style={{ marginTop: '20px' }} dataSource={personInfo} columns={personColumns} />
      </Container>
    );
  }
}

export default Personnel;
