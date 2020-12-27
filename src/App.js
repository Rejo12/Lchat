import React from 'react';
import './App.css';

class App extends React.Component{
  state={
    chatData:[{lchatId:1,lChatMsg:'How are you',lUserMsg:''},
              {lchatId:2,lChatMsg:'What do you wanna talk about',lUserMsg:''},
              {lchatId:3,lChatMsg:'Did you watch Ex-Machina?',lUserMsg:''},
              {lchatId:4,lChatMsg:'How would you rate it?',lUserMsg:''},
              {lchatId:5,lChatMsg:'Whats your thought on AI?',lUserMsg:''}],
    currentlyTypedMsg:"",
    renderAgain:true
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextState);
    return nextState.renderAgain;
  }

  handleChange=(e,id)=>{
    console.log(e.target.value);
    this.setState({
      currentlyTypedMsg:e.target.value,
      renderAgain:false
    })
  }

  saveUserMsg=(id)=>{
    let tmpChatData=[...this.state.chatData]
    for(var obj in tmpChatData){
      if(tmpChatData[obj].lchatId == id){
        tmpChatData[obj].lUserMsg =this.state.currentlyTypedMsg;
        break;
      }
    }
    let textarea = document.querySelector('#output');
    textarea.value = '';
    this.setState({
      chatData:tmpChatData,
      currentlyTypedMsg:"",
      renderAgain:true
    })
  }
  render(){
    console.log("render");
    let currentChatId=0;
    let chatMsgs=[];
    let chatData = [...this.state.chatData]
    for(var obj in chatData){
      if(chatData[obj].lUserMsg == ""){
        currentChatId=chatData[obj].lchatId;
        chatMsgs.push(
          <div style={{'float':'left'}}>
          Chat:{chatData[obj].lChatMsg}
          </div>
        )
        break;
      }
      else{
        chatMsgs.push(
          <React.Fragment>
          <div style={{'float':'left'}}>
          Chat:{chatData[obj].lChatMsg}
          </div>
          <br/>
          <div style={{'float':'right'}}>
          Me:{chatData[obj].lUserMsg}
          </div>
          <br/>
          </React.Fragment>
        )
      }
    }

  return (
    <div className="App">
    <p>Welcome to chat survey</p>
      <div className="row">
      <div className="col-sm-6 col-md-6 col-lg-6">
      About the Lchat
      </div>
      <div className="col-sm-5 col-md-5 col-lg-5">
      <p>This is the chat window</p>
      {chatMsgs}
      <div className="userEditor">
      <div className="row">
        <div className="col-sm-8 col-md-8 col-lg-8">
      <textarea id="output" placeholder="Type your msg" onChange={(e)=>this.handleChange(e,currentChatId)} defaultValue={this.state.currentlyTypedMsg}/>
      </div>
        <div className="col-sm-2 col-md-2 col-lg-2">
      <button type="primary" onClick={(e)=>this.saveUserMsg(currentChatId)}>Send</button>
      </div>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}
}

export default App;
