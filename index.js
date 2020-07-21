const express = require("express");

const authRouter = require("./routes/authRoutes");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(authRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
