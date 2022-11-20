<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="外卖订单查询">
                <el-descriptions-item label="查询外卖订单信息"></el-descriptions-item>
            </el-descriptions>
            <div class="padding-box" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)">
                <vxe-grid ref='xGrid' v-bind="gridOptions" style="margin-left: 20px;
    margin-right: 20px;">

                </vxe-grid>
                <vxe-modal v-model="model" width="600">
                    <template #title>
                        <span>订单详情</span>
                    </template>
                    <template #default>
                        <vxe-table border show-header-overflow show-overflow :row-config="{ isHover: true }"
                            :data="tableData">
                            <vxe-column field="oid" title="订单编号"></vxe-column>
                            <vxe-column field="commodity.cname" title="商品名称"></vxe-column>
                            <vxe-column field="commodity.cprice" title="商品价格" :formatter="formatterNum"></vxe-column>
                            <vxe-column field="commodity.cbrand" title="品牌"></vxe-column>
                            <vxe-column field="commodity.cCompany" title="单位"></vxe-column>
                            <vxe-column field="count" title="数量"></vxe-column>
                        </vxe-table>
                    </template>
                </vxe-modal>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { reactive, ref } from 'vue'
import { VxeGridProps, VxeGridInstance, VxeColumnPropTypes } from 'vxe-table'
import { getAllOrder } from '@/api/orders'
import XEUtils from 'xe-utils'

const orderInfo = ({ row }) => {
    model.value = true
    axios.get('http://127.0.0.1:8080/api/order/findAll', {
        params: {
            oid: row.oid
        }
    })
        .then(res => {
            tableData.value = res.data.data
        })
}
const formatterNum: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
    return cellValue ? `￥${XEUtils.commafy(XEUtils.toNumber(cellValue), {
        digits: 2,
        round: false
    })}` : ''
}
let model = ref(false)

let tableData = ref([])
const xGrid = ref<VxeGridInstance>()
const gridOptions = reactive<VxeGridProps>({
    border: true,
    showOverflow: 'tooltip',
    height: 530,
    keepSource: true,
    rowConfig: {
        isHover: true
    },
    columnConfig: {
        resizable: true
    },
    checkboxConfig: {
        reserve: true
    },
    pagerConfig: {
        pageSize: 10
    },
    printConfig: {

    },
    formConfig: {
        titleWidth: 100,
        titleAlign: 'right',
        items: [
            { field: 'number', title: '订单编号', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入订单编号' } } },
            { field: 'userName', title: '客户姓名', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入客户姓名' } } },
            { span: 24, align: 'center', itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '查询', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
        ]
    },
    toolbarConfig: {
        refresh: true,
        print: true,
        zoom: true,
        custom: true
    },
    columns: [
        { field: 'number', title: '订单编号' },
        { field: 'userName', title: '用户' },
        { field: 'phone', title: '手机号' },
        { field: 'address', title: '地址' },
        { field: 'orderTime', title: '下单时间' },
        { field: 'status', title: '状态', formatter({ cellValue }) {
                if(cellValue==2){
                    return '待派送'
                }else if(cellValue==3){
                    return '已派送'
                }else if(cellValue==4){
                    return '已送达'
                }else if(cellValue==5){
                    return '已完成'
                }
            }, },
        {
            field: 'amount', title: '实收金额', formatter({ cellValue }) {
                return cellValue ? `￥${XEUtils.commafy(XEUtils.toNumber(cellValue), {
                    digits: 2,
                    round: false
                })}` : ''
            },
            editRender: { name: '$input', attrs: { placeholder: '请输入订单金额' }, props: { type: 'integer' }, }
        },
        { title: '操作', width: 100, cellRender: { name: '$button', props: { content: '订单详情', status: "success", round: true }, events: { click: orderInfo } } }
    ],
    proxyConfig: {
        form: true,
        seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
        props: {
            result: 'result',
            total: 'page.total'
        },
        ajax: {
            // 接收 Promise
            query: ({ page, form }) => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        var list: any[] = [];
                        getAllOrder(form).then((res: any) => {
                            console.log(res);
                            list = res.data
                            resolve({
                                page: {
                                    total: list.length
                                },
                                result: list.slice((page.currentPage - 1) * page.pageSize, page.currentPage * page.pageSize)
                            })
                        })
                    }, 1000)
                })
            },
            save: ({ body }) => {
                return updataOrder(body.updateRecords[0])
            }
        }
    },
    editConfig: {
        trigger: 'dblclick',
        mode: 'cell',
        showStatus: true
    }
})


</script>

<style scoped>
:deep(.el-descriptions__label) {
    padding-left: 20px;
}
</style>