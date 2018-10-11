import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import LocaleProvider from 'antd/lib/locale-provider';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import './index.css';
import './utils'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LocaleProvider locale={zh_CN}><App /></LocaleProvider>, document.getElementById('root'));
registerServiceWorker();
