import React from 'react'
import axios from '../../config/axios';

class ResponseForm extends React.Component{
    constructor(props){
  
        super(props)
        this.state={
            response : '',
            responses : [],
            token:localStorage.getItem('token')


          
        }

       console.log("show page",this.props.story)
    }
    handleChange = (e) => {
        if(this.state.token){
            e.persist()
            this.setState(()=> ({
                [e.target.name] : e.target.value
            }))
        }else{
            window.alert("Please Login  to add")
        }
        
    }
    
   
    componentDidMount(){
        const id =this.props.storyId
        axios.get(`/responses/${id}`)
        .then(response => this.setState(() => ({
            responses: response.data})))
            .catch((err) => console.log(err))
            
    }
    handleResponseSubmit = (e) => {
        e.preventDefault()
        console.log("handle Submit clicked")
        const formData={
            response:this.state.response,
          
        }
        console.log("response form",formData)
       this.props.handleResponseSubmit(formData)
    }

    render(){
        // console.log("story",this.state.story.id)
        return(
            <div>
                 <h2>List Response</h2>
           
           <ul>
           {
               this.state.responses.map(response => {
                   console.log(response.user.username)
                   return(
                       <li key={response._id}>{response.body}---{response.user && response.user.username}</li>
                   )
               })
           }
           </ul>
                <form onSubmit={this.handleResponseSubmit}>
                <label>
                   Response
                    <input type = "text" value = {this.state.response} name = "response" onChange = {this.handleChange}/>
                </label><br/>
                <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default ResponseForm