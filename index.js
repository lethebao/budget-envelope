const express = require("express");
const app = express();
const port = 3000;

const envelopesRouter = require("./routes/envelopes");
app.use("/envelopes", envelopesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
