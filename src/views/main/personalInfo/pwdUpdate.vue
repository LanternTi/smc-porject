<template>
    <div style="height: 100%;">
        <el-descriptions title="修改密码" direction="vertical" border :column="1">
            <el-descriptions-item label="新密码">
                <el-input v-model="pwd" type="password" @change="pwdCheck" placeholder="请输入新密码" show-password
                    clearable />
            </el-descriptions-item>
            <el-descriptions-item label="确认密码">
                <el-input v-model="againPwd" type="password" @change="againPwdCheck" placeholder="请再次输入密码" show-password
                    clearable :disabled="pwdDisable" />
            </el-descriptions-item>
            <el-descriptions-item>
                <el-button type="success" :disabled="disable" @click="update">修改</el-button>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMainStore } from "@/store"
import { storeToRefs } from 'pinia'
import { updatePwd } from '@/api/employee'

const mainStore = useMainStore()
const { employee } = storeToRefs(mainStore)
let pwd = ref('')
let againPwd = ref('')
let pwdDisable = ref(true)
let disable = ref(true)
const pwdCheck = () => {
    if (pwd.value != '') {
        pwdDisable.value = false
    }
}
const againPwdCheck = () => {
    if (againPwd.value == pwd.value && againPwd.value != '') {
        disable.value = false
    } else {
        ElMessage.error('两次密码不一致')
    }
}

const update = () => {
    updatePwd(employee.value.id, againPwd.value).then(res => {
        if (res.success) {
            ElMessage({
                message: res.msg,
                type: 'success'
            })
        } else {
            ElMessage.error(res.msg)
        }
    })
}

</script>

<style scoped>
</style>