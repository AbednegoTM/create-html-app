var fs = require("fs");
const path = require("path");
const HTML = require("./boilerplate");

//    TODO
// 1) get project name from user - DONE
// 2) create directories - DONE
// 3) add files to directories - DONE
// 4) refactor
// 5) use Debug for logging
// 6) make it a CLI tool
//Tests TODO:
// test if directories are is created
// test if files are created
// test if files contain generated content
// if file doesn't or already exist during creation
// make sure errors are handled
//

let projectName = "project"; // Default project Name

if (process.argv[2]) {
  projectName = process.argv[2];
}
const rootDir = projectName;
const stylesDir = path.join(rootDir, "styles");
const jsDir = path.join(rootDir, "js");
let jsFile = path.join(jsDir, "main.js");
let cssFile = path.join(stylesDir, "main.css");
let htmlFile = path.join(rootDir, "index.html");

// Create directories

// make root directory
fs.access(rootDir, fs.constants.F_OK, err => {
  if (err) {
    fs.mkdirSync(rootDir, { recursive: true });
    return;
  } else {
    console.log("Directory already exists");
  }
});

// make styeles diretory
fs.access(stylesDir, fs.constants.F_OK, err => {
  if (err) {
    fs.mkdirSync(stylesDir, { recursive: true });
    return;
  } else {
    console.log("stylesDir already exist");
  }
});

// make js diretory
fs.access(jsDir, fs.constants.F_OK, err => {
  if (err) {
    fs.mkdirSync(jsDir, { recursive: true });
    return;
  } else {
    console.log("jsDir already exist");
  }
});

// create files in directories

let jsStream = fs.createWriteStream(jsFile, "UTF-8");
jsStream.close();

let cssStream = fs.createWriteStream(cssFile, "UTF-8");
cssStream.close();

let htmlStream = fs.createWriteStream(htmlFile, "UTF-8");
htmlStream.write(HTML);
htmlStream.close();
htmlStream.on("close", () => {
  console.log("writing html done");
});
