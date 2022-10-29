<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="客户信息管理">
                <el-descriptions-item label="查看客户信息"></el-descriptions-item>
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
import { getAllCustomer, addCustomer } from '@/api/customer'

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
            { field: 'id', title: '客户ID', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入名称' } } },
            { field: 'name', title: '客户姓名', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入商品名称' } } },
            {
                field: 'sex', title: '性别', span: 8, itemRender: {
                    name: '$select', props: { placeholder: '请选择性别' }, options: [
                        { label: '男', value: '男' },
                        { label: '女', value: '女' }
                    ]
                }
            },
            { field: 'age', title: '客户年龄', span: 8, folding: true, itemRender: { name: '$input', props: { placeholder: '请输入商品名称', type: 'number' } } },
            { field: 'birthday', title: '生日', span: 8, folding: true, itemRender: { name: '$input', props: { placeholder: '请输入商品名称', type: 'date' } } },
            { field: 'phone', title: '客户号码', span: 8, folding: true, itemRender: { name: '$input', props: { placeholder: '请输入商品名称', type: 'number' } } },
            { span: 24, align: 'center', collapseNode: true, itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '查询', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
        ]
    },
    toolbarConfig: {
        buttons: [
            { code: 'insert_actived', name: '新增' },
            { code: 'save', name: '保存', status: 'success' }
        ],
        refresh: true,
        print: true,
        zoom: true,
        custom: true
    },
    columns: [
        { field: 'id', title: '客户ID' },
        { field: 'name', title: '客户姓名', editRender: { name: 'input', props: { type: 'text' }, attrs: { placeholder: '请输入客户姓名' } } },
        {
            field: 'sex', title: '性别', editRender: {
                name: '$select', attrs: { placeholder: '请选择性别' }, options: [
                    { label: '男', value: '男' },
                    { label: '女', value: '女' }
                ]
            }
        },
        { field: 'age', title: '客户年龄', editRender: { name: '$input', props: { type: 'number' }, attrs: { placeholder: '客户年龄' } } },
        { field: 'birthday', title: '客户生日', editRender: { name: '$input', props: { type: 'date' }, attrs: { placeholder: '请输入出生日期' } } },
        { field: 'phone', title: '客户号码', editRender: { name: '$input', props: { type: 'number' }, attrs: { placeholder: '请输入客户号码' } } }
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
                        getAllCustomer(form).then((res: any) => {
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
                return addCustomer(body.insertRecords[0])
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