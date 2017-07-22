import React from 'react';
import fire from '../../fire';

class SignUpLogIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signUpEmail: '',
            signUpPassword: '',
            logInEmail: '',
            logInPassword: ''
        };
        
        this._onSignUpEmailChange = this._onSignUpEmailChange.bind(this);
        this._onSignUpPasswordChange = this._onSignUpPasswordChange.bind(this);
        this._onSignUpFormSubmit = this._onSignUpFormSubmit.bind(this);

        this._onLogInEmailChange = this._onLogInEmailChange.bind(this);
        this._onLogInPasswordChange = this._onLogInPasswordChange.bind(this);
        this._onLogInFormSubmit = this._onLogInFormSubmit.bind(this);
    }

    _onSignUpEmailChange(event) {
        this.setState({signUpEmail: event.target.value});
    }

    _onSignUpPasswordChange(event) {
        this.setState({signUpPassword: event.target.value});
    }

    _onSignUpFormSubmit(event) {
        fire.auth().createUserWithEmailAndPassword(this.state.signUpEmail, this.state.signUpPassword).catch(function(error) {
          console.log(error);
        });
        event.preventDefault();
    }

    _onLogInEmailChange(event) {
        this.setState({logInEmail: event.target.value});
    }

    _onLogInPasswordChange(event) {
        this.setState({logInPassword: event.target.value});
    }

    _onLogInFormSubmit(event) {
        fire.auth().signInWithEmailAndPassword(this.state.logInEmail, this.state.logInPassword).catch(function(error) {
          console.log(error);
        });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Please sign up or in</h1>

                <h2>Sign Up</h2>
                <form onSubmit={this._onSignUpFormSubmit}>
                <input type="email" placeholder="Your email" value={this.state.signUpEmail} onChange={this._onSignUpEmailChange} />
                <input type="password" placeholder="Password" value={this.state.signUpPassword} onChange={this._onSignUpPasswordChange} />
                <button>Sign up</button>
                </form>

                <h2>Log In</h2>
                <form onSubmit={this._onLogInFormSubmit}>
                <input type="email" placeholder="Your email" value={this.state.logInEmail} onChange={this._onLogInEmailChange} />
                <input type="password" placeholder="Password" value={this.state.logInPassword} onChange={this._onLogInPasswordChange} />
                <button>Log In</button>
                </form>
            </div>
        );
    }
}

export default SignUpLogIn;