import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';

import './index.css';
import './index-mobile.css';
import Main from './components/Main.jsx';
// import Manifesto from './components/Manifesto.jsx';
import Unsubscribe from './components/unsubscribe.jsx';
import Policy from './components/Policy.jsx';

ReactDOM.render((
  <HashRouter>
    <div>
      <Route exact path="/" component={Main}/>
      <Route path="/waitingList" component={Main}/>
      {/* <Route path="/manifesto" component={Manifesto}/> */}
      <Route path="/policy" component={Policy}/>
      <Route path="/unsubscribe" component={Unsubscribe}/>
    </div>
  </HashRouter >
), document.getElementById('root'));
