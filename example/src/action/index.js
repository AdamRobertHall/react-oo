import moment from 'moment'
const uuid = require('uuid/v1');
/**
 * 查询
 * @param {*} searchFields 
 * @param {*} mainSearchFeilds 
 * @param {*} moreSearchFeilds 
 */
export function getList(searchFields, mainSearchFeilds, moreSearchFeilds) {
    let list = global.parseArray(window.localStorage.getItem('list'));
    list = list.filter(item => {
        // 主要搜索条件
        let mainSearchFalseCount = 0;
        for (let field of mainSearchFeilds || []) {
            let dataType = field.dataType;
            let value = searchFields.mainKey;
            let key = field.id;
            if (value == null) {
                continue;
            }
            if (typeof value === 'string') {
                value = value.trim();
                if (value === '') {
                    continue;
                }
            }
            if (dataType === 'STRING') {
                if (item[key].indexOf(value) === -1) {
                    ++mainSearchFalseCount;
                }
            }
        }
        if (mainSearchFalseCount > 0 && mainSearchFalseCount === mainSearchFeilds.length) {
            return false;
        }
        // 生成更多查询条件
        for (let field of moreSearchFeilds || []) {
            let dataType = field.dataType;
            let value = searchFields[field.id];
            let key = field.id;
            if (value == null) {
                continue;
            }
            if (typeof value === 'string') {
                value = value.trim();
                if (value === '') {
                    continue;
                }
            }

            if (dataType === 'NUMBER') {
                if (value.length === 2) {
                    if (value[0]) {
                        if (parseFloat(item[key]) < parseFloat(value[0])) {
                            return false;
                        }
                    }
                    if (value[1]) {
                        if (parseFloat(item[key]) > parseFloat(value[1])) {
                            return false;
                        }
                    }
                }
            } else if (dataType === 'DATE' || dataType === 'TIME') {
                let start = value[0];
                let end = value[1];
                if (start) {
                    if (moment(item[key]).valueOf() < moment(start).hour(0).minute(0).second(0).valueOf()) {
                        return false;
                    }
                }
                if (end) {
                    if (moment(item[key]).valueOf() > moment(end).hour(23).minute(59).second(59).valueOf()) {
                        return false;
                    }
                }          
            } else if (dataType === 'STRING') {
                if (item[key].indexOf(value) === -1) {
                    return false;
                }
            }
        }
        return true;
    });
    return list;
}

/**
 * 删除
 * @param {} id 
 */
export function del(id) {
    let list = global.parseArray(window.localStorage.getItem('list'));
    list = list.filter(item => item.id !== id);
    window.localStorage.setItem('list', JSON.stringify(list));
}

/**
 * 新增
 */
export function add(record) {
    record.id = uuid();
    let list = global.parseArray(window.localStorage.getItem('list'));
    list.unshift(record);
    window.localStorage.setItem('list', JSON.stringify(list));
}

/**
 * 修改
 */
export function modify(record, oldData) {
    let list = global.parseArray(window.localStorage.getItem('list'));
    let index = list.findIndex(item => item.id === oldData.id);
    if (index !== -1) {
        list[index] = Object.assign({}, oldData, record);
    }
    window.localStorage.setItem('list', JSON.stringify(list));
}