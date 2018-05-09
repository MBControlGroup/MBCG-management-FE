import { action, observable } from 'mobx';


class TestStore {
    @observable date = new Date();
    @observable name = 'michael';
    @action.bound
    changeName(name) {
      this.name = name;
    }
}

const store = new TestStore();

export default store;
