import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import theme from './ui/Theme'
import Header from '../components/ui/Header'
import Footer from '../components/ui/Footer'
import LandingPage from '../components/LandingPage'

function App () {
    // hook for active menu index number
    const [ value, setValue ] = useState(0)
    const [ selectedIndex, setSelectedIndex ] = useState(0)

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header
                    value={value}
                    setValue={setValue}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                />
                <Switch>
                    <Route
                        exact
                        path='/'
                        render={(props) => (
                            <LandingPage {...props} setValue={setValue} setSelectedIndex={setSelectedIndex} />
                        )}
                    />
                    <Route exact path='/services' component={() => <div>Services test</div>} />
                    <Route exact path='/customsoftware' component={() => <div>Custom Software test</div>} />
                    <Route exact path='/mobileapps' component={() => <div>Mobile Apps test</div>} />
                    <Route exact path='/websites' component={() => <div>Websites test</div>} />
                    <Route exact path='/revolution' component={() => <div>Revolution test</div>} />
                    <Route exact path='/about' component={() => <div>About test</div>} />
                    <Route exact path='/contact' component={() => <div>Contact test</div>} />
                    <Route exact path='/estimate' component={() => <div>Estimate test</div>} />
                </Switch>
                <Footer setValue={setValue} setSelectedIndex={setSelectedIndex} />
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
