const route = require("express").Router();
const User = require("../models/user");
const App = require("../models/app");

function splitAppNames(appsStr) {
  const apps = appsStr
    .trim()
    .split(",")
    .map(ele => ele.trim());
  return apps;
}

route.post("/init", async (req, res) => {
  const { userId, apps } = req.body;
  
  // const user = await User.findById(userId).exec();
  const appsArr = splitAppNames(apps);
    console.log(appsArr);
  // get all apps on system
  const popApps = (await App.find({}).exec()) || [];

  const existApps = [];
  const newApps = [];
  
  appsArr.forEach(app => {
    const index = popApps.findIndex(popApp => popApp.name === app);
    if(index !== -1){
        existApps.push({
            id : popApps[index]._id,
            name : popApps[index].name
        })
    }else{
        newApps.push({
            name : app
        })
    }
  });


//   update apps
  const savedNewApps = await App.insertMany(newApps);

//     const popApps = await new Promise((resolve,reject) => {
//         App.insertMany(appsArr, { ordered : false },function (err,result) {
//             console.log(err, result);
//             resolve(result);
//         });
//     });
//     console.log(popApps);

  const userApps = [...savedNewApps.map(sa => ({ name: sa.name, id: sa._id })), ...existApps];
  // update user with the new apps
  const user = await User.findByIdAndUpdate(userId, { apps: userApps }, { new : true }).exec();

  res.status(200).json({ user });
});

route.get("/users", async (req, res) => {
  const { userId } = req.body;
  
  const user = await User.findById(userId).exec();

  res.status(200).json({ user });
});

route.get("/apps", async (req, res) => {
  const popApps = (await App.find({}).exec()) || [];
  const filteredApps = popApps.map(pa => ({ name: pa.name, id: pa.id }));
  res.status(200).json({ apps: filteredApps });
});

module.exports = route;
