const mongoose = require("mongoose");

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to mongo: " + mongoose.version))
  .catch((err) => console.error(err));
