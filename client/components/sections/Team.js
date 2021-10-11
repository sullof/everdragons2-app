// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap
import * as Scroll from 'react-scroll'
import Markdown from 'react-markdown-it'


import Base from '../Base'
import Ab from '../Ab'

export default class Team extends Base {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }

    this.bindMany([
      'expand',
      'text'
    ])
  }

  expand() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  text() {
    return ``
  }

  render() {

    return (
      <div className={'home-section'}>
        <Scroll.Element name='team'><h1>The Dragons Riders</h1></Scroll.Element>
        <Row className={'dragons-show'}>
          <Col xs={6} lg={3}>
            <div className={'textBlock'}>
              <Ab label={<img src={'/images/avatars.png'}/>}
                  link={'https://opensea.io/assets/0x772da237fc93ded712e5823b497db5991cc6951e/206'}/>
              <div className={'centered teamname'}>Soolhoth</div>
            </div>
          </Col>
          <Col xs={6} lg={3}>
            <div className={'textBlock'}>
              <Ab label={<img src={'/images/avatarl.png'}/>}
                  link={'https://opensea.io/assets/0x772da237fc93ded712e5823b497db5991cc6951e/659'}/>
              <div className={'centered teamname'}>Baayojee</div>
            </div>
          </Col>
          <Col xs={6} lg={3}>
            <div className={'textBlock'}>
              <Ab label={<img src={'/images/avatare.png'}/>}
                  link={'https://opensea.io/assets/0x772da237fc93ded712e5823b497db5991cc6951e/567'}/>
              <div className={'centered teamname'}>Emhanuel</div>
            </div>
          </Col>
          <Col xs={6} lg={3}>
            <div className={'textBlock'}>
              <Ab label={<img src={'/images/avatard.png'}/>}
                  link={'https://opensea.io/assets/0x772da237fc93ded712e5823b497db5991cc6951e/35'}/>
              <div className={'centered teamname'}>Devideth</div>
            </div>
          </Col>
        </Row>
        <div className={'centered'}><Scroll.Element><h1>The Dragons Forgers</h1></Scroll.Element></div>
        <div className={'centrato'}>
          <Row className={'dragons-show'}>
            <Col xs={6} lg={4}>
              <div className={'textBlock'}>
                <Ab label={<img src={'/images/avatarp.png'}/>}
                    link={'https://opensea.io/assets/0x772da237fc93ded712e5823b497db5991cc6951e/1'}/>
                <div className={'centered teamname'}>Patrick</div>
              </div>
            </Col>
            <Col xs={6} lg={4}>
              <div className={'textBlock'}>
                <Ab label={<img src={'/images/avatarj.png'}/>}
                    link={'https://opensea.io/assets/0x772da237fc93ded712e5823b497db5991cc6951e/921'}/>
                <div className={'centered teamname'}>Jacqueline</div>
              </div>
            </Col>
            <Col xs={6} lg={4}>
              <div className={'textBlock'}>
                <Ab label={<img src={'/images/avatarm.png'}/>}
                    link={'https://opensea.io/assets/0x772da237fc93ded712e5823b497db5991cc6951e/969'}/>
                <div className={'centered teamname'}>Marc</div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
