import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field , reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { connect } from 'react-redux'
import { registerUser } from '../AuthActions'
import { combineValidators, isRequired } from 'revalidate'
import SocialLogin from '..//SocialLogin/SocialLogin'
const actions={
  registerUser
}

const validate=combineValidators({
  displayName:isRequired('Display Name'),
  email:isRequired('Email'),
  password:isRequired('password')
})
const RegisterForm = ({handleSubmit , registerUser , error ,invalid, submitting}) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {error && <Label basic color='red'>{error}</Label>}
          <Button disabled={invalid || submitting} fluid size="large" color="teal">
            Register
          </Button>
          <Divider horizontal>
          or
        </Divider>
        <SocialLogin/>
        </Segment>
      </Form>
    </div>
  );
};

export default connect(null, actions)(reduxForm({form:'RegisterForm', validate })(RegisterForm));