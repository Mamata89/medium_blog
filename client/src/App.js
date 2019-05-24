import React, { Component } from 'react';
import { BrowserRouter, Route, Link , Switch} from 'react-router-dom'

import './App.css';
import Home from './components/layout/Home'
import ListStory from './components/Story/List'
import StoryShow from './/components/Story/Show'
import StoryNew from './components/Story/New'
import StoryEdit from './components/Story/Edit'

import BookmarkList from './components/Bookmark/List'
import BookmarkShow from './components/Bookmark/Show'

import UserRegister from './components/authentication/Register'
import UserLogin from './components/authentication/Login'

// import Logout from './components/authentication/Logout'
import axios from './config/axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAuthenticated: !!localStorage.getItem('token'),
    }
    this.handleIsAuthenticated = this.handleIsAuthenticated.bind(this)
  }

  handleIsAuthenticated(bool) {
    this.setState(() =>({
      isAuthenticated: bool
    }))
  }

  onChange = (val) => {
    console.log(val, "val")
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <h1 className="text_head"> Medium Blog </h1>
          <div className="container link_maindiv">
          <Link to="/"> Home |</Link> 
          <Link to="/stories">Stories |</Link>
          <Link to="/bookmark">MyBookMark |</Link>
         
       

          {
            this.state.isAuthenticated && <Link to="/users/logout/">Logout</Link>
          }
          {
            !this.state.isAuthenticated && (
              <div className="link_maindiv">
                 <Link to='/users/register'>Register |</Link>
                 <Link to='/users/login'>Login |</Link>
              </div>
            )
          }
         </div>

          <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/stories" component={ListStory} exact={true} />
        <Route path="/stories/new" render={ () => <StoryNew onChange={this.onChange}/> } exact={true} />
          <Route path="/loginstory/:id" component={StoryShow } exact={true} />
          <Route path="/stories/edit/:id" component={StoryEdit} exact={true} />
          <Route path="/homeStory/:id" component={StoryShow}/>
          <Route path="/bookmark" component={BookmarkList} exact={true} />
          <Route path="/users/bookmark/:id" component={BookmarkShow}/>

         
          <Route path="/users/register" component={UserRegister} exact={true}/>
          <Route path="/users/login" render={ () => <UserLogin handleIsAuthenticated =
          {this.handleIsAuthenticated}/> } /> 
          <Route path="/users/logout" component={() => {
                localStorage.clear()
                axios.defaults.headers['x-auth'] = null
                return(
                  <div>
                    <p className="welcome_text">You are successfully logged out</p>
                    {/* {
                      setTimeout(() =>{
                          this.props.history.push('/home')
                      },1000)
                    } */}
                  </div>
                )
          }}/>


          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;