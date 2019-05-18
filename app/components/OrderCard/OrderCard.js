import React from 'react'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import EmailIcon from '@material-ui/icons/Email'
import AttachmentIcon from '@material-ui/icons/Attachment'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import classnames from 'classnames'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import EVENT_TYPES from '../../lib/eventTypes'

const cardStyles = {
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    padding: '24px'
  },
  card: {
    // width: '100%',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #F5F5F5',
    boxSizing: 'border-box',
    boxShadow: '0 1px 3px 0 #e6ebf1',
    marginBottom: 24,
    width: 'calc(100% + 40px)',
    margin: '20px -20px'
  },
  icon: {
    marginRight: 10,
    color: '#E0E0E0'
  },
  cell: {
    display: 'inline-flex'
  },
  inline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    width: 80
  },
  chip: {
    borderRadius: 0,
    backgroundColor: '#ffe97d'
  },
  avatar: {
    borderRadius: 0,
    backgroundColor: '#c88719',
    color: '#fff'
  },
  thumbnail: {
    border: '1px solid #bdbdbd',
    borderRadius: '3px',
    padding: 6
  },
  media: {
    width: 85,
    minHeight: 110
  },
  content: {
    height: '100%',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 0
  },
  detail: {
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    backgroundColor: '#f6f8fa'
  },
  uppercase: {
    textTransform: 'uppercase',
    color: '#9e9e9e'
  }
}

const STEPS = [
  'Processing',
  'Processed for delivery',
  'In transit',
  'Delivered'
]

const formatDate = (dateString) => {
  return dateString.slice(0, 10).split('-').reverse().join('/')
}

class OrderCard extends React.Component {
  render () {
    const { order, classes } = this.props
    const { upload } = order
    if (!(order.upload && order.charge && order.paid && order.letter)) {
      return false
    }
    let { letter } = order
    let events = order.events || []
    let event = EVENT_TYPES['letter.created']
    if (events.length) {
      // let last = events[events.length - 1]
      // event = EVENT_TYPES[last.eventData]
    }
    return (
      <Card className={classes.card}>
        <div className={classnames(classes.row, classes.header)}>
          <div className={classes.detail}>
            <Typography className={classes.uppercase}>Order Placed</Typography>
            <Typography>{formatDate(letter.createdAt)}</Typography>
          </div>
          <div className={classes.detail}>
            <Typography className={classes.uppercase}>Total</Typography>
            <Typography>${(order.charge.amount / 100).toFixed(2)}</Typography>
          </div>
          <div className={classes.detail}>
            <Typography className={classes.uppercase}>Ship to</Typography>
            <Typography>{order.contact.address.name}</Typography>
          </div>
          <div className={classes.detail}>
            <Typography className={classes.uppercase}>Order ID</Typography>
            <Typography>{order.id}</Typography>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.thumbnail}>
            <CardMedia image={upload.thumbnail} className={classes.media} />
          </div>
          <CardContent className={classes.content}>
            <div className={classes.inline}>
              <Typography className={classes.label}>File</Typography>
              <AttachmentIcon className={classes.icon} />
              <Typography>{upload.name}</Typography>
            </div>
            <div className={classes.inline}>
              <Typography className={classes.label}>ETA</Typography>
              <LocalShippingIcon className={classes.icon} />
              <Typography>{letter.expectedDeliveryDate}</Typography>
            </div>
            <div className={classes.inline}>
              <Typography className={classes.label}>Tracking</Typography>
              <EmailIcon className={classes.icon} />
              <Typography>{letter.trackingNumber || 'pending'}</Typography>
            </div>
          </CardContent>
          <Stepper activeStep={event.step} orientation={'vertical'}>
            {STEPS.map(step => (
              <Step key={step}>
                <StepLabel key={`${step}-label`}>
                  {step}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </Card>
    )
  }
}

export default withStyles(cardStyles)(OrderCard)
