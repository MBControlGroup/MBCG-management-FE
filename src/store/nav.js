/* @flow */
import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

import post from '../utils/fetch';

class Nav {
    @observable selectedKey = [];

    @action.bound
    setSelectedKey(key) {
      this.selectedKey[0] = key;
    }
}

const self = new Nav();

export default self;
