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
    transition.routes.find(route => {
      if (route.options.redirect) {
        cherrytree.replaceWith.apply(cherrytree, route.options.redirect)
        return true
      }
    })
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
  route('app', { path: '/', component: Application }, () => {
    route('about', { path: 'about', component: About })
    route('stargazers', { path: 'stargazers', component: GithubStargazers }, () => {
      route('repo', { path: ':username/:repo', component: GithubRepo })
      route('user', { path: ':username', component: GithubUser })
    })
    route('index', { path: '', redirect: [ 'user', { username: 'emmenko' }] })
  })
}
