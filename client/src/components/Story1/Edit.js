import React from 'react'
import axios from '../../config/axios'
import StoryForm from './Form'

class EditShow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            story: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const { id } = this.props.match.params
        axios.get(`/stories/${id}`)
            .then(response => {
                this.setState(() => ({ story: response.data}))
            })
    }

    handleSubmit(formData) {
        axios.put(`/stories/${this.state.story._id}`, formData)
            .then(() => this.props.history.push(`/stories/${this.state.story._id}`))
            .catch(err => console.log(err))
    }
    render() {
        console.log('render - edit', this.state)
        return(
            <div>
                <h2 class="form-heading">Edit Contact</h2>
                <StoryForm
                story={this.state.story}
                handleSubmit={this.handleSubmit} />
            </div>
        )
    }
    
}

export default EditShow