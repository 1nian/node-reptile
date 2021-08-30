const superagent = require('superagent');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const downloadImage = require('./downloadImages');

let url = 'https://movie.douban.com/top250?start=';
let page = 0;
let end = '&filter=';
let allFiles = [];


function getTop(url,page,end){
    superagent.get(url + page + end).end(function (err,res) {
        if(!err){
            const $ = cheerio.load(res.text);
            console.log(res.text);
            $('li .item').each(function () {
                const title = $('.title', this).text();
                const start = $('.rating_num', this).text();
                const img = $('.pic img', this).attr('src');
                allFiles.push({title,start,img});
            })

            if(page < 225){
                getTop(url,(page + 25),end)
            }else {
                console.log('爬取结束');
                console.log(allFiles.length);
                //存入json文件
                fs.appendFile(path.resolve(__dirname, './top250.json'),
                    JSON.stringify(allFiles)
                    , () => {
                        console.log("写入完成")
                    })

                //图片下载
                downloadImage(allFiles);

            }
        }
    })
}

getTop(url,page,end);
