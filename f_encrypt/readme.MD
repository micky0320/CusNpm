## 外部注册加密解密类库

* 用法
* 依赖
* 内部实现



### 用法
```javascript
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


```



```javascript

import EncryptUtil from '@yzt/f_encrypt'; 

// or

var EncryptUtil = require('@yzt/f_encrypt');


const login =  new EncryptUtil({});
/**
 * 用户注册
 * @param user 用户信息
 *      user.pwd 用户登录密码，需要自定义加密规范，默认不加密
 *           eg: encryptSHA1(LoginUtil.MD5(site).toString(), pwd)
 *      user.pwdTime 默认需要时间戳，不需要配置为 null
 *      user.pwdAppend 加密后的密码后再拼接一些该字符串
 *      user.recommend 备注
 *      user.smsCode 短信验证码
 * @param callback 回调函数
 */
login.register({
    mobile: '15914031197',
    pwd: '用户密码',   // or  password: '自定义加密方式' 
    smsCode: '888888'
}, function (s) {
    console.log(s, '----')
});


/**
 * 用户登录
 * @param user 用户登录信息
 *      uesr.account 登录号
 *      user.pwd 用户登录密码，需要自定义加密规范，默认不加密
 *      user.pwdTime 默认需要时间戳，不需要配置为 null
 *      user.pwdAppend 加密后的密码后再拼接一些该字符串
 *           eg: encryptSHA1(LoginUtil.MD5(site).toString(), pwd)
 * @param callback 回调函数
 */
login.login({
    account: '15914031197',
    pwd: 用户密码'     // or  password: '自定义加密方式' 
}, callback);



/**
 * 发送短信
 * @param info 发送短信所需信息
 *    info.mobile 用户手机号
 * @param callback 回调函数
 */
login.getSMS({
    mobile: '15914031197'
}, callback);
```



### 依赖

* CryptoJS
* JSEncrypt
* 自定义Security对象


### 具体加密流程:

* 1. 对用户密码进行标准加密,或者不加密。 标准版加密方式为使用SHA1加密, 参数使用site的MD5值;然后对密码拼接时间戳后使用RSA加密
* 2. 安全参数使用Security对象, 最后生成整个参数对象列表
* 3. 对参数加签: 拿到每一个参数的参数名称, 生成一个参数列表,并使用RSA方式加密aeskey,然后放到参数列表中。
* 4. 对参数中每一个字段进行aes加密, 并拼装成一个签名串, 签名串拼接originPK后作为一个参数传递给服务端。


### 注意事项

* 使用行方加密键盘无法使用此类库
* 目前无法支持的银行有: 华瑞银行 佛山银行, 苏州银行


### 

 
// 自贡银行
加密方式: 标版 RSA(SHA1)
site: '10027'
siteName: 'zigongyinhang'
appId: 'ZIGONG'
H5Standar分支:master-zigong/zigong-zjd-1611
 
// 阜新银行
加密方式: 标版 RSA(SHA1)
site: '10028'
siteName: 'fuxinyinghang'
appId: 'FUXIN'
H5Standar分支:master-fuxin/fuxin-turntable-1612
 
// 紫金银行
加密方式: 标版 RSA(SHA1)
site: '10009'
siteName: 'zijinyinghang'
appId: 'ZIJIN'
H5Standar分支:master-zigong/zijin-register-1611
 
// 绵阳银行
加密方式: 标版 RSA(SHA1)
site: '10031'
siteName: 'mianyangyinhang'
appId: 'MIANYANG'
H5Standar分支:master-zigong/mianyang-upsign-1701
 
// 吉林银行
加密方式: 标版 RSA(SHA1)
site: '10012'
siteName: 'jilinyinghang'
appId: 'JILIN'
H5Standar分支:master-zigong/jilin-zajindan-1611
 
// 贵阳银行
加密方式: 标版 RSA(SHA1)
site: '10039'
siteName: 'guiyangyinghang'
appId: 'GUIYANG'
H5Standar分支:dev-guiyang-agent-1702/guiyang-agent-1702
 
 
// 重庆银行【待调试】
加密方式：RSA(DES) [RSA不带服务器时间CurTime]
site: '10038'
siteName: 'chongqingyihang'
appId: 'CHONGQING'
iv: 12345678
key: cqcrbank
mode: CBC
padding: Pkcs7

