//import a metric crap ton of dependencies

import { Layout, Menu, Breadcrumb, Icon, Divider } from 'antd';
import React, { Component } from 'react';
import "antd/dist/antd.css";
import Feed from "./feed"
import PrintDialog from "./print"
import Balance from './balance'
import NavBar from "./navbar"
import firebase from 'firebase';
import { Scrollbars } from '../../node_modules/react-custom-scrollbars';
  
const { Header, Content, Sider } = Layout;
  
  // the main layout container that is used to hold all the other components. Also features a custom router because React DOM Router was too finicky
  export default class MainLayout extends Component {
      /**
       * @constructor just allows us to use props and state
       */
      constructor() {
          super()
          this.state = {
              path: "My Prints"
          }
      }

      /**
       * @function basicRouter
       * takes a string literal "path" as input
       * depending on the path prop sent to this router (ideally from a config file but hardcoding will do for now)
       * the app will render a certain component and highlight it in the sidebar
       */
     basicRouter = (path) => {
         if(path === "My Prints") {
            return <Feed userPrintData = {this.props.userPrintData} />
         } else if(path === "Submit A Print") {
             return <PrintDialog uid={this.props.uid}/>
         } else if(path === "/balance") {
             return <Balance/>
         }
     }

     /**
      * @function createMenu
      * React doesn't really like looping or any heavy JS in their JSX - so we always need a function to
      * dynamically create components and push them to an array that will be returned into another react container
      * 
      * this one takes menu items from a prop sent to this component (again, ideally it'd be from a config file hosted on a db - and could be changed in the admin panel)
      *  and then makes a menu item based on the custom props specified and pushes it to an array
      * the array is then returned and rendered
      * 
      */
      createMenu = (menuItemParams) => {
          let menuItems = []
          console.log(menuItemParams)
          //loop to create menu items
        for(let i = 0; i < menuItemParams.length; i++) {
            if(menuItemParams[i].divider) {
                menuItems.push(<Divider/>)
            }

            if (menuItemParams[i].logout) {
                menuItems.push(<Menu.Item onClick={() => firebase.auth().signOut()} key={menuItemParams[i].path} style={menuItemParams[i].styling}><Icon type={menuItemParams[i].icon} />{menuItemParams[i].name}</Menu.Item>)
            }  else if(menuItemParams[i].styling) {
                menuItems.push(<Menu.Item onClick={() => this.setState({path: menuItemParams[i].path})} key={menuItemParams[i].path} style={menuItemParams[i].styling}><Icon type={menuItemParams[i].icon} />{menuItemParams[i].name}</Menu.Item>)
            }  else {
                menuItems.push(<Menu.Item onClick={() => this.setState({path: menuItemParams[i].path})} key={menuItemParams[i].path}><Icon type={menuItemParams[i].icon} />{menuItemParams[i].name}</Menu.Item>)
            }


        }
        return menuItems
      }

      render() {
          return (
            <Layout>
            <Header className="header">
              <div className="logo" />
              <NavBar AvatarSRC={this.props.user.AvatarSRC} />
            </Header>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  onClick={this.menuKeyRoute}
                  mode="inline"
                  defaultSelectedKeys={[this.state.path]}
                  style={{ height: '100%', borderRight: 0 }}
                >
                    {this.createMenu(this.props.menuItemParams)}
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>{this.state.path}</Breadcrumb.Item>
                </Breadcrumb>
                <Scrollbars className="custom--scroll--content" style={{minHeight: 280, height: '78vh'}}>
                    <Content className="feed--container--content" style={{
                    background: '#fff', padding: 24, margin: 0, minHeight: '75vh'
                    }}
                    >
                        {this.basicRouter(this.state.path)}
                    </Content>
                </Scrollbars>
              </Layout>
            </Layout>
          </Layout>
        );
          
      }
    }