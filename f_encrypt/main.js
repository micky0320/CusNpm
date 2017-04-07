'use strict';
import './security.min';
import { JSEncrypt } from 'jsencrypt';
import CryptoJS from 'crypto-js';

const Security = window.Security;

class LoginUtil {
    // 构造

    /**
     * 外部注册公用方法【含短线验证码】【注册】【登录】【加密解密】
     * 需要 zepto 或者 jquery 支持
     * @param options 配置参数
     * eg:
     * var LoginUtil = require('main.js');
     var login = LoginUtil.init({
     env: env,
     site: '10026',
     appId: 'ZIGONG',
     siteName: 'zigongyinhang',
   });

     login.getSms(mobile);
     login.register(userinfo);
     login.login(login);
     login.site 银行编号
     login.siteName 银行名称
     目前已经使用的 site 配置请参照快速生成平台，或者问看各自 master-*** 的配置
     */
    // 原始ID
    originPK = '';
    // 最后一次请求时间
    requestTime = null;
    // 最后一次请求返回时间
    serverTime = null;
    // 请求叠加数
    callNum = 0;

    // 加密密匙信息 0=普通加密解密 1=密码加密解密
    currentPKS = {
        encrypt: null,
        reqTime: null,
        serTime: null
    }

    options = {}

    constructor(options) {

    // 默认配置项
        var g = {
            // 配置环境 dev stg production
            env: 'dev',
            // 银行编号，默认标版 10004
            site: '10004',
            // 银行APP ID
            appId: 'BIAOBAN',
            // 银行名称，默认标版 biaoban
            siteName: 'biaoban',
            // 未知参数，目前默认配置即可
            securyKeys: ['payeeAcName', 'payeeAcNo', 'accountNo', 'bankNo', 'cifName', 'identityNo', 'mobilePhone', 'idNo', 'mobileNo', 'cnName', 'bindAccountNo', 'userId'],
            // publicKey 地址
            pathPK: 'getPublicKey.json',
            // 密码加密类型，不为 null 的时候，type=1
            PWDKeyType: null,
            // 获取短信验证码
            pathSMS: 'getSMS.json',
            // 注册
            pathRegister: 'easyRegister.json',
            // 登录
            pathLogin: 'login.json',
            // 未知参数，版本号，目前写死4即可
            apiVersion: 4,
            // 未知参数，操作类型，目前写死1即可
            otpType: 1,
            // 未知参数，系统类型，目前写死
            os: 'iOS',
            // 未知参数，系统版本号，目前写死
            osVersion: '9.3.2',
            // 屏幕宽，目前写死
            screenSize: '375.000000,667.000000'

        };

        this.options = {...g, ...options};

        // 4分钟更新一次时间戳
        var outTimeSecond = 4 * 60 * 1000;
        setInterval(() => {
            if (this.serverTime != null) {
                this.serverTime = parseFloat(this.serverTime) + outTimeSecond;
            }
        }, outTimeSecond);


        this._getPublicKey(this.options.PWDKeyType != null ? 1 : 0);
    }

    /**
     * 请求数据加签
     * @param data 要提交的参数数据
     */
    _makeSign(data) {
        var aesKey = LoginUtil.getAESKey();
        data = data == null ? {} : data;

        // 使用 RSA 加密 aesKey，并且添加 ENCODE_KEY
        var securyKeys = this._getSecuryKey(data);
        if (securyKeys && securyKeys.length > 0) {
            data.ffEncodeFields = securyKeys.join(',');
            var kEncodeKey = LoginUtil.encryptRSA(this.currentPKS.encrypt.encrypt(aesKey));
            if (kEncodeKey && kEncodeKey.length) {
                data['ENCODE_KEY'] = kEncodeKey;
            }
        }

        // 计算签名
        if (data.ENCODE_KEY) {
            data = this._addSignatureParam(data);
        }

        return data;
    }

// 获取需要加密的参数列表
    _getSecuryKey(data) {
        var result = [];
        var securyKeys = this.options.securyKeys;
        for (var key in data) {
            if (securyKeys.indexOf(key) !== -1) {
                result.push(key);
            }
        }
        return result;
    }

    // 计算签名
    _addSignatureParam(data) {
        var paramKeys = [];
        var signM = '';
        for (var key in data) {
            paramKeys.push(key);
        }
        paramKeys = paramKeys.sort();

        for (var i = 0; i < paramKeys.length; i++) {
            var key = paramKeys[i];
            if (key !== 'ffSignture') {
                if (this.options.securyKeys.indexOf(key) !== -1) {
                    var aesEncrypted = encodeURIComponent(LoginUtil.encryptAES(data[key]));
                    data[key] = aesEncrypted.toString();
                    signM += key + '=' + aesEncrypted + '&';
                } else {
                    signM += key + '=' + data[key] + '&';
                }
            }
        }

        signM = signM.substring(0, signM.length - 1);
        signM = signM + this.originPK;
        var signResult = CryptoJS.MD5(signM).toString();
        data.ffSignture = signResult;

        return data;
    }

    /**
     * 用户注册
     * @param user 用户信息
     *      user.pwd 用户登录密码，需要自定义加密规范，默认不加密
     *           eg: encryptSHA1(CryptoJS.MD5(site).toString(), pwd)
     *      user.recommend 备注
     *      user.smsCode 短信验证码
     * @param callback 回调函数
     */
    register(user, callback) {
        // 使用pwd则默认为标准加密方式, 否则使用password字段
        if (user && user.pwd) {
            user.pwd = LoginUtil.encryptSHA1(user.pwd, CryptoJS.MD5(this.options.site).toString());
        } else {
            user.pwd = user.password;
        }

        var securityParams = Security.loginValue(this.options.siteName, user.mobile, user.mobile, 'ip');
        var pwd = this.currentPKS.encrypt.encrypt(this._setPassword(user.pwd));
        var mydata = this._formatParams({
            passWord: LoginUtil.encryptRSA(pwd),
            mobileNo: user.mobile,
            otpType: this.options.otpType,
            recommendNo: user.recommend || '',
            smsCode: user.smsCode,
            securityParams: securityParams
        });
        _request(this.options.pathRegister, this._makeSign(mydata), callback);
    }

    /**
     * 用户登录
     * @param user 用户登录信息
     *      uesr.account 登录号
     *      user.pwd 用户登录密码，需要自定义加密规范，默认不加密
     *           eg: encryptSHA1(CryptoJS.MD5(site).toString(), pwd)
     * @param callback 回调函数
     */
    login(user, callback) {
        if (user && user.pwd) {
            user.pwd = LoginUtil.encryptSHA1(user.pwd, CryptoJS.MD5(this.options.site).toString());
        }
        var pwd = this.currentPKS.encrypt.encrypt(this._setPassword(user.pwd));
        var replayAttacksKey = LoginUtil.encryptRSA(this.pks['0'].encrypt.encrypt(this._getToken()));
        var securityParams = Security.registerValue(this.options.siteName, userInfo.account, userInfo.account, 'ip');
        var mydata = this._formatParams({
            passWord: LoginUtil.encryptRSA(pwd),
            replayAttacksKey: replayAttacksKey,
            userId: user.account,
            securityParams: securityParams
        });

        _request(this.options.pathLogin, this._makeSign(mydata), callback);
    }

    _formatParams(obj) {
        return {
            ffApiVersion: this.options.apiVersion,
            ffAppID: this.options.appId,
            ffDeviceID: LoginUtil.getDeviceId(),
            ffNativeVersion: this.options.nativeVersion,
            ffOs: this.options.os,
            ffOsVersion: this.options.osVersion,
            ffScreenSize: this.options.screenSize,
            ffRequestId: LoginUtil.getRequestId(),
            ffTimestamp: this.serverTime,
            ...obj
        }
    }

    /**
     * 发送短信
     * @param info 发送短信所需信息
     *    info.mobile 用户手机号
     * @param callback 回调函数
     */
    getSms(info, callback) {
        // 未知参数
        var replayAttacksKey = LoginUtil.encryptRSA(this.currentPKS.encrypt.encrypt(this._getToken()));

        var mydata = this._formatParams({
            replayAttacksKey: replayAttacksKey,
            mobileNo: info.mobile,
            otpType: this.options.otpType
        });
        _request(this.options.pathSMS, this._makeSign(mydata), callback);
    }

    /**
     * 设置密码
     * @param pwd 用户传入的密码
     * @param pwdTime 是否需要时间参数
     */
    _setPassword(pwd, pwdTime) {
        if (pwdTime == null || pwdTime !== false) {
            return pwd + '$CurTime=' + this.serverTime;
        }
        return pwd;
    }

    /**
     * 获取 publicKey
     * @param _type 0,1 密码加密 1
     */
    _getPublicKey(type) {
        var url = this.options.pathPK;
        this.currentPKS.reqTime = new Date().getTime();
        this.requestTime = this.currentPKS.reqTime;
        // 加签数据
        var mydata = type === 1 ? {
            publicKeyType: type
        } : {};

        this.currentPKS.encrypt = new JSEncrypt();

        _request(url, this._makeSign(mydata), (result) => {
            try {
                var data = result.data;
                this.serverTime = data.timestamp;
                this.originPK = data.publicKey;

                this.currentPKS.serTime = data.timestamp;
                this.currentPKS.originPK = data.publicKey;

                var begin = '-----BEGIN PUBLIC KEY-----\n';
                var key = new Buffer(data.publicKey, 'hex').toString('base64');
                var end = '\n-----END PUBLIC KEY-----';

                this.currentPKS.encrypt.setPublicKey(begin + key + end);
            } catch (e) {
                console.log('publicKey error：' + e.message);
            }
        });

    }


    /**
     * 获取token
     */
    _getToken() {
        var t = new Date().getTime();
        var token = CryptoJS.MD5(t + Math.random(t) * t + '').toString();
        return token + this.serverTime + (this.callNum++);
    }

    get site() {
        return this.options.site;
    }

    get siteName() {
        return this.options.siteName;
    }


    /**
     * SHA1 加密
     * @param value 要加密的数据
     * @param site 银行编号
     */
    static encryptSHA1(value, site) {
        return CryptoJS.HmacSHA1(value, site).toString(CryptoJS.enc.Base64);
    }

    /**
     * RSA 加密
     * @param value 要加密的数据
     *      eg: 通常需要被 JSEncrypt().encrypt(val)
     */
    static encryptRSA(value) {
        var result = new Buffer(value, 'base64').toString('hex').toUpperCase();
        return result;
    }

    /**
     * AES 解密
     * @param value 要解密的数据
     */
    static decryptAES(value) {
        var aesKey = this.getAESKey();
        var key = CryptoJS.enc.Utf8.parse(aesKey);
        return CryptoJS.AES.decrypt(value, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
    }

    /**
     * 获取初始化加密 key
     */
    static getAESKey() {
        var key = sessionStorage.getItem('FF_AES_KEY');
        if (key) {
            return key;
        } else {
            key = [];
            for (let i = 0; i < 16; i++) {
                var num = Math.floor(Math.random() * 26);
                var charStr = String.fromCharCode(97 + num);
                key.push(charStr.toUpperCase());
            }
            var result = key.join('');
            sessionStorage.setItem('FF_AES_KEY', result);
            return result;
        }
    }

    /**
     * AES 加密
     * @param value 要加密的数据
     */
    static encryptAES(value) {
        var aesKey = LoginUtil.getAESKey();
        var key = CryptoJS.enc.Utf8.parse(aesKey);
        var encrypted = CryptoJS.AES.encrypt(value, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        var result = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
        return result;
    }


    /**
     * 获取设备号，目前暂时写死，不知道用来干什么的
     */
    static getDeviceId() {
        var t = new Date().getTime();
        return CryptoJS.MD5(t + Math.random(t) * t + '').toString();
    }

    /**
     * 获取请求Id
     */
    static getRequestId() {
        return CryptoJS.MD5(new Date().getTime().toString()).toString();
    }

    static MD5 = CryptoJS.MD5
}

// 请求
function _request(_url, mydata, callback) {
    $.ajax({
        url: _url,
        type: 'post',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        cache: true,
        data: mydata,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(result) {
            console.log(result);
            if (callback) {
                callback(result);
            }
        },
        error: function(a) {
            callback({
                code: '999999',
                msg: '网络异常'
            });
        }
    });
}


export default LoginUtil
