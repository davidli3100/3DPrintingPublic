import React, { Component } from 'react';
import queryString from "query-string";
import MainLayout from "./layout"
import '../App.css';

/**
 * just passes some props through to the MainLayout Component so that it can properly render the menu
 * and user
 */

export default class App extends Component {
    render() {
      return(

      <div className="App">
        {/** todo implement serverside reqeusts to fetch menu items and feed items */}
          <MainLayout contentSettings={{
            breadCrumb : 'Home'
          }}
          menuItemParams={
          [
            {name: 'Home', icon: 'home', path:"My Prints"},
            {name: 'Print', icon: 'thunderbolt', path:"Submit A Print"},
            // {name: 'Balance: $' + this.props.userBalance, icon: 'dollar', path: "/balance", styling: {
            //   fontWeight: 'bold'
            // }, 
            // },
            {name: 'Logout', icon: 'lock', logout: true, divider: true}
          ]
        }
        menuParams={{defaultSelectedKey: ['0'], length: 1}} 

        user={{
          AvatarSRC:this.props.AvatarSRC, 
        }}

        uid={this.props.uid}

        userPrintData = {this.props.userPrintData}
        />

      </div>
      )
    }
}