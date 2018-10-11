import React from 'react'
import {  Form,Select} from 'semantic-ui-react'
const SelecteInput = ({input,type,placeholder,options,multiple,meta:{touched,error}}) => {
  return (
    <Form.Field>
      <Select
      value={input.value || null}
      onChange={(e,data)=>input.onChange(data.value)}
      placeholder={placeholder}
      options={options}
      multiple={multiple}
      />
    </Form.Field>
  )
}

export default SelecteInput
