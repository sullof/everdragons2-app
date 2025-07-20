import PropTypes from 'prop-types'

import Common from './Common'
import clientApi from '../utils/ClientApi'

class Base extends Common {

  constructor(props) {
    super(props)
    this.bindMany([
      'store',
      'request',
      'setTimeout',
      'endTimeout'
    ])
    this.Store = this.props.Store
  }

  request(api, method, params = {}, query = {}) {
    return clientApi.request(api, method, params, query)
  }

  store(...params) {
    this.props.setStore(...params)
  }

  componentWillUnmount() {
    if (this.timerId !== undefined) {
      clearTimeout(this.timerId)
      this.timerId = undefined
    }
  }

  setTimeout(func, time) {
    this.timerId = setTimeout(() => this.endTimeout(func), time)
  }

  endTimeout(func, time) {
    clearTimeout(this.timerId)
    this.timerId = null
    func()
  }

  async sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis))
  }

  render() {
    return <div/>
  }
}

Base.propTypes = {
  Store: PropTypes.object,
  setStore: PropTypes.func
}

export default Base
