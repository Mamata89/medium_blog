import React from 'react' 
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class Home extends React.Component{
    constructor(props){
        super(props)
            this.state ={
                stories : []
            }
        
    }

    componentDidMount(){
        console.log("component did mount function")
        axios.get('/story')
            //.then(response => console.log(response.data))
            .then(response => {
                this.setState(() => ({
                    stories : response.data
                }))
            })
    }
    render(){
        return(
            <div>
                <h2>Lists of Stories Home Page</h2>
               <ul>
                   {this.state.stories.map(story => {
                       return(
                        <li key={story._id}><Link  to={`/homeStory/${story._id}`}>{story.title}</Link></li>
                      
                       )
                   })}
                </ul>
               
            </div>
        )
    }
}

export default Home