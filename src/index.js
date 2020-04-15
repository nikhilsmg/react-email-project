import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      emailList: [],
      selectedEmail: undefined,
      activeFilter: 'all',
      allList: [],
      readList: [],
      unreadList: [],
      favoritesList: [],
    };
  }

  getEmailList = () => {
    fetch('https://flipkart-email-mock.now.sh/')
      .then(result => {
        return result.json();
      })
      .then(jsonResult => {
        console.log(jsonResult);
        this.setState({
          emailList: [...jsonResult.list],
          allList: [...jsonResult.list],
          unreadList: [...jsonResult.list],
        });
      });
  };

  componentDidMount() {
    this.getEmailList();
  }

  handleEmailClick = email => {
    var readList = this.state.readList;
    var unreadList = this.state.unreadList;
    if (!readList.includes(email)) {
      readList.push(email);
      const index = unreadList.indexOf(email);
      unreadList.splice(index, 1);
    }
    this.setState({
      selectedEmail: email,
      readList,
      unreadList,
    });
  };

  callFilter = filterName => {
    console.log(filterName);
    var emailList;
    if (filterName == 'all') {
      emailList = this.state.allList;
    } else if (filterName == 'read') {
      emailList = this.state.readList;
    } else if (filterName == 'unread') {
      emailList = this.state.unreadList;
    } else if (filterName == 'favorites') {
      emailList = this.state.favoritesList;
    }
    this.setState({
      activeFilter: filterName,
      emailList,
    });
  };

  handleFavoriteClick = email => {
    var favoritesList = this.state.favoritesList;
    if (!favoritesList.includes(email)) {
      favoritesList.push(email);
    } else {
      const index = favoritesList.indexOf(email);
      favoritesList.splice(index, 1);
    }
    this.setState({
      favoritesList,
    });
  };

  render() {
    return (
      <div className="mainDiv">
        <div id="myDIV">
          <label>Filtered By: </label>
          <button
            className={
              this.state.activeFilter == 'all'
                ? 'btnFilter active'
                : 'btnFilter'
            }
            onClick={() => this.callFilter('all')}
          >
            All
          </button>
          <button
            className={
              this.state.activeFilter == 'read'
                ? 'btnFilter active'
                : 'btnFilter'
            }
            onClick={() => this.callFilter('read')}
          >
            Read
          </button>
          <button
            className={
              this.state.activeFilter == 'unread'
                ? 'btnFilter active'
                : 'btnFilter'
            }
            onClick={() => this.callFilter('unread')}
          >
            Unread
          </button>
          <button
            className={
              this.state.activeFilter == 'favorites'
                ? 'btnFilter active'
                : 'btnFilter'
            }
            onClick={() => this.callFilter('favorites')}
          >
            Favorites
          </button>
        </div>
        <div>
          {this.state.selectedEmail === undefined ? (
            <div>
              {this.state.emailList.map(email => {
                return (
                  <div
                    className="card"
                    key={email.id}
                    onClick={() => this.handleEmailClick(email)}
                  >
                    <div className="container">
                      <p>
                        From:{' '}
                        <b>
                          {email.from.name} {'<'}
                          {email.from.email}>
                        </b>
                      </p>
                      <p>
                        Subject: <b>{email.subject}</b>
                      </p>
                      <p>{email.date}</p>
                      {this.state.favoritesList.includes(email) ? (
                        <b className="favoriteText">Favorite</b>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <div className="left">
                <div>
                  {this.state.emailList.map(email => {
                    return (
                      <div
                        className={
                          this.state.readList.includes(email)
                            ? 'card read'
                            : 'card'
                        }
                        key={email.id}
                        onClick={() => this.handleEmailClick(email)}
                      >
                        <div className="container">
                          <p>
                            From:{' '}
                            <b>
                              {email.from.name} {'<'}
                              {email.from.email}>
                            </b>
                          </p>
                          <p>
                            Subject: <b>{email.subject}</b>
                          </p>
                          <p>{email.date}</p>
                          {this.state.favoritesList.includes(email) ? (
                            <b className="favoriteText">Favorite</b>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="right">
                <div className="card">
                  <div className="container containerEmail">
                    <span className="emailTitle">
                      <h4 className="emailSubject">
                        {this.state.selectedEmail.subject}
                      </h4>
                      <button
                        className="favoriteBtn"
                        onClick={() =>
                          this.handleFavoriteClick(this.state.selectedEmail)
                        }
                      >
                        {!this.state.favoritesList.includes(
                          this.state.selectedEmail,
                        )
                          ? 'Mark as favorite'
                          : 'Mark as unfavorite'}
                      </button>
                    </span>
                    <p>{this.state.selectedEmail.date}</p>
                    <p>{this.state.selectedEmail.short_description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
