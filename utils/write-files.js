//  Write data to genarated files 
const fs = require('fs')
const path = require('path')
const html = require('../boilerplate')


const writeToFile = (file, content) => {
    const pathName = path.resolve(file)
  const tempFile = fs.createWriteStream(pathName, "UTF-8");
tempFile.write(content)
tempFile.close();
tempFile.on("close", ()=>{
    console.log(`[Writing file] ${path.basename(pathName)}`) 
})
/ tempFile.on("error", err => {
      console.log(err.message);
    });
   
}

module.exports = writeToFile