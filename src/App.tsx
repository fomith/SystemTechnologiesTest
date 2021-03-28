import React from 'react'
import { Provider } from 'react-redux'
import { FirstPage } from './components/first-page/first-page.container'
import { store } from './store/store'
import { Route, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { SecondPage } from './components/second-page/second-page.container'

function App (): React.ReactElement {
  return (
    <Provider store={store}>
      <Route exact path="/" render={() => <FirstPage />} />
      <Route exact path="/calculator" render={() => <SecondPage />} />
    </Provider>
  )
}

export default compose(withRouter)(App)
