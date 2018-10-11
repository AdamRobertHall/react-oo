/**
 * 初始配置
 */
const defautConfig = [{"name":"订单名称","showName":"订单名称","dataIndex":"c1","isRequire": "1","isShow":"1","width":120,"dataType":"STRING","inputWay":"0","propValues":"","defaultValue":"","isQuery":"1","isSort":"1"},
{"name":"客户","showName":"客户","dataIndex":"c2","isRequire": "1","isShow":"1","width":120,"dataType":"STRING","inputWay":"0","propValues":"","defaultValue":"","isQuery":"1","isSort":"1"},
{"name":"签单时间","showName":"签单时间","dataIndex":"c3","isRequire": "1","isShow":"1","width":120,"dataType":"DATE","inputWay":"0","propValues":"","defaultValue":"","isQuery":"1","isSort":"1"},
{"name":"商品名称","showName":"商品名称","dataIndex":"c4","isShow":"1","width":120,"dataType":"STRING","inputWay":"0","propValues":"","defaultValue":"","isQuery":"1","isSort":"1"},
{"name":"数量","showName":"数量","dataIndex":"c5","isShow":"1","width":120,"dataType":"NUMBER","inputWay":"0","propValues":"","defaultValue":"","isQuery":"1","isSort":"1"},
{"name":"金额","showName":"金额","dataIndex":"c6","isShow":"1","width":120,"dataType":"NUMBER","inputWay":"0","propValues":"","defaultValue":"","isQuery":"1","isSort":"1"},
{"name":"地址","showName":"地址","dataIndex":"c7","isShow":"1","width":300,"dataType":"STRING","inputWay":"0","propValues":"","defaultValue":"","isQuery":"1","isSort":"1"},
{"name":"类型","showName":"类型","dataIndex":"c8","isShow":"1","width":120,"dataType":"STRING","inputWay":"1","propValues":"台式机/笔记本/电脑配件","defaultValue":"","isQuery":"1","isSort":"1"},
{"name":"备注","showName":"备注","dataIndex":"c9","isShow":"1","width":120,"dataType":"STRING","inputWay":"0","propValues":"","defaultValue":"","isQuery":"1","isSort":"1"},
{"name":"收货时间","showName":"收货时间","dataIndex":"c10","isShow":"1","width":160,"dataType":"TIME","inputWay":"0","propValues":"","defaultValue":"","isQuery":"1","isSort":"1"},
{"name":"保留字段1","showName":"保留字段1","dataIndex":"c11","isShow":"1","width":120,"dataType":"STRING","inputWay":"0","propValues":"","defaultValue":"","isQuery":"0","isSort":"0"},
{"name":"保留字段2","showName":"保留字段2","dataIndex":"c12","isShow":"0","width":120,"dataType":"STRING","inputWay":"0","propValues":"","defaultValue":"","isQuery":"0","isSort":"0"},
{"name":"保留字段3","showName":"保留字段3","dataIndex":"c13","isShow":"0","width":120,"dataType":"STRING","inputWay":"0","propValues":"","defaultValue":"","isQuery":"0","isSort":"0"},
{"name":"保留字段4","showName":"保留字段4","dataIndex":"c14","isShow":"0","width":120,"dataType":"STRING","inputWay":"0","propValues":"","defaultValue":"","isQuery":"0","isSort":"0"},
{"name":"保留字段5","showName":"保留字段5","dataIndex":"c15","isShow":"0","width":120,"dataType":"STRING","inputWay":"0","propValues":"","defaultValue":"","isQuery":"0","isSort":"0"},
{"name":"保留字段6","showName":"保留字段6","dataIndex":"c16","isShow":"0","width":120,"dataType":"STRING","inputWay":"0","propValues":"","defaultValue":"","isQuery":"0","isSort":"0"},
{"name":"保留字段7","showName":"保留字段7","dataIndex":"c17","isShow":"0","width":120,"dataType":"STRING","inputWay":"0","propValues":"","defaultValue":"","isQuery":"0","isSort":"0"},
{"name":"保留字段8","showName":"保留字段8","dataIndex":"c18","isShow":"0","width":120,"dataType":"STRING","inputWay":"0","propValues":"","defaultValue":"","isQuery":"0","isSort":"0"}];

/**
 * 初始数据
 */
const defaultList = [{"c1":"台式电脑7台","c2":"莱奥教育","c3":"2018-10-11T03:48:48.277Z","c4":"惠普NW79","c5":"7","c6":"21000","c7":"西安市雁塔区电子西街34号","id":"aa0a91b0-cc66-11e8-8660-95934e1851e1","c8":"0","c10":"2018-10-02T08:54:48.166Z"},
{"c1":"游戏笔记本","c2":"李四","c3":"2018-09-13T08:26:15.003Z","c4":"地球人","c5":"1","c6":"130000","c7":"地球村","id":"3aa9d7e0-cc66-11e8-8660-95934e1851e1","c8":"1","c10":"2018-10-08T08:53:58.344Z"},
{"c1":"办公用品","c2":"西安恒通","c3":"2018-10-09T07:53:25.590Z","c4":"台式电脑","c5":"3","c6":"12000","c7":"陕西省西安市莲湖区","id":"c6fa5a30-cc61-11e8-9f03-fd9b9358bd6e","c8":"0","c10":"2018-10-11T03:51:27.706Z"},
{"c1":"键盘","c2":"延长石油","c3":"2018-10-18T07:57:08.731Z","c4":"键盘","c5":"10","c6":"500","id":"2ad98580-cc62-11e8-9f03-fd9b9358bd6e","c7":"西安市高新区光泰路1号"},
{"c1":"显示器","c2":"滴滴出行","c3":"2018-10-08T07:58:44.510Z","c4":"显示器","c5":"20","c6":"18000","id":"5da9a3a0-cc62-11e8-9f03-fd9b9358bd6e","c7":"西安市光泰路凯威大厦1307室"},
{"c1":"内存条","c2":"陕西星航","c3":"2018-10-08T08:09:01.465Z","c4":"内存条8G","c5":"10","c6":"8000","c7":"西安市科技三路55号","c8":"电脑配件","id":"ea79ce80-cc63-11e8-b69e-db91ce44a890"},
{"c1":"鼠标垫","c2":"西安克劳德","c3":"2018-10-09T08:10:44.746Z","c4":"鼠标垫","c5":"20","c6":"20","c7":"西安市光泰路凯威大厦1306","c8":"2","id":"224a2300-cc64-11e8-b69e-db91ce44a890"},
{"c1":"耳机","c2":"航天771所","c3":"2018-10-04T08:12:37.688Z","c4":"耳机","c5":"20","c6":"300","c7":"西安市科技二路5号","id":"5ac66ef0-cc64-11e8-b69e-db91ce44a890"},
{"c1":"音箱","c2":"张先生","c3":"2018-09-20T08:14:07.933Z","c4":"音箱","c5":"1","c6":"180","c7":"西安市","id":"84fb55a0-cc64-11e8-b69e-db91ce44a890"},
{"c1":"摄像头","c2":"网吧","c3":"2018-09-14T08:15:20.563Z","c5":"100","c6":"3500","c7":"甘家寨东三24排网吧","id":"ab5d3b50-cc64-11e8-b69e-db91ce44a890","c4":"台式机摄像头"},
{"c1":"台式机","c2":"甘家寨东三24排网吧","c3":"2018-10-09T08:16:23.467Z","c4":"台式机","c5":"100","c6":"400000","c7":"甘家寨东三24排网吧","id":"d2f0c330-cc64-11e8-b69e-db91ce44a890"},
{"c1":"台式机CPU","c2":"王小二","c3":"2018-09-20T08:20:47.924Z","c4":"英特尔CPU7代8核16线程","c5":"1","c6":"2600","c7":"西安市长安区郭杜镇幸福里小区7#1506","id":"6cba6c00-cc65-11e8-b69e-db91ce44a890"},
{"c1":"笔记本","c2":"杜先生","c3":"2018-09-29T08:21:17.420Z","c4":"华硕N9S7","c5":"1","c6":"14000","c7":"西安市长安区","id":"9749cec0-cc65-11e8-b69e-db91ce44a890"}]

/**
 * 配置初始化
 */
export function initConfig() {
    let config = window.localStorage.getItem('config');
    // 如果localStorage已经有值则使用现有值，只有第一次才使用默认值
    if (config === null || config === undefined) {
        window.localStorage.setItem('config', JSON.stringify(defautConfig));
    }
}

/**
 * 数据初始化
 */
export function initList() {
    let list = window.localStorage.getItem('list');
    // 如果localStorage已经有值则使用现有值，只有第一次才使用默认值
    if (list === null || list === undefined) {
        window.localStorage.setItem('list', JSON.stringify(defaultList));
    }
}

/**
 * 设置配置
 */
export function setConfig(config) {
    window.localStorage.setItem('config', JSON.stringify(config));
}

 /**
  * 获取配置
  */
export function getConfig() {
    let config = window.localStorage.getItem('config');
    if (config) {
        return global.parseArray(config);
    }
    return defautConfig;
}