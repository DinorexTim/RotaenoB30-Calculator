const express = require("express");
const http = require("http");
const fs = require("fs");

const port=9876;
/*********************web server**********************/
var app=express();

server=http.createServer((request,response)=>{
    response.writeHead(200,{'Content-Type':'text/plain'});
});

console.log(`Server is running at http://localhost:${port}`);

var server=app.listen(port,()=>{});

/*********************Process request**********************/
app.get('/',(req,res)=>{
    res.sendFile(__dirname+`/RotaenoB30.html`);
});
app.get('/:filename', (req,res)=>{
    res.sendFile(__dirname+`/${req.params.filename}`);
});
app.get('/:folder/:filename', (req,res)=>{
    res.sendFile(__dirname+`/${req.params.folder}/${req.params.filename}`);
});
app.get('/:folder/:folder2/:filename', (req,res)=>{
    res.sendFile(__dirname+`/${req.params.folder}/${req.params.folder2}/${req.params.filename}`);
});
app.post('/updateScore',(req,res)=>{
    let body="";
    req.on('data',(chunk)=>{
        body+=chunk.toString();
    });
    req.on('end',()=>{
        body=JSON.parse(body);
        console.log(body);
        fs.readFile('./userdata.json', 'utf8', (err, data) => {
            if (err) {
              console.error('读取文件时出错:', err);
              return;
            }
            try {
                const jsonData = JSON.parse(data);
                const indexToUpdate = jsonData.info.findIndex(item => item.title === body.title && item.ratingClass === 3);
          
                if (indexToUpdate !== -1) {
                    jsonData.info[indexToUpdate].score = parseFloat(body.score);
                    fs.writeFile('./userdata.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                        if (err) {
                            console.error('写入文件时出错:', err);
                            return;
                        }
                        console.log('更新成功');
                    });
                } else {
                    const newinfo = {
                        "title":body.title,
                        "ratingClass":3,
                        "ratingReal":body.ratingReal,
                        "score":parseFloat(body.score)
                    }
                    jsonData.info.push(newinfo);
                    fs.writeFile('./userdata.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                        if (err) {
                            console.error('写入文件时出错:', err);
                            return;
                        }
                    });
                    console.log('增加成功');
                }
            } catch (error) {
                console.error('解析 JSON 时出错:', error);
            }
        });
        res.json({"status":"success"});
    });
});
app.post('/getb30',(req,res)=>{
    let body="";
    req.on('data',(chunk)=>{
        body+=chunk.toString();
    });
    req.on('end',()=>{
        try {
            const data = fs.readFileSync('./userdata.json', 'utf8');
            const config = JSON.parse(data);
            console.log(config);
            res.json({
                "username":config.username,
                "grade":config.info,
                "userRating":config.rating
            });
        } catch (err) {
            console.log(`Error reading file from disk: ${err}`);
        }
    });
});

app.post('/getAvatars',(req,res)=>{
    let body="";
    req.on('data',(chunk)=>{
        body+=chunk.toString();
    });
    req.on('end',()=>{
        const folderPath = './images/avatars';
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error('Error reading folder:', err);
                return;
            }
            res.json({
                "avatars":files
            })
        });
    });
})

app.post('/changeUsername',(req,res)=>{
    let body="";
    req.on('data',(chunk)=>{
        body+=chunk.toString();
    });
    req.on('end',()=>{
        body=JSON.parse(body);
        fs.readFile('./userdata.json', 'utf8', (err, data) => {
            if (err) {
              console.error('读取文件时出错:', err);
              return;
            }
            try {
                const jsonData = JSON.parse(data);
                jsonData.username = body.username;
                fs.writeFile('./userdata.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('写入文件时出错:', err);
                        return;
                    }
                    console.log('Rating更新成功');
                    res.json({
                        "code":0
                    });
                });
            }catch(err){
                console.log(`Error reading file from disk: ${err}`);
                res.json({
                    "code":-1
                });
            }
        });
    });
});