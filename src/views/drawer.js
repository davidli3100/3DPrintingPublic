import React, { Component } from 'react';
import {Drawer, List, ListItem, ListItemIcon, ListItemText, Divider} from "@material-ui/core"
// import {InboxIcon, MailIcon} from "@material-ui/icons"


export default class CustomDrawer extends Component {
    render() {
        return (
            <Drawer
            className="main--drawer"
            variant="permanent"
          >
             <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        )
    }
  
}