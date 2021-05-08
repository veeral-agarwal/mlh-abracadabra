import React, {Component} from 'react';
import axios from 'axios';
// import React, {Component} from 'react';
// import axios from 'axios';
import bcrypt from 'bcryptjs';
// import TextField from 'material-ui/TextField';
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import Paper from 'material-ui/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { LocalActivity, Refresh } from '@material-ui/icons';


export default class Profileedit_recruiter extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            
            name:'',
            list_of_languages:'',
            education: [],
            institution:'',
            startyear:'',
            endyear:'',
            image:'',
            cv:''
            // contact_number:'',
           
        }
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangelist_of_languages = this.onChangelist_of_languages.bind(this);
        this.onChangeimage = this.onChangeimage.bind(this);
        this.onChangecv = this.onChangecv.bind(this);
        this.onChangeinstitution = this.onChangeinstitution.bind(this);
        this.onChangestartyear = this.onChangestartyear.bind(this);
        this.onChangeendyear = this.onChangeendyear.bind(this);
        this.onSubmitEdu = this.onSubmitEdu.bind(this);
        this.onChangename = this.onChangename.bind(this);
    }
    
    onChangelist_of_languages(event) {
        this.setState({ list_of_languages: event.target.value });
    }

    onChangeimage(event) {
        this.setState({ image: event.target.value });
    }

    onChangecv(event){
        this.setState({cv : event.target.value});
    }

    onChangestartyear(event){
        this.setState({startyear : event.target.value});
        
    }

    onChangeinstitution(event){
        this.setState({institution : event.target.value});
    }

    onChangeendyear(event){
        this.setState({endyear : event.target.value});
    }

    onChangename(event){
        this.setState({name: event.target.value});
    }

    componentDidMount()
    {   
        console.log(localStorage)
        var mail=localStorage.getItem("user_email")
        console.log(mail)
        axios.post('http://localhost:4000/applicant/get_an_applicant_by_email',{"applicant_ka_email":mail})
        .then(res => {this.setState({user:res.data})
        console.log(this.state.user)
        this.setState({name:this.state.user.name})
        this.setState({email:this.state.user.email})
        this.setState({education:this.state.user.education})
        this.setState({list_of_languages:this.state.user.list_of_languages})
     

    })
   
    };


    onSubmit(e) {
        e.preventDefault();
        console.log("lol")
        this.setState({
        education : {
            "institution":this.state.institution,
            "startyear":this.state.startyear,
            "endyear":this.state.endyear
        }})
        const newrec = {
            list_of_languages:this.state.list_of_languages,
            education: this.state.education,
            email: localStorage.getItem('user_email'),
            image:this.state.image,
            cv:this.state.cv,
            name:this.state.name
        }

        // console.log(newJob);
        console.log(localStorage.getItem('user_type'));
        console.log(localStorage.getItem('isloggedin'));
        if(localStorage.getItem('user_type') !== 'applicant' || localStorage.getItem('isloggedin') !== 'true'){
            alert("please login first");
            this.props.history.push("/");
            window.location.reload();
        }       
        else{
            console.log(newrec);
            // if(this.state.contact_number.length === 10 && this.state.bio.split(' ').length < 251){
                axios.post('http://localhost:4000/applicant/edit_applicant_profile',newrec)
                .then(res => {
                    alert("profile successfully edited");
                    console.log(res.data)
                })
                .catch(function(error) {
                    console.log(error);
                })
                axios.post('http://localhost:4000/user/updateuser',newrec)
                .then(res => {
                    
                    console.log(res.data)
                    localStorage.setItem('user_name', this.state.name);
                    console.log(localStorage)
                })
                .catch(function(error) {
                    console.log(error);
                })
        }
        this.setState({
           
            list_of_languages:'',
            education: [],
            institution:'',
            startyear:'',
            endyear:'',
            image:'',
            cv:'',
            // contact_number:'',
            name:''
        });
    }

    onSubmitEdu(e){
        e.preventDefault();
        const obj = {
            institution: this.state.institution,
            startyear: this.state.startyear,
            endyear: this.state.endyear
        }

        if(this.state.institution === '' || this.state.startyear === ''){
            alert("you cannot leave institution and startyear feild empty.")
        }
        else{
            let e1 = this.state.education;
            e1.push(obj);
            this.setState({
            education: e1,
            institution: '',
            startyear: '',
            endyear: ''
        });
        }
        
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label>name : </label>
                    <input type="text" 
                        className="form-control" 
                        value={this.state.name}
                        onChange={this.onChangename}
                    />
                    <label>languages that you are comfortable in : </label>
                    <input type="text" 
                        className="form-control" 
                        value={this.state.list_of_languages}
                        onChange={this.onChangelist_of_languages}
                    />
                    <form onSubmit={this.onSubmit} >
                        <div className="form-group">
                            <h3>add education</h3>
                            <label>Institution: </label>
                            <input type="text" 
                               className="form-control" 
                               value={this.state.education.length ==0 ? console.log("yes"):this.state.education[0].institution}
                               onChange={this.onChangeinstitution}
                            />  
                            <label>Start Year: </label>
                            <input type="date" 
                            className="form-control" 
                            value={this.state.education.length ==0 ? console.log("yes"):this.state.education[0].startyear}
                            onChange={this.onChangestartyear}
                            />
                            <label>End Year: </label>
                            <input type="date" 
                               className="form-control" 
                               value={this.state.education.length ==0 ? console.log("yes"):this.state.education[0].endyear}
                               onChange={this.onChangeendyear}
                            />
                            <div className="form-group">
                            <div className="form-group">
                                <input type="submit" value="ADD" className="btn btn-primary" onClick={this.onSubmitEdu}/>
                            </div>
                            <label>Select profile photo:</label>
                            {/* <br></br>
                            <br></br> */}
                                <input
                                    type="file"
                                    onChange={this.onChangeimage}
                                    // value={this.state.image}
                                    id="image"
                                    name="image"
                                ></input>
                            </div>
                            <div className="form-group">
                            <label>upload cv</label>
                            {/* <br></br>
                            <br></br> */}
                                <input
                                    type="file"
                                    onChange={this.onChangecv}
                                    // value={this.state.image}
                                    id="file"
                                    name="file"
                                ></input>
                            </div>
                            <div className="form-group">
                                <input type="submit" value="update profile" className="btn btn-primary"/>
                            </div>
                            
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}