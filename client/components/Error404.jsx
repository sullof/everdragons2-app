import React from 'react'
import Base from './Base'
import { Container } from 'react-bootstrap'

class Error404 extends Base {

  constructor(props) {
    super(props)

  }
  render() {

    return <Container style={{marginTop: 100}}>
      <div className={'noTokens m0Auto'}>
        <p>404, page not found :-(</p>
      </div>
    </Container>


  }
}

export default Error404
