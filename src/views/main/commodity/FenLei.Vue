<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="分类管理">
                <!-- <el-descriptions-item label="管理库存中的商品并预警"></el-descriptions-item> -->
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
import axios from 'axios'
import { reactive, ref } from 'vue'
import { VxeGridProps, VxeGridInstance } from 'vxe-table'
import { getAllCate,deleteCate,addCate,updateCate } from '@/api/Category'
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
            { field: 'name', title: '分类名称', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入分类名称' } } },
            { span: 24, align: 'center', itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '查询', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
        ]
    },
    toolbarConfig: {
        buttons: [
            { code: 'insert_actived', name: '新增',status:'success' },
            { code: 'save', name: '保存', status: 'success' },
            { code: 'delete', name: '删除', status: 'success' }
        ],
        refresh: true,
        print: true,
        zoom: true,
        custom: true
    },
    columns: [
        { type: 'checkbox', width: 50 },
        { field: 'name', title: '分类名称', editRender: { name: '$input', attrs: { placeholder: '请输入分类名称' }, immediate: true } },
        { field: 'type', title: '分类类型', visible: false },
        { field: 'createTime', title: '操作时间' },
        { field: 'sort', title: '排序', editRender: { name: '$input', attrs: { placeholder: '请输入排序' }, immediate: true } },
        // { title: '操作', width: 100, cellRender: { name: '$button', props: { content: '订单详情', status: "success", round: true }, events: { click: orderInfo } } }
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
                        getAllCate(form).then((res: any) => {
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
                    return updateCate(body.updateRecords[0])
                } if (body.insertRecords.length != 0) {
                    return addCate(body.insertRecords[0])
                }
            },
            delete:({ body }) => {
                return deleteCate(body.removeRecords[0].id)
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