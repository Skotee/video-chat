import React, { Component } from 'react';
import ContactItem from './ContactItem'
import SocketContext from '../../config/socketContext'

import './ContactList.css'

class ContactList extends Component {

    state = {
        allUsers: []
    }

    // in this way we can access global instance of socket
    componentDidMount() {
        this.props.socket.on(process.env.REACT_APP_ALL_USERS_EVENT, allUsers => {
            this.setState({ allUsers: allUsers })
        })
    }

    render() {
        const contactItems = []
        for(let i = 0 ; i< this.state.allUsers.length ; i++){
            contactItems.push(<ContactItem key={i} nick={this.state.allUsers[i]} />)
        }
        return (
            <div>
                <h1 className="list-title"> Contact List</h1>
                {contactItems}
            </div>
        )
    }
}

const ContactListWithSocket = props => (
    <SocketContext.Consumer>
        {socket => < ContactList {...props} socket={socket} />}
    </SocketContext.Consumer>
)

export default ContactListWithSocket