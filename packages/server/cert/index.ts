import fs from "fs";
import path from "path";

const options = {
  key: fs.readFileSync(path.join(__dirname, "../../cert/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../../cert/cert.pem")),
};

export default options;
