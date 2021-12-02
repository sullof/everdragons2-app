// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap
// eslint-disable-next-line no-undef
const {Link} = ReactRouterDOM

import * as Scroll from 'react-scroll'
import Markdown from 'react-markdown-it'

import Base from '../Base'

export default class Story extends Base {

  render() {
    const short = `
It was 2018. They had been searching for years through hundreds of dimensions when they finally saw signs of life. A dimension with only ten thousand humanoid punks and kittens growing uncontrolled. This dimension was called Ethereum.

Three years have passed since the first Everdragons arrived in Ethereum in 2018. After a strenuous Crypto Winter and a widespread pandemic, life returns stronger than ever with kittens, apes, and many other creatures.

As for the Everdragons, they are awakening from their icy slumber. The second group of Everdragons explorers, aptly named Everdragons2, are on their way to settle in nearby dimensions. Everdragons2 settled in their new dimension, Polygon, where with new technology they forged a permanent portal to their homeland.

`
    return (
      <div className={'home-section'}>
        <Scroll.Element name='story'><h1>Story</h1></Scroll.Element>
      <Row>
          <Col>
            <div className={'textBlock'}>
              <Markdown source={short}/>
              {/*<div style={{marginTop: 12}}>*/}
              {/*  <Link to={'/story'}><b>[ Read the full story ]</b></Link>*/}
              {/*</div>*/}
            </div>
          </Col>
      </Row>
      </div>
    )
  }
}
