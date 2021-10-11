// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap
import * as Scroll from 'react-scroll'
import Markdown from 'react-markdown-it'


import Base from '../Base'
import Ab from '../Ab'

export default class Drops extends Base {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }

    this.bindMany([
      'expand'
    ])
  }

  expand() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {

    return (
      <div className={'home-section'}>
        <Scroll.Element name='drops'><h1>Drops</h1></Scroll.Element>
        <div className={'textBlockCS'}>
          <div className={'comingSoon'}>Coming soon...</div>
        </div>
      </div>
    )
  }
}
