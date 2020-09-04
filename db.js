const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/amnahashmi', { useNewUrlParser: true }).then(() => {
    console.log('[+] Db connected')
}).catch(err => {
    console.log('[-] Db connection err:', err)
});