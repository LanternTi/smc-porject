<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="订单查询">
                <el-descriptions-item label="查询客户订单及员工负责订单"></el-descriptions-item>
            </el-descriptions>
            <div class="padding-box" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)">
                <vxe-grid ref='xGrid' v-bind="gridOptions" style="margin-left: 20px;
    margin-right: 20px;">
                </vxe-grid>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { VxeGridProps, VxeGridInstance } from 'vxe-table'
import { getAllOrder, updataOrder } from '@/api/order'
import XEUtils from 'xe-utils'

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
            { field: 'oid', title: '订单编号', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入订单编号' } } },
            { field: 'user.name', title: '客户姓名', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入客户姓名' } } },
            {
                field: 'status', title: '订单状态', span: 8, itemRender: {
                    name: '$select', options: [
                        { label: '已完成', value: 0 },
                        { label: '待支付', value: 1 },
                        { label: '已取消', value: 2 }
                    ], props: { placeholder: '请选择订单状态' }
                }
            },
            { span: 24, align: 'center', collapseNode: true, itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '查询', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
        ]
    },
    toolbarConfig: {
        buttons: [
            { code: 'save', name: '保存', status: 'success' }
        ],
        refresh: true,
        print: true,
        zoom: true,
        custom: true
    },
    columns: [
        { type: 'checkbox', width: 50 },
        { field: 'oid', title: '订单编号' },
        { field: 'user.name', title: '客户姓名' },
        { field: 'user.phone', title: '客户电话' },
        { field: 'money', title: '订单金额', editRender: { name: '$input', attrs: { placeholder: '请输入订单金额' }, props: { type: 'integer' }, } },
        {
            field: 'status', title: '订单状态', editRender: {
                name: '$select', options: [
                    { label: '已完成', value: 0 },
                    { label: '待支付', value: 1 },
                    { label: '已取消', value: 2 }
                ]
            }
        }
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