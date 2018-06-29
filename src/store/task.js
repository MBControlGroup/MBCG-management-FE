/* @flow */
import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';

import post from '../utils/fetch';

class Task {
    @observable currentTaskDetail = null;
    @observable currentTaskID = 1;
    @observable currentPeopleLoc = [];
    @observable isLoading = false;
    @observable activeSoldierID = 0;

    @action.bound
    setTaskID(id) {
      this.currentTaskID = id;
    }

    @action.bound
    setSoldierID(id) {
      this.activeSoldierID = id;

    }

    @action.bound
    async getTaskDetail() {
      this.isLoading = true;
      try {
        const { data } = await post(`https://dsn.apizza.net/mock/dc1fee80afcc841be1b4bc3044c5ef27/task/detail/${this.currentTaskID}`);
        this.currentTaskDetail = data;
        const loc_result = await post('https://dsn.apizza.net/mock/dc1fee80afcc841be1b4bc3044c5ef27/loc/getAllLocs', {
          task_id: this.currentTaskID,
          pn: 1,
        });
        this.currentPeopleLoc = loc_result.data.data;
        console.log(this.currentPeopleLoc);
      } catch (err) {
        console.log('hi');
      } finally {
        this.isLoading = false;
      }
    }
    

    @computed
    get locationcenter() {
      if (this.currentTaskDetail === null) {
        return { longitude: 120, latitude: 30 };
      }
      return { longitude: this.currentTaskDetail.place_lng, latitude: this.currentTaskDetail.place_lat };
    }
}

const self = new Task();

export default self;
