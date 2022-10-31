<template>
    <div>
        <el-image style="width: 100px; height: 100px" src="./src/assets/main/logo.png" fit="contain" />
    </div>
    <el-menu class="el-menu-vertical-demo" router :default-active="route.path" unique-opened text-color="#8991a2"
        active-text-color="#ffffff">
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <Goods />
                </el-icon>
                <span>商品管理</span>
            </template>
            <el-menu-item index="commodityInfo">商品信息管理</el-menu-item>
            <el-menu-item index="commodityStock">商品库存管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
            <template #title>
                <el-icon>
                    <ShoppingCart />
                </el-icon>
                <span>订单管理</span>
            </template>
            <el-menu-item index="orderQuery">订单查询</el-menu-item>
            <el-menu-item index="1-2">订单统计分析</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title>
                <el-icon>
                    <UserFilled />
                </el-icon>
                <span>客户管理</span>
            </template>
            <el-menu-item index="customerInfo">客户资源管理</el-menu-item>
            <el-menu-item index="1-2">会员管理</el-menu-item>
            <el-menu-item index="1-3">会员关怀</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
            <template #title>
                <el-icon>
                    <Operation />
                </el-icon>
                <span>个人信息设置</span>
            </template>
            <el-menu-item index="/pwdUpdate">密码修改</el-menu-item>
            <el-menu-item index="/faceAdd">人脸注册</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/employeeInfo">
            <el-icon>
                <User />
            </el-icon>
            员工管理
        </el-menu-item>
        <el-menu-item index="/activityInfo">
            <el-icon>
                <Calendar />
            </el-icon>
            超市活动管理
        </el-menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMainStore } from "@/store"
const route = useRoute()

const mainStore = useMainStore()
const { employee } = storeToRefs(mainStore);
</script>

<style lang="css" scoped>
.el-menu-item.is-active {
    border-radius: 7px;
    background-color: #8966f7;
}

.el-menu-item:hover {
    border-radius: 7px;
}

.el-menu-item:active {
    border-radius: 7px;
    background-color: #8966f7;
    color: white;
}

.el-menu {
    padding-left: 20px;
    padding-right: 10px;
}
</style>