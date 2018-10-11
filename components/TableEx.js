import React, {Component} from 'react'
import Form from 'antd/lib/form'
import Table from 'antd/lib/table'
import Modal from 'antd/lib/modal'
import Popconfirm from 'antd/lib/popconfirm'
class TableEx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: {}
        }
    }
    getRowKey(rowKey, record) {
        if (rowKey) {
            if (typeof rowKey === 'function') {
                return rowKey(record);
            } else if (typeof rowKey === 'string') {
                return record[rowKey];
            } else {
                console.error('the type of rowKey must be string or function');
                return record.id;
            }
        } else {
            return record.id;
        }
    }
    // 将传入参数分配给getFieldDecorator和组件本身
    transProps(props){
        let objProps = {};
        let formProps = {};
        for (let key in props) {
            // 需要在getFieldDecorator 中定义的参数
            if (['initialValue', 'onChange', 'valuePropName', 'trigger', 'validateTrigger', 'exclusive', 'rules'].indexOf(key) !== -1) {
                formProps[key] = props[key];
            } else {
                // 组件的其他参数
                objProps[key] = props[key];
            }
        }
        return { objProps, formProps };
    }
    /**
     * 保存
     * @param {*} id 
     * @param {*} record 
     * @param {*} index 
     */
    onSave(id, record, index) {
        let hasError = false;
        // 第一次校验
		this.props.form.validateFields((errors, values) => {
			if (!!errors) {
				console.log(errors, 'errors');
				hasError = true;
				return;
			}
        });
        // revalidate 校验出发时机为onBlur离开时，所以需要重新校验
        this.props.form.validateFields((errors, values) => {
			if (!!errors) {
				console.log(errors, 'errors');
				hasError = true;
				return;
			}
        });
        if (hasError) {
			return;
		}
		let data = Object.assign({}, record);
		this.props.columns.map((col) => {
			if (col.component) {
				if (typeof (col.component) == 'function') {
					if (col.component(id, record, index)) {
						data[col.dataIndex] = this.props.form.getFieldValue(col.dataIndex + index);
					}
				}
				else {
					data[col.dataIndex] = this.props.form.getFieldValue(col.dataIndex + index);
				}
            }
            return col;
		})
		if (this.props.onSave && this.props.onSave(id, data, index)) {
            let disabled = this.state.disabled;
            disabled[id] = true;
			this.setState({ disabled });
        }
	}

    /**
     * 点击编辑时
     * @param {*} id 
     * @param {*} record 
     * @param {*} index 
     */
	onEdit(id, record, index) {
		if (this.isEditing()) {
			return;
        }
        let disabled = this.state.disabled;
        disabled[id] = false;
		this.setState({ disabled });
		if (this.props.onEdit) {
			this.props.onEdit(id, record, index);
		}
    }
    /**
     * 编辑取消
     * @param {*} id 
     * @param {*} record 
     * @param {*} index 
     */
	onEditCancle(id, record, index) {
        let disabled = this.state.disabled;
        disabled[id] = true;
		this.setState({ disabled });
        this.props.onEditCancle && this.props.onEditCancle(id, record, index);
    }
    /**
     * 删除操作
     * @param {*} id 
     * @param {*} record 
     * @param {*} index 
     */
	onDel(id, record, index) {// 删除操作
		let disabled = this.state.disabled;
        disabled[id] = true;
		this.setState({ disabled });
		this.props.onDel && this.props.onDel(id, record, index);
    }
    /**
     * 新增数据保存操作
     */
	onAdd() {
		let hasError = false;
		this.props.form.validateFields((errors, values) => {
			if (!!errors) {
				hasError = true;
				return;
			}
        });
        this.props.form.validateFields((errors, values) => {
			if (!!errors) {
				hasError = true;
				return;
			}
		});
		if (hasError) {
			return;
		}
		let data = {};
		this.props.columns.map((col) => {
            data[col.dataIndex] = this.props.form.getFieldValue(col.dataIndex);
            return col;
		});

		if (this.props.onAdd) {
			if (this.props.onAdd(data) !== true) {
				return;
			}
		}
		let dataNull = {};
		this.props.columns.map((col) => {
            dataNull[col.dataIndex] = null;
            return col;
		});
        this.props.form.setFieldsValue(dataNull);
        let disabled = this.state.disabled;
        disabled['new'] = true;
		this.setState({ disabled });
    }
    /**
     * 新增取消
     */
	onCancle() {
		this.props.onCancle && this.props.onCancle();
		let dataNull = {};
		this.props.columns.map((col) => {
            dataNull[col.dataIndex] = null;
            return col;
		});
        this.props.form.setFieldsValue(dataNull);
        let disabled = this.state.disabled;
        disabled['new'] = true;
		this.setState({ disabled });
		return true;
	}
    /**
     * 判断是否处于编辑状态
     */
	isEditing() {
        if (this.props.allwaysEdit) {
            return true;
        }
		let recordHasDisable = false;
		this.props.dataSource.map(record => {
			if (record.disabled === false) {
				recordHasDisable = true;
			}
			return record;
		});
		if (Object.values(this.state.disabled).some(value => value === false) || recordHasDisable) {
			Modal.warning({
				title: '提示',
				content: '请先保存正在修改的数据！',
			});
			return true;
		}
		return false;
	}
    render() {
        const {getFieldDecorator} = this.props.form;
        const {allwaysEdit} = this.props;
        let columns = this.props.columns || [];
        let hasComponent = false;
        // 判断是否定义编辑组件
        for (let col of columns) {
            if (col.component) {
                hasComponent = true;
                break;
            }
        }
        // 组件占满表格单元格
        let componentStyle = { color: '#666', width: '100%' };
        // 编辑状态下使用定义组件进行渲染
        columns = columns.map(oldCol => {
            let col = Object.assign({}, oldCol);
            col.render = (text, record, index) => {
                let component = col.component;
                if (typeof component === 'function') {
                    component = component(text, record, index);
                }
                let ret = text;
                let rowKey = this.getRowKey(this.props.rowKey, record);
                let disabled = this.state.disabled[rowKey];
                // disabled 未定义时不编辑
                if (disabled == null ) {
                    disabled = true;
                }
                // 新增行
                if (record.id === 'new') {
                    component = col.componentAdd || component;
                    disabled = false;
                }
                // 记录控制编辑状态
                if (record.disabled === false) {
                    disabled = false;
                }
                // 先处理操作列
                if ((!allwaysEdit) && col.key === 'operation' && hasComponent) {
                    let operDisabled = false;
                    let isShowDel = false
                    if (col.isShowDel) {//TableEx中是否直接渲染删除操作
                        isShowDel = true
                    }
                    // 如果col 的disabled属性为true不显示编辑操作
                    if (typeof col.disabled === 'function') {
                        operDisabled = col.disabled(text, record, index) || false;
                    }
                    // 保存 id为new标识新增数据
                    let onSave = this.onSave.bind(this, rowKey, record, index);
                    if (record.id === 'new') {
                        onSave = this.onAdd.bind(this);
                    }
                    return React.createElement('span', {
                        children: [
                            !operDisabled && !this.props.disabled && React.createElement('span', {
                                key: '1',
                                children: [
                                    React.createElement('a', {
                                        key: '2',
                                        onClick: disabled ? this.onEdit.bind(this, rowKey, record, index) : onSave,
                                        children: disabled ? (this.props.editName || '编辑') : (this.props.saveName || '保存')
                                    }),
                                    !disabled && !operDisabled && React.createElement('span', {className:'ant-divider', key: '3'}),
                                    !disabled && React.createElement('span', {
                                        key: '4',
                                        children: React.createElement('a', {
                                            onClick: record.id !== 'new' ? this.onEditCancle.bind(this, rowKey, record, index) : this.onCancle.bind(this),
                                            children: '取消'
                                        })
                                    }),
                                    isShowDel && record.isShowDel != false && React.createElement('span', {
                                        key: '5',
                                        children: [
                                            React.createElement('span', {className:'ant-divider', key: '6'}),
                                            React.createElement(Popconfirm, {
                                                key: '7',
                                                title: "确定要删除这条数据吗？",
                                                onConfirm: this.onDel.bind(this, rowKey, record, index),
                                                onCancel: () => { return },
                                                children: React.createElement('a', {children: '删除'})
                                            })
                                        ]
                                    }),
                                    oldCol.render && React.createElement('span', {className:'ant-divider', key: '8'})
                                ]
                            }),
                            record.id !== 'new' && oldCol.render && oldCol.render(text, record, index)
                        ]
                    })
                }
                // 编辑状态下安装定义组件渲染单元格
                if (component && (allwaysEdit || !disabled)) {
                    let props = component.props || {};
                    let id = col.dataIndex + index;
                    if (record.id === 'new') {
                        id = col.dataIndex;
                    }
                    // 处理传入参数
                    let newProps = this.transProps(props, record)
                    let {objProps, formProps} = newProps;
                    if (formProps.initialValue === undefined) {
						formProps.initialValue = text;
					}
                    ret = React.createElement(Form.Item, {
                        children: getFieldDecorator(id, formProps)(
                            React.createElement(component.name, Object.assign({}, { style: componentStyle }, objProps))
                        )
                    });
                } else {
                    if (oldCol.render) {
                        ret = oldCol.render(text, record, index);
                    }
                }
                return ret;
            };
            return col;
        });
        return React.createElement(Table, Object.assign({}, this.props, {columns: columns}))
    }
}
export default Form.create()(TableEx)