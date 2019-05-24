
import React, { Component } from 'react';
import { EditorState , convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Topic from '../topic/topic'
 import Tag from '../tags/tags'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html';

import { unemojify } from 'node-emoji';


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      topic : '',
      tag : [],
      title : '',
      body:'',
      storyImage:null
      

    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleTopicChange = this.handleTopicChange.bind(this)
    this.handleTagsChange = this.handleTagsChange.bind(this)
    //this.handleEditorChange = this.handleEditorChange.bind(this)
  }

  onEditorStateChange(editorState){
    //console.log(this.props)
      // const { onChange, value } = this.props;
  
      //  const change = this.props.change
      //  const value = this.props.value
      //  console.log(change)
      //  console.log(props)

      const newValue = unemojify(
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
        console.log(newValue, "newValue")
     
      this.setState({
        editorState, body: newValue
      });
    };
  
    componentWillReceiveProps(nextprops){
      console.log("netpropsvalue",nextprops)
      const {title , topic, body} = nextprops.story
     
      var topicData = (topic ? topic._id : null)
    
      console.log(topic)
      console.log(title)
      this.setState( () => ({

        title,
        body,
        topic:topicData
      }))
  }
  handleChange(e){
      e.persist()
      this.setState(()=> ({
          [e.target.name] : e.target.value
      }))
  }

  handleFile = (e) =>{
    e.persist()
    this.setState(()=> ({
      storyImage : e.target.files[0]
    }))
}
  handleTagsChange(tag){
    // console.log(typeof(tag))
    // console.log(tag)
    this.setState(() =>({tag}))
  }

  handleTopicChange(topic){
    this.setState(()=>({topic}))
  }

  handleSubmit = (e) => {
    e.preventDefault()
  var  formData = {
      title : this.state.title,
      tag : this.state.tag,
      topic : this.state.topic,
      body : this.state.body,
      storyImage : this.state.storyImage
      
    }

    var formData = new FormData()
    formData.append('title', this.state.title)

    formData.append('body', this.state.body)
    formData.append('topic', this.state.topic)
    formData.append('tag', this.state.tag)
    formData.append('storyImage', this.state.storyImage, this.state.storyImage.name)
    console.log("from form.js file",formData)
  
   this.props.handleformSubmit(formData)
   this.setState(() => ({
    title : '',
    description : '',
    body : '',
    topic :'',
    tag :'',
    storyImage : null
    }))
  }

  render() {
    const { editorState } = this.state;
    return (
        <div>
        <form onSubmit = {this.handleSubmit}>
            <div>
                <label>
                    Title
                    <input type = "text"value = {this.state.title} name = "title" onChange = {this.handleChange}/>
                </label><br/>
       
                            <label><Topic
                              topic ={this.state.topic}
                             handleTopicChange={this.handleTopicChange}/></label>  <br/>
                             
               <label> <Tag handleTagsChange={this.handleTagsChange}/></label><br/>
            Body :
        <input type="file" name="storyImage" onChange={this.handleFile}/>
            
                {/* <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}
                />
                <textarea
                  disabled
                  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                /> */}
                {/* <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                /> */}


<Editor
            editorStyle={{
              padding: '0 10px',
            }}
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
          />

                <input type = "submit"/>
            </div>
      </form>
      </div>
    )
  }
}

export default  Form