import React, { Component } from 'react';

class Message extends Component {
    constructor() {
        super();
        this.state = {
            messages: []
        };
    }
    
    componentWillMount() {
        const url = 'http://localhost:3001/twitter/message';
        fetch( url)
            .then( results => {
                console.log(results)
                return results.json();
            }).then( data => {
                let messages = data.events.map( m => {                      
                    return (
                    <div key={m.id}> 
                        <div key={m.message_create.target.recipient_id}> 
                            <span> Recipient: {m.message_create.target.recipient_id} </span>
                        </div>
                        <div key={m.message_create.sender_id}>
                            <span> Sender Id: {m.message_create.sender_id} </span>
                        </div>

                        <p>
                            Message: {m.message_create.message_data.text}
                        </p>
                    </div>);
                });
                this.setState({messages: messages});
                console.log('Message in state', this.state.messages);
            });
    }
    
    render() {
        return (
            <div>
                {this.state.messages}
            </div>
        );
    }
}

export default Message;