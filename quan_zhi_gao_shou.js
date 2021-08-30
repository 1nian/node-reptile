const superagent = require('superagent');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

let url = 'https://www.tycqxs.com/37_37697/'; //17515114,17515182,17515199
let page = 17515114;
let end = '.html';

function getTop(url,page,end){
    superagent.get(url + page + end).end(function (err,res) {
        if(!err){
            const $ = cheerio.load(res.text);
            // console.log(res.text);
            let str = '';
            let content = $('#content').text();
            let title = $('.bookname h1').text();
            str += content;
            console.log(title);
            if(page < 17515199){
                fs.writeFile(`./article/JL/${title}.txt`,str,err => {
                    if (err){
                        console.log(err);
                    }else {
                        console.log('写入成功');
                    }
                })
                getTop(url,(page + 1),end);
            }
        }else {
            console.log(err);
        }
    })
}

getTop(url,page,end);
