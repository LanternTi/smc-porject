<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="活动管理">
                <el-descriptions-item label="查看活动信息"></el-descriptions-item>
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
import { findAll ,update,addAct,deleteAct} from '@/api/activity'

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
            { field: 'title', title: '活动标题', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入活动标题' } } },
            { field: 'context', title: '活动内容', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入活动内容', type: 'text' } } },
            { field: 'createDate', title: '开始日期', span: 8, itemRender: { name: '$input', props: { placeholder: '开始日期', type: 'date' } } },
            { span: 24, align: 'center', collapseNode: true, itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '查询', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
        ]
    },
    toolbarConfig: {
        buttons: [
            { code: 'insert_actived', name: '新增' },
            { code: 'delete', name: '删除' },
            { code: 'save', name: '保存', status: 'success' }
        ],
        refresh: true,
        print: true,
        zoom: true,
        custom: true
    },
    columns: [
        {type:'checkbox',width:50},
        { field: 'id', title: '活动编号' },
        { field: 'title', title: '活动标题', editRender: { name: 'input', props: { type: 'text' }, attrs: { placeholder: '请输入活动标题' } } },
        { field: 'context', title: '活动内容', editRender: { name: '$input', props: { type: 'text' }, attrs: { placeholder: '请输入活动内容' } } },
        { field: 'createDate', title: '开始日期', editRender: { name: '$input', props: { type: 'date' }, attrs: { placeholder: '开始日期' } } },
        { field: 'endDate', title: '结束日期', editRender: { name: '$input', props: { type: 'date' }, attrs: { placeholder: '结束日期' } } },
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
                    return update(body.updateRecords[0])  
                } if (body.insertRecords.length != 0) {
                    return addAct(body.insertRecords[0])
                }
            },
            delete:({body})=>{
                return deleteAct(body.removeRecords[0].cid)
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