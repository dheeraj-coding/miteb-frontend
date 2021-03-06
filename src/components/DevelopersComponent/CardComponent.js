import React, { Component } from 'react'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import { Card, CardMedia } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import ApplyIcon from 'material-ui/svg-icons/content/send'
import './DeveloperComponent.css'
import DeveloperApplicationDialog from '../Dialogs/DeveloperApplicationDialogComponent'

class CardComponent extends Component {
  constructor (props) {
    super(props)
    this.showDialog = this.showDialog.bind(this)
    this.state = {
      open: this.props.open
    }
  }

  showDialog () {
    this.setState({ dialogOpen: true })
    // this.setState({currentPosition: position})
  }

  render () {
    return (
      <Card style={{ width: 250, margin: 10 }} className='developerCard'>
        <CardMedia style={{ height: 250, width: 250 }}>
          <img src={this.props.developer.profilePicURL} alt='' style={{ height: '250px', width: 250, objectFit: 'cover' }} />
        </CardMedia>

        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgb(0, 188, 212)', alignItems: 'center' }}>
          <List style={{ backgroundColor: '', padding: '10px 10px' }}>
            <ListItem
              primaryText={this.props.developer.name}
              secondaryText={this.props.developer.role}
              innerDivStyle={{ backgroundColor: '', padding: '0px', cursor: 'default' }}
              hoverColor={'rgba(0,0,0,0)'}
            />
          </List>
          <DeveloperApplicationDialog open={this.state.dialogOpen} handleClose={() => this.setState({ dialogOpen: false })} developer={this.props.developer} />

          {
            this.props.developer.openPosition
              ? (
                <IconButton onClick={() => this.showDialog()}><ApplyIcon /></IconButton>
              ) : (
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                  targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                  useLayerForClickAway
                >

                  { !!this.props.developer.github && <a href={this.props.developer.github} target='_blank'> <MenuItem primaryText='Github' /> </a> }
                  { !!this.props.developer.linkedin && <a href={this.props.developer.linkedin} target='_blank'> <MenuItem primaryText='LinkedIn' /> </a> }
                  { !!this.props.developer.facebook && <a href={this.props.developer.facebook} target='_blank'> <MenuItem primaryText='Facebook' /> </a> }
                </IconMenu>
              )
          }

        </div>
      </Card>
    )
  }
}

function mapStateToProps (state) {
  const { openSideNav, isMobile, filter } = state.toggler
  const { user, verified, vals } = state.authentication
  return {
    user,
    openSideNav,
    verified,
    isMobile,
    vals,
    filter
  }
}

export default connect(mapStateToProps)(CardComponent)
