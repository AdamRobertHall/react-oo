import React, { Component } from 'react'
import Button from 'antd/lib/button'
import Modal from 'antd/lib/modal'
import Fields from './fields'
import * as Action from '../action'

class New extends Component {
    constructor() {
        super();
        this.state = {
            visible: false
        }
    }
    onCancel() {
        this.setState({visible: false});
    }
    onOk() {
        let hasError = false;
        // 校验数据
		this.formRef.props.form.validateFields((errors, values) => {
			if (!!errors) {
                hasError = true;
				return;
			}
        });
        if (hasError) {
            return;
        }
        let record = this.formRef.props.form.getFieldsValue();
        Action.add(record);
        this.props.refresh && this.props.refresh();
        this.setState({visible: false});
    }
    
    render() {
        let cw = document.documentElement.clientWidth || document.body.clientWidth;
        return <span>
            <Button type='primary' onClick={() => { this.setState({visible: true})}}>新增</Button>
            {this.state.visible && <Modal
                title='新增'
                visible={this.state.visible}
                onCancel={this.onCancel.bind(this)}
                onClose={this.onCancel.bind(this)}
                maskClosable={false}
                width={cw - 100}
                onOk={this.onOk.bind(this)}
            >
                <Fields 
                    {...this.props}
                    wrappedComponentRef={(inst) => this.formRef = inst} 
                    action='new'
                />
            </Modal>
            }
        </span>
    }
}
export default New;