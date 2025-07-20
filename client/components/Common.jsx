import React from 'react'
import ls from 'local-storage'

export default class Common extends React.Component {

  constructor(props) {
    super(props)

    this.bindMany = this.bindMany.bind(this)
    this.ls = ls
  }

  bindMany(methods) {
    for (let m of methods) {
      this[m] = this[m].bind(this)
    }
  }

  render() {
    return <div/>
  }
}

