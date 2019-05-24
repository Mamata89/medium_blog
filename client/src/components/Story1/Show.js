import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios'

class StoryShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            story: {}
        }
        this.handleDelete = this.handleDelete.bind(this)
    }y

    handleDelete() {
        const confirmDelete = window.confirm("Are you sure?")
        if(confirmDelete) {
            // api call to delete
            axios.delete(`/stories/${this.state.contact._id}`)
                .then(() => this.props.history.push('/stories'))
                .catch(err => window.alert(err))
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/stories/${id}`)
            .then(response => this.setState(() => ({ story: response.data})))
    }

    render() {
        return (
            <div  className="edit">
                <p>Title -{this.state.story.title} </p>
                <p>Body -{this.state.story.body} </p>
                <p>CreatedAt -{this.state.story.createdAt} </p>
                <p>Topic -{this.state.story.topic} </p>
               
                <button onClick={this.handleDelete} className="icon-button">
                        DELETE
                </button>

                 <Link to={`/stories/edit/${this.state.story._id}`}>Edit</Link>
                <Link to='/stories'>BACK</Link> 
                
                
            </div>
        )
    }

}

export default StoryShow