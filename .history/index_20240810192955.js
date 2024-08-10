const express = request("express");

const app = express();

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is starting on port: ${PORT}`);
});
