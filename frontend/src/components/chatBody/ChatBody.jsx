import React, {Component} from "react";
import './chatBody.css'
import ChatContent from "../chatContent/ChatContent";

export default class ChatBody extends Component {
    render(){
        return (
            <div className="__main">
                <div className="main__chatBody">
                        <ChatContent/>
                </div>
            </div>
        )
    }
}