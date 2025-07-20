import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import * as Scroll from 'react-scroll'

import Address from '../utils/Address'
import Base from './Base'
import WalletConnect from './WalletConnect'
import NetworkSwitch from './NetworkSwitch'

export default class Header extends Base {

  constructor(props) {
    super(props)

    this.state = {
      addressExpanded: false,
      expanded: '',
      pathname: window.location.pathname
    }

    this.bindMany([
      'expandAddress',
      'checkPathname',
      'setExpanded'
    ])
  }

  setExpanded() {
    this.setState({
      expanded: this.state.expanded ? '' : 'expanded'
    })
  }

  ellipseAddress(address) {
    const width = 4
    return `${address.slice(0, width)}...${address.slice(-4)}`
  }

  componentDidMount() {
    this.checkPathname()
  }

  expandAddress() {
    this.setState({
      addressExpanded: !this.state.addressExpanded
    })
  }

  checkPathname() {
    let {pathname} = window.location
    if (pathname !== this.state.pathname) {
      this.setState({
        pathname
      })
    }
    setTimeout(this.checkPathname, 500)
  }


  render() {

    const {expanded} = this.state

    let isPhone = this.Store.width < 900

    let address = null
    let shortAddress
    if (this.Store.signedInAddress) {
      let fullAddress = this.Store.signedInAddress
      shortAddress = this.ellipseAddress(fullAddress)
      if (this.state.addressExpanded) {
        address = <span>{this.Store.signedInAddress}
          {/*  <i onClick={this.expandAddress}*/}
          {/*                                                className="command fa fa-minus-circle"*/}
          {/*/>*/}
        </span>
      } else {
        address = <span>{shortAddress}
          {isPhone ? null :
            <i style={{marginLeft: 5}} onClick={this.expandAddress}
               className="command fa fa-plus-circle"
            />
          }</span>
      }
    }

    let connectedTo = null
    let {connectedNetwork} = this.Store

    if (this.Store.signedInAddress && !connectedNetwork) {
      connectedTo = <NetworkSwitch Store={this.Store} />
    }

    const getTitle = (what, title) => {
      let {which} = this.state
      title = title || what.substring(0, 1).toUpperCase() + what.substring(1)
      if (which === what) {
        return <b>{title}</b>
      } else {
        return title
      }
    }

    return <Navbar expanded={expanded}  fixed="top" bg="light" expand="lg" className={'roboto'}>
      <Navbar.Brand href="/"><img src={'https://arweave.net/rfoyL5aDkgPmyPX8mYdJxZGyFOJ1LOX5LFmNg8_R9Ys/everDragons2Icon.png'} style={{height: 40}}/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"
                     onClick={ this.setExpanded}
      />
      <Navbar.Collapse  id="navbarScroll">

        {this.state.pathname === '/'
          ?
          <Nav
            className="mr-auto my-2 my-lg-0"
            navbarScroll
          >
            <Scroll.Link
              offset={-80}
              spy={true} smooth={true} to='intro' onClick={this.setExpanded}>Intro</Scroll.Link>
            <Scroll.Link
              offset={-80}
              spy={true} smooth={true} to='story' onClick={this.setExpanded}>Story</Scroll.Link>
            {/*<Scroll.Link*/}
            {/*  offset={-80}*/}
            {/*  spy={true} smooth={true} to='art' onClick={this.setExpanded}>Art</Scroll.Link>*/}
            <Scroll.Link
              offset={-80}
              spy={true} smooth={true} to='roadmap' onClick={this.setExpanded}>Roadmap</Scroll.Link>
            {this.Store.signedInAddress &&
              <Scroll.Link
                offset={-80}
                spy={true} smooth={true} to='mydragons' onClick={this.setExpanded}>Your Dragons</Scroll.Link>
            }
            {/*<Scroll.Link*/}
            {/*  offset={-80}*/}
            {/*  spy={true} smooth={true} to='sale' onClick={this.setExpanded}>Sale</Scroll.Link>*/}
            {/*<Scroll.Link
              offset={-80}
              spy={true} smooth={true} to='faq' onClick={this.setExpanded}>FAQ</Scroll.Link>*/}
            {/*<Scroll.Link*/}
            {/*  offset={-80}*/}
            {/*  spy={true} smooth={true} to='drops' onClick={this.setExpanded}>Drops</Scroll.Link>*/}

            {/*<Scroll.Link
              offset={-80}
              spy={true} smooth={true} to='team' onClick={this.setExpanded}>Team</Scroll.Link>*/}
            {/*<Scroll.Link*/}
            {/*  offset={-80}*/}
            {/*  spy={true} smooth={true} to='ed'>ED Original</Scroll.Link>*/}
          </Nav>

          :
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{maxHeight: '100px'}}
            navbarScroll
          >
            <Nav.Link as={Link} to="/" onClick={this.setExpanded}>Home</Nav.Link>
            {this.Store.signedInAddress &&
              <Nav.Link as={Link} to="/#mydragons" onClick={this.setExpanded}>Your Dragons</Nav.Link>
            }
          </Nav>

        }
      </Navbar.Collapse>

      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className={'socialLinks2'}>

          <a className="item" target="_blank" href="https://twitter.com/everdragons2" rel="noreferrer">
            <i className="fab fa-twitter" /> <span className="roboto300">X</span>
          </a>

        </Navbar.Text>

        <Navbar.Text>
          {connectedTo}
        </Navbar.Text>
        <Navbar.Text>
          <WalletConnect Store={this.Store} setStore={this.props.setStore} />
        </Navbar.Text>
        {
          Address.isAdmin(this.Store.signedInAddress)
            ? <Navbar.Text>
              <Link to="/admin"><i className="fas fa-tools"/> Admin</Link>
            </Navbar.Text>
            : null
        }

      </Navbar.Collapse>
    </Navbar>
  }
}
