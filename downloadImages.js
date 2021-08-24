const https = require('https');
const fs = require('fs');

function downloadImage(data) {
    for (let i = 0; i < data.length; i++) {
        let imgUrl = data[i].img;
        https.get(imgUrl,function (res) {
            res.setEncoding('binary');
            let str = '';
            res.on('data',function (chunk){
                str += chunk;
            })

            res.on('end',function () {
                fs.writeFile(`./images/${i}.jpg`,str,'binary',function (err) {
                    if (!err){
                        console.log(`第${i}图片下载成功`);
                    }
                })
            })
        })
    }
}

module.exports = downloadImage;



