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

    @action.bound
    toggleModal() {
      this.showModal = !this.showModal;
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
        const { data } = await post(`https://dsn.apizza.net/mock/dc1fee80afcc841be1b4bc3044c5ef27/BMmanage/${this.currentOpenedMessageID}`, {});
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
        const { data } = await post('https://dsn.apizza.net/mock/dc1fee80afcc841be1b4bc3044c5ef27/getAllMes', {
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
}

const self = new Message();

export default self;
