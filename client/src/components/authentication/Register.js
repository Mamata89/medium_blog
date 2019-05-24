import React from 'react'
import axios from 'axios'

class UserRegister extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            email:'',
            password:'',
            notice:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }



    handleSubmit(e){
        e.preventDefault()
        const formData = {
            username : this.state.username,
            email: this.state.email,
            password: this.state.password
        }

         //todo client side validation

        axios.post('http://localhost:3005/users/register', formData)
            .then(()=>{
                this.setState( () => ({
                    username: '',
                    email:'',
                    password:'',
                    notice:'successfully Registered, taking you to login screen'
                }))
                setTimeout(() => {
                    this.props.history.push('/users/login')
                }, 2000);
            })
            .catch(err => console.log(err))
    }

    handleChange(e){
        e.persist()
        this.setState(() =>({
            [e.target.name] : e.target.value
        }))
    }
   
    render(){
        return(
            <div className="form_class">
                <h2 className="regiser-heading">Register With us </h2>
                { this.state.notice && <p className="succes_notice">{this.state.notice}</p>}
                <form onSubmit={this.handleSubmit} className="form_class_register">

                <input type="text" value={this.state.username} onChange={this.handleChange} name="username" placeholder="Enter Username"/><span className="fa fa-user errspan"></span><br/>

                <input type="text" value={this.state.email} onChange={this.handleChange}  name="email" placeholder="Enter Email"/><span className="fa fa-envelope errspan"></span><br/>

               <input type="password" value={this.state.password}
                 onChange={this.handleChange}  name="password" placeholder="Enter Password"/><span className="fa fa-lock errspan"></span><br/>

                 <input type="submit" className="register_name"/>
                </form>
              
            </div>
        )
    }
}

export default UserRegister