// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap

import Base from './Base'

export default class LandingPage extends Base {

  render() {

    return (
      <Container style={{marginTop: 100}}>
        <Row>
          <Col className={'centered'}>
            <img src={'/images/everDragonsLogo.png'} className={'bigLogo'}/>
          </Col>
        </Row>
        <Row>
          <Col className={'centered'}>
            <div className={'hina'} style={{fontSize: '3rem'}}>Coming soon...</div>
          </Col>
        </Row>

      </Container>
    )
  }
}
