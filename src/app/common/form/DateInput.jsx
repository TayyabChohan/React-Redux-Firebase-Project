import React from 'react'
import { Form, label } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
const DateInput = ( {input:{value, onChange, ...restInput}, width, placeholder, meta:{touched, error},...rest} ) => {
  return (
    
    <Form.Field error={touched && !! error} width={width} >
    <DatePicker
    {...rest}
    placeholderText={placeholder}
    selected={value ? moment(value) :null}
    onChange={onChange}
    {...restInput}

    />
     { touched && error && <label basic color='red'>{error} </label>}
    </Form.Field> 
    
  )
}

export default DateInput
