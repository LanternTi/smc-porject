<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="商品库存管理">
                <el-descriptions-item label="管理库存中的商品并预警"></el-descriptions-item>
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
import { selectLikeAll, updateScount, addStock, selName } from '@/api/commodity'
import XEUtils from 'xe-utils'

let commName = ref([])
selName().then((res => {
    commName.value = res.data
}))
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
            { field: 'sid', title: '库存ID', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入库存ID' } } },
            { field: 'scount', title: '库存数量', span: 8, itemRender: { name: '$input', props: { type: 'integer', min: 0, placeholder: '请输入库存数量' } } },
            { field: 'cname', title: '商品名字', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入商品名字' } } },
            { span: 24, align: 'center', itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '查询', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
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
        { type: 'checkbox', width: 50 },
        { field: 'sid', title: '库存编号' },
        { field: 'commodity.cname', title: '商品名称', editRender: { name: '$select', props: { options: commName.value } } },
        { field: 'commodity.cCompany', title: '单位' },
        {
            field: 'commodity.cPurchaseprice', title: '商品进价',
            formatter({ cellValue }) {
                return cellValue ? `￥${XEUtils.commafy(XEUtils.toNumber(cellValue), {
                    digits: 2,
                    round: false
                })}` : ''
            }
        },
        {
            field: 'commodity.cprice', title: '零售价',
            formatter({ cellValue }) {
                return cellValue ? `￥${XEUtils.commafy(XEUtils.toNumber(cellValue), {
                    digits: 2,
                    round: false
                })}` : ''
            }
        },
        {
            field: 'commodity.cvipprice', title: '会员价',
            formatter({ cellValue }) {
                return cellValue ? `￥${XEUtils.commafy(XEUtils.toNumber(cellValue), {
                    digits: 2,
                    round: false
                })}` : ''
            }
        },
        { field: 'commodity.createDate', title: '创建时间' },
        { field: 'scount', title: '库存数量', editRender: { name: '$input', props: { type: 'integer' }, attrs: { placeholder: '请输入库存数量' } } }
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
                        selectLikeAll(form).then((res: any) => {
                            console.log(commName.value)
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
                    return updateScount(body.updateRecords[0])
                } if (body.insertRecords.length != 0) {
                    return addStock(body.insertRecords[0])
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