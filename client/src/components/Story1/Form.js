import React from 'react' 

class StoryForm extends React.Component {
    constructor(props) {

        super(props) 
        this.state = {
           title:'',
           body:'',
           createdAt:'',
           topic:''
        }
        // bind methods, sets the context of the this keyword
        this.handleBodyChange = this.handleBodyChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this) 
    }

    componentWillReceiveProps(nextProps){
            console.log(`component will receive `,nextProps )
            const { title,body,createdAt,topic} = nextProps.story
            this.setState( () => ({
                title,
                body,
                createdAt,
                topic,
                notice:'successfully Registered, taking you to login screen'
            }))
    }
    // es6 arrow function
    handleTitleChange = (e) => {
        const title = e.target.value 
        // console.log(this) 
        this.setState(() => ({ title }))
    }

    // es6 function - bind in constructor
    handleBodyChange(e) {
        const body= e.target.value 
        // console.log(this)
        this.setState(() => ({ body }))
    }

    // es6 function - bind when calling the function
    handlecreatedAtChange(e) {
        const createdAt = e.target.value 
        this.setState(() => ({ createdAt }))
    }


    handletopicChange(e) {
        const topic = e.target.value 
        this.setState(() => ({ topic }))
    }
    handleSubmit(e) {
        e.preventDefault() 
        const formData = {
            title: this.state.title, 
            body: this.state.body, 
            createdAt: this.state.createdAt,
            topic: this.state.topic
        }
        this.props.handleSubmit(formData)

        // clear form 

        this.setState(() => ({ 
            title: '', body: '',createdAt: '',topic:''
        }))
      
    }

    render() {
        return (
            <div className="form_class">
            
                <form onSubmit={this.handleSubmit} className="form_class_div">
              
                <label>
                <span className="name-span"> Title</span>
                        <input type="text" value={this.state.title} onChange={this.handleTitleChange} /> <span className="fa fa-user errspan"></span>
                    </label> <br/> 
                    

                    <label>
                    <span className="mob-span"> Body </span>
                        <input type="text" value={this.state.body} onChange={this.handleBodyChange} />
                        <span className="fa fa-phone errspan"></span>
                    </label> <br /> 

                    <label>
                    <span className="mob-span"> createdAt </span>
                        <input type="text" value={this.state.createdAt} onChange={this.handlecreatedAtChange} />
                        <span className="fa fa-phone errspan"></span>
                    </label> <br /> 

                    <label>
                    <span className="mob-span"> topic </span>
                        <input type="text" value={this.state.topic} onChange={this.handletopicChange} />
                        <span className="fa fa-phone errspan"></span>
                    </label> <br /> 

                   <center> <input type="submit" className="link_button" /> </center>
                </form> 
            </div>
        )
    }
}

export default StoryForm