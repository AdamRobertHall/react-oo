import React, { Component } from 'react'
import Modal from 'antd/lib/modal'
import Fields from './fields'
import * as Action from '../action'

class Modify extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            classConfig: []
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
        Action.modify(record, this.props.data);
        this.props.refresh && this.props.refresh();
        this.setState({visible: false});
    }
    
    render() {
        let cw = document.documentElement.clientWidth || document.body.clientWidth;
        return <span>
            <a onClick={() => { this.setState({visible: true}); }}>修改</a>
            {this.state.visible && <Modal
                title='修改'
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
                    action='modify'
                />
            </Modal>
            }
        </span>
    }
}
export default Modify;