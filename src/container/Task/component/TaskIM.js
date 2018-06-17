import { ChatFeed, Message } from 'react-chat-ui';
import React, { Component } from 'react';

class TaskCreate extends Component {
    state = {
      messages: [
        new Message({ id: 1, message: 'Hey!' }),
        new Message({ id: 1, message: 'I forgot to mention...' }),
      ],
    };

    render() {
      return (
        <ChatFeed
          messages={this.state.messages}
          hasInputField={false}
          bubblesCentered={false}
          bubbleStyles={
                    {
                        text: {
                            fontSize: 30,
                        },
                        chatbubble: {
                            borderRadius: 70,
                            padding: 40,
                        },
                    }
                }
        />
      );
    }
}

export default TaskCreate;
