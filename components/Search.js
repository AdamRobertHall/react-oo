import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {createItems, generateSql} from './PageCreator';
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Input from 'antd/lib/input'
import Form from 'antd/lib/form'
class Search extends Component {
    onSearch() {
        const {mainSearchFeilds, moreSearchFeilds} = this.props;
        let searchFields = this.props.form.getFieldsValue();
        let sql;
        
        if (this.props.showMore) {
            sql = generateSql(searchFields, mainSearchFeilds, moreSearchFeilds)
        } else {
            sql = generateSql(searchFields, mainSearchFeilds)
        }
        this.props.onSearch && this.props.onSearch(sql, searchFields);
    }

    //键盘事件
    keyPress(e) {
        if (e.keyCode === 13) {
            this.onSearch();
        }
    }
    resetSearch() {
        this.props.form.resetFields();
        let dateFields = {};
        for (let field of this.props.moreSearchFeilds) {
            if (['DATE', 'TIME'].indexOf(field.dataType) !== -1) {
                dateFields[field.id] = [undefined, undefined];
            }
        }
        this.props.form.setFieldsValue(dateFields);
        this.props.resetSearch && this.props.resetSearch();
    }
    handleMore() {
        this.props.handleMore && this.props.handleMore();
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        // 从更多查询条件中剔除精简查询条件及Tabs
        let {cols, gutter, moreSearchFeilds} = this.props;
        moreSearchFeilds.map(field => field.param.props.onKeyDown = this.keyPress.bind(this));
        let searchItems = createItems(getFieldDecorator, cols, gutter || 8, moreSearchFeilds, false, true);
        const colLayout = {
            xs: { span: 2 },
            sm: { span: 4 },
            md: { span: 6 },
            lg: { span: 8 }
        }
       
        let simpleText = this.props.simpleText || "精简筛选条件";
        let moreText = this.props.moreText || "更多筛选条件";
        let text = moreText;
        let arrow = React.createElement(Icon, {type: "caret-down", style: { marginTop: 5 }});
        if (this.props.showMore) {
            text = simpleText;
            arrow = React.createElement(Icon, {type: "caret-up", style: { marginTop: 5 }});
        }
        const searchFields = this.props.searchFields || {}
        
        return React.createElement('div', {
            children: [
                React.createElement(Row, {
                    key: 'row1',
                    type: 'flex',
                    justify: 'start',
                    style: { marginBottom: 8 },
                    children: [
                        React.createElement(Col, Object.assign({key: 'col1'}, colLayout,{
                            children: getFieldDecorator('mainKey', {initialValue: searchFields.mainKey})(
                                React.createElement(Input, {
                                    placeholder: this.props.placeholder || "请输入",
                                    onKeyDown: this.keyPress.bind(this)
                                })
                            )
                        })),
                        React.createElement(Col, Object.assign({key: 'col2'}, colLayout,{
                            children: [
                                React.createElement(Button, {
                                    key: 'btn1',
                                    style: {marginLeft: 8},
                                    type: "primary",
                                    onClick: this.onSearch.bind(this),
                                    children: [
                                        React.createElement(Icon, {type: "search"}),
                                        this.props.btnName || '搜索'
                                    ]
                                }),
                                React.createElement(Button, {
                                    key: 'btn2',
                                    style: {marginLeft: 8},
                                    type: "ghost",
                                    onClick: this.resetSearch.bind(this),
                                    children: [
                                        React.createElement(Icon, {type: "reload"}),
                                        '重置'
                                    ]
                                }),
                                React.createElement(Button, {
                                    key: 'btn3',
                                    style: {marginLeft: 8},
                                    type: "ghost",
                                    onClick: this.handleMore.bind(this),
                                    children: [
                                        text,
                                        arrow
                                    ]
                                }),
                            ]
                        }))
                    ]
                }),
                this.props.showMore && searchItems
            ]
        })
    }
}

Search.propTypes = {
    mainSearchFeilds: PropTypes.array,
    cols: PropTypes.number, 
    gutter: PropTypes.number, 
    moreSearchFeilds: PropTypes.array,
    handleMore: PropTypes.func,
    onSearch: PropTypes.func,
    resetSearch: PropTypes.func,
    placeholder: PropTypes.string,
    searchFields: PropTypes.object,
    showMore: PropTypes.bool,
    btnName: PropTypes.string,
    simpleText: PropTypes.string,
    moreText: PropTypes.string,
};
export default Form.create()(Search)