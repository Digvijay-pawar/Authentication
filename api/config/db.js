const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => {
    console.log("Database connected successfully...");
})
.catch((err) => {
    console.error("Error occurred in database connection:", err);
});
