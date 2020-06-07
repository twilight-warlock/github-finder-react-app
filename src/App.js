import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import "./App.css";
import axios from "axios";

// making it a class based component
// Variables can be defined inside the function
// const name = "Warlock";
class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  // Showing some temporary users
  async componentDidMount() {
    this.setState({ loading: true });

    // Using the api to retrieve 30 users
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data, loading: false });
  }

  // Search Github Users
  searchUsers = async (val) => {
    this.setState({ loading: true });

    // Using the api to retrieve searched user
    const res = await axios.get(
      `https://api.github.com/search/users?q=${val}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  // Clearing the existing users
  clearUsers = () => this.setState({ users: [], loading: false });

  // Alerting the user if searched without passing any value
  setAlert = (message, type) => {
    this.setState({ alert: { message, type } });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  render() {
    const { loading, users, alert } = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
