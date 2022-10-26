<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="250px">
                <Myside></Myside>
            </el-aside>
            <el-container>
                <el-header>
                    <NavBar></NavBar>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
            <div class="cashier">
                <el-button color="#8966f7" circle :icon="ShoppingTrolley" @click="toShop" type="primary">
                </el-button>
            </div>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ShoppingTrolley } from '@element-plus/icons-vue'
import Myside from './components/Myside.vue';
import NavBar from './components/NavBar.vue';
import { useRouter } from 'vue-router'
import { ref } from 'vue';

const router = useRouter()
const toShop = () => {
    router.push('/shop')
}
</script>

<style scoped>
.el-header {
    margin-top: 20px;
}

.common-layout {
    position: absolute;
    top: 0;
    width: 100%;
}

.el-main {
    background-color: #f4f7fc;
}

.cashier {
    position: fixed;
    right: 90vw;
    bottom: 10vh;
}

.cashier button {
    height: 100px;
    width: 100px;
    font-size: 50px;
    color: white;
}

.el-aside {
    height: 100vh;
}
</style>