module.exports = {
  default: [
    '--import @babel/register',
    '--import ./features/step_definitions/**/*.js',
    '--format-options \'{"snippetInterface": "synchronous"}\''
  ].join(' ')
};