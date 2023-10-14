console.log("hello");

let express = require('express');
let app = express();

let projects = {
    "data": [
        {
            name: "15",
            project_type: "installation",
            project_info: "This is about connectiong concept, form & material"
        },
        {
            name: "doTERRA",
            project_type: "commerical",
            project_info: "This is story about from nature to people"
        },
        {
            name: "kindergartens",
            project_type: "educational",
            project_info: "This is my wish to stay lifelong in kindergarten"
        },
        {
            name: "k-12 schools",
            project_type: "educational",
            project_info: "This is several cradles for future innovators"
        }
    ]
}

//routes 
//localhost:3000/
app.get('/', (req, res) => {
    res.send("hello! let's grab a coffee together!");
})

//use public directory 
//localhost:3000/IMA/"/".html
app.use('/IMA', express.static('public'));

//req query
//localhost:300/built-projects?name="/"
app.get('/built-projects', (req, res) => {
    // res.json(projects);
    let userName = req.query.name;
    let userObj;
    for (let i = 0; i < projects.data.length; i++) {
        if (userName == projects.data[i].name) {
            userObj = projects.data[i];
        }
    }
    if (userObj) {
        res.json(userObj);
    } else {
        res.json({ status: "project not found!" })
    }
})

//req params
// app.get('/built-projects/:name', (req, res) => {
//     //console.log(req.params.name);
//     let user_name = req.params.name;
//     let user_obj;
//     for (let i = 0; i < projects.data.length; i++) {
//         if (user_name == projects.data[i].name) {
//             user_obj = projects.data[i];
//         }
//     }
//     if (user_obj) {
//         res.json(user_obj);
//     } else {
//         res.json({ status: "project not found!" });
//     }
// })

app.listen(3000, () => {
    console.log("app listening at localhost:3000");
})