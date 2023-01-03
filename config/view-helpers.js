
const env = require('./environment');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
   // console.log('orside vie hlper **************');
    app.locals.assetPath = function(filePath){
        
        console.log('inside vie hlper **************',JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath]);
        if (env.name == 'development'){
            return filePath;
        }

        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
    }
}