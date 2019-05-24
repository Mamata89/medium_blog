import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class BookmarkList extends React.Component{
    constructor(){
        super()
        this.state = {
            token : localStorage.getItem('token'),
            bookmark_stories : []
        }
    }

    componentDidMount(){
            axios.get('/users/bookmark')
            .then(response => 
                {
                    this.setState(()=> ({
                        bookmark_stories : response.data
                    }))
                } )
            .catch(err => console.log(err))
       
       
    }
    render(){

        if(!this.state.token){
            window.alert('Please Login')
            return (
                <Redirect to = "/home"/>
            )
      
        }
        return(
            <div>
               
                <h2> Bookmarked Stories..</h2>
                <ul>
                    {this.state.bookmark_stories.map(story => {
                        return <li key = {story._id}><Link to = {`/users/bookmark/${story._id}`}>{story.title}</Link></li>
                    })}
                </ul>
            </div>
        )
    }
}
export default BookmarkList