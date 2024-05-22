var appleIphone = /iPhone/i;
var appleIpod = /iPod/i;
var appleTablet = /iPad/i;
var appleUniversal = /\biOS-universal(?:.+)Mac\b/i;
var androidPhone = /\bAndroid(?:.+)Mobile\b/i;
var androidTablet = /Android/i;
var amazonPhone = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i;
var amazonTablet = /Silk/i;
var windowsPhone = /Windows Phone/i;
var windowsTablet = /\bWindows(?:.+)ARM\b/i;
var otherBlackBerry = /BlackBerry/i;
var otherBlackBerry10 = /BB10/i;
var otherOpera = /Opera Mini/i;
var otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i;
var otherFirefox = /Mobile(?:.+)Firefox\b/i;

var isAppleTabletOnIos13 = function (navigator) {
    return (
        typeof navigator !== 'undefined' &&
        navigator.platform === 'MacIntel' &&
        typeof navigator.maxTouchPoints === 'number' &&
        navigator.maxTouchPoints > 1 &&
        typeof MSStream === 'undefined'
    );
};

function createMatch(userAgent) {
    return function (regex) {
        return regex.test(userAgent);
    };
}

const semanticVersionsOrder = ['major', 'minor', 'patch'];

function fillVersions(result, versions) {
    result.os.version.full = versions.join('.');
    for (let i = 0; i < semanticVersionsOrder.length; i++) {
        const ver = versions[i];
        if (ver !== undefined) result.os.version[semanticVersionsOrder[i]] = Number(ver);
    }
}

function parse(param) {
    var nav = {
        userAgent: '',
        platform: '',
        maxTouchPoints: 0
    };
    if (!param && typeof navigator !== 'undefined') {
        nav = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            maxTouchPoints: navigator.maxTouchPoints || 0
        };
    } else if (typeof param === 'string') {
        nav.userAgent = param;
    } else if (param && param.userAgent) {
        nav = {
            userAgent: param.userAgent,
            platform: param.platform,
            maxTouchPoints: param.maxTouchPoints || 0
        };
    }
    var userAgent = nav.userAgent;
    var tmp = userAgent.split('[FBAN');
    if (typeof tmp[1] !== 'undefined') {
        userAgent = tmp[0];
    }
    tmp = userAgent.split('Twitter');
    if (typeof tmp[1] !== 'undefined') {
        userAgent = tmp[0];
    }
    var match = createMatch(userAgent);
    var result = {
        os: {
            version: {}
        },
        apple: {
            phone: match(appleIphone) && !match(windowsPhone),
            ipod: match(appleIpod),
            tablet:
                !match(appleIphone) &&
                (match(appleTablet) || isAppleTabletOnIos13(nav)) &&
                !match(windowsPhone),
            universal: match(appleUniversal),
            device:
                (match(appleIphone) ||
                    match(appleIpod) ||
                    match(appleTablet) ||
                    match(appleUniversal) ||
                    isAppleTabletOnIos13(nav)) &&
                !match(windowsPhone)
        },
        amazon: {
            phone: match(amazonPhone),
            tablet: !match(amazonPhone) && match(amazonTablet),
            device: match(amazonPhone) || match(amazonTablet)
        },
        android: {
            phone:
                (!match(windowsPhone) && match(amazonPhone)) || (!match(windowsPhone) && match(androidPhone)),
            tablet:
                !match(windowsPhone) &&
                !match(amazonPhone) &&
                !match(androidPhone) &&
                (match(amazonTablet) || match(androidTablet)),
            device:
                (!match(windowsPhone) &&
                    (match(amazonPhone) ||
                        match(amazonTablet) ||
                        match(androidPhone) ||
                        match(androidTablet))) ||
                match(/\bokhttp\b/i)
        },
        windows: {
            phone: match(windowsPhone),
            tablet: match(windowsTablet),
            device: match(windowsPhone) || match(windowsTablet)
        },
        other: {
            blackberry: match(otherBlackBerry),
            blackberry10: match(otherBlackBerry10),
            opera: match(otherOpera),
            firefox: match(otherFirefox),
            chrome: match(otherChrome),
            device:
                match(otherBlackBerry) ||
                match(otherBlackBerry10) ||
                match(otherOpera) ||
                match(otherFirefox) ||
                match(otherChrome)
        },
        any: false,
        phone: false,
        tablet: false
    };
    result.any = result.apple.device || result.android.device || result.windows.device || result.other.device;
    result.phone = result.apple.phone || result.android.phone || result.windows.phone;
    result.tablet = result.apple.tablet || result.android.tablet || result.windows.tablet;
    result.desktop = !result.any;
    result.maxTouchPoints = nav.maxTouchPoints;

    if (result.apple.device) {
        const matches = /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i.exec(userAgent);
        if (matches && matches[1]) {
            fillVersions(result, matches[1].split('_'))
        }
    } else if (result.android.device) {
        var matches = /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i.exec(
            navigator.userAgent
        );

        if (matches && matches[2]) {
            fillVersions(result, matches[2].split('.'))
        }
    }
    return result;
}

const device = parse();

export { parse, device };
