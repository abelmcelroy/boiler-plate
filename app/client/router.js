import React from 'react'
import {
  Route,
  Switch,
  withRouter,
  Redirect,
} from 'react-router-dom'

const Router = () => (
  <div>
    <Switch>
      <Route exact path='/' component={() => {
        return (<div>Hello World</div>)
      }} />
      <Redirect to="/" />
    </Switch>
  </div>
)

export default withRouter(Router)
