import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { makeStyles } from '@material-ui/styles' // needed for inline styles
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import logo from '../../assets/logo.svg'

function ElevationScroll (props) {
    const { children, window } = props
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis : true,
        threshold         : 0,
        target            : window ? window() : undefined,
    })

    return React.cloneElement(children, {
        elevation : trigger ? 4 : 0,
    })
}

// useStyles uses the material ui function makeStyles
const useStyles = makeStyles((theme) => ({
    toolbarMargin       : {
        ...theme.mixins.toolbar,
        marginBottom                   : '3em',
        [theme.breakpoints.down('md')]: {
            marginBottom : '2em',
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom : '1.25em',
        },
    },
    logo                : {
        height                         : '8em',
        [theme.breakpoints.down('md')]: {
            height : '7em',
        },
        [theme.breakpoints.down('xs')]: {
            height : '5.5em',
        },
    },
    logoContainer       : {
        padding  : 0,
        '&hover' : {
            backgroundColor : 'transparent',
        },
    },
    tabContainer        : {
        marginLeft : 'auto',
    },
    tab                 : {
        ...theme.typography.tab, // extending the styles from theme.js for tab
        minWidth   : 10,
        marginLeft : '25px',
    },
    button              : {
        ...theme.typography.estimate, // extending from theme.js
        borderRadius : '50px',
        marginLeft   : '50px',
        marginRight  : '25px',
        height       : '45px',
        '&:hover'    : {
            backgroundColor : theme.palette.secondary.light,
        },
    },
    menu                : {
        backgroundColor : theme.palette.common.blue,
        color           : 'white',
        borderRadius    : 0,
    },
    menuItem            : {
        ...theme.typography.tab,
        opacity   : 0.7,
        '&:hover' : {
            opacity : 1,
        },
    },
    drawerIcon          : {
        height : '50px',
        width  : '50px',
    },
    drawerIconContainer : {
        marginLeft : 'auto',
        '&:hover'  : {
            backgroundColor : 'transparent',
        },
    },
    drawer              : {
        backgroundColor : theme.palette.common.blue,
    },
    drawerItem          : {
        ...theme.typography.tab,
        color   : 'white',
        opacity : 0.7,
    },
    drawerItemEstimate  : {
        backgroundColor : theme.palette.common.orange,
    },
    drawerItemSelected  : {
        '& .MuiListItemText-root' : {
            opacity : 1,
        },
    },
    appbar              : {
        zIndex : theme.zIndex.modal + 1,
    },
}))

const Header = (props) => {
    const classes = useStyles()
    const theme = useTheme()
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
    const matches = useMediaQuery(theme.breakpoints.down('md'))

    // hook to store the component clicked on where we want the menu to be rendered
    const [ anchorEl, setAnchorEl ] = useState(null)
    // hook to determine the visibility of the menu
    const [ openMenu, setOpenMenu ] = useState(false)
    const [ openDrawer, setOpenDrawer ] = useState(false)

    const handleChange = (event, newValue) => {
        props.setValue(newValue)
    }

    // all the information about where we just clicked on the screen, the element we just clicked on
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        setOpenMenu(true)
    }

    const handleMenuItemClick = (event, index) => {
        setAnchorEl(null)
        setOpenMenu(false)
        props.setSelectedIndex(index)
    }

    // now do the opposite
    const handleClose = (event) => {
        setAnchorEl(null)
        setOpenMenu(false)
    }

    // an array for the menu items of the Services sub menu
    const menuOptions = [
        { name: 'Service', link: '/services', activeIndex: 1, selectedIndex: 0 },
        { name: 'Custom Software Development', link: '/customsoftware', activeIndex: 1, selectedIndex: 1 },
        { name: 'iOS/Android App Development', link: '/mobileapps', activeIndex: 1, selectedIndex: 2 },
        { name: 'Website Development', link: '/websites', activeIndex: 1, selectedIndex: 3 },
    ]

    const routes = [
        { name: 'Home', link: '/', activeIndex: 0 },
        {
            name        : 'Services',
            link        : '/services',
            activeIndex : 1,
            ariaOwns    : anchorEl ? 'simple-menu' : undefined,
            ariaPopup   : anchorEl ? 'true' : undefined,
            mouseOver   : (event) => handleClick(event),
        },
        { name: 'The Revolution', link: '/revolution', activeIndex: 2 },
        { name: 'About Us', link: '/about', activeIndex: 3 },
        { name: 'Contact Us', link: '/contact', activeIndex: 4 },
    ]

    useEffect(
        () => {
            ;[ ...menuOptions, ...routes ].forEach((route) => {
                switch (window.location.pathname) {
                    case `${route.link}`:
                        if (props.value !== route.activeIndex) {
                            props.setValue(route.activeIndex)
                            if (route.selectedIndex && route.selectedIndex !== props.selectedIndex) {
                                props.setSelectedIndex(route.selectedIndex)
                            }
                        }
                        break
                    case '/estimate':
                        props.setValue(5)
                        break
                    default:
                        break
                }
            })
        },
        [ props.value, menuOptions, props.selectedIndex, routes, props ],
    )

    const tabs = (
        <React.Fragment>
            {/* <Typography variant='h3'>Arc Development</Typography> */}
            {/* component=Link allows the Tab component to also act as a Link component */}

            <Tabs value={props.value} onChange={handleChange} className={classes.tabContainer} indicatorColor='primary'>
                {routes.map((route, index) => (
                    <Tab
                        key={`${route}${index}`}
                        className={classes.tab}
                        component={Link}
                        to={route.link}
                        label={route.name}
                        aria-owns={route.ariaOwns}
                        aria-haspopup={route.ariaPopup}
                        onMouseOver={route.mouseOver}
                    />
                ))}
            </Tabs>
            <Button
                variant='contained'
                component={Link}
                to='/estimate'
                color='secondary'
                className={classes.button}
                onClick={() => props.setValue(5)} // setting value to an index that doesn't exist so no sections active when visiting
            >
                Free Estimate
            </Button>
            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                classes={{ paper: classes.menu }}
                MenuListProps={{ onMouseLeave: handleClose }}
                elevation={0}
                style={{ zIndex: 1302 }}
                keepMounted
            >
                {/* iterates over an array of objects (menuOptions) to create menu items */}
                {menuOptions.map((option, index) => (
                    <MenuItem
                        key={index}
                        component={Link}
                        to={option.link}
                        classes={{ root: classes.menuItem }}
                        onClick={(event) => {
                            handleMenuItemClick(event, index)
                            props.setValue(1)
                            handleClose()
                        }}
                        selected={index === props.selectedIndex && props.value === 1}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
                classes={{ paper: classes.drawer }}
            >
                <div className={classes.toolbarMargin} />
                <List disablePadding>
                    {routes.map((route, index) => (
                        <ListItem
                            key={`${route}${index}`}
                            divider
                            button
                            component={Link}
                            to={route.link}
                            selected={props.value === route.activeIndex}
                            classes={{ root: classes.drawerItem, selected: classes.drawerItemSelected }}
                            onClick={() => {
                                setOpenDrawer(false)
                                props.setValue(route.activeIndex)
                            }}
                        >
                            <ListItemText disableTypography className={classes.drawerItemSelected}>
                                {route.name}
                            </ListItemText>
                        </ListItem>
                    ))}

                    <ListItem
                        classes={{ root: classes.drawerItemEstimate, selected: classes.drawerItemSelected }}
                        onClick={() => {
                            setOpenDrawer(false)
                            props.setValue(5)
                        }}
                        divider
                        button
                        component={Link}
                        to='/estimate'
                        selected={props.value === 5}
                    >
                        <ListItemText disableTypography className={classes.drawerItem}>
                            Free Estimate
                        </ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <IconButton
                className={classes.drawerIconContainer}
                onClick={() => setOpenDrawer(!openDrawer)}
                disableRipple
            >
                <MenuIcon className={classes.drawerIcon} />
            </IconButton>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position='fixed' color='primary' className={classes.appbar}>
                    <Toolbar disableGutters>
                        <Button
                            component={Link}
                            to='/'
                            className={classes.logoContainer}
                            onClick={() => props.setValue(0)}
                            disableRipple
                        >
                            <img src={logo} alt='company logo' className={classes.logo} />
                        </Button>
                        {matches ? drawer : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    )
}

export default Header
