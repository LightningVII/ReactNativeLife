import React, { Component } from 'react'
import Dialog from './Dialog'
import PicDialog from './PicDialog'
import PlainMsg from './PlainMsg'

const rule = type => {
  return class Wrapping extends Component {
    constructor () {
      super()
      this.mapping = {
        pic: PicDialog,
        text: Dialog,
        plain: PlainMsg
      }
    }
    render () {
      const wordStyle = {
        borderColor: '#ccc',
        borderWidth: this.props.dir === 'rtl' ? 0 : 1
      }
      const Msg = this.mapping[type]
      const dir = !this.props.dir ? { dir: 'ltr' } : {}

      return <Msg {...dir} {...this.props} wordStyle={wordStyle} />
    }
  }
}

export default rule
