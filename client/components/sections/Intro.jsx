import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import * as Scroll from 'react-scroll'
import Ab from '../Ab'

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

  componentWillUnmount() {
    if (this.slideTimer) {
      clearTimeout(this.slideTimer)
    }
  }

  slide() {
    let {index} = this.state
    if (index === 7) {
      index = -1
    }
    index++
    this.setState({index})
    this.slideTimer = this.setTimeout(this.slide, 3000)
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
    const m = this.isMobile() ? 3 : 6 // Show 3 on mobile, 6 on desktop
    for (let i = 0; i< m;i++) {
      cols.push(this.getSingle(j))
      if (j === 7) {
        j = -1
      }
      j++
    }
    return (
      <Row className={'dragons-show'} key={`four-${j}`}>
        {cols}
      </Row>
    )
  }

  getThree(j) {
    let cols = []
    const m = this.isMobile() ? 3 : 5 // Show 3 on mobile, 5 on desktop
    for (let i = 0; i< m;i++) {
      cols.push(this.getSingle(j))
      if (j === 7) {
        j = -1
      }
      j++
    }
    return (
      <Row className={'dragons-show'} key={`three-${j}`}>
        {this.isMobile() ? '' : <Col lg={1}>{' '}</Col>}
        {cols}
        {this.isMobile() ? '' : <Col lg={1}>{' '}</Col>}
      </Row>
    )
  }

  render() {
    const {index} = this.state
    
    // Create an array of all dragon rows
    const dragonRows = [
      this.getFour(0),
      this.getThree(2),
      this.getFour(4),
      this.getThree(1),
      this.getFour(6),
      this.getThree(3),
      this.getFour(7),
      this.getThree(5)
    ]

    return (
      <div className={'home-section'}>
        <div className="dragon-carousel">
          {dragonRows[index]}
        </div>
        <Row>
          <Col>
            <div className={'textBlock textBlockM'}>
              EverDragons2 is a collection of 10,001 dragons randomly generated from hundreds of assets. They inherit the legacy of <a href="https://opensea.io/collection/everdragons" target="_blank" rel="noopener noreferrer">Everdragons</a>, minted in 2018 as the first bridgeable cross-chain non-fungible token (NFT) for gaming.
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
