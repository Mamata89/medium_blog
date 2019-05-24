import React from 'react' 
import axios from '../../config/axios'
import StoryForm from './Form'

class StoryNew extends React.Component {
    constructor(){
        super() 
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formData) {
        console.log('contact new component')
        axios.post('/stories', formData)
            .then(() => this.props.history.push('/stories'))
            .catch(err => console.log(err))
    }

    render(){
        return (
            <div>
               <center><h2 className="form-heading">Add Contact</h2></center> 
                <StoryForm handleSubmit={this.handleSubmit} /> 
            </div>
        )
    }
}

export default StoryNew