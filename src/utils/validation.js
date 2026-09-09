export const isRequired = (value) => (value !== undefined && value !== null && String(value).trim() !== '') || 'This field is required';

export const isEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '') || 'Enter a valid email address';

export const minLength = (n) => (value) =>
  (value || '').length >= n || `Must be at least ${n} characters`;

export const matches = (other, message = 'Values do not match') => (value, formValues) =>
  value === formValues[other] || message;

export function validateForm(values, rules) {
  const errors = {};
  Object.entries(rules).forEach(([field, validators]) => {
    for (const validator of validators) {
      const result = validator(values[field], values);
      if (result !== true) {
        errors[field] = result;
        break;
      }
    }
  });
  return errors;
}
