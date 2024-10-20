import validate from 'validate.js';

export const constraints = {
  name: {
    presence: {
      allowEmpty: false,
      message: '^Name is required',
    },
  },
  email: {
    presence: {
      allowEmpty: false,
      message: '^Valid email is required',
    },
    email: {
      message: '^Valid email is required',
    },
  },
  phone: {
    presence: {
      allowEmpty: false,
      message: '^Valid phone is required',
    },
  },
  amount: {
    presence: {
      allowEmpty: false,
      message: '^Amount is required',
    },
  },

  password: {
    presence: {
      allowEmpty: false,
      message: '^Password must contains 8 letters or more!',
    },
    length: {
      minimum: 8,
      tooShort: 'must contains %{count} letters or more!',
    },
  },
  newPassword: {
    presence: {
      allowEmpty: false,
      message: '^Password must contains 8 letters or more!',
    },
    length: {
      minimum: 8,
      tooShort: 'must contains %{count} letters or more!',
    },
  },
  confirmPassword: {
    presence: {
      allowEmpty: false,
      message: '^Password must contains 8 letters or more!',
    },
    length: {
      minimum: 8,
      tooShort: 'must contains %{count} letters or more!',
    },
  },
  payCheck: {
    presence: {
      allowEmpty: false,
      message: '^Paycheck is required',
    },
  },
  date: {
    presence: {
      allowEmpty: false,
      message: '^Date is required',
    },
  },
  saving: {
    presence: {
      allowEmpty: false,
      message: '^Saving is required',
    },
  },
  frequency: {
    presence: {
      allowEmpty: false,
      message: '^Frequency is required',
    },
  },
  amount: {
    presence: {
      allowEmpty: false,
      message: '^Amount is required',
    },
  },
  minimum: {
    presence: {
      allowEmpty: false,
      message: '^Minimum Data is required',
    },
  },
};

export default function ValidateInput(fieldName, value) {
  const formValues = {};
  formValues[fieldName] = value;

  const formConstrains = {};
  formConstrains[fieldName] = constraints[fieldName];

  const result = validate(formValues, formConstrains);
  if (result) {
    return result[fieldName][0];
  }
  return false;
}
