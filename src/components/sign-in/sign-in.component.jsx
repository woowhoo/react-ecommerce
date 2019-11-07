import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { setCurrentUser } from '../../redux/user/user.actions';
import { user } from '../../utils/user/user.component';

import { Auth } from "aws-amplify";


import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;
    try {

      const currentUser = await user.login(email, password);
      // const currentUser = await Auth.signIn(email, password);

      this.setState({ email: '', password: ''})
      this.props.setCurrentUser(currentUser);

    } catch (error) {
      console.error(error)
    }


  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value })
  }

  render() {
    return(
      <div className='sign-in'>
        <h2>I already have an acccount</h2>
        <span>Sign in with your email and password.</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput name='email' type='email' handleChange={this.handleChange} value={this.state.email} label='email' required />
          <FormInput name='password' type='password' handleChange={this.handleChange} value={this.state.password} label='password' required />

          <div className='buttons'>
            <CustomButton type='submit'> Sign In </CustomButton>
            <CustomButton onClick={console.log()} isGoogleSignIn>
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(SignIn);
