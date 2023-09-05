import React from 'react';

//make two functions for signin, an email state and a password state
//make a button submit function that fetches the given email and password

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInpassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInpassword: event.target.value})
    }

    onSubmitSignIn = (event) => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInpassword
            })
        }).then(response => response.json()).then(user => {
            if(user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
    }

    render() {
        const {onRouteChange} = this.props;
        return (
            <article className="shadow-5 br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                <main className="pa4 black-80">
                        <div>
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                            </div>
                            </fieldset>
                            <div className="">
                            <input onClick={() => this.onSubmitSignIn('home')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                            </div>
                            <hr className="mt3" style={{border: '1px solid black'}}></hr>
                            <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('signup')} href="#0" className="f6 link dim black db">Sign up</p>
                            </div>
                        </div>
                </main>
            </article>
        )
    }
}

export default SignIn;