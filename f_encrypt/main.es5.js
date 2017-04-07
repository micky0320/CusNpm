'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _class, _temp;
require('./security.min');
var _jsencrypt = require('jsencrypt');
var _cryptoJs = require('crypto-js');var _cryptoJs2 = _interopRequireDefault(_cryptoJs);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var Security = window.Security;var

LoginUtil = (_temp = _class = function () {































    // 加密密匙信息 0=普通加密解密 1=密码加密解密
    // 最后一次请求返回时间
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
     */ // 原始ID
    function LoginUtil(options) {var _this = this;(0, _classCallCheck3.default)(this, LoginUtil);this.originPK = '';this.requestTime = null;this.serverTime = null;this.callNum = 0;this.currentPKS = { encrypt: null, reqTime: null, serTime: null };this.options = {}; // 默认配置项
        var g = { // 配置环境 dev stg production
            env: 'dev', // 银行编号，默认标版 10004
            site: '10004', // 银行APP ID
            appId: 'BIAOBAN', // 银行名称，默认标版 biaoban
            siteName: 'biaoban', // 未知参数，目前默认配置即可
            securyKeys: ['payeeAcName', 'payeeAcNo', 'accountNo', 'bankNo', 'cifName', 'identityNo', 'mobilePhone', 'idNo', 'mobileNo', 'cnName', 'bindAccountNo', 'userId'], // publicKey 地址
            pathPK: 'getPublicKey.json', // 密码加密类型，不为 null 的时候，type=1
            PWDKeyType: null, // 获取短信验证码
            pathSMS: 'getSMS.json', // 注册
            pathRegister: 'easyRegister.json', // 登录
            pathLogin: 'login.json', // 未知参数，版本号，目前写死4即可
            apiVersion: 4,
            // 未知参数，操作类型，目前写死1即可
            otpType: 1,
            // 未知参数，系统类型，目前写死
            os: 'iOS',
            // 未知参数，系统版本号，目前写死
            osVersion: '9.3.2',
            // 屏幕宽，目前写死
            screenSize: '375.000000,667.000000' };



        this.options = (0, _extends3.default)({}, g, options);

        // 4分钟更新一次时间戳
        var outTimeSecond = 4 * 60 * 1000;
        setInterval(function () {
            if (_this.serverTime != null) {
                _this.serverTime = parseFloat(_this.serverTime) + outTimeSecond;
            }
        }, outTimeSecond);


        this._getPublicKey(this.options.PWDKeyType != null ? 1 : 0);
    }

    /**
       * 请求数据加签
       * @param data 要提交的参数数据
       */ // 请求叠加数
    // 最后一次请求时间
    (0, _createClass3.default)(LoginUtil, [{ key: '_makeSign', value: function _makeSign(data) {var aesKey = LoginUtil.getAESKey();
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
    }, { key: '_getSecuryKey', value: function _getSecuryKey(data) {
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
    }, { key: '_addSignatureParam', value: function _addSignatureParam(data) {
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
            var signResult = _cryptoJs2.default.MD5(signM).toString();
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
           */ }, { key: 'register', value: function register(
        user, callback) {
            // 使用pwd则默认为标准加密方式, 否则使用password字段
            if (user && user.pwd) {
                user.pwd = LoginUtil.encryptSHA1(user.pwd, _cryptoJs2.default.MD5(this.options.site).toString());
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
                securityParams: securityParams });

            _request(this.options.pathRegister, this._makeSign(mydata), callback);
        }

        /**
           * 用户登录
           * @param user 用户登录信息
           *      uesr.account 登录号
           *      user.pwd 用户登录密码，需要自定义加密规范，默认不加密
           *           eg: encryptSHA1(CryptoJS.MD5(site).toString(), pwd)
           * @param callback 回调函数
           */ }, { key: 'login', value: function login(
        user, callback) {
            if (user && user.pwd) {
                user.pwd = LoginUtil.encryptSHA1(user.pwd, _cryptoJs2.default.MD5(this.options.site).toString());
            }
            var pwd = this.currentPKS.encrypt.encrypt(this._setPassword(user.pwd));
            var replayAttacksKey = LoginUtil.encryptRSA(this.pks['0'].encrypt.encrypt(this._getToken()));
            var securityParams = Security.registerValue(this.options.siteName, userInfo.account, userInfo.account, 'ip');
            var mydata = this._formatParams({
                passWord: LoginUtil.encryptRSA(pwd),
                replayAttacksKey: replayAttacksKey,
                userId: user.account,
                securityParams: securityParams });


            _request(this.options.pathLogin, this._makeSign(mydata), callback);
        } }, { key: '_formatParams', value: function _formatParams(

        obj) {
            return (0, _extends3.default)({
                ffApiVersion: this.options.apiVersion,
                ffAppID: this.options.appId,
                ffDeviceID: LoginUtil.getDeviceId(),
                ffNativeVersion: this.options.nativeVersion,
                ffOs: this.options.os,
                ffOsVersion: this.options.osVersion,
                ffScreenSize: this.options.screenSize,
                ffRequestId: LoginUtil.getRequestId(),
                ffTimestamp: this.serverTime },
            obj);

        }

        /**
           * 发送短信
           * @param info 发送短信所需信息
           *    info.mobile 用户手机号
           * @param callback 回调函数
           */ }, { key: 'getSms', value: function getSms(
        info, callback) {
            // 未知参数
            var replayAttacksKey = LoginUtil.encryptRSA(this.currentPKS.encrypt.encrypt(this._getToken()));

            var mydata = this._formatParams({
                replayAttacksKey: replayAttacksKey,
                mobileNo: info.mobile,
                otpType: this.options.otpType });

            _request(this.options.pathSMS, this._makeSign(mydata), callback);
        }

        /**
           * 设置密码
           * @param pwd 用户传入的密码
           * @param pwdTime 是否需要时间参数
           */ }, { key: '_setPassword', value: function _setPassword(
        pwd, pwdTime) {
            if (pwdTime == null || pwdTime !== false) {
                return pwd + '$CurTime=' + this.serverTime;
            }
            return pwd;
        }

        /**
           * 获取 publicKey
           * @param _type 0,1 密码加密 1
           */ }, { key: '_getPublicKey', value: function _getPublicKey(
        type) {var _this2 = this;
            var url = this.options.pathPK;
            this.currentPKS.reqTime = new Date().getTime();
            this.requestTime = this.currentPKS.reqTime;
            // 加签数据
            var mydata = type === 1 ? {
                publicKeyType: type } :
            {};

            this.currentPKS.encrypt = new _jsencrypt.JSEncrypt();

            _request(url, this._makeSign(mydata), function (result) {
                try {
                    var data = result.data;
                    _this2.serverTime = data.timestamp;
                    _this2.originPK = data.publicKey;

                    _this2.currentPKS.serTime = data.timestamp;
                    _this2.currentPKS.originPK = data.publicKey;

                    var begin = '-----BEGIN PUBLIC KEY-----\n';
                    var key = new Buffer(data.publicKey, 'hex').toString('base64');
                    var end = '\n-----END PUBLIC KEY-----';

                    _this2.currentPKS.encrypt.setPublicKey(begin + key + end);
                } catch (e) {
                    console.log('publicKey error：' + e.message);
                }
            });

        }


        /**
           * 获取token
           */ }, { key: '_getToken', value: function _getToken()
        {
            var t = new Date().getTime();
            var token = _cryptoJs2.default.MD5(t + Math.random(t) * t + '').toString();
            return token + this.serverTime + this.callNum++;
        } }, { key: 'site', get: function get()

        {
            return this.options.site;
        } }, { key: 'siteName', get: function get()

        {
            return this.options.siteName;
        }


        /**
           * SHA1 加密
           * @param value 要加密的数据
           * @param site 银行编号
           */ }], [{ key: 'encryptSHA1', value: function encryptSHA1(
        value, site) {
            return _cryptoJs2.default.HmacSHA1(value, site).toString(_cryptoJs2.default.enc.Base64);
        }

        /**
           * RSA 加密
           * @param value 要加密的数据
           *      eg: 通常需要被 JSEncrypt().encrypt(val)
           */ }, { key: 'encryptRSA', value: function encryptRSA(
        value) {
            var result = new Buffer(value, 'base64').toString('hex').toUpperCase();
            return result;
        }

        /**
           * AES 解密
           * @param value 要解密的数据
           */ }, { key: 'decryptAES', value: function decryptAES(
        value) {
            var aesKey = this.getAESKey();
            var key = _cryptoJs2.default.enc.Utf8.parse(aesKey);
            return _cryptoJs2.default.AES.decrypt(value, key, {
                mode: _cryptoJs2.default.mode.ECB,
                padding: _cryptoJs2.default.pad.Pkcs7 }).
            toString(_cryptoJs2.default.enc.Utf8);
        }

        /**
           * 获取初始化加密 key
           */ }, { key: 'getAESKey', value: function getAESKey()
        {
            var key = sessionStorage.getItem('FF_AES_KEY');
            if (key) {
                return key;
            } else {
                key = [];
                for (var i = 0; i < 16; i++) {
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
           */ }, { key: 'encryptAES', value: function encryptAES(
        value) {
            var aesKey = LoginUtil.getAESKey();
            var key = _cryptoJs2.default.enc.Utf8.parse(aesKey);
            var encrypted = _cryptoJs2.default.AES.encrypt(value, key, {
                mode: _cryptoJs2.default.mode.ECB,
                padding: _cryptoJs2.default.pad.Pkcs7 });

            var result = _cryptoJs2.default.enc.Base64.stringify(encrypted.ciphertext);
            return result;
        }


        /**
           * 获取设备号，目前暂时写死，不知道用来干什么的
           */ }, { key: 'getDeviceId', value: function getDeviceId()
        {
            var t = new Date().getTime();
            return _cryptoJs2.default.MD5(t + Math.random(t) * t + '').toString();
        }

        /**
           * 获取请求Id
           */ }, { key: 'getRequestId', value: function getRequestId()
        {
            return _cryptoJs2.default.MD5(new Date().getTime().toString()).toString();
        } }]);return LoginUtil;}(), _class.

MD5 = _cryptoJs2.default.MD5, _temp);


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
            withCredentials: true },

        crossDomain: true,
        success: function success(result) {
            console.log(result);
            if (callback) {
                callback(result);
            }
        },
        error: function error(a) {
            callback({
                code: '999999',
                msg: '网络异常' });

        } });

}exports.default =


LoginUtil;module.exports = exports['default'];
