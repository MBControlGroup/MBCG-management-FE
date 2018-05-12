// @flow
import * as React from 'react';
import styled from 'styled-components';

export const Icon = styled.i`
  display: block;
  height: ${props => props.size || props.height || 15}px;
  width: ${props => props.size || props.width || 15}px;
  background: url(${props => props.source});
  background-size: cover;
`;

export const BaseText = styled.span`
  color: ${props => (props.color ? props.color : '#1F1F1F')};
  font-size: ${props => (props.size ? props.size : 15)}px;
  text-align: ${props => props.align};
`;

export const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #f6f6f6;
  position: absolute;
  background-color: #fff;
  padding: 30px 15px 10px 15px;
`;
