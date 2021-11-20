import express from "express";
import { dirname } from "path";
import { allowedNodeEnvironmentFlags } from "process";
import { fileURLToPath } from "url";
import { getDate } from "./date.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3000;
const app = express();

const items = ["Get a job!"];
const workItems = [];

app.use(express.json());
app.use(express.urlencoded({extended : true})); //Parse URL-encoded bodies
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    const day = getDate();
    return res.render('list', {listTitle: day, newListItems: items});
});

app.post("/", function(req, res){
    let item = req.body.item;
    console.log(item);
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
    res.render("about");
});


app.listen(port, function(){
    console.log(`Server started on port ${port}.`);
});