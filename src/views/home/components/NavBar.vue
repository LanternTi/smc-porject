<template>
    <div>
        <el-row>
            <el-col :xs="{ span: 10, offset: 14 }" :sm="{ span: 6, offset: 18 }" :md="{ span: 4, offset: 20 }" :lg="3"
                :xl="1" :offset="21">
                <el-dropdown id="dropdown">
                    <span class="el-dropdown-link">
                        {{ employee.name }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="toView(1)">
                                <el-icon>
                                    <House />
                                </el-icon>
                                首页
                            </el-dropdown-item>
                            <el-dropdown-item @click="toView(2)">
                                <el-icon>
                                    <Setting />
                                </el-icon>
                                设置
                            </el-dropdown-item>
                            <el-dropdown-item @click="toView(3)">
                                <el-icon>
                                    <SwitchButton />
                                </el-icon>
                                登出
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </el-col>
        </el-row>
    </div>
</template> 

<script setup lang="ts">
import { useMainStore } from "@/store"
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const router = useRouter()
const mainStore = useMainStore()
const { employee } = storeToRefs(mainStore)
const toView = (x: number) => {
    if (x == 1) {
        router.push('/home')
    } if (x == 2) {
        router.push('/setting')
    } if (x == 3) {
        Object.keys(employee.value).forEach(key => employee.value[key] = null)
        router.push('/login')
    }
}
</script>

<style lang="css">
.el-dropdown {
    line-height: 3;
}

#dropdown {
    margin-right: 10px;
}
</style>