import React from 'react'
import axios from 'axios'


class Topic extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            topics : [],
             topicvalue: '',
             
        }
        this.selectChange=this.selectChange.bind(this)
    }
    componentDidMount(){
        axios.get('http://localhost:3005/topics')
            .then((response) => {
                this.setState(()=>({
                    topics : response.data
                }))
            })
    }

    componentWillReceiveProps(nextprops){
        const topic = nextprops.topic

        this.setState(()=>({
            topicvalue : topic
        }))
    }
    selectChange(e){
        const topicvalue = e.target.value
       console.log("topic valeu=",e.target.value)
        this.setState(() => ({
            topicvalue
        }))
        this.props.handleTopicChange(topicvalue)
        
    }

    // topic = this.props.handleTopicChange(topic)
    render(){
        return(
            <div>
               
            <label>
                Select a Topic
                <select onChange={this.selectChange} value={this.state.topicvalue}>
                <option value = "">{this.state.topic ? this.state.topic:'select'}</option>
                    {this.state.topics.map(topic => {
                        return(
                            <option key = {topic._id} value ={topic._id}>{topic.name}</option>
                        )
                    })}
                </select>
            </label>
    
            
            </div>
        )
    }
}
export default Topic