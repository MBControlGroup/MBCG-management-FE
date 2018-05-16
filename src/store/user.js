/* @flow */
import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

import post from '../utils/fetch';

class User {
  @observable loginIning = false;
  @observable registerIng = false;
  @observable pwdVisible = false;
  @persist
  @observable
  isLogin = false;
  @persist('object')
  @observable
  user = null;

  @action.bound
  setPwdVisible() {
    this.pwdVisible = !this.pwdVisible;
  }

  @action.bound
  async login(user: Object) {
    this.loginIning = true;
    const postData = {
      username: user.username,
      password: user.password,
    };
    try {
      await post('http://private-5648c6-signin13.apiary-mock.com/signin', postData);
      this.setUser(user);
    } finally {
      this.loginIning = false;
    }
  }

  @action.bound
  setUser(user: Object) {
    this.user = user.username;
    this.isLogin = true;
  }

  @action.bound
  async logout() {
    try {
      await post('http://private-5648c6-signin13.apiary-mock.com/signout', {});
      this.user = null;
      this.isLogin = false;
    } catch (err) {
      console.log(err);
    }
  }

  async clearUser() {
    this.user = null;
    this.isLogin = false;
  }
}

const self = new User();

export default self;
