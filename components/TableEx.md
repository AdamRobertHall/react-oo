## 何时使用
- 表格需要可编辑
## 如何使用
- 可编辑功能使用参见文件 ./example/src/pages/config.js
## 说明
- 本组件包装了ant design Table组件，所以支持ant design Table组件的全部参数
- [ant design Table使用介绍](https://ant.design/components/table-cn/)

## API
### TableEx
|参数|说明|类型|默认值|
|---|----|----|-----|
|showAdd|是否显示新增按钮|bool|false| 
|onSave|保存一行数据回调函数,返回true执行，返回false不执行|Function(rowkey, record, index)|-|
|onEdit|编辑一行数据回调函数 返回true执行，返回false不执行|Function(rowkey, record, index)|-|
|onEditCancle|取消编辑一行数据回调函数，无返回值|Function(rowkey, record, index)|-|
|onAdd|新增一行数据回调函数 返回true执行，返回false不执行|Function(data)|-|
|onAddMount|新增一行前进行的操作|Function|-|
|onCancle|取消编辑状态回调函数|Function|-|
|addBtnName|新增按钮名字|string|新增|
|addBtnType|新增按钮类型|string|ghost|
|saveName|保存操作名字|string|保存|
|editName|编辑操作名字|string|编辑|
|cancleName|取消操作名字|string|取消|
|addName|操作中新增一行 添加操作名字|string|添加|
|disabled|禁用表格编辑操作|bool|false|
|allwaysEdit|表格像Excel一样一直处于编辑状态|bool|false|

[更多参数请参考Table](https://ant.design/components/table-cn/#Table)


### columns
|参数|说明|类型|默认值|
|---|----|----|-----|
|addDisabled|新增时该列不渲染组件|bool|false|
|component|编辑时使用组件渲染该列|Function(text, record, index) \| object|-|
|componentAdd|新增行使用组件渲染该列，如果没有定义，取component参数的值|Function(text, record, index) \| object|-|
[更多参数请参考Column](https://ant.design/components/table-cn/#Column)


### rowSelection
| 参数 | 说明 | 类型 | 默认值 | 
|------|---------|--------------|----------------| 
| selectedRows | 指定选中项的 key 数组，需要和 onChange 进行配合 | object[] | [] |
| onChange | 选中项发生变化的时的回调，selectedRows数据支持分页 | Function(selectedRowKeys, selectedRows) | - |
[更多参数请参考rowSelection](https://ant.design/components/table-cn/#rowSelection)


### component
- component为函数类型时，返回值为object
- componentAdd使用方法和component相同

|参数|说明|类型|默认值|
|---|----|----|-----|
|name|使用的组件类,必须使用require声明，自定义组件必须在TableEx.js组件源码中也添加声明|class|-|
|disabled|禁用某一行的编辑操作|bool|false|
|props|使用组件的参数|object|-|


### props
|参数|说明|类型|默认值|
|---|----|----|-----|
|initialValue|使用组件的默认值|any|单元格数据的值|
