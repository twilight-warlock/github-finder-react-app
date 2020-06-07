import React, { Component, Fragment } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
  };

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
      company,
    } = this.props.user;

    const { loading } = this.props;

    if (loading) {
      return <Spinner />;
    } else {
      return (
        <Fragment>
          <Link to="/" className="btn btn-light">
            Back to Search
          </Link>
          Hireable :{" "}
          {hireable ? (
            <i className="fa fa-check text-success"></i>
          ) : (
            <i className="fa fa-times-circle text-danger"></i>
          )}
          <div className="card grid-2">
            <div className="all-center">
              <img
                src={avatar_url}
                alt="logo"
                className="round-img"
                style={{ width: "150px" }}
              />
              <h1>{name}</h1>
              <p>Location: {location}</p>
            </div>
            <div>
              {bio && (
                <Fragment>
                  <h3>Bio</h3>
                  <p>{bio}</p>
                  <a href={html_url} className="btn btn-dark my-1">
                    Visit Github Profile
                  </a>
                  <ul>
                    <li>
                      {login && (
                        <Fragment>
                          <b>Username: </b>
                          {login}
                        </Fragment>
                      )}
                    </li>
                    <li>
                      {company && (
                        <Fragment>
                          <b>Company: </b>
                          {company}
                        </Fragment>
                      )}
                    </li>

                    <li>
                      {blog && (
                        <Fragment>
                          <b>Website: </b>
                          {blog}
                        </Fragment>
                      )}
                    </li>
                  </ul>
                </Fragment>
              )}
            </div>
          </div>
          <div className="card text-center">
            <div className="badge badge-primary">Followers: {followers}</div>
            <div className="badge badge-success">Following: {following}</div>
            <div className="badge badge-light">
              Public Repos: {public_repos}
            </div>
            <div className="badge badge-dark">Public Gists: {public_gists}</div>
          </div>
        </Fragment>
      );
    }
  }
}

export default User;
