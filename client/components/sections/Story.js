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
### 2018

They’d been traveling alone for hundreds of years through deep space when they finally saw signs of life. A planet with only ten thousand humanoids, and kittens growing uncontrolled.

The [EverDragons](https://everdragons.com) landed in June 2018. A group of one thousand explorers settled on the northern part of the planet to recover from the strenuous voyage. Or so they hoped. An even bigger catastrophe was about to threaten their existence. Crypto winter was coming.

`
    return (
      <div className={'home-section'}>
        <Scroll.Element name='story'><h1>The story</h1></Scroll.Element>
      <Row>
          <Col>
            <div className={'textBlock'}>
              <Markdown source={short}/>
              <div style={{marginTop: 12}}>
                <Link to={'/story'}><b>[ Read the full story ]</b></Link>
              </div>
            </div>
          </Col>
      </Row>
      </div>
    )
  }
}
