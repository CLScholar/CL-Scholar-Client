import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Homepage from './pages/homepage/homepage';
import Author from './pages/author/author';
import Conference from './pages/conference/conference';
import Paper from './pages/paper/paper';
import About from './components/about/about';
import NLPQuery from './pages/nlpquery/nlpquery';
import Search from './pages/search/search';
import Team from './pages/team';
import Contact from './pages/contact';
import './App.css';

const App = () => {
  return (
    <BrowserRouter basename="/ACLAKG">
      <div className="App">
        <Header />
          <Switch>
            <Route exact path='/' component={Homepage}/>
            <Route path='/author/:_id' component={Author}/>
            <Route path='/paper/:_id' component={Paper}/>
            <Route path='/conference/:_id' component={Conference}/>
            <Route path='/search' component={Search}/>
            <Route path='/nlpquery' component={NLPQuery}/>
            <Route path='/team' component={Team}/>
            <Route path='/about' component={About}/>
            <Route path='/contact' component={Contact}/>
          </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
