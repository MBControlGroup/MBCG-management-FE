import * as React from 'react';
import { Cascader } from 'antd';

const yuexiuInfo = [
  { value: 'dongshan', label: '东山街道' }, 
  { value: 'meihuacun', label: '梅花村街道'}, 
  { value: 'nonglin', label: '农林街道'}, 
  { value: 'huanghuagang', label: '黄花岗街道',},
  { value: 'hongqiao', label: '洪桥街道',}, 
  { value: 'beijing', label: '北京街道', }, 
  { value: 'liurong', label: '六榕街道',}, 
  { value: 'liuhua', label: '流花街道',}, 
  { value: 'guangta', label: '光塔街道',}, 
  { value: 'renmin', label: '人民街道',}, 
  { value: 'dadong', label: '大东街道',}, 
  { value: 'datang', label: '大塘街道',}, 
  { value: 'zhuguagn', label: '珠光街道',}, 
  { value: 'jianshe', label: '建设街道',}, 
  { value: 'baiyun', label: '白云街道',}, 
  { value: 'huale', label: '华乐街道',}, 
  { value: 'meihuacun', label: '梅花村街道',}, 
  { value: 'kuangquan', label: '矿泉街道',}, 
  { value: 'dengfeng', label: '登峰街道',}
];
const haizhuInfo = [
  { value: 'jianghai',label: '江海街道',}, 
  { value: 'binjiang',label: '滨江街道',}, 
  { value: 'shayuan',label: '沙园街道',}, 
  { value: 'huazhou',label: '华洲街道',}, 
  { value: 'guanzhou',label: '官洲街道',}, 
  { value: 'haizhuang',label: '海幢街道',}, 
  { value: 'sushe',label: '素社街道',}, 
  { value: 'ruibao',label: '瑞宝街道',}, 
  { value: 'changgang',label: '昌岗街道',}, 
  { value: 'jiangnanzhong',label: '江南中街道',}, 
  { value: 'chigang',label: '赤岗街道',}, 
  { value: 'nanhuaxi',label: '南华西街道',}, 
  { value: 'fengyang',label: '凤阳街道',}, 
  { value: 'nanzhou',label: '南洲街道',}, 
  { value: 'xingang',label: '新港街道',}, 
  { value: 'longfeng',label: '龙凤街道',}, 
  { value: 'nanshitou',label: '南石头街道',}, 
  { value: 'pazhou',label: '琶洲街道',},
];

const liwanInfo = [
  { value: 'zhongnan', label: '中南街道'},
  { value: 'qiaozhong', label: '桥中街道'},
  { value: 'lingnan', label: '岭南街道'},
  { value: 'nanyuan', label: '南源街道'},
  { value: 'dongjiao', label: '东漖街道'},
  { value: 'shiweitang', label: '石围塘街道'},
  { value: 'caihong', label: '彩虹街道'},
  { value: 'changhua', label: '昌华街道'},
  { value: 'xicun', label: '西村街道'},
  { value: 'hailong', label: '海龙街道'},
  { value: 'chongkou', label: '冲口街道'},
  { value: 'zhanqian', label: '站前街道'},
  { value: 'longjin', label: '龙津街道'},
  { value: 'jinhua', label: '金花街道'},
  { value: 'chajiao', label: '茶滘街道'},
  { value: 'huadi', label: '花地街道'},
  { value: 'fengyuan', label: '逢源街道'},
  { value: 'hualin', label: '华林街道'},
  { value: 'baihedong', label: '白鹤洞街道'},
  { value: 'duobaojie', label: '多宝街道'},
  { value: 'shamian', label: '沙面街道'},
  { value: 'dongsha', label: '东沙街道'},
];
const tianheInfo = [
  { value: 'xinghua', label: '兴华街道'},
  { value: 'shipai', label: '石牌街道'},
  { value: 'shahe', label: '沙河街道'},
  { value: 'zhuji', label: '珠吉街道'},
  { value: 'changxing', label: '长兴街道'},
  { value: 'liede', label: '猎德街道'},
  { value: 'xiancun', label: '冼村街道'},
  { value: 'shadong', label: '沙东街道'},
  { value: 'chebei', label: '车陂街道'},
  { value: 'tianyuan', label: '天园街道'},
  { value: 'linhe', label: '林和街道'},
  { value: 'yuancun', label: '员村街道'},
  { value: 'tangxia', label: '棠下街道'},
  { value: 'tianhenan', label: '天河南街道'},
  { value: 'wushan', label: '五山街道'},
  { value: 'xintang', label: '新塘街道'},
  { value: 'longdong', label: '龙洞街道'},
  { value: 'qianjin', label: '前进街道'},
  { value: 'huangcun', label: '黄村街道'},
  { value: 'fenghuang', label: '凤凰街道'},
  { value: 'yuangang', label: '元岗街道'},
];

const baiyunInfo = [
  { value: 'jinsha', label: '金沙街道'},
  { value: 'taihe', label: '太和街道'},
  { value: 'junhe', label: '均禾街道'},
  { value: 'sanyuanli', label: '三元里街道'},
  { value: 'jingxi', label: '京溪街道'},
  { value: 'shijing', label: '石井街道'},
  { value: 'tangjing', label: '棠景街道'},
  { value: 'jiahe', label: '嘉禾街道'},
  { value: 'taihezhen', label: '太和镇街道'},
  { value: 'xinshi', label: '新市街道'},
  { value: 'songzhou', label: '松洲街道'},
  { value: 'yuncheng', label: '云城街道'},
  { value: 'renhezhen', label: '人和镇街道'},
  { value: 'helong', label: '鹤龙街道'},
  { value: 'shimen', label: '石门街道'},
  { value: 'jianggaozhen', label: '江高镇街道'},
  { value: 'yongping', label: '永平街道'},
  { value: 'tongde', label: '同德街道'},
  { value: 'baiyunhu', label: '白云湖街道'},
  { value: 'huangshi', label: '黄石街道'},
  { value: 'jingtai', label: '景泰街道'},
  { value: 'tonghe', label: '同和街道'},
  { value: 'zhongluotanzhen', label: '钟落潭镇街道'},
];

const huangpuInfo = [
  { value: 'dongqujie', label: '东区街街道'},
  { value: 'lianhejie', label: '联和街街道'},
  { value: 'yonghejie', label: '永和街街道'},
  { value: 'xiagangjie', label: '夏港街街道'},
  { value: 'luogangjie', label: '萝岗街街道'},
  { value: 'yuzhujie', label: '鱼珠街街道'},
  { value: 'hongshanjie', label: '红山街街道'},
  { value: 'huangpujie', label: '黄埔街街道'},
  { value: 'suidongjie', label: '穗东街街道'},
  { value: 'nangangjie', label: '南岗街街道'},
  { value: 'changzhoujie', label: '长洲街街道'},
  { value: 'dashajie', label: '大沙街街道'},
  { value: 'lilianjie', label: '荔联街街道'},
  { value: 'weichongjie', label: '文冲街街道'},
];

const huaduInfo = [
  { value: 'huangchengjie', label: '花城街道'},
  { value: 'xiuquanjie', label: '秀全街道'},
  { value: 'xinhuajie', label: '新华街道'},
  { value: 'xinyajie', label: '新雅街道'},
  { value: 'huadongzhen', label: '花东镇'},
  { value: 'chinizhen', label: '赤坭镇'},
  { value: 'tanbuzhen', label: '炭步镇'},
  { value: 'shilingzhen', label: '狮岭镇'},
  { value: 'timianzhen', label: '梯面镇'},
  { value: 'huashanzhen', label: '花山镇'},
];

const panyuInfo = [
  { value: 'donghuan', label: '东环街道'},
  { value: 'luopu', label: '洛浦街道'},
  { value: 'qiaonan', label: '桥南街道'},
  { value: 'zhongcun', label: '钟村街道'},
  { value: 'shiqiao', label: '市桥街道'},
  { value: 'xiaoguwei', label: '小谷围街道'},
  { value: 'shibi', label: '石壁街道'},
  { value: 'shatou', label: '沙头街道'},
  { value: 'dashi', label: '大石街道'},
  { value: 'dalong', label: '大龙街道'},
  { value: 'shawanzhen', label: '沙湾镇'},
  { value: 'hualongzhen', label: '化龙镇'},
  { value: 'shijizhen', label: '石碁镇'},
  { value: 'shilouzhen', label: '石楼镇'},
  { value: 'xinzaozhen', label: '新造镇'},
  { value: 'nancunzhen', label: '南村镇'},
];

const nanshaInfo = [
  { value: 'nansha', label: '南沙街道'},
  { value: 'zhujiang', label: '珠江街道'},
  { value: 'wanqingsha', label: '万顷沙镇街道'},
  { value: 'hengli', label: '横沥镇街道'},
  { value: 'longxue', label: '龙穴街道'},
  { value: 'lanhezhen', label: '榄核镇'},
  { value: 'dongyongzhen', label: '东涌镇'},
  { value: 'huanggezhen', label: '黄阁镇'},
  { value: 'dagangzhen', label: '大岗镇'},
];

const conghuaInfo = [
  { value: 'jiangpu', label: '江埔街道'},
  { value: 'jiekou', label: '街口街道'},
  { value: 'chengjiao', label: '城郊街道'},
  { value: 'taipingzhen', label: '太平镇'},
  { value: 'lvtianzhen', label: '吕田镇'},
  { value: 'liangkouzhen', label: '良口镇'},
  { value: 'wenquanzhen', label: '温泉镇'},
  { value: 'aotouzhen', label: '鳌头镇'},
];

const zengchengInfo = [
  { value: 'zengjiang', label: '增江街道'},
  { value: 'zhucun', label: '朱村街道'},
  { value: 'licheng', label: '荔城街道'},
  { value: 'yongning', label: '永宁街道'},
  { value: 'zhongxinzhen', label: '中新镇'},
  { value: 'xiaolouzhen', label: '小楼镇'},
  { value: 'shitanzhen', label: '石滩镇'},
  { value: 'zhengguozhen', label: '正果镇'},
  { value: 'paitanzhen', label: '派潭镇'},
  { value: 'xiancunzhen', label: '仙村镇'},
  { value: 'xintangzhen', label: '新塘镇'},
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
          children: liwanInfo,
        }, {
          value: 'tianhe',
          label: '天河区',
          children: tianheInfo,
        }, {
          value: 'baiyun',
          label: '白云区',
          children: baiyunInfo,
        }, {
          value: 'huangpu',
          label: '黄埔区',
          children: huangpuInfo,
        }, {
          value: 'huadu',
          label: '花都区',
          children: huaduInfo,
        }, {
          value: 'panyu',
          label: '番禺区',
          children: panyuInfo,
        }, {
          value: 'nansha',
          label: '南沙区',
          children: nanshaInfo,
        }, {
          value: 'conghua',
          label: '从化市',
          children: conghuaInfo,
        }, {
          value: 'zengcheng',
          label: '增城市',
          children: zengchengInfo,
        },
      ],
    }
];

function onChange(value) {
    console.log(value);
}

type Props = {
}

class PersonnelAreaQuery extends React.Component<Props> {
    render() {
        return (
          <Cascader style={{width: '380px'}} defaultValue={['guangzhou', 'yuexiu', 'dongshan']} 
          options={areaOptions} onChange={onChange}>
          </Cascader>
        );
    }
}

export default PersonnelAreaQuery;