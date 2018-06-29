// @flow
import MobxReactForm from 'mobx-react-form'
import { validator } from './'

export default class Form extends MobxReactForm {
  plugins() {
    return { dvr: validator }
  }
}
