import React, { Component } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import api from '../../services/api'
import { login } from '../../services/auth'
import './style.css'

class Login extends Component {
  render() {
    return (
      <div>
        <div className="login-container">
          <div className="login-wrapper">
            <div className="logo-box">
              <div className="logo">
              </div>
            </div>
            <div className="login-box">
              <div className="login-form">
                <Formik
                  initialValues={{
                    username: '',
                    pincode: '',
                  }}

                  validate={values => {
                    let errors = {}
                    if (!values.username) {
                      errors.username = 'Username is required'
                    } else if (!values.pincode) {
                      errors.pincode = 'Pincode field is empty'
                    }
                    return errors
                  }}

                  onSubmit={async (values, actions) => {
                    actions.setStatus({
                      success: 'Login...',
                      css: 'success'
                    })
                    actions.setSubmitting(false)
                    try {
                      const response = await api.post('/auth/login', {
                        username: values.username,
                        pincode: values.pincode,
                      })
                      login(response.data.token)
                      this.props.history.push("/")
                    } catch (err) {
                      actions.setStatus({
                        success: 'Username or Pincode incorrect !',
                        css: 'error'
                      })
                    }

                  }}
                  render={x => (
                    <Form>
                      <div className="form-item">
                        <Field name='username' type='text' placeholder='Username' />
                      </div>
                      <div className="form-item">
                        <Field name='pincode' type='password' placeholder='Pincode' />
                      </div>
                      <ErrorMessage name='username' className='field-validation' component='div' />
                      <ErrorMessage name='pincode' className='field-validation' component='div' />
                      <div className={`form-sending ${x.status ? x.status.css : ''}`}>
                        {x.status ? x.status.success : ''}
                      </div>
                      <div className="form-item">
                        <button type='submit' disabled={x.isSubmitting}>Login</button>
                      </div>
                    </Form>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login