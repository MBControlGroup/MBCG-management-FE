/* @flow */
import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';

import post, { simpleFetchNoToken } from '../utils/fetch';

class Task {
    @observable currentTaskDetail = null;
    @observable currentTaskID = 1;
    @observable currentPeopleLoc = [];
    @observable currentResponseDetail = null;
    @observable currenGatherDetail = null;
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
        const { data } = await post(`:12380/task/detail/22`);
        this.currentTaskDetail = data;
        const loc_result = await simpleFetchNoToken('https://private-95a754-test16836.apiary-mock.com/loc/getAllLocs', {
          task_id: this.currentTaskID,
          pn: 1,
        });
        this.currentPeopleLoc = loc_result.data.data;
        const res_result = await post(`:12380/task/response/22`, {
          pn: 1,
          pc: 100,
        });
        this.currentResponseDetail = res_result.data;
        const gather_result = await post(`:12380/task/gather/22`, {
          pn: 1,
          pc: 100,
        });
        this.currenGatherDetail = gather_result.data;
        console.log(this.currentResponseDetail, this.currenGatherDetail);
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
