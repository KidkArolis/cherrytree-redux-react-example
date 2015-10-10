import React, { PropTypes } from 'react'
import { Link } from 'cherrytree-for-react'
import MenuListItem from './MenuListItem'

const GITHUB_REPO =
  'https://github.com/KidkArolis/cherrytree-redux-react-example'
const menuItems = [
  { text: 'Stargazers', link: '/stargazers/KidkArolis', icon: 'fa fa-star' },
  { text: 'About', link: '/about', icon: 'fa fa-dot-circle-o' },
  { text: 'Fork Me', link: GITHUB_REPO, icon: 'fa fa-github', isExternal: true }
]

export default class Menu extends React.Component {

  static propTypes = {
    activeClass: PropTypes.string.isRequired
  }

  render () {

    return (
      <div id="menu" ref="menu" className={this.props.activeClass}>
        <div className="pure-menu">
          <Link to="app" className="pure-menu-heading">
            Cherrytree<br /> + Redux<br /> + React
          </Link>

          <ul className="pure-menu-list">
            {menuItems.map((item, i) => <MenuListItem {...item} key={i} />)}
          </ul>
        </div>
      </div>
    )
  }
}
