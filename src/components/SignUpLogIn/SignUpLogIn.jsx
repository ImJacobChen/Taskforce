import 'react' from React;

class SignUpLogIn extends React.Component {
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

                <h2>Sign in</h2>
                <form>
                <input type="text" placeholder="Your username" />
                <input type="password" placeholder="Password" />
                <button>Sign up</button>
                </form>
            </div>
        );
    }
}

export default SignUpLogIn;