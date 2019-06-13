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

function makeDirectories(callback) {
  try {
    fs.mkdirSync(rootDir);
    fs.mkdirSync(stylesDir, { recursive: true });
    fs.mkdirSync(jsDir, { recursive: true });
    callback(); //Add files after directories are created
  } catch (error) {
    console.log(error.message);
  }
}

function generateFilesInDirectories() {
  let jsStream = fs.createWriteStream(jsFile, "UTF-8");
  jsStream.close();

  jsStream.on("error", err => {
    console.log(err.message);
  });

  let cssStream = fs.createWriteStream(cssFile, "UTF-8");
  cssStream.close();

  cssStream.on("error", err => {
    console.log(err.message);
  });

  let htmlStream = fs.createWriteStream(htmlFile, "UTF-8");
  htmlStream.write(HTML);
  htmlStream.close();
  htmlStream.on("close", () => {
    console.log("writing html done");
  });

  htmlStream.on("error", err => {
    console.log(err.message);
  });
}

//check if root directory already exists
fs.access(rootDir, fs.constants.F_OK, err => {
  if (err) {
    // Directory doesn't exist proceed with writing ...
    makeDirectories(generateFilesInDirectories);
  } else {
    console.log("Directory already exists");
  }
});
