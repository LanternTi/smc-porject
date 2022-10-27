<template>
    <div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);padding-left: 1rem;">
            <el-descriptions title="商品信息管理">
                <el-descriptions-item label="录入商品，对商品信息进行修改"></el-descriptions-item>
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
import { reactive, ref } from 'vue';
import { VxeGridProps, VxeGridInstance } from 'vxe-table'
import { allCommodity, deleteComm, addComm, updateComm } from '@/api/commodity'
import XEUtils from 'xe-utils'

let cBarcodesLan = ref(null)
let autoQuery = async ({ row }, value) => {
    if (value.keyCode === 13) {
        cBarcodesLan.value = value.target._value
        let url = 'https://www.mxnzp.com/api/barcode/goods/details?barcode=' + cBarcodesLan.value + '&app_id=vebhrimemnisnjcm&app_secret=V2ZHN3k3WFBhbnp0cWZWRE03eEVCZz09'
        axios.get(url)
            .then(res => {
                if (res.data.code == 1) {
                    row.cname = res.data.data.goodsName
                    row.cprice = res.data.data.price
                    row.cbrand = res.data.data.brand
                    row.csupplier = res.data.data.supplier
                    row.cSpecifications = res.data.data.standard
                    row.createDate = new Date
                } else {
                    ElMessage.error('该商品暂未收录')
                }
            })
    }

    return 0
}
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
            { field: 'cid', title: '商品编号', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入名称' } } },
            { field: 'cname', title: '商品名称', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入商品名称' } } },
            { field: 'cbrand', title: '品牌', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入品牌' } } },
            { field: 'cBarcodes', title: '商品条码', span: 8, folding: true, itemRender: { name: '$input', props: { placeholder: '请输入商品条码' } } },
            { field: 'cprice', title: '零售价', span: 8, folding: true, itemRender: { name: '$input', props: { placeholder: '请输入零售价' } } },
            { field: 'cPurchaseprice', title: '商品进价', span: 8, folding: true, itemRender: { name: '$input', props: { placeholder: '请输入商品进价' } } },
            { span: 24, align: 'center', collapseNode: true, itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '查询', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
        ]
    },
    toolbarConfig: {
        buttons: [
            { code: 'insert_actived', name: '新增' },
            { code: 'delete', name: '直接删除' },
            { code: 'save', name: '保存', status: 'success' }
        ],
        refresh: true,
        print: true,
        zoom: true,
        custom: true
    },
    columns: [
        { type: 'checkbox', width: 50 },
        { field: 'cid', title: '商品编号' },
        { field: 'cname', title: '商品名称', editRender: { name: 'input', attrs: { placeholder: '请输入商品名称' } } },
        { field: 'cSpecifications', title: '商品规格', editRender: { name: 'input', attrs: { placeholder: '请输入商品规格' } } },
        { field: 'cCompany', title: '单位', editRender: { name: 'input', attrs: { placeholder: '请输入单位' } } },
        {
            field: 'cPurchaseprice', title: '商品进价', editRender: { name: 'input', attrs: { placeholder: '请输入商品进价' } },
            formatter({ cellValue }) {
                return cellValue ? `￥${XEUtils.commafy(XEUtils.toNumber(cellValue), {
                    digits: 2,
                    round: false
                })}` : ''
            }
        },
        {
            field: 'cprice', title: '零售价', editRender: { name: 'input', attrs: { placeholder: '请输入零售价' } },
            formatter({ cellValue }) {
                return cellValue ? `￥${XEUtils.commafy(XEUtils.toNumber(cellValue), {
                    digits: 2,
                    round: false
                })}` : ''
            }
        },
        {
            field: 'cvipprice', title: '会员价', editRender: { name: 'input', attrs: { placeholder: '请输入会员价' } }, formatter({ cellValue }) {
                return cellValue ? `￥${XEUtils.commafy(XEUtils.toNumber(cellValue), {
                    digits: 2,
                    round: false
                })}` : ''
            }
        },
        { field: 'createDate', title: '创建时间', editRender: { name: '$input', props: { type: 'date' }, attrs: { placeholder: '请输入创建时间' } } },
        { field: 'cremark', title: '商品备注', editRender: { name: 'input', attrs: { placeholder: '请输入商品备注' } } },
        { field: 'cBarcodes', title: '商品条码', editRender: { name: 'input', attrs: { placeholder: '请输入商品条码' }, events: { keydown: autoQuery } } },
        { field: 'cmadein', title: '产地', editRender: { name: 'input', attrs: { placeholder: '请输入产地' } } },
        { field: 'csupplier', title: '厂商', editRender: { name: 'input', attrs: { placeholder: '请输入厂商' } } },
        { field: 'cbrand', title: '品牌', editRender: { name: 'input', attrs: { placeholder: '请输入品牌' } } }
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
                        allCommodity(form).then((res: any) => {
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
            delete: ({ body }) => {
                return deleteComm(body.removeRecords[0].cid)
            },
            save: ({ body }) => {
                console.log(body.updateRecords.length);
                if (body.updateRecords.length != 0) {
                    return updateComm(body.updateRecords[0])
                } if (body.insertRecords.length != 0) {
                    return addComm(body.insertRecords[0])
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