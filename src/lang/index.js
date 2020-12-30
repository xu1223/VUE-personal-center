import App from '@/config/app.js'

let lang = App.lang || 'en';

const data = require('./' + lang + '.js').default;

export default data;