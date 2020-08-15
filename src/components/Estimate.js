import React, { useState } from 'react'
import axios from 'axios'
import { cloneDeep } from 'lodash' // lodash function to help when copying arrays/objects state
import Lottie from 'react-lottie'
import {
    makeStyles,
    useTheme,
    Grid,
    Typography,
    Button,
    IconButton,
    Dialog,
    DialogContent,
    TextField,
    useMediaQuery,
    Hidden,
    Snackbar,
    CircularProgress,
} from '@material-ui/core'

import check from '../assets/check.svg'
import send from '../assets/send.svg'
import software from '../assets/software.svg'
import mobile from '../assets/mobile.svg'
import website from '../assets/website.svg'
import backArrow from '../assets/backArrow.svg'
import forwardArrow from '../assets/forwardArrow.svg'
import backArrowDisabled from '../assets/backArrowDisabled.svg'
import forwardArrowDisabled from '../assets/forwardArrowDisabled.svg'
import camera from '../assets/camera.svg'
import upload from '../assets/upload.svg'
import person from '../assets/person.svg'
import persons from '../assets/persons.svg'
import people from '../assets/people.svg'
import info from '../assets/info.svg'
import bell from '../assets/bell.svg'
import users from '../assets/users.svg'
import iphone from '../assets/iphone.svg'
import gps from '../assets/gps.svg'
import customized from '../assets/customized.svg'
import data from '../assets/data.svg'
import android from '../assets/android.svg'
import globe from '../assets/globe.svg'
import biometrics from '../assets/biometrics.svg'

import estimateAnimation from '../animations/estimateAnimation/data.json'

// custom styles for the component using Material UI
const useStyles = makeStyles((theme) => ({
    icon           : {
        width  : '12em',
        height : '10em',
    },
    estimateButton : {
        ...theme.typography.estimate,
        borderRadius    : 50,
        backgroundColor : theme.palette.common.orange,
        height          : 50,
        width           : 225,
        fontSize        : '1.25rem',
        marginTop       : '5em',
        '&:hover'       : {
            backgroundColor : theme.palette.secondary.light,
        },
    },
    message        : {
        border       : `2px solid ${theme.palette.common.blue}`,
        marginTop    : '3em',
        marginBottom : '2em',
        borderRadius : 5,
    },
    specialText    : {
        fontFamily : 'Raleway',
        fontWeight : 700,
        fontSize   : '1.5rem',
        color      : theme.palette.common.orange,
    },
}))

const defaultQuestions = [
    {
        id      : 1,
        title   : 'Which service are you interested in?',
        active  : true,
        options : [
            {
                id       : 1,
                title    : 'Custom Software Development',
                subtitle : null,
                icon     : software,
                iconAlt  : 'three floating screens',
                selected : false,
                cost     : 0,
            },
            {
                id       : 2,
                title    : 'iOS/Android App Development',
                subtitle : null,
                icon     : mobile,
                iconAlt  : 'phones and tablet outline',
                selected : false,
                cost     : 0,
            },
            {
                id       : 3,
                title    : 'Website Development',
                subtitle : null,
                icon     : website,
                iconAlt  : 'computer outline',
                selected : false,
                cost     : 0,
            },
        ],
    },
]

// const newQuestions = cloneDeep(defaultQuestions) // tip from video 135 of MaterialUI High Fidelity
// newQuestions[0].options[0].selected = true
// console.log(defaultQuestions[0].options[0])

const softwareQuestions = [
    {
        id      : 1,
        title   : 'Which service are you interested in?',
        active  : false,
        options : [
            {
                id       : 1,
                title    : 'Custom Software Development',
                subtitle : null,
                icon     : software,
                iconAlt  : 'three floating screens',
                selected : false,
                cost     : 0,
            },
            {
                id       : 2,
                title    : 'iOS/Android App Development',
                subtitle : null,
                icon     : mobile,
                iconAlt  : 'outlines of phones and tablets',
                selected : false,
                cost     : 0,
            },
            {
                id       : 3,
                title    : 'Website Development',
                subtitle : null,
                icon     : website,
                iconAlt  : 'computer outline',
                selected : false,
                cost     : 0,
            },
        ],
    },
    {
        id       : 2,
        title    : 'Which platforms do you need supported?',
        subtitle : 'Select all that apply.',
        options  : [
            {
                id       : 1,
                title    : 'Web Application',
                subtitle : null,
                icon     : website,
                iconAlt  : 'computer outline',
                selected : false,
                cost     : 1000,
            },
            {
                id       : 2,
                title    : 'iOS Application',
                subtitle : null,
                icon     : iphone,
                iconAlt  : 'outline of iphone',
                selected : false,
                cost     : 1000,
            },
            {
                id       : 3,
                title    : 'Android Application',
                subtitle : null,
                icon     : android,
                iconAlt  : 'outlines of android phone',
                selected : false,
                cost     : 1000,
            },
        ],
        active   : true,
    },
    {
        id       : 3,
        title    : 'Which features do you expect to use?',
        subtitle : 'Select all that apply.',
        options  : [
            {
                id       : 1,
                title    : 'Photo/Video',
                subtitle : null,
                icon     : camera,
                iconAlt  : 'camera outline',
                selected : false,
                cost     : 250,
            },
            {
                id       : 2,
                title    : 'GPS',
                subtitle : null,
                icon     : gps,
                iconAlt  : 'gps pin',
                selected : false,
                cost     : 250,
            },
            {
                id       : 3,
                title    : 'File Transfer',
                subtitle : null,
                icon     : upload,
                iconAlt  : 'outline of cloud with arrow pointing up',
                selected : false,
                cost     : 250,
            },
        ],
        active   : false,
    },
    {
        id       : 4,
        title    : 'Which features do you expect to use?',
        subtitle : 'Select all that apply.',
        options  : [
            {
                id       : 1,
                title    : 'Users/Authentication',
                subtitle : null,
                icon     : users,
                iconAlt  : 'outline of a person with a plus sign',
                selected : false,
                cost     : 250,
            },
            {
                id       : 2,
                title    : 'Biometrics',
                subtitle : null,
                icon     : biometrics,
                iconAlt  : 'fingerprint',
                selected : false,
                cost     : 250,
            },
            {
                id       : 3,
                title    : 'Push Notifications',
                subtitle : null,
                icon     : bell,
                iconAlt  : 'outline of a bell',
                selected : false,
                cost     : 250,
            },
        ],
        active   : false,
    },
    {
        id       : 5,
        title    : 'What type of custom features do you expect to need?',
        subtitle : 'Select one.',
        options  : [
            {
                id       : 1,
                title    : 'Low Complexity',
                subtitle : '(Informational)',
                icon     : info,
                iconAlt  : "'i' inside a circle",
                selected : false,
                cost     : 250,
            },
            {
                id       : 2,
                title    : 'Medium Complexity',
                subtitle : '(Interactive, Customizable, Realtime)',
                icon     : customized,
                iconAlt  : 'two toggle switches',
                selected : false,
                cost     : 500,
            },
            {
                id       : 3,
                title    : 'High Complexity',
                subtitle : '(Data Modeling and Computation)',
                icon     : data,
                iconAlt  : 'outline of line graph',
                selected : false,
                cost     : 1000,
            },
        ],
        active   : false,
    },
    {
        id       : 6,
        title    : 'How many users do you expect?',
        subtitle : 'Select one.',
        options  : [
            {
                id       : 1,
                title    : '0-10',
                subtitle : null,
                icon     : person,
                iconAlt  : 'person outline',
                selected : false,
                cost     : 1,
            },
            {
                id       : 2,
                title    : '10-100',
                subtitle : null,
                icon     : persons,
                iconAlt  : 'outline of two people',
                selected : false,
                cost     : 1.25,
            },
            {
                id       : 3,
                title    : '100+',
                subtitle : null,
                icon     : people,
                iconAlt  : 'outline of three people',
                selected : false,
                cost     : 1.5,
            },
        ],
        active   : false,
    },
]

const websiteQuestions = [
    {
        id      : 1,
        title   : 'Which service are you interested in?',
        active  : false,
        options : [
            {
                id       : 1,
                title    : 'Custom Software Development',
                subtitle : null,
                icon     : software,
                iconAlt  : 'three floating screens',
                selected : false,
                cost     : 0,
            },
            {
                id       : 2,
                title    : 'iOS/Android App Development',
                subtitle : null,
                icon     : mobile,
                iconAlt  : 'outlines of phones and tablets',
                selected : false,
                cost     : 0,
            },
            {
                id       : 3,
                title    : 'Website Development',
                subtitle : null,
                icon     : website,
                iconAlt  : 'computer outline',
                selected : false,
                cost     : 0,
            },
        ],
    },
    {
        id       : 2,
        title    : 'Which type of website are you wanting?',
        subtitle : 'Select one.',
        options  : [
            {
                id       : 1,
                title    : 'Basic',
                subtitle : '(Informational)',
                icon     : info,
                iconAlt  : 'person outline',
                selected : false,
                cost     : 1000,
            },
            {
                id       : 2,
                title    : 'Interactive',
                subtitle : "(Users, API's, Messaging)",
                icon     : customized,
                iconAlt  : 'outline of two people',
                selected : false,
                cost     : 2000,
            },
            {
                id       : 3,
                title    : 'E-Commerce',
                subtitle : '(Sales)',
                icon     : globe,
                iconAlt  : 'outline of three people',
                selected : false,
                cost     : 2500,
            },
        ],
        active   : true,
    },
]

function Estimate () {
    const classes = useStyles()
    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))

    const [ questions, setQuestions ] = useState(defaultQuestions)
    const [ dialogOpen, setDialogOpen ] = useState(false)

    const [ name, setName ] = useState('')

    const [ phone, setPhone ] = useState('')
    const [ phoneHelper, setPhoneHelper ] = useState('')

    const [ email, setEmail ] = useState('')
    const [ emailHelper, setEmailHelper ] = useState('')

    const [ message, setMessage ] = useState('')

    const [ total, setTotal ] = useState(0)

    const [ service, setService ] = useState([])
    const [ platforms, setPlatforms ] = useState([])
    const [ features, setFeatures ] = useState([])
    const [ customFeatures, setcustomFeatures ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ users, setUsers ] = useState('')

    const [ loading, setLoading ] = useState(false)

    const [ alert, setAlert ] = useState({ open: false, message: '', backgroundColor: '#fff' })

    // for the Lottie animation component
    const defaultOptions = {
        loop             : true,
        autoplay         : true,
        animationData    : estimateAnimation,
        rendererSettings : {
            preserveAspectRatio : 'xMidYMid slice',
        },
    }

    // for forward arrow functionality on the questions
    // changes the active and next indexes each time the question changes
    const nextQuestion = () => {
        const newQuestions = cloneDeep(questions) // copy the array/object as new, no references to original
        const currentlyActive = newQuestions.filter((question) => question.active) // check if question is active, filters for true
        const activeIndex = currentlyActive[0].id - 1
        const nextIndex = activeIndex + 1

        newQuestions[activeIndex] = { ...currentlyActive[0], active: false }
        newQuestions[nextIndex] = { ...newQuestions[nextIndex], active: true }

        setQuestions(newQuestions)
    }

    // for backward arrow functionality on the questions
    // changes the active and next indexes each time the question changes
    const previousQuestion = () => {
        const newQuestions = cloneDeep(questions)
        const currentlyActive = newQuestions.filter((question) => question.active) // check if question is active, filters for true
        const activeIndex = currentlyActive[0].id - 1 // find the index of the question
        const nextIndex = activeIndex - 1

        newQuestions[activeIndex] = { ...currentlyActive[0], active: false }
        newQuestions[nextIndex] = { ...newQuestions[nextIndex], active: true }

        setQuestions(newQuestions)
    }

    // disable the previous arrow if it is at the first question
    const navigationPreviousDisabled = () => {
        const currentlyActive = questions.filter((question) => question.active)

        if (currentlyActive[0].id === 1) {
            return true
        } else {
            return false
        }
    }

    // disable the next arrow if it is at the last question
    const navigationNextDisabled = () => {
        const currentlyActive = questions.filter((question) => question.active)

        if (currentlyActive[0].id === questions[questions.length - 1].id) {
            return true
        } else {
            return false
        }
    }

    const estimateDisabled = () => {
        let disabled = true

        const emptySelections = questions
            .map((question) => question.options.filter((option) => option.selected))
            .filter((question) => question.length === 0)

        // are we on the website development question
        if (questions.length === 2) {
            if (emptySelections.length === 1) {
                disabled = false
            }
        } else if (questions.length === 1) {
            disabled = true
        } else if (emptySelections.length < 3 && questions[questions.length - 1].options.filter((option) => option.selected).length > 0) {
            // if we are one of the first two questions
            disabled = false
        }

        return disabled
    }

    // function to handle clicking on one of the question options
    const handleSelect = (id) => {
        const newQuestions = cloneDeep(questions)

        const currentlyActive = newQuestions.filter((question) => question.active) // check if question is active, filters for true
        const activeIndex = currentlyActive[0].id - 1 // find the index of the selected question

        const newSelected = newQuestions[activeIndex].options[id - 1] // find the item we just selected
        const previousSelected = currentlyActive[0].options.filter((option) => option.selected) // filter for only those with options selected

        // switch to control questions that only allow one answer (controlled by the subtitle 'Select one.')
        switch (currentlyActive[0].subtitle) {
            case 'Select one.':
                // if 'select one.' exists it will produce true for having a previouslySelected array item
                if (previousSelected[0]) {
                    previousSelected[0].selected = !previousSelected[0] // toggle the previously selected state
                }
                newSelected.selected = !newSelected.selected // toggle selected value to true
                break
            // else, do the same, but without toggling previously selected items off (false)
            default:
                newSelected.selected = !newSelected.selected // toggle selected value between true and false
                break
        }

        // switch to control what set of questions are displayed on the page
        switch (newSelected.title) {
            case 'Custom Software Development':
                setQuestions(softwareQuestions)
                setService(newSelected.title)
                setPlatforms([])
                setFeatures([])
                setcustomFeatures('')
                setCategory('')
                setUsers('')
                break
            case 'iOS/Android App Development':
                setQuestions(softwareQuestions)
                setService(newSelected.title)
                setPlatforms([])
                setFeatures([])
                setcustomFeatures('')
                setCategory('')
                setUsers('')
                break
            case 'Website Development':
                setQuestions(websiteQuestions)
                setService(newSelected.title)
                setPlatforms([])
                setFeatures([])
                setcustomFeatures('')
                setCategory('')
                setUsers('')
                break
            default:
                setQuestions(newQuestions)
                break
        }
    }

    const onChange = (event) => {
        let valid

        switch (event.target.id) {
            case 'email':
                setEmail(event.target.value)
                valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value) // regex test returns true if we have a valid number

                if (!valid) {
                    setEmailHelper('Invalid email')
                } else {
                    setEmailHelper('')
                }
                break
            case 'phone':
                setPhone(event.target.value)
                valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(event.target.value) // regex test returns true if we have a valid number

                if (!valid) {
                    setPhoneHelper('Invalid phone number')
                } else {
                    setPhoneHelper('')
                }
                break
            default:
                break
        }
    }

    const getTotal = () => {
        let cost = 0

        // we need to find out what options are currently selected
        // we map over our questions state and for each question, filter for only options selected which is returned in an array
        const selections = questions
            .map((question) => question.options.filter((option) => option.selected))
            .filter((question) => question.length > 0)

        selections.map((options) => options.map((option) => (cost += option.cost)))

        // if we are on the Website Development questions (length is more than 2, the first two questions)
        if (questions.length > 2) {
            const userCost = questions
                .filter((question) => question.title === 'How many users do you expect?')
                .map((question) => question.options.filter((option) => option.selected))[0][0]

            setUsers(userCost.title)

            cost -= userCost.cost // subtract the multiplier from the cost
            cost *= userCost.cost // and the multiply the multiplier to the cost
        }

        setTotal(cost)
    }

    // this should give an array containing all of the titles selected (Web App, iOS App, Android App)
    const getPlatforms = () => {
        let newPlatforms = []

        // checks if not in the Website Dev questions (which has a length of 2. Website dev doesn't track platforms)
        //   we then filter out the question that has the matching title
        //   this returns and array containing at the first index [0], the actual question
        //   then map over the question to find which ones has the selected option set to true
        //   finally, take this array result and add them to the newPlatforms array
        if (questions.length > 2) {
            questions
                .filter((question) => question.title === 'Which platforms do you need supported?')
                .map((question) => question.options.filter((option) => option.selected))[0]
                .map((option) => newPlatforms.push(option.title))

            setPlatforms(newPlatforms)
        }
    }

    // this should give an array containing all of the feature options selected selected (ie GPS, File Transfer...)
    const getFeatures = () => {
        let newFeatures = []

        // checks if not in the Website Dev questions (which has a length of 2. Website dev doesn't track platforms)
        //   we then filter out the question that has the matching title
        //   this then map over the returned array filtering for all options that have been selected
        //   then map over each selected option and push the options title to the newFeature state
        if (questions.length > 2) {
            questions
                .filter((question) => question.title === 'Which features do you expect to use?')
                .map((question) => question.options.filter((option) => option.selected))
                .map((option) => option.map((newFeature) => newFeatures.push(newFeature.title)))

            setFeatures(newFeatures)
        }
    }

    const getCustomFeatures = () => {
        if (questions.length > 2) {
            const newCustomFeatures = questions
                .filter((question) => question.title === 'What type of custom features do you expect to need?')
                .map((question) => question.options.filter((option) => option.selected))[0][0].title

            setcustomFeatures(newCustomFeatures)
        }
    }

    const getCategory = () => {
        if (questions.length === 2) {
            const newCategory = questions
                .filter((question) => question.title === 'Which type of website are you wanting?')[0]
                .options.filter((option) => option.selected)[0].title

            setCategory(newCategory)
        }
    }

    const sendEstimate = () => {
        setLoading(true) // show the loading circle while the form is submitting

        axios
            .get('https://us-central1-materiial-ui-course.cloudfunctions.net/sendMail', {
                params : {
                    name           : name,
                    email          : email,
                    phone          : phone,
                    message        : message,
                    total          : total,
                    category       : category,
                    service        : service,
                    platforms      : platforms,
                    features       : features,
                    customFeatures : customFeatures,
                    users          : users,
                },
            })
            .then((response) => {
                setLoading(false) // form data sent, stop circle icon from showing
                setAlert({ open: true, message: 'Estimate placed successfully!', backgroundColor: '#4bb543' })
                setDialogOpen(false) // close the dialog window
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
                setAlert({ open: true, message: 'Something went wrong, please try again.', backgroundColor: '#ff3232' })
            })
    }

    const softwareSelection = (
        <Grid container direction='column'>
            <Grid item container alignItems='center' style={{ marginBottom: '1.25em' }}>
                <Grid item xs={2}>
                    <img src={check} alt='checkmark' />
                </Grid>
                <Grid item xs={10}>
                    <Typography variant='body1'>
                        You want {service}
                        {platforms.length > 0 ? (
                            ` for ${//if only web application is selected...
                            platforms.indexOf('Web Application') > -1 && platforms.length === 1
                                ? //then finish sentence here
                                  'a Web Application.'
                                : //otherwise, if web application and another platform is selected...
                                  platforms.indexOf('Web Application') > -1 && platforms.length === 2
                                  ? //then finish the sentence here
                                    `a Web Application and an ${platforms[1]}.`
                                  : //otherwise, if only one platform is selected which isn't web application...
                                    platforms.length === 1
                                    ? //then finish the sentence here
                                      `an ${platforms[0]}`
                                    : //otherwise, if other two options are selected...
                                      platforms.length === 2
                                      ? //then finish the sentence here
                                        'an iOS Application and an Android Application.'
                                      : //otherwise if all three are selected...
                                        platforms.length === 3
                                        ? //then finish the sentence here
                                          'a Web Application, an iOS Application, and an Android Application.'
                                        : null}`
                        ) : null}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container alignItems='center' style={{ marginBottom: '1.25em' }}>
                <Grid item xs={2}>
                    <img src={check} alt='checkmark' />
                </Grid>
                <Grid item xs={10}>
                    <Typography variant='body1'>
                        {' '}
                        {'with '}
                        {/* if we have features... */}
                        {features.length > 0 ? features.length === 1 ? ( //...and there's only 1...
                            //then end the sentence here
                            `${features[0]}.`
                        ) : //otherwise, if there are two features...
                        features.length === 2 ? (
                            //...then end the sentence here
                            `${features[0]} and ${features[1]}.`
                        ) : (
                            //otherwise, if there are three or more features...
                            features
                                //filter out the very last feature...
                                .filter((feature, index) => index !== features.length - 1)
                                //and for those features return their name...
                                .map((feature, index) => <span key={index}>{`${feature}, `}</span>)
                        ) : null}
                        {features.length > 2 ? (
                            //...and then finally add the last feature with 'and' in front of it
                            ` and ${features[features.length - 1]}.`
                        ) : null}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container alignItems='center'>
                <Grid item xs={2}>
                    <img src={check} alt='checkmark' />
                </Grid>
                <Grid item xs={10}>
                    <Typography variant='body1'>
                        The custom features will be of {customFeatures.toLowerCase()}
                        {` , and the project will be used by about ${users} users.`}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )

    const websiteSelection = (
        <Grid container direction='column' style={{ marginTop: '14em' }}>
            <Grid item container alignItems='center'>
                <Grid item xs={2}>
                    <img src={check} alt='checkmark' />
                </Grid>
                <Grid item xs={10}>
                    <Typography variant='body1'>
                        You want {category === 'Basic' ? 'a Basic Website.' : `an ${category} Website.`}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )

    return (
        <Grid container direction='row'>
            <Grid item container direction='column' alignItems={matchesMD ? 'center' : undefined} lg>
                <Grid item style={{ marginTop: '2em', marginLeft: matchesMD ? 0 : '5em' }}>
                    <Typography variant='h2' align={matchesMD ? 'center' : undefined}>
                        Estimate
                    </Typography>
                </Grid>
                <Grid item style={{ marginRight: matchesMD ? 0 : '10em', maxWidth: '50em', marginTop: '7.5em' }}>
                    <Lottie options={defaultOptions} height='100%' width='100%' />
                </Grid>
            </Grid>
            <Grid
                item
                container
                direction='column'
                alignItems='center'
                style={{ marginRight: matchesMD ? 0 : '2em', marginBottom: '25em' }}
                lg
            >
                {/* map over the questions and print title and subtitle for each */}
                {questions.filter((question) => question.active).map((question, index) => (
                    <Grid item key={index}>
                        <Typography
                            variant='h2'
                            align='center'
                            style={{
                                fontWeight  : 500,
                                fontSize    : '2.25rem',
                                margin      : '5em 0 0',
                                marginLeft  : matchesSM ? '1em' : 0,
                                marginRight : matchesSM ? '1em' : 0,
                                lineHeight  : 1.25,
                            }}
                        >
                            {question.title}
                        </Typography>
                        <Typography variant='body1' align='center' style={{ marginBottom: '2.5em' }} gutterBottom>
                            {question.subtitle}
                        </Typography>
                        <Grid item container>
                            {/* map over the options and print title, subtitle and image for each */}
                            {question.options.map((option, index) => (
                                <Grid
                                    item
                                    container
                                    direction='column'
                                    key={index}
                                    md
                                    component={Button} // treat this grid as if it were a button
                                    onClick={() => handleSelect(option.id)}
                                    style={{
                                        display         : 'grid',
                                        textTransform   : 'none',
                                        marginBottom    : matchesSM ? '1.5em' : 0,
                                        borderRadius    : 0,
                                        backgroundColor : option.selected ? theme.palette.common.orange : null,
                                    }} // We want functionality of button, but not the styling of button
                                >
                                    <Grid item style={{ maxWidth: '14em' }}>
                                        <Typography variant='h6' align='center' style={{ marginBottom: '1em' }}>
                                            {option.title}
                                        </Typography>
                                        <Typography variant='caption' align='center'>
                                            {option.subtitle}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <img src={option.icon} alt={option.iconAlt} className={classes.icon} />
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                ))}

                <Grid item container justify='space-between' style={{ width: '18em', marginTop: '3em' }}>
                    <Grid item>
                        <IconButton disabled={navigationPreviousDisabled()} onClick={previousQuestion}>
                            <img src={navigationPreviousDisabled() ? backArrowDisabled : backArrow} alt='Previous question' />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton disabled={navigationNextDisabled()} onClick={nextQuestion}>
                            <img src={navigationNextDisabled() ? forwardArrowDisabled : forwardArrow} alt='Next question' />
                        </IconButton>
                    </Grid>
                </Grid>
                {/* clicking the button opens the dialog window */}
                <Grid item>
                    <Button
                        variant='contained'
                        className={classes.estimateButton}
                        disabled={estimateDisabled()}
                        onClick={() => {
                            setDialogOpen(true)
                            getTotal()
                            getPlatforms()
                            getFeatures()
                            getCustomFeatures()
                            getCategory()
                        }}
                    >
                        Get Estimate
                    </Button>
                </Grid>
            </Grid>
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                fullWidth
                maxWidth='lg'
                fullScreen={matchesSM} // true if we are at small breakpoint or lower
                style={{ zIndex: 1302 }}
            >
                <Grid container justify='center'>
                    <Grid item style={{ marginTop: '1em', marginBottom: '1em' }}>
                        <Typography variant='h2' align='center'>
                            Estimate
                        </Typography>
                    </Grid>
                </Grid>
                <DialogContent>
                    <Grid
                        container
                        justify='space-around'
                        direction={matchesSM ? 'column' : 'row'}
                        alignItems={matchesSM ? 'center' : undefined}
                    >
                        <Grid item container direction='column' style={{ maxWidth: '20em' }} md={7}>
                            <Grid item style={{ marginBottom: '0.5em' }}>
                                <TextField
                                    label='Name'
                                    id='name'
                                    fullWidth
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </Grid>
                            <Grid item style={{ marginBottom: '0.5em' }}>
                                <TextField
                                    label='Email'
                                    id='email'
                                    error={emailHelper.length !== 0}
                                    helperText={emailHelper}
                                    fullWidth
                                    value={email}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item style={{ marginBottom: '0.5em' }}>
                                <TextField
                                    label='Phone'
                                    id='phone'
                                    error={phoneHelper.length !== 0}
                                    helperText={phoneHelper}
                                    fullWidth
                                    value={phone}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item style={{ maxWidth: '20em' }}>
                                <TextField
                                    value={message}
                                    InputProps={{ disableUnderline: true }}
                                    id='message'
                                    multiline
                                    fullWidth
                                    placeholder='Tell us more about your project.'
                                    rows={10}
                                    className={classes.message}
                                    onChange={(event) => setMessage(event.target.value)}
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant='body1' align={matchesSM ? 'center' : undefined} style={{ lineHeight: 1.25 }} paragraph>
                                    We can create this digital solution for an estimated{' '}
                                    <span className={classes.specialText}>${total.toFixed(2)}</span>
                                </Typography>
                                <Typography variant='body1' align={matchesSM ? 'center' : undefined} paragraph>
                                    Fill out your name, phone number, and email, place your request, and we'll get back to you with details
                                    moving forward and a final price.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            container
                            direction='column'
                            alignItems={matchesSM ? 'center' : undefined}
                            style={{ maxWidth: '30em' }}
                            md={5}
                        >
                            <Hidden smDown>
                                <Grid item>{questions.length > 2 ? softwareSelection : websiteSelection}</Grid>
                            </Hidden>

                            <Grid item>
                                <Button
                                    variant='contained'
                                    className={classes.estimateButton}
                                    onClick={sendEstimate}
                                    disabled={
                                        name.length === 0 ||
                                        message.length === 0 ||
                                        phoneHelper.length !== 0 ||
                                        emailHelper.length !== 0 ||
                                        email.length === 0 ||
                                        phone.length === 0
                                    }
                                >
                                    {loading ? (
                                        <CircularProgress />
                                    ) : (
                                        <React.Fragment>
                                            {' '}
                                            Place Request
                                            <img src={send} alt='paper airline' style={{ marginLeft: '0.5em' }} />
                                        </React.Fragment>
                                    )}
                                </Button>
                            </Grid>
                            <Hidden mdUp>
                                <Grid item style={{ marginBottom: matchesSM ? '5em' : 0 }}>
                                    <Button style={{ fontWeight: 300 }} color='primary' onClick={() => setDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Hidden>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Snackbar
                open={alert.open}
                message={alert.message}
                ContentProps={{
                    style : {
                        backgroundColor : alert.color,
                    },
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={() => setAlert({ ...alert, open: false })}
                autoHideDuration={4000}
            />
        </Grid>
    )
}

export default Estimate
