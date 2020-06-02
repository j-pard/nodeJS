const jsonfile = require("jsonfile");

// "/users" is the endpoint of the RESTfull API
app.get("/users", (req, res) => {
      console.log("fetching all users");
    
      // jsonfile reading
      jsonfile.readFile("./DB/users.json", function(err, content) {
        // send file contents back to sender
        res.send(content);
      });
    });