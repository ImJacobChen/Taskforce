import React from 'react';
import fire from '../../fire';
import './SignUpLogin.css';

class SignUpLogIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signUpEmail: '',
            signUpPassword: '',
            signUpError: null,

            logInEmail: '',
            logInPassword: '',
            logInError: null
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
        var self = this;
        fire.auth().createUserWithEmailAndPassword(this.state.signUpEmail, this.state.signUpPassword).then(function(){
            self.setState({signUpError: null})
        }).catch(function(error) {
            self.setState({signUpError: error.message})
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
        var self = this;
        fire.auth().signInWithEmailAndPassword(this.state.logInEmail, this.state.logInPassword).then(function(){
            self.setState({logInError: null})
        }).catch(function(error) {
            self.setState({logInError: error.message})
        });
        event.preventDefault();
    }

    render() {
        return (
            <div className='signUpLogin'>
                <div className="header">
                    <h1>Taskforce</h1>
                </div>

                <h1>Please sign up or in</h1>
                
                <div className="signUpField">
                    <h2>Sign Up</h2>
                    <form onSubmit={this._onSignUpFormSubmit}>
                        {(this.state.signUpError) 
                            ? <div class='logInField__error'>{this.state.signUpError}</div>
                            : ''
                        }
                        <input type="email" placeholder="Your email" value={this.state.signUpEmail} onChange={this._onSignUpEmailChange} />
                        <input type="password" placeholder="Password" value={this.state.signUpPassword} onChange={this._onSignUpPasswordChange} />
                        <button>Sign up</button>
                    </form>
                </div>
                
                <div className="logInField">
                    <h2>Log In</h2>
                    <form onSubmit={this._onLogInFormSubmit}>
                        {(this.state.logInError) 
                            ? <div class='logInField__error'>{this.state.logInError}</div>
                            : ''
                        }
                        <input type="email" placeholder="Your email" value={this.state.logInEmail} onChange={this._onLogInEmailChange} />
                        <input type="password" placeholder="Password" value={this.state.logInPassword} onChange={this._onLogInPasswordChange} />
                        <button>Log In</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUpLogIn;