const express = require('express');
const cookieParser = require('cookie-parser');
const PORT = 5000;
const {connectToServer,register} = require('./db/index')
const app = express();


app.use(cookieParser());
app.get('/', async (req, res) => {
    // try {
    //     const user = await getUsers();
    //     res.send(user)
    //     console.log(`Updated documents`);
    //   } catch (err) {
    //     console.error(`Something went wrong:`);
    //     res.send("error")
    //   }  
})
  
connectToServer(function (err) {
    if (err) {
      console.error(err);
      process.exit();
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
});