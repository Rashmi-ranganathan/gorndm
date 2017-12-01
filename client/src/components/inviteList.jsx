import React, { Component } from 'react';
import Loader from './loader.jsx';

class InviteList extends Component {
  render() {
    let list = this.props.inviteList === null ? <Loader/> : 
    this.props.inviteList.map((item) => {
      return (
        <li key={item.id}>
          <span> {item.phoneNumber} {item.status ? 'joined' : 'waiting'}</span>
        </li>
      )
    });
    return (
      <section className='display-item'>
        <div className="wrapper"> Invitee List
          <ul>
            {list}
          </ul>
        </div>
      </section>
    );
  }
}

export default InviteList
