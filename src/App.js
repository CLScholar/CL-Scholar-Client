import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Homepage from './pages/homepage/homepage';
import Author from './pages/author/author';
import Search from './pages/search/search';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={Homepage}/>
        <Route path={process.env.PUBLIC_URL + '/author/:_id'} component={Author}/>
        <Route path={process.env.PUBLIC_URL + '/search'} component={Search}/>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
