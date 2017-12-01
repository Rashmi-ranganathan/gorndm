import React, { Component } from 'react';
import Loader from './loader.jsx';

class LeaderBoard extends Component {


  userItem(index, rank, rankist, photo, name, coins){
    let htmlItem =  
      <div className='ranklist-item' key={index}>
        <div className='ranklist-item-rank'> {rank}
          <span className= 'ranklist-item-rank-st'>{rankist}</span>
        </div>
        <div className='ranklist-item-value'>
          <div className='ranklist-item-value-name'>
            <span className="avatar"><img className="avatar_img" src={photo} alt = ''/></span>
            {name ? name.split(' ')[0] :''}
          </div>
          <div className='ranklist-item-value-coin'>{coins}
            <div className='ranklist-item-value-coinimage'></div>
          </div>
        </div>
      </div>;
    return htmlItem;
  }
  render() {
    let userRank = (this.props.userRank).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let userData = '';
    if(this.props.userRank > 3 ){
      let user = this.props.userDetail;
      userData = 
      <div>
        <div className='dot-dot'>
          <div className='dot-dot-item'></div>
          <div className='dot-dot-item'></div>
        </div>
        {this.userItem(0, userRank, user.rankist, user.photoURL, user.username, user.coins)}
      </div>
    }
    

    let list = this.props.rankList === null ? <Loader/> : 
    this.props.rankList.map((item, index) => {
      item.coins = item.coins > 999 ? Math.round(item.coins/1000) + 'k' : item.coins;
      switch(item.rank){
        case 1: item.rankist = 'st'; break;
        case 2: item.rankist = 'nd'; break;
        case 3: item.rankist = 'rd'; break;
        default: item.rankist = '';
      }
      return this.userItem(index, item.rank, item.rankist, item.photoURL, item.name, item.coins);
    });
    return (
      <div className='ranklist'>
        <div className='ranklist-list'>
          <div className='ranklist-header'>
            <div className='ranklist-header-space'></div>
            <div className='ranklist-header-text'> Current Leaderboard 
              <span role="img" aria-label="prize_emoji"> 🏆</span>
            </div>
          </div>
          {list}
          {userData}
        </div>
      </div>
    );
  }
}

export default LeaderBoard
