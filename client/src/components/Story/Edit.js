import React from 'react'
import axios from '../../config/axios'
import Form from './Form';


class StoryEdit extends React.Component{
   
    constructor(props){
        console.log("constructore edit")
        super(props)
        this.state = {
            story : {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        console.log('render- edit' , this.state)
        const id  = this.props.match.params.id
        axios.get(`/stories/${id}`)
            .then((response) => { this.setState(() => ({ story : response.data}))
        })
          //  .then(response => console.log(response.data))
            
    }

    handleSubmit(formData){
        axios.put(`/stories/${this.state.story._id}` , formData)
            .then(() => this.props.history.push(`/stories/${this.state.story._id}`))
            .catch(err => console.log(err))
    }
    render(){
        console.log('render- edit' , this.state)
        return(
            <div>
                <h2>Edit Contact</h2>
                <Form story = {this.state.story}
                handleSubmit = {this.handleSubmit}/>
            </div>
        )   
    }
    
}
export default StoryEdit