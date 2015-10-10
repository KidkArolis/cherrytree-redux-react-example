import React from 'react'
import createCherrytree from 'cherrytree'
import { Router } from 'cherrytree-for-react'
import { Provider } from 'redux/react'
import { createDispatcher, createRedux, composeStores } from 'redux'
import { loggerMiddleware, thunkMiddleware } from './middleware'
import * as components from './components'
import * as stores from './stores'

const {
  Application,
  About,
  GithubStargazers,
  GithubRepo,
  GithubUser
} = components
const dispatcher = createDispatcher(
  composeStores(stores),
  getState => [ thunkMiddleware(getState), loggerMiddleware ]
)
const redux = createRedux(dispatcher)

const cherrytree = createCherrytree({
  pushState: process.env.NODE_ENV !== 'production',
  log: false
})
  .map(routes)
  // an ad hoc redirect hook, an example of
  // how cherrytree middleware works
  .use(function redirect (transition) {
    let lastRoute = transition.routes[transition.routes.length - 1]
    if (lastRoute.options.redirect) {
      cherrytree.replaceWith.apply(cherrytree, lastRoute.options.redirect)
      return true
    }
  })

export default class Root extends React.Component {
  render () {
    return (
      <Provider redux={redux}>
        {() => <Router router={cherrytree} />}
      </Provider>
    )
  }
}

function routes (route) {
  let home = [ 'user', { username: 'KidkArolis' }]
  route('app', { path: '/', redirect: home, component: Application }, () => {
    route('about', { path: 'about', component: About })
    route('stargazers', { path: 'stargazers', component: GithubStargazers }, () => {
      route('repo', { path: ':username/:repo', component: GithubRepo })
      route('user', { path: ':username', component: GithubUser })
    })
  })
}
