import React from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'react-lottie' // library for displaying animations
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonArrow from '../components/ui/ButtonArrow' // a custom made component to add arrows in buttons
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import CallToAction from './ui/CallToAction'

import animationData from '../animations/landinganimation/data' // json file with the animation of hands and computer chip
import customSoftwareIcon from '../assets/Custom Software Icon.svg' // images come from https://unsplash.com
import mobileAppsIcon from '../assets/mobileIcon.svg'
import websitesIcon from '../assets/websiteIcon.svg'
import revolutionBackground from '../assets/repeatingBackground.svg'
import infoBackground from '../assets/infoBackground.svg'

const useStyles = makeStyles((theme) => ({
    mainContainer        : {
        marginTop                      : '5em;',
        [theme.breakpoints.down('md')]: {
            marginTop : '3em',
        },
        [theme.breakpoints.down('xs')]: {
            marginTop : '2em',
        },
    },
    animation            : {
        maxWidth                       : '50em',
        minWidth                       : '21em',
        marginTop                      : '2em',
        marginLeft                     : '10%',
        [theme.breakpoints.down('sm')]: {
            maxWidth : '30em',
        },
    },
    estimateButton       : {
        ...theme.typography.estimate,
        backgroundColor : theme.palette.common.orange,
        borderRadius    : 50,
        height          : 45,
        width           : 145,
        marginRight     : 40,
        '&:hover'       : {
            backgroundColor : theme.palette.secondary.light,
        },
    },
    buttonContainer      : {
        marginTop : '1em',
    },
    learnButtonHero      : {
        ...theme.typography.learnButton,
        fontSize : '0.9rem',
        height   : 45,
        width    : 145,
    },
    learnButton          : {
        ...theme.typography.learnButton,
        fontSize                       : '0.7rem',
        height                         : 35,
        padding                        : 5,
        [theme.breakpoints.down('sm')]: {
            marginBottom : '2em',
        },
    },
    heroTextContainer    : {
        minWidth                       : '21.5em',
        marginLeft                     : '1em',
        [theme.breakpoints.down('xs')]: {
            marginLeft : 0,
        },
    },
    specialText          : {
        fontFamily : 'Pacifico',
        color      : theme.palette.common.orange,
    },
    subtitle             : {
        marginBottom : '1em',
    },
    icon                 : {
        marginLeft                     : '2em',
        [theme.breakpoints.down('xs')]: {
            marginLeft : 0,
        },
    },
    serviceContainer     : {
        marginTop                      : '12em',
        [theme.breakpoints.down('sm')]: {
            padding : 25,
        },
    },
    revolutionBackground : {
        backgroundImage    : `url(${revolutionBackground})`,
        backgroundPosition : 'center',
        backgroundSize     : 'cover',
        backgroundRepeat   : 'no-repeat',
        height             : '100%',
        width              : '100%',
    },
    revolutionCard       : {
        position                       : 'absolute',
        boxShadow                      : theme.shadows[10],
        borderRadius                   : 15,
        padding                        : '10em',
        [theme.breakpoints.down('sm')]: {
            padding      : '8em 0',
            borderRadius : 0,
            width        : '100%',
        },
    },
    infoBackground       : {
        backgroundImage    : `url(${infoBackground})`,
        backgroundPosition : 'center',
        backgroundSize     : 'cover',
        backgroundRepeat   : 'no-repeat',
        height             : '100%',
        width              : '100%',
    },
}))

const LadingPage = (props) => {
    const classes = useStyles()
    const theme = useTheme()
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm')) // this creates a boolean condition
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'))

    // for the Lottie component
    const defaultOptions = {
        loop             : true,
        autoplay         : true,
        animationData    : animationData,
        rendererSettings : {
            preserveAspectRatio : 'xMidYMid slice',
        },
    }

    return (
        <Grid container direction='column' className={classes.mainContainer}>
            {/* ----- Hero Block ----- */}
            <Grid item>
                <Grid container justify='flex-end' alignItems='center' direction='row'>
                    <Grid item sm className={classes.heroTextContainer}>
                        <Typography variant='h2' align='center'>
                            Bringing West Coast technology<br />to the Midwest
                        </Typography>
                        <Grid container justify='center' className={classes.buttonContainer}>
                            <Grid item>
                                <Button
                                    component={Link}
                                    to='/estimate'
                                    variant='contained'
                                    className={classes.estimateButton}
                                    onClick={() => props.setValue(5)}
                                >
                                    Free Estimate
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    component={Link}
                                    to='/revolution'
                                    variant='outlined'
                                    className={classes.learnButtonHero}
                                    onClick={() => props.setValue(2)}
                                >
                                    <span style={{ marginRight: 10 }}>Learn More</span>
                                    <ButtonArrow width={15} height={15} fill={theme.palette.common.blue} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm className={classes.animation}>
                        <Lottie options={defaultOptions} height={'100%'} width={'100%'} />
                    </Grid>
                </Grid>
            </Grid>
            {/* ----- End Hero Block ----- */}
            {/* ----- Custom Software Block ----- */}
            <Grid item>
                <Grid
                    container
                    direction='row'
                    className={classes.serviceContainer}
                    justify={matchesSM ? 'center' : undefined}
                >
                    <Grid
                        item
                        style={{ marginLeft: matchesSM ? 0 : '5em', textAlign: matchesSM ? 'center' : undefined }}
                    >
                        <Typography variant='h4'>Custom Software Development</Typography>
                        <Typography variant='subtitle1' className={classes.subtitle}>
                            Save Energy. Save Time. Save Money
                        </Typography>
                        <Typography variant='subtitle1'>
                            Complete digital solutions, from investigation to{' '}
                            <span className={classes.specialText}>celebration.</span>
                        </Typography>
                        <Button
                            component={Link}
                            to='/customsoftware'
                            variant='outlined'
                            className={classes.learnButton}
                            onClick={() => {
                                props.setValue(1)
                                props.setSelectedIndex(1)
                            }}
                        >
                            <span style={{ marginRight: 10 }}>Learn More</span>
                            <ButtonArrow width={10} height={10} fill={theme.palette.common.blue} />
                        </Button>
                    </Grid>
                    <Grid item>
                        <img className={classes.icon} alt='Custom software icon' src={customSoftwareIcon} />
                    </Grid>
                </Grid>
            </Grid>
            {/* ----- END Custom Software Block ----- */}
            {/* ----- iOS/Android Block ----- */}
            <Grid item>
                <Grid
                    container
                    direction='row'
                    className={classes.serviceContainer}
                    justify={matchesSM ? 'center' : 'flex-end'}
                >
                    <Grid item>
                        <Typography variant='h4'>iOS/Android App Development</Typography>
                        <Typography variant='subtitle1' className={classes.subtitle}>
                            Extend Functionality. Extend Access. Increase Engagement.
                        </Typography>
                        <Typography variant='subtitle1'>
                            Integrate your web experience or create a standalone app {matchesSM ? null : <br />} with
                            either mobile platform.
                        </Typography>
                        <Button
                            component={Link}
                            to='/mobileapps'
                            variant='outlined'
                            className={classes.learnButton}
                            onClick={() => {
                                props.setValue(1)
                                props.setSelectedIndex(2)
                            }}
                        >
                            <span style={{ marginRight: 10 }}>Learn More</span>
                            <ButtonArrow width={10} height={10} fill={theme.palette.common.blue} />
                        </Button>
                    </Grid>
                    <Grid item style={{ marginRight: matchesSM ? 0 : '5em' }}>
                        <img className={classes.icon} alt='mobile phone icon' src={mobileAppsIcon} />
                    </Grid>
                </Grid>
            </Grid>
            {/* ----- END iOS/Android Block ----- */}
            {/* ----- Websites Block ----- */}
            <Grid item>
                <Grid
                    container
                    direction='row'
                    className={classes.serviceContainer}
                    justify={matchesSM ? 'center' : undefined}
                >
                    <Grid
                        item
                        style={{ marginLeft: matchesSM ? 0 : '5em', textAlign: matchesSM ? 'center' : undefined }}
                    >
                        <Typography variant='h4'>Website Development</Typography>
                        <Typography variant='subtitle1' className={classes.subtitle}>
                            Reach More. Discover More. Sell More.
                        </Typography>
                        <Typography variant='subtitle1'>Optimized for search engines built for speed.</Typography>
                        <Button
                            component={Link}
                            to='/websites'
                            variant='outlined'
                            className={classes.learnButton}
                            onClick={() => {
                                props.setValue(1)
                                props.setSelectedIndex(3)
                            }}
                        >
                            <span style={{ marginRight: 10 }}>Learn More</span>
                            <ButtonArrow width={10} height={10} fill={theme.palette.common.blue} />
                        </Button>
                    </Grid>
                    <Grid item>
                        <img className={classes.icon} alt='Website icon' src={websitesIcon} />
                    </Grid>
                </Grid>
            </Grid>
            {/* ----- END Websites Block ----- */}
            {/* ----- The Revolution Card ----- */}
            <Grid item>
                <Grid container alignItems='center' justify='center' style={{ height: '100em', marginTop: '12em' }}>
                    <Card className={classes.revolutionCard}>
                        <CardContent>
                            <Grid container direction='column' item style={{ textAlign: 'center' }}>
                                <Grid item>
                                    <Typography variant='h3' gutterBottom>
                                        The Revolution
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Typography variant='subtitle1'>
                                        Visionary insights coupled with cutting edge technology is a recipe for
                                        revolution.
                                    </Typography>
                                    <Button
                                        component={Link}
                                        to='/revolution'
                                        variant='outlined'
                                        className={classes.learnButtonHero}
                                        onClick={() => props.setValue(2)}
                                    >
                                        <span style={{ marginRight: 10 }}>Learn More</span>
                                        <ButtonArrow width={15} height={15} fill={theme.palette.common.blue} />
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <div className={classes.revolutionBackground} />
                </Grid>
            </Grid>
            {/* ----- END The Revolution Card ----- */}
            {/* ----- The Information Block ----- */}
            <Grid item>
                <Grid
                    container
                    direction='row'
                    alignItems='center'
                    style={{ height: '80em' }}
                    className={classes.infoBackground}
                >
                    <Grid
                        item
                        container
                        style={{ textAlign: matchesXS ? 'center' : 'inherit' }}
                        direction={matchesXS ? 'column' : 'row'}
                    >
                        <Grid item sm style={{ marginLeft: matchesXS ? 0 : matchesSM ? '2em' : '5em' }}>
                            <Grid container direction='column' style={{ marginBottom: matchesXS ? '10em' : 0 }}>
                                <Typography variant='h2' style={{ color: 'white' }}>
                                    About Us
                                </Typography>
                                <Typography variant='subtitle2'>Let's get personal.</Typography>
                                <Grid item>
                                    <Button
                                        component={Link}
                                        to='/about'
                                        variant='outlined'
                                        style={{ color: 'white', borderColor: 'white' }}
                                        className={classes.learnButton}
                                        onClick={() => props.setValue(3)}
                                    >
                                        <span style={{ marginRight: 10 }}>Learn More</span>
                                        <ButtonArrow width={10} height={10} fill='white' />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            sm
                            style={{
                                marginRight : matchesXS ? 0 : matchesSM ? '2em' : '5em',
                                textAlign   : matchesXS ? 'center' : 'right',
                            }}
                        >
                            <Grid container direction='column'>
                                <Typography variant='h2' style={{ color: 'white' }}>
                                    Contact Us
                                </Typography>
                                <Typography variant='subtitle2'>
                                    Say hello!{' '}
                                    <span role='img' aria-label='waving hand'>
                                        👋🏻
                                    </span>
                                </Typography>
                                <Grid item>
                                    <Button
                                        component={Link}
                                        to='/contact'
                                        variant='outlined'
                                        style={{ color: 'white', borderColor: 'white' }}
                                        className={classes.learnButton}
                                        onClick={() => props.setValue(4)}
                                    >
                                        <span style={{ marginRight: 10 }}>Learn More</span>
                                        <ButtonArrow width={10} height={10} fill='white' />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* ----- END The Information Block ----- */}
            {/* ----- Call to Action Block ----- */}
            <Grid item>
                <CallToAction setValue={props.setValue} />
            </Grid>
            {/* ----- END Call to Action Block ----- */}
        </Grid>
    )
}

export default LadingPage
