import React from 'react'
import { Link } from 'cherrytree-for-react'

export default class About extends React.Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>About</h1>
        </div>
        <div className="content">
          <p>
            A special thanks to
            {' '}
            <Link to="user" params={{ username: 'gaearon' }}><code>@gaearon</code></Link>
            {' '}
            for kicking out the idea of <code>Redux</code>!
          </p>

          <h2>Libraries</h2>
          <p>
            This website is a showcase of different technologies
            {' '}
            and libraries such as:
            <ul>
              <li>
                <a href="https://github.com/facebook/react" target="_blank">
                  react
                </a>
              </li>
              <li>
                <a href="https://github.com/gaearon/redux" target="_blank">
                  redux
                </a>
              </li>
              <li>
                <a href="https://github.com/QubitProducts/cherrytree" target="_blank">
                  cherrytree
                </a>
              </li>
            </ul>
          </p>
        </div>
      </div>
    )
  }
}
