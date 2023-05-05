'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';

const roles = {
  employee: 0b0001,
  responsable: 0b0010,
  funder: 0b0100,
  comptable: 0b1000,
};

const initialValues = {
  bitmask: 0b0000,
};

const validate = (values) => {
  const errors = {};
  if (values.bitmask === 0) {
    errors.bitmask = 'Please select at least one role';
  }
  return errors;
};

const CheckboxGroup = ({ label, name, options, values, setFieldValue }) => {
  return (
    <div className="flex flex-col">
      <label className="text-lg font-medium mb-2">{label}</label>
      <div role="group" aria-labelledby={name}>
        {options.map(option => (
          <label key={option.value} className="flex items-center mb-2">
            <Field
              type="checkbox"
              name={name}
              value={option.value}
              checked={(option.value & values[name]) !== 0}
              onChange={(event) => {
                const newValue = event.target.checked
                  ? values[name] | option.value
                  : values[name] & ~option.value;
                setFieldValue(name, newValue);
              }}
              className="mr-2"
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </div>
      <ErrorMessage name={name} component="div" className="text-red-500 mt-2" />
    </div>
  );
};

export default function Page() {
  const [bitmaskValue, setBitmaskValue] = useState(null);

  const handleSubmit = (values) => {
    let binaryValue = "";
    Object.keys(roles).forEach((role) => {
      if ((values.bitmask & roles[role]) !== 0) {
        binaryValue += "1";
      } else {
        binaryValue += "0";
      }
    });
    setBitmaskValue(binaryValue);
    console.log("Bitmask Value: ", binaryValue);
  };
  return (
    <div className="p-4">
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
        {({ values, setFieldValue }) => (
          <Form className="w-full max-w-sm">
            <CheckboxGroup
              label="Roles"
              name="bitmask"
              options={[
                { label: 'Employee', value: roles.comptable },
                { label: 'Responsable', value: roles.funder },
                { label: 'Funder', value: roles.responsable },
                { label: 'Comptable', value: roles.employee },
              ]}
              values={values}
              setFieldValue={setFieldValue}
            />
            <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </Form>
        )}
      </Formik>
      {bitmaskValue && <p className="mt-4">Selected roles: {bitmaskValue}</p>}
    </div>
  );
};
