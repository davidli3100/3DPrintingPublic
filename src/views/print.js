import React, { Component } from 'react';
import { Steps, Button, message, notification, List, Avatar } from 'antd';
import TextField from '@material-ui/core/TextField';
import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import firebase from 'firebase';
import { Typography } from '@material-ui/core';


let globalName;

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectID,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId
};
if(!firebase.apps.length) {
  firebase.initializeApp(config)
  var db = firebase.firestore();

}

var storageRef = firebase.storage().ref();





registerPlugin(FilePondPluginFileValidateType);


const errorNotification = () => {
  notification['error']({
    message: 'Error: Wrong File Type',
    description: 'This app only takes STL files. Please make sure that you have uploaded a STL file',
  });
};

notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
});


const printSuccessNotification = () => {
  notification['success']({
    message: 'Print Submitted!',
    description: 'Your print request has been submitted. You will be notified by email once the print is ready for pickup',
  });
};

notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
});


const Step = Steps.Step;


export default class PrintDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      submitButtonDisabled: false,
      next_disabled: true,
      print: {
        submissionDetails: {
        }
      }
    };
  }
 
  

  redirectToHome = () => {
    window.location.reload()    
  }
  firebase = this.props.firebase

  steps = [{
    title: 'Details',
    content:
    <TextField
      id="outlined-name"
      label="Print Name"
      required={true}
      className="print--name print--field"
      margin="normal"
      variant="outlined"
      autoFocus={true}
      style={{width: '50%'}}
      onChange={(event) => {
        if(event.target.value) {
          globalName = event.target.value
          console.log(globalName)
          this.setState({
            next_disabled: false,
            print: {
              submissionDetails: {
                name: globalName
              }
            }
          })
          console.log(this.state)
        } else {
          this.setState({
            next_disabled: true
          })
        }
      }}
    />
  }, {
    title: 'Upload',
    content: 
    <div className="upload--div">
    <FilePond
      labelIdle='Drag & Drop your files or <span class="filepond--label-action"> Browse</span> <br> STL Files Only*'
      className="print--file--upload"
      required={true}
      oninit = {() => {
        this.setState({
          next_disabled: true,
          
        })
      }}
      onupdatefiles={(fileItems) => {
        if(fileItems[0]) {
        console.log(fileItems[0].fileExtension)
        if(fileItems[0].fileExtension !== "stl") {
          console.log('file is not stl')
          errorNotification()
          this.setState({
            next_disabled: true
          })
        } else {
          this.setState({
            next_disabled: false,
            print: {
              submissionDetails: {
                name: this.state.print.submissionDetails.name
              },
              file: fileItems[0].file
            }
          })
        }
      } else {
        this.setState({
          next_disabled: true,
          
        })
      }
      }}
    />
    </div>
  }, {
    title: 'Submit',
    content: <div className="submit--dialog">Click The Submit Button to Submit a Print Request <br /> Current Wait Times for Prints are <span id="print--time"><strong>1 week</strong></span>
    
    </div>
  }];
  


  addPrint() {
    console.log(this.props)
    console.log(this.state)
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var curMinute = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    var curSeconds = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
    var curHour = today.getHours() > 12 ? today.getHours() - 12 : (today.getHours() < 10 ? "0" + today.getHours() : today.getHours());
    let currTime = mm + '-' + dd + '-' + yyyy + ' | ' + curHour + ':' + curMinute + '.' + curSeconds;
    // var mainRef = storageRef.child(this.props.uid);

    
    
    
    var userPrintRef = db.collection("users").doc(this.props.uid).collection("prints").add({ 
      name: this.state.print.submissionDetails.name,
      printName: this.state.print.file.name,
      dateCreated: currTime,
      printStatus: 'awaiting-approval'
    }).then(data => {
      console.log("print ref data: \n" + data[0])
      this.setState({
        userPrintRefID: data.id
      })
    })

  

    // var fileRef = mainRef.child(userPrintRef.id);

    // fileRef.put(this.state.print.file);

    const storageRef  = firebase.storage().ref(this.props.uid);
    const fileRef = storageRef.child(currTime + ' ' + this.state.print.file.name);
    console.log(this.state.print.file.name);
    const upload = fileRef.put(this.state.print.file);             
 

    return true
  }

  submitPrint() {
    this.addPrint()
    this.setState({
      submitButtonDisabled: true
    })
    printSuccessNotification()
    window.setTimeout(this.redirectToHome, 2000) 
    
  }



  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  setName() {
    this.setState({
      print: {
        submissionDetails: {
          name: globalName
        }
      }
    })
    console.log(this.state)
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {this.steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{this.steps[current].content}</div>
        <div className="steps-action">
          {
            current === this.steps.length - 3
            && <Button type="primary" disabled={this.state.next_disabled} onClick={() => {this.next(); this.setName()}}>Next</Button>
          }
          {
            current === this.steps.length -2
            && <Button type="primary" disabled={this.state.next_disabled} onClick={() => { this.next()}}>Next</Button>
          }
          {
            current === this.steps.length - 1
            && <Button disabled={this.state.submitButtonDisabled} type="primary" onClick={
              () => this.submitPrint()

            }>Submit</Button>
          }
          {
            current > 0
            && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
            )
          }
        </div>
      </div>
    );
  }
}

