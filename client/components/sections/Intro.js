// eslint-disable-next-line no-undef
const {Container, Row, Col, Carousel} = ReactBootstrap
import * as Scroll from 'react-scroll'
import Markdown from 'react-markdown-it'


import Base from '../Base'

export default class Intro extends Base {

  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }

    this.bindMany([
      'slide',
    ])
  }

  componentDidMount() {
    this.setTimeout(this.slide, 3000)
  }

  slide() {
    let {index} = this.state
    if (index === 7) {
      index = -1
    }
    index++
    this.setState({index})
    this.setTimeout(this.slide, 3000)
  }

  getSingle(i) {
    return <Col lg={2} xs={6} key={'d' + i}>
      <img alt={''} src={`/images/d${i}.png`}/>
    </Col>
  }

  isMobile() {
    return window.innerWidth < 800
  }

  getFour(j) {
    let cols = []
    const m = this.isMobile() ? 2 : 6
    for (let i = 0; i< m;i++) {
      cols.push(this.getSingle(j))
      if (j === 7) {
        j = -1
      }
      j++
    }
    return <Carousel.Item>
      <Row className={'dragons-show'}>
        {cols}
      </Row>
    </Carousel.Item>
  }

  getThree(j) {
    let cols = []
    const m = this.isMobile() ? 2 : 5
    for (let i = 0; i< m;i++) {
      cols.push(this.getSingle(j))
      if (j === 7) {
        j = -1
      }
      j++
    }
    return <Carousel.Item>
      <Row className={'dragons-show'}>
        {this.isMobile() ? '' : <Col lg={1}>{' '}</Col>}
        {cols}
        {this.isMobile() ? '' : <Col lg={1}>{' '}</Col>}
      </Row>
    </Carousel.Item>
  }

  render() {

    const {index} = this.state
    return (
      <div className={'home-section'}>
        <Carousel
          fade
          indicators={false}
          nextLabel={''}
          nextIcon={''}
          prevLabel={''}
          prevIcon={''}
          activeIndex={index}
          // onSelect={handleSelect}
        >
          {this.getFour(0)}
          {this.getThree(2)}
          {this.getFour(4)}
          {this.getThree(1)}
          {this.getFour(6)}
          {this.getThree(3)}
          {this.getFour(7)}
          {this.getThree(5)}
        </Carousel>
        <Row>
          <Col>
            <div className={'textBlock'}>
              EverDragons2 is a collection of 10001 dragons randomly generated from hundreds of assets. Historically, 1332 unique EverDragons were minted in 2018 among Ethereum, POA Network, and Tron. Back then, the owners could move their dragons <span className={'bold'}>across blockchains and play a variety of games</span>. Like the originals, the new EverDragons will all have unique DNA, be collectible, and safely stored on the blockchain as ERC-721 Tokens.
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
