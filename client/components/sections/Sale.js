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

    return (
      <div className={'home-section'}>
      <Scroll.Element name='sale'><h1>Sale</h1></Scroll.Element>
      <Row>
          <Col>
            <div className={'textBlock'}>
              <p>Everdragons2 Genesis Governance tokens will sell on this app for a fixed price of 500 MATIC.</p>

              {/*<p>It will avoid gas war and will generate a fair distribution among the community.</p>*/}

              {/*<p>The sale will start at an inflated price, decreasing by 10% every hour, reaching a floor after 32 hours.</p>*/}

              {/*<p><Ab link={'https://medium.com/everdragons2/everdragons2-sale-on-polygon-ca04d32855d8'} label={'Read this blog post for more details.'}/></p>*/}
            </div>
          </Col>
      </Row>
      </div>
    )
  }
}
