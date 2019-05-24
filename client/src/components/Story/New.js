import React from 'react' 
import axios from '../../config/axios'
import Form from './Form'

class StoryNew extends React.Component {
    constructor(props){
        super(props) 
        this.state={
            tag:[]
        }
        this.handleformSubmit = this.handleformSubmit.bind(this)

    }

    handleformSubmit(formData) {
  
        console.log(formData)
        axios.post('/stories', formData)
            .then((response) => {
                //console.log(response.data)
                this.props.history.push('/stories')})
            .catch((err)=>console.log(err))
        //    .then(response => {
        //        console.log(response.data.tag)
        //     })
    }



    

    render(){
        return (
            <div>
               <center><h2 className="form-heading">Add Story</h2></center> 
                <Form  handleformSubmit={this.handleformSubmit} onChange={this.props}/> 
            </div>
        )
    }
}

export default StoryNew