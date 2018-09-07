const fs = require('fs');
const path = require('path');

function logRequest(directory, method, uri) {
  console.log('here');
  // time 2017-10-11T23:51:56:005Z
  let timeStamp = new Date();
  // 2017-10-11
  let date = timeStamp.toJSON().split('T')[0];
  // 13:51:56 GMT-1000 (HST)
  let time = timeStamp.toTimeString();

  let location = path.join(__dirname, directory, '/');
  // [method] [uri] [time stamp]
  let data = `[${method}] [${uri}] [${time}]
`;
  // appends the data to the specific location 
  fs.appendFile(`${location}${date}.log`, data, (err) =>{
    if (err) console.log(err);
    else console.log('Success!');
  });
}

module.exports = logRequest;