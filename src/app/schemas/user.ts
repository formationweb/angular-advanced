export const userFormConfig = [
  { name: 'email', type: 'string', validators: ['required', 'email'] },
  { name: 'name', type: 'string' },
  { name: 'address', type: 'object', properties: [{ name: 'city', type: 'string' }] }
];