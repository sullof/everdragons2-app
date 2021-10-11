// eslint-disable-next-line no-undef
import Markdown from 'react-markdown-it';

const {Container, Row, Col} = ReactBootstrap
import * as Scroll from 'react-scroll'

import Base from '../Base'
import Ab from '../Ab'
import CenteredImage from './CenteredImage'

export default class Art extends Base {

  constructor(props) {
    super(props);

    this.state = {
    }

    this.bindMany([
    ])
  }

  render() {
    const text = `The EverDragons were designed back in 2017-2018. The new collection reuses the original assets to preserve the integrity of the project. The illustrator Ruben Gonzalez drew the original series. Jacqueline Hardy, starting from that, has worked on the images to produce variations, new elements, and unique dragons. Among the improvements she made, many highlight rarity attributes that weren't easy to spot in the first set.`
    return (
      <div className={'home-section'}>
      <Scroll.Element name='art'><h1>The Art</h1></Scroll.Element>
      <Row>
          <Col>
            <div className={'textBlock'}>
              <CenteredImage
                src={'/images/elements.png'} alt={'The four elements'}/>
              <Markdown source={text}/>
            </div>
          </Col>
      </Row>
      </div>
    )
  }
}
