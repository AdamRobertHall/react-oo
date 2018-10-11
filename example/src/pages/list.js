import React, { Component } from 'react'
import Popconfirm from 'antd/lib/popconfirm'
import Table from 'antd/lib/table'
import {PageCreator, Search} from 'react-oo';
import Modify from './modify'
import New from './new'
import Detail from './detail'
import {getConfig} from '../defautConfig'
import * as Action from '../action'
const {configToColumn, configToItemProps} = PageCreator;
let mainSearchFeilds = [];
let moreSearchFeilds = [];
class List extends Component {
    constructor() {
        super();
        this.state = {
            searchFields: {},
            showMore: false,
            page: 1,
            pageSize: 10,
            list: [],
            totalElements: 0,
            tableConfig: [],
            sorter: {},
            update: false,
        };
    }

    componentWillMount() {
        const {searchFields} = this.state;
        this.getList(searchFields);
    }

    getList(searchFields) {
        let list = Action.getList(searchFields, mainSearchFeilds, moreSearchFeilds);
        this.setState({list, totalElements: list.length})
    }

    resetSearch() {
        this.setState({ searchFields: {} });
    }

    handleMore() {
        this.setState({showMore: !this.state.showMore});
    }

    onSearch(sql, searchFields) {
        this.setState({ page: 1, searchFields: searchFields });
        this.getList(searchFields);
    }

    handleTableChange(pagination, filters, sorter) {
		let page = pagination.current;
		let pageSize = pagination.pageSize;
		if (pageSize !== this.state.pageSize) {
			page = 1;
		}
        if (sorter.field !== this.state.sorter.field || sorter.order !== this.state.sorter.order) {
            this.setState({sorter: sorter});
			page = 1;		
        }
        this.setState({page: page, pageSize:pageSize});
    }
    del(id) {
        Action.del(id);
        this.refresh();
    }

    refresh() {
        const {searchFields} = this.state;
        this.getList(searchFields);
    }
    
    render () {
        let tableConfig = getConfig();
        let {searchFields, showMore, list, totalElements, page, pageSize} = this.state;
        let scrollx = 0;
        let columns = [];
        let searchFormFields = [];
        tableConfig.forEach(config => {
            if (config.isShow === '1') {
                if (config.isQuery === '1') {
                    searchFormFields.push(configToItemProps(config, null, searchFields[config.dataIndex], null, true, true));
                }
                scrollx += config.width;
                columns.push(configToColumn(config, col => {
                    if (col.sorter) {
                        col.sorter = global.sortByKeyAndType(col.dataIndex, col.dataType);
                    }
                    return col;
                }));
            }
        });
        columns.unshift({
            title: '序号',
            key: 'index',
            width: 60,
            fixed: 'left',
            render: (text, record, index) => {
                let ret = index + 1 + (page - 1) * pageSize;
                return ret;
            }
        });
        columns.push({
            title: '操作',
            dataIndex: 'id',
            key: 'operation',
            width: 220,
            fixed: 'right',
            render: (text, record) => {
                let split = <span className="ant-divider"/>
                let detial = <Detail data={record} tableConfig={tableConfig} refresh={this.refresh.bind(this)}/>;
                let edit = <Modify data={record} tableConfig={tableConfig} refresh={this.refresh.bind(this)}/>;
                let del = <Popconfirm title="确定要删除这条数据吗？" onConfirm={this.del.bind(this, text)}>
                    <a>删除</a>
                </Popconfirm>
                return <span>{edit}{split}{del}{split}{detial}</span>;
            }
        })
        scrollx += 280;
        mainSearchFeilds = [];
        moreSearchFeilds = [];
        searchFormFields.forEach(field => {
            if (['c1', 'c2'].indexOf(field.id) !== -1) {
                mainSearchFeilds.push(field);
            } else {
                moreSearchFeilds.push(field);
            }
        });
        let pagination = {};
        pagination.showSizeChanger = true;
        pagination.showQuickJumper = true;
        pagination.showTotal = () => `共${totalElements}条`;
        pagination.current = page;
        pagination.pageSize = pageSize;
        pagination.pageSizeOptions = ['10', '20', '50', '100'];
        pagination.total = totalElements;
        return <div style={{margin: 8}}>
            <Search
                mainSearchFeilds={mainSearchFeilds}
                cols={global.cols}
                moreSearchFeilds={moreSearchFeilds}
                handleMore={this.handleMore.bind(this)}
                onSearch={this.onSearch.bind(this)}
                resetSearch={this.resetSearch.bind(this)}
                placeholder='请输入订单名称或客户名称'
                searchFields={searchFields}
                showMore={showMore}
                btnName='搜索'
                simpleText='精简搜素条件'
                moreText='更多搜索条件'
            />
            <New tableConfig={tableConfig} refresh={this.refresh.bind(this)}/>
            <Table
                scroll={{ x: scrollx }}
                columns={columns}
                dataSource={list}
                onChange={this.handleTableChange.bind(this)}
                rowKey={record => record.id}
                pagination={pagination}
            />
        </div>
    }
}
export default List