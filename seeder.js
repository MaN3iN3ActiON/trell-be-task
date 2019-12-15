const mongoose = require('./db');
const App = require('./models/app');
const User = require('./models/user');

async function addUser(){
    const user = new User();
    await user.save();
    console.log(user.id);
}
async function addApps() {
    const apps = [{ name : 'n4'}, { name : 'n5'}, { name : 'n6'}];
    const sa = await App.insertMany(apps);
    console.log(sa);
    return sa;
}

mongoose.connection.once("open", () => {
    addApps();
  });