/* @flow */
import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';

import post from '../utils/fetch';

class Personnel {
    @observable areaData = [];
    @observable isLoadingAreaInfo = false;

    // @action.bound
    // setSelected(key) {
    //     this.selectedAreaKey.push(key);
    // }

    @action.bound
    async getOrgs() {
      this.isLoadingAreaInfo = true;
      try {
        const { data } = await post('https://dsn.apizza.net/mock/dc1fee80afcc841be1b4bc3044c5ef27/getorginfo');
        this.areaData = data.data;
      } catch (e) {
        console.log(e);
      } finally {
        console.log('finished');
        this.isLoadingAreaInfo = false;
      }
    }
}

const info = new Personnel();

export default info;
