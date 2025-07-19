// const {Link} = ReactRouterDOM
import Base from './Base'
import Ab from './Ab'

// eslint-disable-next-line no-undef
const {Navbar, Button} = ReactBootstrap

class Footer extends Base {

  render() {
    return (
      <Navbar
        fixed="bottom"
              bg="dark" expand="lg" className="d-flex justify-content-between navbar navbar-expand-lg navbar-light px-0 sticky">
        <div id={'footer'} className={'centered'} style={{width: '100%'}}>
          <div className={'centered'}>
              (c) 2021-{new Date().getFullYear()} <Ab label={`'ndujaLabs`} link={'https://ndujalabs.com'}/>{' | '}
              <a className="item" target="_blank" href="https://x.com/everdragons2" rel="noreferrer">
                <i className="fab fa-twitter" /> <span className="roboto300">X</span>
              </a>
          </div>

        </div>
      </Navbar>
    )
  }
}

module.exports = Footer
