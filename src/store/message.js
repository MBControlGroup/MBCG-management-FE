/* @flow */
import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';

import post from '../utils/fetch';

class Message {
    @observable currentMessages = [];
    @observable isLoadingMessages = false;
    @observable currentPage = 1;
    @observable currentPageSize = 10;
    @observable messageSum = 0;
    @observable showModal = false;
    @observable showNewMessageModal = false;
    @observable currentOpenedMessage = null;
    @observable currentOpenedMessageID = 0;
    @observable isInitingOpenedMessage = false;
    @observable variables = ['参数1', '参数2', '参数3', '参数4'];

    @action.bound
    toggleModal() {
      this.showModal = !this.showModal;
    }

    @action.bound
    changeVariableValue(index, value) {
      this.variables[index] = value;
    }

    @action.bound
    setCurrentOpenMessage(id) {
      this.currentOpenedMessageID = id;
    }

    @action.bound
    toggleNewMessageModal() {
      this.showNewMessageModal = !this.showNewMessageModal;
    }

    @action.bound
    async getCurrentOpenedMessage() {
      this.isInitingOpenedMessage = true;
      try {
        const { data } = await post(`:9300/BMmanage/${this.currentOpenedMessageID}`, {
          pn: 1,
          pc: 100,
        });
        this.currentOpenedMessage = data;
      } catch (err) {
        console.log(err);
      } finally {
        this.isInitingOpenedMessage = false;
      }
    }

    @action.bound
    async getMessages() {
      this.isLoadingMessages = true;
      try {
        const { data } = await post(':9300/BMmanage/getAllMes', {
          pn: this.currentPage,
          pc: this.currentPageSize,
        });
        console.log(data);
        this.messageSum = data.count_data;
        this.currentMessages = data.data;
      } catch (e) {
        console.log(e);
      } finally {
        console.log('finisheed');
        this.isLoadingMessages = false;
      }
    }

    @action.bound
    setPage(page) {
      this.currentPage = page;
      this.getMessages();
    }

    @action.bound
    setPageSize(size) {
      this.currentPageSize = size;
      this.getMessages();
    }

    @computed
    get getCurrentMessages() {
      return this.currentMessages.slice();
    }

    @computed
    get template() {
      return [
        {
          id: 'N00000015110_1',
          name: '邀请码',
          content: `您好，您的信息已经被录入广州市民兵应急指挥平台，请搜索微信公众号${`[${this.variables[0]}]`}并关注，关注后请输入邀请码${`[${this.variables[1]}]`}完成身份绑定。请勿泄露您的邀请码！`,
          num: '1',
          vars: 2,
        },
        {
          id: 'N00000015110_2',
          name: '初始账号密码',
          content: `您好，您被设置为广州市民兵应急指挥平台中所在单位${`[${this.variables[0]}]`}的负责人，有权登录并使用系统，系统网址为${`[${this.variables[1]}]`}，登录账号为${`[${this.variables[2]}]`}，初始密码为${`[${this.variables[3]}]`}，请尽快登录并修改密码。`,
          num: '2',
          vars: 4,
        },
        {
          id: 'N00000015110_3',
          name: '集合通知',
          content: `您好，民兵紧急集合通知，发送单位${`[${this.variables[0]}]`}，集合地点${`[${this.variables[1]}]`}，集合事由${`[${this.variables[2]}]`}}，请您收到消息后查看微信公众号通知详情，并且迅速前往集合地点。`,
          num: '3',
          vars: 3,
        },
        {
          id: 'N00000015110_4',
          name: '点名通知',
          content: `您好，${`[${this.variables[0]}]`}点名通知，发送单位${`[${this.variables[1]}]`}，点名通知内容${`[${this.variables[2]}]`}，请您查看微信公众号点名通知进行响应。`,
          num: '4',
          vars: 3,
        },
        {
          id: 'N00000015110_5',
          name: '回执消息',
          content: `您好，${`[${this.variables[0]}]`}回执消息，发送单位${`[${this.variables[1]}]`}，通知内容${`[${this.variables[2]}]`}，请您查看微信公众号回执消息并及时回复。`,
          num: '5',
          vars: 3,
        },
        {
          id: 'N00000015110_6',
          name: '一般消息',
          content: `您好，${`[${this.variables[0]}]`}消息通知，发送单位${`[${this.variables[1]}]`}，通知内容{${`[${this.variables[2]}]`}，请您查看微信公众号消息通知。`,
          num: '6',
          vars: 3,
        },
      ];
    }
}

const self = new Message();

export default self;
