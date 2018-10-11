import React, { Component } from 'react'
import Form from 'antd/lib/form'
import {PageCreator} from 'react-oo'
const {createItems, configToItemProps} = PageCreator;

class Fields extends Component {
    render() {
        let data = this.props.data || {}
        const {getFieldDecorator} = this.props.form;
        /**
         * 基本信息处理
         */
        let tableConfig = this.props.tableConfig || [];
        let formFields = [];
        tableConfig.forEach(config => {
            if (config.isShow === '1') {
                formFields.push(configToItemProps(config, null, data[config.dataIndex], null, false, true));
                
            }
        });

        let formItems = createItems(getFieldDecorator, global.cols, 8, formFields, this.props.action === 'detail');
        
        return <div>
            <h2 style={{marginTop: 16}}>基本信息</h2>
            {formItems}
        </div>
    }
}
export default Form.create()(Fields)