// @flow
import React from 'react';
import { observer, inject } from 'mobx-react';
import { Icon } from './base-style-component';

type EyeButtonProps = {
  pwdVisible: boolean,
  setPwdVisible: () => void,
}

const EyeButton = ({ pwdVisible, setPwdVisible }: EyeButtonProps) => {
  return (
    <Icon
      onClick={() => {
        setPwdVisible();
      }}
      width={25}
      height={20}
      source={
        pwdVisible
          ? require('../app-assets/login/ic_open@2x.png')
          : require('../app-assets/login/ic_Close_the@2x.png')
      }
    />
  );
};

const EyeButtonWithInject = inject(stores => ({
  pwdVisible: stores.user.pwdVisible,
  setPwdVisible: stores.user.setPwdVisible,
}))(observer(EyeButton));

export default EyeButtonWithInject;
