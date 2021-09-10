const superagent = require('superagent')
require('superagent-charset')(superagent);
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const iconv = require('iconv-lite');
const gbk = require('gbk');

let url = 'https://www.xbiquge.so/book/13810/';

let JL_data = [];
getArticleHref(url);


function getArticleHref(url){
    superagent.get(url).end(function (err,res) {
        if (err) throw err;
        const $ = cheerio.load(res.text);
        $('dd').each(function (){
            const href = $('a', this).attr('href');
            if (href){
                JL_data.push({href});
            }
        })
        let new_data = JL_data.splice(-30);

        for (let i = 0; i < new_data.length;i++) {
            getArticleData(url+new_data[i].href)
        }
    })
}

function getArticleData(url){
    superagent.get(url).charset('gbk').end(function (err,res) {
        if(!err){
            const $ = cheerio.load(res.text);
            let str = '';
            let content = $('#box_con').text();
            str += content;
            fs.appendFile(path.resolve(__dirname, './article/JL/jl.txt'),
                JSON.stringify(str)
                , () => {
                    console.log("写入完成")
                })
            // fs.writeFile(`./article/JL/${title}.txt`,str,err => {
            //     if (err){
            //         console.log(err);
            //     }else {
            //         console.log('写入成功');
            //     }
            // })
        }else {
            console.log(err);
        }
    })
}


