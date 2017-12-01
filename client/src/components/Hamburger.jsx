import React, { Component } from 'react';

class Hamburger extends Component {
  handleMenuToggle(e){
    this.props.toogleMenu(e);
  }
  
  render() {
    return (
      <div className="hamburger-menu">
        <div className="hamburger">
          <div className="hamburger-icon">
            <input type="checkbox" onClick = {this.handleMenuToggle.bind(this)}/>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }
}

export default Hamburger
