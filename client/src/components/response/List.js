import React from 'react'
import axios from '../../config/axios';

class ResponseList extends React.Component{
    constructor(props){
        console.log(props)
        super(props)
        this.state={
            responses : []
    }

}
 
componentDidMount(){
    const id =this.props.storyId
    axios.get(`/responses/${id}`)
    .then(response => this.setState(() => ({
        responses: response.data})))
        .catch((err) => console.log(err))
        
}
 
render(){
        return(
            <div>
            <h2>List Response</h2>
           
                <ul>{
                    this.state.responses.map(response => {
                        return(
                            <li key={response._id}>{response.body}</li>
                        )
                    })
                }
                </ul>

            </div>
        )
       

    }
}

export default ResponseList