# 解决一帐通H5 埋点问题


* 因为React Dom 不支持未知属性otitle, otype


* 用法

```javascript

import { fixUbtIssue } from '@yzt/react-ubt';


componentDidMount() {
    fixUbtIssue();
}
```