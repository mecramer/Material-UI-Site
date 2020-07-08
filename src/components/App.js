import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import theme from './ui/Theme'
import Header from '../components/ui/Header'

function App () {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path='/' component={() => <div>Home test</div>} />
                    <Route exact path='/services' component={() => <div>Services test</div>} />
                    <Route exact path='/customsoftware' component={() => <div>Custom Software test</div>} />
                    <Route exact path='/mobileapps' component={() => <div>Mobile Apps test</div>} />
                    <Route exact path='/websites' component={() => <div>Websites test</div>} />
                    <Route exact path='/revolution' component={() => <div>Revolution test</div>} />
                    <Route exact path='/about' component={() => <div>About test</div>} />
                    <Route exact path='/contact' component={() => <div>Contact test</div>} />
                    <Route exact path='/estimate' component={() => <div>Estimate test</div>} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
