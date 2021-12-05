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
Everdragons2 will use a Dutch Auction.

It will avoid gas war and will generate a fair distribution among the community.

The sale will start at an inflated price, decreasing by 10% every hour, reaching a floor after 32 hours.

The exact date is to be defined. But, it will most likely be around December 14th, at 1pm EST.
`

    return (
      <div className={'home-section'}>
      <Scroll.Element name='sale'><h1>Sale</h1></Scroll.Element>
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
