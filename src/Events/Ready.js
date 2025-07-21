const { client } = require('./client.js');
function Ready(){
client.once('ready', (c)=> {
    console.log(c.user.displayName+' is gooning');
})}

module.exports = {
    Ready
}