import React from 'react'
import axios from '../../config/axios'
import ReactHtmlParser from 'react-html-parser'
import ResponseForm from '../response/response'


class BookmarkShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            story : {}
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/stories/${id}`)
            .then(response => {
                this.setState(()=> ({
                    story : response.data
                    
                }))
                console.log(this.state.story)
            })
            .catch(err => console.log(err))    
    }
    render(){
        var html = this.state.story.body  
        return(
         
            <div>
                <h2>Show story here..</h2>
                <h4>  Title :  {this.state.story.title}</h4>
                          {/* <h4>  body : {this.state.story.body}</h4> */}
                           <h4>  body : {ReactHtmlParser(html)}</h4>
                            <h5> Author :  {this.state.story.user ? this.state.story.user.userName : null}</h5>
                            <h4> Topic :{this.state.story.topic ? this.state.story.topic.name : null}</h4>
                            <h4>tag : 
                            {this.state.story.tag ? this.state.story.tag.map(tag => {
                                return  <li key = {tag._id}>{tag.name}</li>
                            }) : null }
                            </h4>
                            <ResponseForm story = {this.state.story}
                            handleResponseSubmission = {this.handleResponseSubmission}
                            />
            </div>
        )
    }
}

export default BookmarkShow