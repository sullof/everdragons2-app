// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap
import * as Scroll from 'react-scroll'
import Markdown from 'react-markdown-it'


import Base from '../Base'
import Ab from '../Ab'

export default class ED extends Base {

  constructor(props) {
    super(props);

    this.state = {}

    this.bindMany([])
  }

  render() {
    const text = `Everdragons2 is a project by 'ndujaLabs, a laboratory for decentralized project.`
    return (
      <div className={'home-section'}>
        {/*<Scroll.Element name='credits'><h1>Credits</h1></Scroll.Element>*/}
        <Row>
          <Col>
            {/*<div className={'textBlock'} >*/}
              <div className={'centered'} style={{marginTop: 24, paddingBottom: 24}}>
                {/*<Ab label={<img src={'/images/ndujaLabs.png'} alt={' '} style={{width: 200}}/>}*/}
                {/*    link={'https://ndujalabs.com'}/>*/}
                <h5>Everdragons2 is a project by 'ndujaLabs, a laboratory for decentralized project.</h5>
              </div>
            {/*</div>*/}
          </Col>
        </Row>
      </div>
    )
  }
}
