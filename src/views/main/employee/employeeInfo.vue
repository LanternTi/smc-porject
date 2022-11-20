<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="员工信息管理">
                <el-descriptions-item label="查看员工信息"></el-descriptions-item>
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
import { findAll, empSignIn, updateByid } from '@/api/employee'

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
            { field: 'id', title: '员工ID', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入员工姓名' } } },
            { field: 'name', title: '员工姓名', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入员工姓名' } } },
            { field: 'account', title: '员工账号', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入员工账号', type: 'text' } } },
            { field: 'birthday', title: '生日', span: 12, folding: true, itemRender: { name: '$input', props: { placeholder: '请输入员工生日', type: 'date' } } },
            { field: 'phone', title: '员工号码', span: 12, folding: true, itemRender: { name: '$input', props: { placeholder: '请输入员工号码', type: 'number' } } },
            { span: 24, align: 'center', collapseNode: true, itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '查询', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
        ]
    },
    toolbarConfig: {
        buttons: [
            { code: 'insert_actived', name: '新增', status: 'primary' },
            { code: 'save', name: '保存', status: 'success' }
        ],
        refresh: true,
        print: true,
        zoom: true,
        custom: true
    },
    columns: [
        { field: 'id', title: '员工ID' },
        { field: 'name', title: '员工姓名', editRender: { name: 'input', props: { type: 'text' }, attrs: { placeholder: '请输入员工姓名' } } },
        { field: 'account', title: '员工账号', editRender: { name: '$input', props: { type: 'text' }, attrs: { placeholder: '员工账号' } } },
        {
            field: 'job', title: '职位', formatter({ cellValue }) {
                if (cellValue == 0) {
                    return '老板'
                } else if (cellValue == 1) {
                    return '收银员'
                } else {
                    return '系统管理员'
                }
            }, editRender: {
                name: '$select', options: [
                    { label: '老板', value: 0 },
                    { label: '收银员', value: 1 },
                    { label: '系统管理员', value: 2 }
                ]
            }
        },
        { field: 'phone', title: '员工号码', editRender: { name: '$input', props: { type: 'number' }, attrs: { placeholder: '请输入员工生日' } } },
        { field: 'birthday', title: '员工生日', editRender: { name: '$input', props: { type: 'date' }, attrs: { placeholder: '请输入员工号码' } } }
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
                        findAll(form).then((res: any) => {
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
                if (body.updateRecords.length != 0) {
                    return updateByid(body.updateRecords[0])
                } if (body.insertRecords.length != 0) {
                    return empSignIn(body.insertRecords[0])
                }
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