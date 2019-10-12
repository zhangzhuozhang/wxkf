const formatMsg = require('./fmtwxmsg');

// function help() {
//     return `这是一个消息回复测试程序，会把消息原样返回，但是目前不支持视频类型的消息`;
// }
function message(){
    return `姓名：张卓、学号：2017012053`
}

function userMsg(wxmsg, retmsg) {
    /*
        检测是否为文本消息，如果是文本消息则先要检测是不是支持的关键词回复。
    */

    if (wxmsg.MsgType == 'text') {
        // if (wxmsg.Content == 'help' || wxmsg.Content == '?' || wxmsg.Content == '？') {
        //     retmsg.msg = help();
        //     retmsg.msgtype = 'text';
        //     return formatMsg(retmsg);
        if(wxmsg.Content == 'who'){
            retmsg.msg = message();
            retmsg.msgtype='text';
            return formatMsg(retmsg);
        } else if (wxmsg.Content == 'hello' || wxmsg.Content == '你好'){

            retmsg.msg = '你好，欢迎关注公众号';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);

        } else {
            retmsg.msg = wxmsg.Content;
            retmsg.msgtype = wxmsg.MsgType;
            return formatMsg(retmsg);
        }
    }else{
        switch(wxmsg.MsgType) {
            case 'image':
            case 'voice':
                retmsg.msg = wxmsg.MediaId;
                retmsg.msgtype = wxmsg.MsgType;
                break;
            default:
                retmsg.msg = '不支持的类型';        
        }
        return formatMsg(retmsg);
}
}


exports.userMsg = userMsg;
exports.message = message;

exports.msgDispatch = function msgDispatch(wxmsg, retmsg) {
    return userMsg(wxmsg, retmsg);
};

