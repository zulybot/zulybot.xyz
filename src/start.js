require('colors');
console.log('[STARTING] Starting...'.magenta);
require('dotenv').config();

require('./Bot/zuly');
require('./Database/postgreSQL');