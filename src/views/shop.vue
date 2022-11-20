<template>
    <div class="shop_body">
        <div id="ewm">
            <el-input ref="codeInput" v-model="qrCode" size="large" placeholder="请扫描商品条形码" @change="addOrder">
                <template #prepend><i class="fa fa-qrcode fa-2x" aria-hidden="true"></i></template>
            </el-input>
        </div>
        <div class="shop_main">
            <div class="shop_list">
                <vxe-grid ref='xGrid' v-bind="gridOptions" style="margin-left: 20px;
    margin-right: 20px;width: 65vw;">
                </vxe-grid>
                <div class="shop_settlement">
                    <el-row style="margin-top: 20px;">
                        <el-col :span="8">订单号:{{ orderId }}</el-col>
                        <el-col :span="8">订单商品数量:{{ orderCount }}</el-col>
                        <el-col :span="8">订单金额:{{ orderTotal }}</el-col>
                    </el-row>
                    <el-row style="margin-top: 50px;">
                        <el-col :span="12">
                            <el-button type="danger" size="large" @click="emptyOrder" plain round>清空商品</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="success" size="large" @click="orderOver" plain round>结算</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="shop_toolbar">
                <div class="tool_button">
                    <el-icon @click="removeOrder">
                        <Remove />
                    </el-icon>
                    <span class="i_text">移除商品</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { reactive, ref, computed, h } from 'vue'
import { Remove } from '@element-plus/icons-vue'
import { VxeGridProps, VxeGridInstance } from 'vxe-table'
import { useMainStore } from "@/store"
import { storeToRefs } from 'pinia'
import { md5 } from '@/utils/md5'
import { addOrderOver } from '@/api/order'
import XEUtils from 'xe-utils'

let commList = ref([])
let codeInput = ref(null)
let qrCode = ref()
const orderId = computed(() => {
    var orderCode = '';
    for (var i = 0; i < 6; i++) {
        orderCode += Math.floor(Math.random() * 10)
    }
    return new Date().getTime() + orderCode
})
const orderCount = computed(() => {
    var count = 0
    xGrid.value?.getRecordset().insertRecords.forEach(element => {
        count += Number(element.count)
    })
    return count
})
const orderTotal = computed(() => {
    var total = 0
    xGrid.value?.getRecordset().insertRecords.forEach(element => {
        total += element.sub_total
    })
    return `￥${XEUtils.commafy(XEUtils.toNumber(total), {
        digits: 2,
        round: false
    })}`
})
const form = computed(() => {
    let data = reactive({
        order: { oid: '', money: 0, eid: 0, status: 0 },
        user: { id: 0 },
        orderCommodities: []
    })
    data.order.oid = orderId.value
    data.order.eid = employee.value.id
    data.order.money = Number(orderTotal.value.replace('￥', ''))
    xGrid.value?.getRecordset().insertRecords.forEach(element => {
        data.orderCommodities.push({
            cid: element.cid,
            count: element.count
        })
    })
    return data
})

const constChange = (row) => {
    row.sub_total = row.cprice * row.count
}
const orderOver = () => {
    axios.get('http://localhost:8081/createOrder', {
        params: {
            payId: form.value.order.oid,
            type: 1,
            price: Number(orderTotal.value.replace('￥', '')),
            sign: md5(form.value.order.oid + 1 + Number(orderTotal.value.replace('￥', '')) + 'ee6e121b2a291b27792074bc23d5abc6')
        }
    })
        .then(res => {
            if (res.data.code == 1) {
                axios.get('https://www.mxnzp.com/api/qrcode/create/single', {
                    params: {
                        content: res.data.data.payUrl,
                        type: 1,
                        app_id: 'vebhrimemnisnjcm',
                        app_secret: 'V2ZHN3k3WFBhbnp0cWZWRE03eEVCZz09'
                    }
                })
                    .then(res => {
                        ElMessageBox({
                            title: '请扫码支付',
                            message: () =>
                                h(ElImage, {
                                    src: res.data.data.qrCodeBase64,
                                    fit: 'contain'
                                })
                        })
                    })
                var interval = setInterval(function () {
                    axios.get('http://localhost:8081/checkOrder', {
                        params: {
                            orderId: res.data.data.orderId
                        }
                    })
                        .then(res => {
                            if (res.data.code == 1) {
                                clearInterval(interval)
                                addOrderOver(form.value)
                                ElMessageBox.close()
                                ElMessage({
                                    message: '支付成功',
                                    type: 'success',
                                })
                            }
                        })
                }, 1000);
            }
        })
}
const emptyOrder = () => {
    xGrid.value?.remove()
    commList.value.length = 0
}

const mainStore = useMainStore()
const { employee } = storeToRefs(mainStore)
const xGrid = ref<VxeGridInstance>()
const gridOptions = reactive<VxeGridProps>({
    height: 400,
    showOverflow: 'tooltip',
    keepSource: true,
    round: true,
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
    columns: [
        { type: 'checkbox', width: 50 },
        { field: 'cid', visible: false },
        { field: 'cname', title: '商品名称' },
        { field: 'cBarcodes', title: '商品条码' },
        {
            field: 'cprice', title: '商品价格', formatter({ cellValue }) {
                return cellValue ? `￥${XEUtils.commafy(XEUtils.toNumber(cellValue), {
                    digits: 2,
                    round: false
                })}` : ''
            }
        },
        { field: 'count', title: '数量', editRender: { name: '$input', props: { type: 'integer' }, immediate: true, attrs: { placeholder: '请输入商品数量' } } },
        {
            field: 'sub_total', title: '小计', formatter({ cellValue }) {
                return cellValue ? `￥${XEUtils.commafy(XEUtils.toNumber(cellValue), {
                    digits: 2,
                    round: false
                })}` : ''
            }
        },
    ],
    editConfig: {
        trigger: 'dblclick',
        mode: 'cell',
        showStatus: true
    }
})
const addOrder = (value) => {
    if (xGrid.value?.getRecordset().insertRecords != null) {
        xGrid.value?.getRecordset().insertRecords.forEach((element => {
            commList.value.push(element.cBarcodes)
        }))
    }
    if (commList.value.includes(value)) {
        xGrid.value?.getRecordset().insertRecords.forEach((element => {
            if (element.cBarcodes == value) {
                element.count++
                constChange(xGrid.value!.getEditRecord().row)
            }
        }))
    } else {
        axios.get('http://127.0.0.1:8080/api/comm/selectByCBarcodes', {
            params: {
                cBarcodes: value
            }
        })
            .then(res => {
                if (res.data.data != null) {
                    xGrid.value?.commitProxy('insert_actived')
                    setTimeout(() => {
                        xGrid.value!.getEditRecord().row.cname = res.data.data.cname
                        xGrid.value!.getEditRecord().row.cBarcodes = res.data.data.cBarcodes
                        xGrid.value!.getEditRecord().row.cprice = res.data.data.cprice
                        xGrid.value!.getEditRecord().row.count = 1
                        constChange(xGrid.value!.getEditRecord().row)
                    }, 100)
                } else {
                    ElMessage.error('该商品暂未收录')
                }
            })
    }
    qrCode.value = null
    setTimeout(() => {
        codeInput.value.focus()
    }, 500);
}
const removeOrder = () => {
    xGrid.value?.commitProxy('remove')
    commList.value.length = 0
}
</script>

<style scoped>
.shop_body {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/shop_bg.jpg');
}

.shop_main {
    padding-top: 100px;
    display: flex;
    justify-content: center;
}

.shop_toolbar {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 70px;
}

.shop_toolbar {
    padding-top: 10px;
}

.i_text {
    font-size: 17px;
}

.tool_button {
    display: flex;
    flex-direction: column;
}

.tool_button:hover {
    color: white;
}

.shop_settlement {
    font-weight: 700;
    width: 998px;
    margin-left: 20px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-width: 1px;
    border-color: #eaecee;
    border-top-style: solid;
    border-right-style: none;
    border-bottom-style: none;
    border-left-style: none;
    height: 150px;
    background-color: white;
}

#ewm {
    width: 998px;
    margin: auto;
    left: -35px;
    position: relative;
    top: 80px;
}
</style>