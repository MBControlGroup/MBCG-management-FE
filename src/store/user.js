/* @flow */
import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import { notification } from 'antd';

import post from '../utils/fetch';
import history from '../component/History';

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
      await post(':9200/signin', postData);
      this.setUser(user);
      notification.success({ message: '登录成功' });
      history.push('/task');
    } catch(err) {
      console.log(err);
      if (err.message === 'server') {
        notification.error({ message: '服务器内部错误' });
      }
      notification.error({ message: '账号或密码错误' });
    }
    finally {
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
      await post(':9200/signout', {});
      this.user = null;
      this.isLogin = false;
    } catch (err) {
      console.log(err);
      if (err.message === 'server') {
        notification.error({ message: '服务器内部错误' });
      }
    }
  }

  async clearUser() {
    this.user = null;
    this.isLogin = false;
  }
}

const self = new User();

export default self;
