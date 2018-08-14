import React, { Component } from 'react'
import { Link, NavLink, Nav } from 'react-router-dom'
import * as Scroll from 'react-scroll'

class Header extends Component {
    constructor(props) {
        super(props)

        this.handleDiscoverClick = this.handleDiscoverClick.bind(this)
    }

    handleDiscoverClick() {

      const { match, location, history } = this.props

      console.log(location)
      Scroll.scroller.scrollTo('discoverySectionScroll', {
        duration: 500,
        smooth: true
      })
      debugger

    }

    render() {

        return (
            <div className={`headerContainer shrunk `}>
              <div className="content-wrapper">
              {   location.pathname == "/" ?

                <NavLink className="nav-link left" to="/#discoverySectionScroll" activeClassName='is-active' onClick={this.handleDiscoverClick}>Discover</NavLink>
                :
                <NavLink className="nav-link left" to="/#discoverySectionScroll" activeClassName='is-active'>HOME</NavLink>


              }

                <Link id="headerLogo" to="/">
                  <img src="http://dashboard.rockwiththis.com/wp-content/uploads/2018/03/logo-hi-res.png" />
                </Link>
                <Link id="headerLogoMobile" to="/">
                  <img src="http://www.dashboard.rockwiththis.com/wp-content/uploads/2018/06/RWT-head.png" />
                </Link>
                <NavLink className="nav-link right" to="/connect" activeClassName='is-active' >Connect</NavLink>
              </div>
            </div>
        )
    }
}

export default Header
