import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Icon from 'antd/lib/icon'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import MyUtils from './MyUtils'

class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: {},       // 所有节点 key:value 键值对 value为true时展开，否则收起
            selected: {},       // 所有节点 key:value 键值对 value为true时选中，否则不选
            expandedKeys: [],   // 所有展开节点 key 数组
            selectedKeys: [],   // 所有选中节点 key 数组
            selectedNodes: [],  // 所有选中节点数组
            treeData: [],
            text: ''
        }
    }

    componentWillMount() {
        let {checkable, checkStrictly, expandedKeys, selectedKeys, defaultSelectedKeys, defaultExpandedKeys,
             defaultExpandAll, defaultExpandRoot, treeData} = this.props;
        let tempExpandedKeys = [];
        let expanded = {};
        let selected = {};
        
        // 默认展开根节点
        if (defaultExpandRoot) {
            if(treeData && treeData.length === 1) {
                tempExpandedKeys = [treeData[0].key];
                expanded[treeData[0].key] = true;
            }
        }
        //console.log(tempExpandedKeys, defaultExpandRoot, 'defaultExpandRoot');
        // 默认展开所有节点
        if (defaultExpandAll) {
            tempExpandedKeys = [];
            MyUtils.traverseTree(treeData, (node) => {
                tempExpandedKeys.push(node.key);
                expanded[node.key] = true;
            });
        }

        // 受控或默认展开和选择的节点
        if (expandedKeys && expandedKeys.length > 0 || defaultExpandedKeys && defaultExpandedKeys.length > 0) {
            expanded = MyUtils.arrayToObj(expandedKeys || defaultExpandedKeys);
        }

        if (selectedKeys && selectedKeys.length > 0 || defaultSelectedKeys && defaultSelectedKeys.length > 0) {
            selected = MyUtils.arrayToObj(selectedKeys || defaultSelectedKeys);
        }
        let selectedNodes = [];
        MyUtils.traverseTree(treeData, (node, parent) => {
            node.parentNode = parent;
            if (selectedKeys && selectedKeys.indexOf(node.key) !== -1) {
                selectedNodes.push(node);
                if (checkable && !checkStrictly) {
                    MyUtils.parentSelect(parent, selected, [], []);
                }
            }
        }, null);
        //console.log(expanded, defaultExpandedKeys, tempExpandedKeys, expandedKeys, 'expanded, defaultExpandedKeys, tempExpandedKeys, expandedKeys');
        this.setState({
            expanded: expanded,
            selected: selected,
            expandedKeys: expandedKeys || defaultExpandedKeys || tempExpandedKeys,
            selectedKeys: selectedKeys || defaultSelectedKeys || [],
            selectedNodes: selectedNodes || [],
            treeData: treeData
        })
    }
    
    /**
     * expandedKeys （受控）展开指定的树节点
     * selectedKeys （受控）选中指定的树节点
     * @param {{expandedKeys, selectedKeys}} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        let {checkable, checkStrictly, treeData, expandedKeys, selectedKeys, defaultExpandRoot} = nextProps;
        let selected = {};
        let expanded = {};
        let tempExpandedKeys = [];
        
        // 默认展开根节点
        if (defaultExpandRoot) {
            if(treeData && treeData.length === 1 && this.props.treeData !== treeData) {
                tempExpandedKeys = [treeData[0].key];
                expanded[treeData[0].key] = true;
                this.setState({
                    expanded: expanded,
                    expandedKeys: tempExpandedKeys,
                })
            }
        }
        if (this.props.selectedKeys !== selectedKeys) {
            selected = MyUtils.arrayToObj(selectedKeys);
            let selectedNodes = [];
            MyUtils.traverseTree(treeData, (node, parent) => {
                node.parentNode = parent;
                if (selectedKeys.indexOf(node.key) !== -1) {
                    selectedNodes.push(node);
                    if (checkable && !checkStrictly) {
                        MyUtils.parentSelect(parent, selected, [], []);
                    }
                }
            }, null);

            this.setState({
                selected: selected,
                selectedKeys: selectedKeys,
                selectedNodes: selectedNodes
            })
        }
        if (this.props.expandedKey !== expandedKeys) {
            expanded = MyUtils.arrayToObj(expandedKeys);    
            this.setState({
                expanded: expanded,
                expandedKeys: expandedKeys,
            })
        }
        if (this.props.treeData !== treeData) {
            this.setState({treeData: treeData})
        }
    }
    
    /**
     * 选择节点事件触发
     * @param {TreeNode} node 
     */
    onSelect(node) {
        let {selectedKeys, selected, expanded, selectedNodes} = this.state;
        const {onSelect, multiple, checkable, checkStrictly} = this.props;
        let isSelected = selected[node.key];
        selected[node.key] = !isSelected;
        // 父子节点关联关系
        let selectNode = (node, isSelect) => {
            if (!!!node || !!!node.children || node.children.length === 0) {
                return;
            }

            if (!expanded[node.key]) {
                return;
            }

            let childNum = 0;
            let childSelectAllNum = 0;
            // 过滤掉禁用节点
            let children = node.children.filter(item => !!!item.disabled);
            // 计算子节点选中数量
            let childrenKeys = children.map(item => {
                if (selected[item.key] === true) {
                    childNum++;
                    childSelectAllNum++;
                }
                if (selected[item.key] === null) {
                    childNum++;
                }
                return item.key;
            });
            children.map(item => {
                selected[item.key] = isSelect;

                // 如果子节点有子节点并处于展开状态，则递归选中
                if (expanded[item.key]) {
                    selectNode(item, isSelect);
                } 
            });
            if (childSelectAllNum === children.length && !isSelect) {  // 当全部选中时且选择的根节点为选中状态
                selectedKeys = selectedKeys.filter(key => -1 === childrenKeys.indexOf(key));
                selectedNodes = selectedNodes.filter(item => -1 === childrenKeys.indexOf(item.key));
            } else if (childNum === 0) {  // 当全没选中时

                selectedKeys = selectedKeys.concat(childrenKeys);
                selectedNodes = selectedNodes.concat(children);
            } else {  // 当部分选中时

                childrenKeys.map(item => {
                    if (selectedKeys.indexOf(item) === -1) {
                        selectedKeys.push(item);
                    }
                });
                children.map(item => {
                    if (selectedKeys.indexOf(item) === -1) {
                        selectedNodes.push(item);
                    }
                });
            }
        }
        
        // 多选父子节点不建立关联关系
        let multipleSelect = () => {
            if (isSelected) {
                selectedKeys = selectedKeys.filter(key => key !== node.key);
                selectedNodes = selectedNodes.filter(item => item.key !== node.key);
            } else {
                selectedKeys.push(node.key);
                selectedNodes.push(node);
            }
        }
        // 单选
        let singleSelect = () => {
            selectedKeys = [node.key];
            selected = {};
            selected[node.key] = true;
            selectedNodes = [node];
        }
        /**
         * 1. 如果定义checkable则建立父子节点关联关系
         * 2. 如果定义checkStrictly则取消父子节点关联关系
         * 3. 如果定义multiple则多选
         */ 

        if (checkable) {
            if (checkStrictly) {
                if (multiple) {
                    multipleSelect();
                } else {
                    singleSelect();
                }
            } else {
                // 先递归处理子节点
                selectNode(node, !isSelected);

                // 然后回溯到根节点
                MyUtils.parentSelect(node.parentNode, selected, selectedKeys, selectedNodes);
                // 最后处理当前节点
                if (!isSelected) {
                    selectedKeys.push(node.key);
                    selectedNodes.push(node);
                } else {
                    selectedKeys = selectedKeys.filter(key => key !== node.key);
                    selectedNodes = selectedNodes.filter(item => item.key !== node.key);
                }
            }
        } else {
            if (multiple) {
                multipleSelect();
            } else {
                singleSelect();
            }
        }

        this.setState({
            selectedKeys: selectedKeys,
            selected: selected,
            selectedNodes: selectedNodes
        })
        
        onSelect && onSelect(selectedKeys, {
            selected: !isSelected, 
            selectedNodes: selectedNodes, 
            node: node
        }); 
    }
    
    /**
     * 点击展开或收起图标时触发
     * @param {TreeNode} node 
     */
    onExpand(node) {
        const {checkable, checkStrictly} = this.props;
        let {expandedKeys, expanded, selected, selectedKeys, selectedNodes} = this.state;
        const {key} = node;
        const {onExpand} = this.props;
        let isExpanded = expanded[key];
        expanded[key] = !isExpanded;
        
        if (isExpanded) {
            expandedKeys = expandedKeys.filter(expandedKey => expandedKey !== key);
        } else {
            expandedKeys.push(key);
        }

        if (selected[key] === true && checkable && !checkStrictly) {
            // 过滤掉禁用节点
            let children = node.children.filter(item => !!!item.disabled);
            children.map(item => {
                if (isExpanded) {
                    selected[item.key] = false;
                    selectedKeys = selectedKeys.filter(selectedKey => selectedKey !== item.key);
                    selectedNodes = selectedNodes.filter(selectedNode => selectedNode.key !== item.key);
                } else {
                    selected[item.key] = true;
                    selectedKeys.push(item.key);
                    selectedNodes.push(item);
                }
            });
        }
        
        this.setState({
            expandedKeys: expandedKeys,
            expanded: expanded,
            selectedKeys: selectedKeys,
            selected: selected,
            selectedNodes: selectedNodes
        })
        onExpand && onExpand(expandedKeys, {
            expanded: !isExpanded, 
            node: node
        }); 
    }
    
    /**
     * 渲染树节点图标和文字
     * @param {TreeNode} node 
     */
    renderItem(node) {
        const {checkable, checkStrictly} = this.props;
        let {expanded, selected} = this.state;
        let {showLine, iconSize, expandIconSize} = this.props;
        const {key, children, icon, label, disabled} = node;

        iconSize = iconSize || '12px';
        expandIconSize = expandIconSize || '12px';
        let expandIconColor = '#333'
        const hasChildren = children && children.length > 0;
        let expandIcon = expanded[key] ? 'caret-down' : 'caret-right';
        
        if (showLine) {
            expandIconColor = '#666'
            expandIconSize = '16px'
            expandIcon = expanded[key] ? 'minus-square' : 'plus-square';
        }
        
        // 父子节点有关联，如果传入父节点key，则子节点自动选中, 反之亦然
        let checkStyle = null;
        let checkedStyle = null;
        if (checkable && !checkStrictly) { // 子节点全不选
            if (selected[key] === false || selected[key] === undefined) {
                checkStyle = styles.box;     
            } else if (selected[key] === true) { // 子节点全选
                checkStyle = Object.assign({}, styles.box, styles.checkedBG);
                checkedStyle = styles.checked;
            } else { // 子节点部分选中
                checkStyle = Object.assign({}, styles.box, styles.checkedBG);
                checkedStyle = styles.checkPart;  
            }
        }
        let textStyle = {padding: '1px 5px', display: 'inline-block'};
        if (disabled) {
            textStyle.color = '#D0D0D0';
        }
        
        textStyle.marginLeft = 2;
        if (selected[key]) {
            textStyle.backgroundColor = '#D2EAFB'
        }
        let textNode;
        if (typeof label === 'string') {
            textNode = label;
        } else {
            textNode = React.createElement('span', {
                children: label
            })
        }
        return (
            React.createElement('div', {
                style: styles.item,
                className: 'tree-node',
                children: [
                    hasChildren ? React.createElement(Icon, {
                        onClick: this.onExpand.bind(this, node),
                        style: Object.assign({}, styles.icon, {
                            color: expandIconColor, 
                            fontSize: expandIconSize, 
                            WebkitTransformOriginX: 0,
                            WebkitTransform: 'scale(0.5833)',
                            verticalAlign: 'middle'
                        }),
                        type: expandIcon
                    }) : React.createElement('div', {
                        style: Object.assign({}, styles.icon, {
                            display: 'inline-block'
                        })
                    }),
                    checkable && React.createElement('div', {
                        onClick: disabled ? ()=>{} : this.onSelect.bind(this, node),
                        style: checkStyle,
                        children: selected[key] === true && React.createElement('div', { style: checkedStyle})
                        || selected[key] === null && React.createElement('div', {style: checkedStyle})
                    }),
                    icon && React.createElement(Icon, {
                        style: Object.assign({}, styles.icon, {fontSize: iconSize}),
                        type: icon
                    }),
                    React.createElement('li', {
                        style: Object.assign({},styles.nodeSpan, textStyle),
                        onClick: disabled ? ()=>{} : this.onSelect.bind(this, node),
                        children: textNode
                    })
                ]
            })
        )
    }

    /**
     * 渲染树节点
     * 单个根节点使用此入口
     * 和renderTree递归
     * @param {TreeNode} node 
     * @param {TreeNode} parentNode 父节点
     */
    renderNode(node, parentNode) {
        const {expanded} = this.state
        const {showLine} = this.props
        const hasChildren = node.children && node.children.length > 0
        let childrenStyle = styles.children;
        if (showLine) {
            childrenStyle = styles.leftLine;
        }
        node.parentNode = parentNode;
        return (
            React.createElement('div', {
                key: node.key,
                style: styles.node,
                children: [
                    this.renderItem(node),
                    hasChildren && React.createElement('div', {
                        style: childrenStyle,
                        children: expanded[node.key] && this.renderTree(node.children, node)
                    })
                ]
            })
        )
    }

    /**
     * 渲染树节点
     * 多个根节点使用此入口
     * 和renderNode递归
     * @param {Array<TreeNode>} data 
     * @param {TreeNode} parentNode 父节点
     */
    renderTree(data, parentNode) {
        let nodes = [];
        for (let i = 0; i < (data && data.length) || 0; i++) {
            nodes.push(this.renderNode(data[i], parentNode))
        }
        return nodes
    }
    onSearch(text) {
        if (typeof text === 'string') {
            text = text.trim();
            this.setState({text: text, treeData: MyUtils.searchTree(text, this.props.treeData, 'label')})
        } 
    }
    render() {
        return React.createElement('div', {
            style: this.props.treeStyle || styles.tree,
            children: [
                React.createElement('nobr', {
                    children: [
                        React.createElement(Input, {
                            placeholder: this.props.placeholder,
                            size: 'small',
                            style: {width: '80%'},
                            value: this.state.text,
                            onChange: (e) => {
                                this.onSearch(e.target.value);
                            }
                        }),
                        React.createElement(Button, {
                            size: 'small',
                            children: React.createElement(Icon, {type: 'search'})
                        }),
                        React.createElement(Button, {
                            size: 'small',
                            onClick: () => {
                                this.setState({text: '', treeData: this.props.treeData});
                            },
                            children: React.createElement(Icon, {type: 'reload'})
                        })
                    ]
                }),
                this.renderTree(this.state.treeData, null)
            ]
        })
    }
}
const iconWidth = 18;
const lineMarginLeft = 4;
const styles = {
    tree: {
        padding: 10,
    },
    node: {
        paddingTop: 10
    },
    item: {
        flexDirection: 'row',
    },
    children: {
        paddingLeft: iconWidth,
    },
    icon: {
        width: iconWidth,
        alignSelf: 'center'
    },
    leftLine: {
        marginLeft: lineMarginLeft,
        paddingLeft: iconWidth - lineMarginLeft - 1,
        borderLeftStyle: 'solid',
        borderLeftWidth: '1px',
        borderLeftColor: '#d9d9d9'
    },
    nodeSpan: {
        borderRadius: '2px',
        margin: 0,
        cursor: 'pointer',
        textDecoration: 'none',
        verticalAlign: 'top',
        color: '#666',
        transition: 'all 0.3s'
    },
    checkedBG: {
        backgroundColor: '#108ee9',
        borderColor: '#108ee9'
    },
    box: {
        position: 'relative',
        top: 3,
        left: 0,
        display: 'inline-block',
        width: '14px',
        height: '14px',
        border: '1px solid #d9d9d9',
        borderColor: '#d9d9d9',
        borderRadius: '2px',
        backgroundColor: '#fff',
        transition: 'all .3s',
    },
    checked: {
        transform: 'rotate(45deg) scale(1)',
        position: 'absolute',
        left: '4px',
        display: 'inline-block',
        top: '1px',
        width: '5px',
        height: '8px',
        borderBottom: '2px solid #fff',
        borderRight: '2px solid #fff',
        borderColor: '#fff',
        borderTop: 0,
        borderLeft: 0,
        transition: 'all .2s cubic-bezier(.12, .4, .29, 1.46) .1s'
    },
    checkPart: {
        position: 'relative',
        left: 2,
        right: 2,
        top: 5,
        width: 8,
        height: 2,
        borderColor: '#fff',
        borderBottom: '2px solid #fff',
        borderLeft: 0,
        borderRight: 0
    }
}
Tree.propTypes = {
	treeData: PropTypes.array,
};
export default Tree