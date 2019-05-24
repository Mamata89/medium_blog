import React from 'react'
import axios from '../../config/axios';


class Logout extends React.Component{
    constructor(props){
       
        super(props)
      
        this.state={
            users:[]
        }
        
       
    }

    componentDidMount(){
    
        axios.delete('/users/logout')
        .then(response => console.log(response.data))
    }


    render(){
        return(
            <div>
                <h2> Logout</h2>

            </div>
        )
    }
}

export default Logout