This is tool kit for starting a new ReactJS peoject quickly.
All you need todo is the following:

```javascript
1. sudo npm install cus-react-kit -g;
2. react-kit [ProjectName]
```

It will take about 10 mins to download dependencies such as babel@6.5.0 , react-redux and so on;


If you wanna to run  npm install & npm start by yourself, you can use:

```javascript
// 推荐用法, 后续使用yarn install 安装依赖
react-kit [ProjectName] --pure      
```

After project complete, you can use following commands

```javascript
npm start // use for dev, it will create a server and run your project
npm run deploy  // package your project to /dist for deploying.
```

##  changelog: @since 2017.2.23

* 1. Change our package shell to Yarn,
* 2. This can fix the issues that it doesnot work after running 'npm install'
* 3. Also yarn can help us remove the extraous or depecrated packages.  


##  changelog: @since 2016.7.4
* 1. Add api module, 
* 2. add getting the current environment.


How to use Api module?
1. Configure all the ajax request in **api/index.js**;
2. Configure all the ajax request url in **api/ApiList.js**;
3. Then you can use **import { getProductDetail } from 'api';** in redux actions;
4. After all the above, you can dispatch your action in your view.

How to use environment configuration?
1. You can find the configuration and functions in **src/config.js*
2. Also you can use the functions given by Config such as getEnv(), isMock() and so on;


Things to be done:

~~1. config different environment in project easily.~~
2. thinking ...
3. please give some advices


Then the terminal will show you the dev url like this: http://[YourIP]:3000/

Just try it.

If you have any problems, please concat me with wechat: Creemli. Or creemli@sina.com;
