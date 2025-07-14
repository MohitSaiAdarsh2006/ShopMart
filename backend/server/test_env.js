const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('ENV PATH:', path.resolve(__dirname, '../.env'));
const fs = require('fs');
console.log('ENV FILE EXISTS:', fs.existsSync(path.resolve(__dirname, '../.env')));
console.log('ENV FILE CONTENT:');
console.log(fs.readFileSync(path.resolve(__dirname, '../.env'), 'utf8'));
