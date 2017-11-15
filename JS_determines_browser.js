(function() {  
    var Client = function() {  
        var engine = {
         ie: 0, 
         webkit: 0, 
         gecko: 0, 
         opera: 0, 
         khtml: 0 
        },  

        browser = { 
            se360: 0, 
            se: 0, 
            maxthon: 0, 
            qq: 0, 
            tt: 0, 
            theworld: 0, 
            cometbrowser: 0, 
            greenbrowser: 0, 
            ie: 0, 
            chrome: 0, 
            netscape: 0, 
            firefox: 0, 
            opera: 0, 
            safari: 0, 
            konq: 0 
        },  
        ua = navigator.userAgent.toLowerCase();       
        for (var type in engine) {  
            if (typeof type === 'string') {  
                var regexp = 'gecko' === type ? /rv:([\w.]+)/ : RegExp(type + '[ \\/]([\\w.]+)');  
                if (regexp.test(ua)) {  
                    engine.version = window.opera ? window.opera.version() : RegExp.$1;  
                    engine[type] = parseFloat(engine.version);  
                    engine.type = type;  
                    break;  
                }  
            }  
        }  
        for (var type in browser) {  
            if (typeof type === 'string') {  
                var regexp = null;  
                switch(type) {  
                    case "se360" : regexp = /360se(?:[ \/]([\w.]+))?/; break;  
                    case "se" : regexp = /se ([\w.]+)/; break;  
                    case "qq" : regexp = /qqbrowser\/([\w.]+)/; break;  
                    case "tt" : regexp = /tencenttraveler ([\w.]+)/; break;  
                    case "safari": regexp = /version\/([\w.]+)/; break;  
                    case "konq" : regexp = /konqueror\/([\w.]+)/; break;  
                    case "netscape": regexp = /navigator\/([\w.]+)/; break;  
                    default: regexp = RegExp(type + '(?:[ \\/]([\\w.]+))?');  
                }  
                if (regexp.test(ua)) {  
                    browser.version = window.opera ? window.opera.version() : RegExp.$1 ? RegExp.$1 : 'unknown';  
                    browser[type] = parseFloat(browser.version);  
                    browser.type = type;  
                    break;  
                }  
            }  
        }  
        return { engine: engine, browser: browser };  
    }();  
    window.Client = Client;  
})(); 

document.writeln('您的浏览器内核 → '+Client.engine.type+':'+Client.engine.version);  
  
var browser = { 
    se360: '360安全浏览器', 
    se: '搜狗高速浏览器', 
    maxthon: '遨游', 
    qq: 'QQ浏览器', 
    tt: '腾讯TT', 
    theworld: '世界之窗', 
    cometbrowser: '彗星浏览器', 
    greenbrowser: 'GreenBrowser', 
    ie: '微软IE', 
    chrome: '谷歌Chrome', 
    netscape: '网景', 
    firefox: '火狐', 
    opera: 'Opera', 
    safari: '苹果Safari', 
    konq: 'Konqueror' 
};  
  
document.writeln('您的浏览器 → '+browser[Client.browser.type]+':'+Client.browser.version);  
  
if(Client.engine.ie) { 
    alert('您使用的是IE内核浏览器！');
};  
  
if(Client.engine.ie && Client.engine.ie < 8 ) {
 alert('您使用的是IE内核浏览器，但是版本低于IE8！');
};   
