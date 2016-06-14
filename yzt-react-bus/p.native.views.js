/**
 * Created by lixiaoxi on 16/4/15.
 * description    保持同步，YZTURLDefine.m
 */

const NATIVE_URLS = {

    // 登录的URL参数，是否强制登录，1为强制登录
    kYZTURLLoginParameterForce: 'force',

    // 首页（home） - 首页tab
    kYZTURLHome: 'patoa://pingan.com/home',

    // 首页（home） - 金融旗舰店tab
    kYZTURLShop: 'patoa://pingan.com/shop',

    // 首页（home） - 财经快讯tab
    kYZTURLNews: 'patoa://pingan.com/news',

    // 首页（home） - 我tab
    kYZTURLUser: 'patoa://pingan.com/user',

    // 首页（home） - 更多工具
    kYZTURLHomeTool: 'patoa://pingan.com/home/tool',

    // 金融旗舰（shop） - 投资
    kYZTURLShopInvestment: 'patoa://pingan.com/shop/investment',

    // 金融旗舰（shop） - 保险
    kYZTURLShopInsurance: 'patoa://pingan.com/shop/insurance',

    // 金融旗舰（shop） - 贷款
    kYZTURLShopLoan: 'patoa://pingan.com/shop/loan',

    // 金融旗舰（shop） - 信用卡
    kYZTURLShopCreditCard: 'patoa://pingan.com/shop/credit-card',

    // 金融旗舰（shop） - 简单理财
    kYZTURLShopFund: 'patoa://pingan.com/shop/fund',

    // 金融旗舰（shop） - 右下角专家链接
    kYZTURLShopAdviser: 'patoa://pingan.com/shop/adviser',

    // 财经快讯（news） - 直播
    kYZTURLNewsLive: 'patoa://pingan.com/news/live',

    // 财经快讯（news） - A股直播
    kYZTURLNewsLiveAShares: 'patoa://pingan.com/news/live/a-shares',

    // 财经快讯（news） - 要闻
    kYZTURLNewsHeadline: 'patoa://pingan.com/news/headline',

    // 财经快讯（news） - 专题
    kYZTURLNewsSeminar: 'patoa://pingan.com/news/seminar',

    // 财经快讯（news） - 选股
    kYZTURLNewsStock: 'patoa://pingan.com/news/stock',

    // 财经快讯（news） - 资讯详情
    kYZTURLNewsDetail: 'patoa://pingan.com/news/detail',

    // 用户中心（user） - 登录
    kYZTURLLogin: 'patoa://pingan.com/login',

    // 用户中心（user） - 用户信息编辑
    kYZTURLUserEdit: 'patoa://pingan.com/user/edit',

    // 用户中心（user） - 实名认证页
    kYZTURLUserIdentify: 'patoa://pingan.com/user/identify',

    // 用户中心（user） - 修改密码
    kYZTURLUserChangePwd: 'patoa://pingan.com/user/change-pwd',

    // 用户中心（user） - 健康账户
    kYZTURLUserHealth: 'patoa://pingan.com/user/health',

    // 用户中心（user） - 我的资产
    kYZTURLUserAsset: 'patoa://pingan.com/user/asset',

    // 用户中心（user） - 我的资产添加
    kYZTURLUserAssetAdd: 'patoa://pingan.com/user/asset/add',

    // 用户中心（user） - 订单中心
    kYZTURLUserOrder: 'patoa://pingan.com/user/order',

    // 用户中心（user） - 账户余额
    kYZTURLUserBalance: 'patoa://pingan.com/user/balance',

    // 用户中心（user） - 设置手机号
    kYZTURLUserSetMobile: 'patoa://pingan.com/user/set-mobile',

    // 用户中心（user） - 我的收藏
    kYZTURLUserFavorite: 'patoa://pingan.com/user/favorite',

    // 存款（deposit） - 存款首页
    kYZTURLDeposit: 'patoa://pingan.com/deposit',

    // 存款（deposit） - 存款添加
    kYZTURLDepositAdd: 'patoa://pingan.com/deposit/add',

    // 存款（deposit） - 银行卡管理
    kYZTURLDepositBankCard: 'patoa://pingan.com/deposit/bank-card',

    // 存款（deposit） - 银行卡加挂
    kYZTURLDepositBankCardAdd: 'patoa://pingan.com/deposit/bank-card/add',

    // 消息中心（message） - 消息首页
    kYZTURLMessage: 'patoa://pingan.com/message',

    // 财富（wealth） - 财富体检首页
    kYZTURLWealthHealth: 'patoa://pingan.com/wealth/health',

    // 财富（wealth） - 财富顾问问卷
    kYZTURLWealthAdviser: 'patoa://pingan.com/wealth/adviser',

    // 财富（wealth） - 财富排名
    kYZTURLWealthRank: 'patoa://pingan.com/wealth/rank',

    // 财富（wealth） - 财富加速器
    kYZTURLWealthAccelerator: 'patoa://pingan.com/wealth/accelerator',

    // 财富加速器(accelerator) - 流动性
    kYZTURLAcceleratorMobility: 'patoa://pingan.com/wealth/accelerator/mobility',
    // 财富加速器(accelerator) - 投资分布
    kYZTURLAcceleratorInvestPreference: 'patoa://pingan.com/wealth/accelerator/investPreference',

    // 资金钱袋（free-money） - 资金钱袋页
    kYZTURLFreeMoney: 'patoa://pingan.com/free-money',

    // 理财&基金（fund） - 理财&基金首页
    kYZTURLFund: 'patoa://pingan.com/fund',

    // 理财&基金（fund） - 一账通宝
    kYZTURLFundToapay: 'patoa://pingan.com/fund/toapay',

    // 理财&基金（fund） - 一账通宝交易
    kYZTURLFundToapayTransaction: 'patoa://pingan.com/fund/toapay/transaction',

    // 理财&基金（fund） - 一账通宝开户
    kYZTURLFundToapayRegister: 'patoa://pingan.com/fund/toapay/register',

    // 理财&基金（fund） - 理财&基金添加（手工）
    kYZTURLFundAddManual: 'patoa://pingan.com/fund/add/manual',

    // 理财&基金（fund） - 理财&基金添加
    kYZTURLFundAdd: 'patoa://pingan.com/fund/add',

    // 理财&基金（fund） - 理财likeU
    kYZTURLFinancingLikeu: 'patoa://pingan.com/financing/likeu',

    // 理财&基金（fund） - 理财计算器
    kYZTURLFinancingTool: 'patoa://pingan.com/financing/tool',

    // 理财&基金（fund） - 理财专家咨询
    kYZTURLFinancingAdviser: 'patoa://pingan.com/financing/adviser',

    // 理财&基金（fund） - 理财手工添加详细页
    kYZTURLFundAddManualDetail: 'patoa://pingan.com/fund/add/manual/detail',

    // 股票（stock） - 股票首页
    kYZTURLStock: 'patoa://pingan.com/stock',

    // 股票（stock） - 股票开户
    kYZTURLStockRegister: 'patoa://pingan.com/stock/register',

    // 股票（stock） - 股票账户加挂
    kYZTURLStockAdd: 'patoa://pingan.com/stock/add',

    // 股票（stock） - 股票账户加挂（自动）
    kYZTURLStockAddAuto: 'patoa://pingan.com/stock/add/auto',

    // 股票（stock） - 股票账户加挂（手工）
    kYZTURLStockAddManual: 'patoa://pingan.com/stock/add/manual',

    // 股票（stock） - A股直播
    kYZTURLStockASharesLive: 'patoa://pingan.com/stock/a-shares-live',

    // 股票（stock） - 选股宝
    kYZTURLStockInvestHelper: 'patoa://pingan.com/stock/invest-helper',

    // 股票（stock） - 专家咨询
    kYZTURLStockAdviser: 'patoa://pingan.com/stock/adviser',

    // 信用（credit） - 信用页
    kYZTURLCredit: 'patoa://pingan.com/credit',

    // 信用（credit） - 任意购
    kYZTURLCreditAnybuy: 'patoa://pingan.com/credit/anybuy',

    // 权益（benefit） - 权益页
    kYZTURLBenefit: 'patoa://pingan.com/benefit',

    // 房产（house） - 房产首页
    kYZTURLHouse: 'patoa://pingan.com/house',

    // 房产（house） - 房产添加
    kYZTURLHouseAdd: 'patoa://pingan.com/house/add',

    // 房产（house） - 公积金添加
    kYZTURLHouseHousingFundAdd: 'patoa://pingan.com/house/housing-fund/add',

    // 房产（house） - 公积金
    kYZTURLHouseHousingFund: 'patoa://pingan.com/house/housing-fund',

    // 房产（house） - 房产估值
    kYZTURLHouseRevalue: 'patoa://pingan.com/house/revalue',

    // 房产（house） - 贷款计算器
    kYZTURLHouseTool: 'patoa://pingan.com/house/tool',

    // 车子(car) - 车子首页
    kYZTURLCar: 'patoa://pingan.com/car',

    // 车子(car) - 车子添加
    kYZTURLCarAdd: 'patoa://pingan.com/car/add',

    // 车子(car) - 车子小工具
    kYZTURLCarTool: 'patoa://pingan.com/car/tool',

    // 车子(car) - 车违章
    kYZTURLCarViolation: 'patoa://pingan.com/car/violation',

    // 车子(car) - 车估值
    kYZTURLCarRevalue: 'patoa://pingan.com/car/revalue',

    // 车子(car) - 平安行
    kYZTURLCarPingango: 'patoa://pingan.com/car/pingango',

    // 车子(car) - 车主信用卡
    kYZTURLCarCreditCard: 'patoa://pingan.com/car/credit-card',

    // 信用卡（credit-card） - 信用卡首页
    kYZTURLCreditCard: 'patoa://pingan.com/credit-card',

    // 信用卡（credit-card） - 信用卡申请
    kYZTURLCreditCardRegister: 'patoa://pingan.com/credit-card/register',

    // 信用卡（credit-card） - 信用卡加挂
    kYZTURLCreditCardAdd: 'patoa://pingan.com/credit-card/add',

    // 信用卡（credit-card） - 信用卡账单列表
    kYZTURLCreditCardBill: 'patoa://pingan.com/credit-card/bill',

    // 信用卡（credit-card） - 信用卡账单详情
    kYZTURLCreditCardBillMonth: 'patoa://pingan.com/credit-card/bill/month',

    // 信用卡（credit-card） - 信用卡分析
    kYZTURLCreditCardBillAnalysis: 'patoa://pingan.com/credit-card/bill/analysis',

    // 信用卡（credit-card） - 信用卡本期账单
    kYZTURLCreditCardBillCurrent: 'patoa://pingan.com/credit-card/bill/current',

    // 信用卡（credit-card） - 信用卡还款
    kYZTURLCreditCardPayback: 'patoa://pingan.com/credit-card/payback',

    // 信用卡（credit-card） - 信用卡一账通宝还款
    kYZTURLCreditCardPaybackToapay: 'patoa://pingan.com/credit-card/payback/toapay',

    // 信用卡（credit-card） - 信用卡办卡进度
    kYZTURLCreditCardRegisterProgress: 'patoa://pingan.com/credit-card/register-progress',

    // 信用卡（credit-card） - 信用卡分期
    kYZTURLCreditCardPaybackTerms: 'patoa://pingan.com/credit-card/payback/terms',

    // 贷款（loan） - 贷款首页
    kYZTURLLoan: 'patoa://pingan.com/loan',

    // 贷款（loan） - 车贷（购车贷款）
    kYZTURLLoanCar: 'patoa://pingan.com/loan/car',

    // 贷款（loan） - 房贷
    kYZTURLLoanHouse: 'patoa://pingan.com/loan/house',

    // 贷款（loan） - 应急钱包
    kYZTURLLoanEmergencyWallet: 'patoa://pingan.com/loan/emergency-wallet',

    // 贷款（loan） - 贷你还
    kYZTURLLoanLoanUBack: 'patoa://pingan.com/loan/loan-u-back',

    // 贷款（loan） - 贷款添加
    kYZTURLLoanAdd: 'patoa://pingan.com/loan/add',

    // 贷款（loan） - 卡优贷
    kYZTURLLoanCardULoan: 'patoa://pingan.com/loan/card-u-loan',

    // 贷款（loan） - 智能贷款
    kYZTURLLoanRecommend: 'patoa://pingan.com/loan/recommend',

    // 保险（insurance） - 保险首页
    kYZTURLInsurance: 'patoa://pingan.com/insurance',

    // 保险（insurance） - 保险添加
    kYZTURLInsuranceAdd: 'patoa://pingan.com/insurance/add',

    // 保险（insurance） - 车保险
    kYZTURLInsuranceCar: 'patoa://pingan.com/insurance/car',

    // 保险（insurance） - 五险一金
    kYZTURLSocialInsurance: 'patoa://pingan.com/social-insurance',

    // 保险（insurance） - 五险一金添加
    kYZTURLSocialInsuranceAdd: 'patoa://pingan.com/social-insurance/add',

    // 保险（insurance） - 智能保险
    kYZTURLInsuranceRecommend: 'patoa://pingan.com/insurance/recommend',

    // 积分（point） - 积分首页
    kYZTURLPoint: 'patoa://pingan.com/point',

    // 积分（point） - 万里通积分查询
    kYZTURLPointQuery: 'patoa://pingan.com/point/query',

    // 积分（point） - 积分添加
    kYZTURLPointAdd: 'patoa://pingan.com/point/add',

    // 卡包（cardbag） - 卡包首页
    kYZTURLCardbag: 'patoa://pingan.com/cardbag',

    // 卡包（cardbag） - 卡包添加
    kYZTURLCardbagAdd: 'patoa://pingan.com/cardbag/add',

    // LBS（lbs） - 银行网点
    kYZTURLLbsBank: 'patoa://pingan.com/lbs/bank',

    // LBS（lbs） - 保险网点
    kYZTURLLbsInsurance: 'patoa://pingan.com/lbs/insurance',

    // LBS（lbs） - 券商网点
    kYZTURLLbsStock: 'patoa://pingan.com/lbs/stock',

    // LBS（lbs） - 周边服务
    kYZTURLLbsCarService: 'patoa://pingan.com/lbs/car-service',

    // 活动中心（activity） - 活动中心
    kYZTURLActivity: 'patoa://pingan.com/activity',

    // 投资（investment） - 智能投资
    kYZTURLInvestmentRecommend: 'patoa://pingan.com/investment/recommend',

    // 投资（investment） - 投资分析
    kYZTURLInvestmentAnalysis: 'patoa://pingan.com/investment/analysis',

    // 记账本（account-book） - 记账本
    kYZTURLAccountBook: 'patoa://pingan.com/account-book',

    // 其他（misc） - 一键挂失
    kYZTURLMiscLossReporting: 'patoa://pingan.com/misc/loss-reporting',

    // 陆金所 陆金所理财
    kYZTURLShopVendorLufax: 'patoa://pingan.com/shop/vendor/lufax',

};

export default NATIVE_URLS;

