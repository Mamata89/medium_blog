import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios'
import ReactHtmlParser from  'react-html-parser'
 import ResponseForm from '../response/response'
import Claps from '../Claps/claps'
class StoryShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            story: {},
            body:'',
            token:localStorage.getItem('token')
        }
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete() {
        const confirmDelete = window.confirm("Are you sure?")
        if(confirmDelete) {
            // api call to delete
            axios.delete(`/stories/${this.state.story._id}`)
                .then(() => this.props.history.push('/stories'))
                .catch(err => window.alert(err))
        }
    }
   
   
//     componentDidMount() {
//         const id = this.props.match.params.id
//         axios.get(`/stories/${id}`)
//        .then(response => this.setState(() => ({
//       story: response.data})))
// //  .then(response => console.log(response.data))
//     }

//     componentWillReceiveProps(nextprops){
//         console.log("Componer reviev props")
//     }

componentDidMount(){
    const id = this.props.match.params.id
    
    if(this.state.token){
        console.log('logged in ')
        axios.get(`story/loginstory/${id}`)
        .then(response => {
          
            
            this.setState(()=>({
                story : response.data
            }))
            //console.log(this.state.story)
        })
    }else{
        console.log('without logged in')
        axios.get(`story/${id}`)
        .then(response => {
            //console.log(response.data)

            this.setState(()=> ({
                story : response.data
            }))
        })

    }
  

}
    handleResponseSubmit = (data) => {
        const id = this.props.match.params.id
        console.log('from story', data)
        // // console.log("story details",story)
        const formData = {
        body:data.response
        }
        axios.post(`/responses/${id}`,formData)
        .then(response => this.setState(() => ({
            story: response.data})))
            .catch((err) => console.log(err))
        // .then(response => {
        //     this.props.history.push('/stories')
        //     console.log("from show page",response.data)           
        // })
        // .catch(err => console.log(err))
    }
    handleBookmark = (e) => {
        if(this.state.token){
            const  story_id =  {
                id : this.state.story._id
              }
              console.log(story_id)
                axios.post('/users/bookmark' , story_id)
                    .then(response => console.log(response.data))
                    .catch(err => console.log(err))
        }else{
            window.alert('LOGIN to Medium !!:)')
        }
    
    }

     handleFollow = () => {
        if(this.state.token){
            const user_id ={
                id : this.state.story.user._id
            } 
            axios.post('/users/follow' , user_id)
                .then(response => console.log(response.data))
                .catch(err => console.log(err))
        }else{
            window.alert('Login to our Medium App')
        }
     }
    render() {
    console.log("show page111",this.state.story)
        // console.log("tag valeu",this.state.story.tag)
        
        // // console.log("tag valeu with tags",this.state.story.tag.tags)
       
        // console.log(html, 'body')
     
        const html=this.state.story.body
        return (
            <div  className="edit">
             {/* {
        this.state.token ? <p> token is present</p> : <p> Tken is not present</p>
      } */}
            
           <h2>Title -{this.state.story.title} </h2>
           <p>Author -{this.state.story.user && this.state.story.user.username}</p>
           <p>Following -{this.state.story.user && this.state.story.user.following.length}</p>
           <p>Followers -{this.state.story.user && this.state.story.user.followers.length}</p>
           <p>CreatedAt -{this.state.story.createdAt} </p>
           <img src={this.state.story && this.state.story.storyImage}/>
                <div>Body -{ReactHtmlParser(html)}  </div>

                {/* <ResponseList storyId={this.props.match.params.id}/> */}
                
                {/* <p>Author -{this.state.story.user ? this.state.story.user.username : null} </p>
                <p>Topic -{this.state.story.topic ? this.state.story.topic.name : null} </p> */}



                
<p>Topic -{this.state.story.topic ? this.state.story.topic.name : null} </p> 
                <ul>
                {<p>tag : {this.state.story.tag && this.state.story.tag.map(tag => {
                   return <li key= {tag._id}>{tag.tag}</li>
               }) }</p> }
                </ul>
               


               <ResponseForm handleResponseSubmit={this.handleResponseSubmit} storyId={this.props.match.params.id} story={this.state.story}/>
                <div>
                <button onClick={this.handleDelete}>
                Delete
                </button><br/>
                 <Claps />

                 <button onClick={this.handleFollow}>Follow</button>

                 <button onClick={this.handleBookmark}>Bookmark</button>
               
                <div className="container">
        <h1>File Upload</h1>

     
     
                
    </div>
              
               {this.state.token ?<div> <Link to={`/stories/edit/${this.state.story._id}`}>Edit</Link>
                <Link to='/stories'>BACK</Link> </div> : false}
                </div>
            </div>
        )
    }

}

export default  StoryShow