// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap
import * as Scroll from 'react-scroll'
import Markdown from 'react-markdown-it'


import Base from '../Base'
import Ab from '../Ab'

export default class Sale extends Base {

  constructor(props) {
    super(props);

    this.state = {
    }

    this.bindMany([
    ])
  }

  render() {
    const text = `
EverDragons2 will use a Dutch Auction.

It will avoid gas war and will generate a fair distribution among the community.

The sale will start at an inflated price, decreasing by 10% every hour, reaching a floor after 32 hours.

The sale will happen some day around December 15th.
`

    return (
      <div className={'home-section'}>
      <Scroll.Element name='sale'><h1>The Sale</h1></Scroll.Element>
      <Row>
          <Col>
            <div className={'textBlock'}>
              <Markdown source={text}/>
            </div>
          </Col>
      </Row>
      </div>
    )
  }
}
