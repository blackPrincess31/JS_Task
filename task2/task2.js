

var crypto = require('crypto');

var fs = require('fs');
const { getMaxListeners } = require('process');
let data_folder_name = 'task2'

fs.readdir(data_folder_name, (err, files_in_folder) => {
  resulted_texts = [];
  files_in_folder.forEach(file_name => {

    data = fs.readFileSync( data_folder_name + '/' + file_name);

    text = crypto.createHash('sha3-256').update(data).digest('hex');
    resulted_texts.push(text);

  });
  
  resulted_texts.sort();

  strres = "";
  resulted_texts.forEach(d =>{
    strres += d;
    
  })

  var email = "katesavchenko31@gmail.com"

result = strres + email;

res = crypto.createHash('sha3-256').update(result).digest('hex');
console.log(res);
 

});




/*
SHA256 ot файлов
=> 64 hex-sha256 string
sort hex-strings
append email

get sha256 of 64hex+email

send to learning

*/
