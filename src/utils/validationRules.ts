const VALIDATION_RULES = {
  first_name: {
    regexp: '^[A-ZА-Я][a-zа-я.-]*$',
    rules: 'The first letter must be uppercase, without spaces and numbers, there are no special characters (only a hyphen is allowed).',
  },
  second_name: {
    regexp: '^[A-ZА-Я][a-zа-я.-]*$',
    rules: 'The first letter must be uppercase, without spaces and numbers, there are no special characters (only a hyphen is allowed).',
  },
  login: {
    regexp: '^(?!^[0-9]+$)^[a-z0-9-_]{3,20}$',
    rules: '3-20 characters, may contain numbers, hyphens and underscores.',
  },
  email: {
    regexp: '^([a-zA-Z0-9_\\.\\-]+)@([a-zA-Z0-9_\\-]+)((\\.([a-zA-Z0-9_]){2,5})+)$',
    rules: 'May contain letters, numbers, and hyphens.',
  },
  password: {
    regexp: '(?=^.{8,40}$)(?=.*[A-Z])(?=.*[0-9]).*$',
    rules: '8-40 characters, at least one capital letter and a number are required.',
  },
  phone: {
    regexp: '^[+]?[0-9]{10,15}$',
    rules: '10-15 digits, may start with +.',
  },
  message: {
    regexp: '^(?!\\s*$).+',
    rules: 'Cannot be empty.',
  },
};

export default VALIDATION_RULES;
