import { useState, React } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home';
import Search from './pages/search';
import Details from './pages/details';
import { Tabs, Tab, AppBar } from "@material-ui/core";

const RouteWrapper = props => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;
  
  const tabNameToIndex = {
    0: "home",
    1: "search",
    2: "details"
  }

  const indexToTabName = {
    home: 0,
    search: 1,
    details: 2
  }

  const[selectedTab, setSelectedTab] = useState(indexToTabName[page]);

  const handleTabSelect = (event, newValue) => {
      history.push(`/${tabNameToIndex[newValue]}`)
      setSelectedTab(newValue);
  }

  return (
      <>    
          <AppBar position="static">
              <Tabs value={selectedTab} onChange={handleTabSelect}>
                  <Tab label="Home" />
                  <Tab label="Search" />
                  <Tab label="Details" />
              </Tabs>
          </AppBar>
          {selectedTab === 0 && <Home />}
          {selectedTab === 1 && <Search />}
          {selectedTab === 2 && <Details />}
      </>
  )
}

function App() {

  document.title = "Smart Move";

  return (
    <div>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/:page?" render={props => <RouteWrapper {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;