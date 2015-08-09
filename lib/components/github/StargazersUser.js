import React, { PropTypes } from 'react'
import { Link } from 'cherrytree-for-react'

export default class StargazersUser extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render () {
    const { user } = this.props

    return (
      <div className="l-box">
        <div>
          <Link href={`/stargazers/${user.login}`}
            title={user.login}>
            <img
              src={user.avatar_url}
              width="72"
              height="72"
              style={{ borderRadius: '100px' }} />
          </Link>
        </div>
        <div>
          <Link href={`/stargazers/${user.login}`}
            style={{ textDecoration: 'none', color: '#888' }}>
            <div className="ellipsis">
              <i className="fa fa-angle-double-right"></i>
              {' ' + user.login}
            </div>
          </Link>
        </div>
      </div>
    )
  }
}
