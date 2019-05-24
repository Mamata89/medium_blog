import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class ListStory extends React.Component{
   
    constructor(props){
        super(props)
        this.state={
            stories : []
        }
    }

    componentDidMount(){
        axios.get('/stories')
            .then(response => {
                console.log(response.data)
                this.setState(()=>({
                    stories : response.data
                }))
            })
            .catch(err => console.log(err))
    }
    
    render(){
        return(
            
             <div className='list-maindiv'>
             {
                 this.state.stories.length === 0 ? (<p> No Stories found. Add your first Story</p>) : (
                     <div> 
                         <h2>Listing story  - {this.state.stories.length} </h2>

                         {/* <input type="text"/> */}


                         <ul>
                             {
                                 this.state.stories.map(story => {
                                    return(
                                        <div key={story._id}>
                                        <li><Link to={`/loginstory/${story._id}`}>{story.title}</Link></li>
                                        
                                        </div>
                                        
                                    )
                                 })
                             }
                         </ul>
                     </div>
                 ) 
             }

            <center><Link className="link_button" to="/stories/new">Add Story</Link></center> 

         </div>
           
        )
    }
}

export default ListStory