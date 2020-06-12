import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import "./App.css";
import axios from "axios";

// making it a class based component
// Variables can be defined inside the function
// const name = "Warlock";
const App = () => {
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState({});
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  // Showing some temporary users
  useEffect(() => {
    async function defaultDisplay() {
      setLoading(true);

      // Using the api to retrieve 30 users
      const res = await axios.get(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      setUsers(res.data);
      setLoading(false);
    }
    defaultDisplay();
  }, []);

  // Search Github Users
  const searchUsers = async (val) => {
    setLoading(true);

    // Using the api to retrieve searched user
    const res = await axios.get(
      `https://api.github.com/search/users?q=${val}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUsers(res.data.items);
    setLoading(false);
  };

  // Clearing the existing users
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // Alerting the user if searched without passing any value
  const showAlert = (message, type) => {
    setAlert({ message, type });

    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  // Gets a single Github User
  const getUser = async (username) => {
    setLoading(true);

    // Using the api to retrieve data on single user
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUser(res.data);
    setLoading(false);
  };

  // Get the user's repositories
  const getUserRepos = async (username) => {
    setLoading(true);

    // Using the api to retrieve repos on single user
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data);
    setLoading(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
