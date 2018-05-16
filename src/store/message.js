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

    @action.bound
    toggleModal() {
      this.showModal = !this.showModal;
    }

    @action.bound
    toggleNewMessageModal() {
      this.showNewMessageModal = !this.showNewMessageModal;
    }

    @action.bound
    async getMessages() {
      this.isLoadingMessages = true;
      try {
        const { data } = await post('https://private-240e1-messagemanagement.apiary-mock.com/BMmanage/getAllMes', {
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
