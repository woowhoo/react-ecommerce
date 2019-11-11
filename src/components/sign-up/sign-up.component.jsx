import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { setCurrentUser } from '../../redux/user/user.actions';
import { user } from '../../utils/user/user.component';

import { Auth } from "aws-amplify";

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       displayName: '',
       email: '',
       password: '',
       confirmPassword: '',
       verificationCode: '',
       showVerification: false
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword, verificationCode, showVerification } = this.state;

    if(password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if(showVerification == false) {

      const currentUser = await Auth.signUp({
        username: email,
        password: password
      });

      this.setState({
        displayName: displayName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        verificationCode: verificationCode,
        showVerification: true
      });
      return;
    }

    try {

      // const currentUser = await user.register(email, password);
      console.log(verificationCode);
      const currentUser = await Auth.confirmSignUp(email, verificationCode)

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        verificationCode: '',
        showVerification: false
      });

      this.props.setCurrentUser(currentUser);

    } catch (error) {
      console.error(error)
    }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { displayName, email, password, confirmPassword, verificationCode, showVerification } = this.state;
    return(
      <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput type='text' name='displayName' value={displayName} onChange={this.handleChange} label='Display Name' required />
          <FormInput type='email' name='email' value={email} onChange={this.handleChange} label='Email' required />
          <FormInput type='password' name='password' value={password} onChange={this.handleChange} label='Password' required />
          <FormInput type='password' name='confirmPassword' value={confirmPassword} onChange={this.handleChange} label='Confirm Password' required />
          {showVerification ? (
            <FormInput type='text' name='verificationCode' value={verificationCode} onChange={this.handleChange} label='Verification Code' required />
          ):(null)}
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(SignUp);
