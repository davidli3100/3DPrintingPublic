import React, { Component } from 'react';
import queryString from "query-string";
import { CardHeader, CardMedia, Typography, CardContent, Card, Button, Avatar } from '@material-ui/core';
import {Timeline, Icon} from 'antd'


class FeedCard extends Component {
    
    /**
     * @function handleTimeLineRender 
     * parametrically generates a timeline component based on prototype properties passed into import PropTypes from 'prop-types'
     * @returns a timeline component customized to the current PrintStatus of the print request
     */

    handleTimeLineRender = () => {
        let timeLineComponent = [];
        console.log("printstatus: " + this.props.printStatus)
        if(this.props.printStatus === "printing") {
            timeLineComponent.push(
            <Timeline pending="Print in progress..." >
            <Timeline.Item color="green">Print Request Submitted</Timeline.Item>
            <Timeline.Item color="green">Print Request Approved</Timeline.Item>
            <Timeline.Item dot={<Icon type="clock-circle" style={{color: "green"}}/>}>Print In Queue</Timeline.Item>
            </Timeline>
            )
        } else if (this.props.printStatus === "awaiting-approval") {
            timeLineComponent.push(
            <Timeline pending="Awaiting approval...">
            <Timeline.Item color="green">Print Request Submitted</Timeline.Item>
            </Timeline>
            )
        } else if (this.props.printStatus === "approved") {
            timeLineComponent.push(
            <Timeline pending="Print in queue...">
            <Timeline.Item color="green">Print Request Submitted</Timeline.Item>
            <Timeline.Item color="green">Print Request Approved</Timeline.Item>
            </Timeline>
            )
        } else if (this.props.printStatus === "printed") {
            timeLineComponent.push(
            <Timeline pending="Print available for pickup..." >
            <Timeline.Item color="green">Print Request Submitted</Timeline.Item>
            <Timeline.Item color="green">Print Request Approved</Timeline.Item>
            <Timeline.Item  dot={<Icon type="clock-circle" style={{color: "green"}}/>}>Print In Queue</Timeline.Item>
            </Timeline>
            )
        } else if (this.props.printStatus === "rejected") {
            timeLineComponent.push(
            <Timeline>
            <Timeline.Item color="green">Print Request Submitted</Timeline.Item>
            <Timeline.Item dot={<Icon type="close-circle" style={{color: "red"}} />}>Print Request Rejected</Timeline.Item>
            </Timeline>
            )        
        } else if (this.props.printStatus === "completed") {
            timeLineComponent.push(
            <Timeline>
            <Timeline.Item color="green">Print Request Submitted</Timeline.Item>
            <Timeline.Item color="green">Print Request Approved</Timeline.Item>
            <Timeline.Item  dot={<Icon type="clock-circle" style={{color: "green"}}/>}>Print In Queue</Timeline.Item>
            <Timeline.Item color="green">Print Finished</Timeline.Item>
            <Timeline.Item color="green">Print Picked Up</Timeline.Item>
            </Timeline>
            )
        }
        return timeLineComponent
    }


    render() {
        return (
            <div className="feed--card--container">
                <Card className="feed--card" id={this.props.postID}>
                    <CardHeader title={this.props.printName} subheader={'Submitted at ' + this.props.dateCreated}  
                     />
                    <CardContent>
                        {this.handleTimeLineRender()}
                    </CardContent>
                </Card>
            </div>
        )
    }
}



export default class Feed extends Component {

    /**
     * @function handleFeedRender 
     * takes prototype properties passed in through multiple players of props and state 
     * should've used redux from the start but I didn't anticpate having to use so much routing - so passing props through multiple components will do for now
     * 
     * takes userprint data to generate an array of feed cards with timeline properties and the name/date created of each print
     * returns the feed card array - which contains all of the cards parametrically generated
     * 
     * if no prints exist, then return a splash page with a custom illustration
     */
    handleFeedRender = () => {
        let feedCards = []
        let userPrintCollection = this.props.userPrintData
        console.log(userPrintCollection)
        if(this.props.userPrintData === false) {
            feedCards.push(<div className="no--prints--text"> <span className="feed--noPrint--title">You haven't submitted any prints! </span> <br/> 
            <span className="feed--noPrint--subtitle">Click on the <strong>Print</strong> link in the sidebar to begin your next print </span><br/>
            <img style={{height: '55vh'}} src={require('./assets/images/undraw_3d_modeling_h60h.png')}></img>
            </div>
            )
        } else {
        for(var print in userPrintCollection) {
            feedCards.push(<FeedCard postID="" printName={this.props.userPrintData[print].name}
            dateCreated={this.props.userPrintData[print].dateCreated} 
            printStatus={this.props.userPrintData[print].printStatus}
            />
            )
        }
    }
        return feedCards
    }

    render() {
        return (
            <div className="container home--container">

                {this.handleFeedRender()}
                                    
            </div>
        )
    }
}