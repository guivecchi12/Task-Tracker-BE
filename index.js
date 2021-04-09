const app = require('./app')
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`\n** Running on port ${port} **\n`)})
app.timeout = 60 * 10 * 1000;