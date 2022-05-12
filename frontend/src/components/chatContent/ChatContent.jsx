import React, { Component,  createRef} from "react";
import axios from 'axios';

import "./chatContent.css";
import ChatItem from "./ChatItem";
import config from "../../config/"

export default class ChatContent extends Component {
  messagesEndRef = createRef(null);
  chatItms = [
    
  ];
  users = ["p1","p2","sender2"]
  items=[]

  constructor(props) {
    super(props);
    this.state = {
      chat: this.chatItms,
      msg: "",
      username:"Select the user you want to Send Message"
    };

    this.changeUser = this.changeUser.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.changeUsername = this.changeUsername.bind(this)
  }

  changeUsername = (e) => {
      this.setState({username:e.target.value})
      console.log(e.target.value)
      console.log(process.env.NODE_ENV)
      this.chatItms = []
    this.setState({ chat: [...this.chatItms] });
    this.setState({userExists : this.state.username})
    axios.get(config.BASE_URL + '/messages/getMessages', {
            
        params: {
            sender:"p1",
            receiver:e.target.value
        }
        
    }).then((response)=>{
        for(let i = 0;i<response.data.data.length;i++){
            var msgType = ""
            if(response.data.data[i].sender === e.target.value)
                msgType = "other"
            this.chatItms.push({
                key: 1,
                type: msgType,
                msg: response.data.data[i].messageText,
              });
              this.setState({ chat: [...this.chatItms] });
        }
        this.scrollToBottom();

    })
    console.log(e.target.value)
  }

  sendMessage = (e) =>{
    console.log(e)
    var data = {
        senderId : "p1",
        receiverId: this.state.username,
        messageText: this.state.msg
    }
    
    if (this.state.msg != ""){
    axios.post(config.BASE_URL + '/messages/putMessages',data)
            .then(response => {
                console.log(response);
                if (this.state.msg != "") {
                    this.chatItms.push({
                      key: 1,
                      type: "",
                      msg: this.state.msg
                    });
                    this.setState({ chat: [...this.chatItms] });
                    this.scrollToBottom();
                    this.setState({ msg: "" });
                  }
            })
        }
  }

  changeUser = (e) => {
      e.preventDefault()
      this.setState({username:e.target.value})
      console.log(this.state.username)
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        if (this.state.msg != "") {
          this.chatItms.push({
            key: 1,
            type: "",
            msg: this.state.msg,
            image:
              "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
          });
          this.setState({ chat: [...this.chatItms] });
          this.scrollToBottom();
          this.setState({ msg: "" });
        }
      }
    });
    this.scrollToBottom();
  }
  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  render() {
    this.items = []
    for(let i=0;i<this.users.length;i++)
        this.items.push(<option key={this.users[i]} value={this.users[i]}>{this.users[i]}</option>)
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
          <div className='chatList_search'>
                    <div className='search_wrap'>
                        {/* <input type="text" placeholder="Search Here" onChange={this.changeUser} required/> */}
                        <select onChange={this.changeUsername}>
                            {this.items}
                        </select>
                        {/* <buttong className="search-btn" >
                            <i className="fa fa-search" onClick={this.searchUser}></i>
                        </buttong> */}
                        {/* <button onClick={this.searchUser}>Search User</button> */}
                    </div>
                </div>
            <div className="current-chatting-user">
              <p>{this.state.username}</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                />
              );
            })}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input
              type="text"
              placeholder="Type a message here"
              onChange={this.onStateChange}
              value={this.state.msg}
            />
            <button className="btnSendMsg" id="sendMsgBtn">
              <i className="fa fa-paper-plane" onClick={this.sendMessage}></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}