<template>
    <div id="bg">
        <div class="login-container">
            <div class="box login" ref="login">
                <div class="form-content">
                    <div class="avtar">
                        <div class="pic"><img src="/src/assets/login/T1.jpg" alt=""></div>
                    </div>
                    <h1>Welcome Back!</h1>
                    <form class="form">
                        <div>
                            <i class="fa fa-address-card"></i>
                            <input type="text" placeholder="Account" v-model="login_form.account">
                        </div>
                        <div>
                            <i class="fa fa-key"></i>
                            <input type="password" placeholder="Password" v-model="login_form.password">
                        </div>
                        <div class="btn">
                            <el-button type="primary" @click="login_btn" :loading="loading">login</el-button>
                        </div>
                    </form>
                    <p class="btn-something">
                        Don't have an account ? <span class="signupbtn" @click="siginupbtn">signup</span>
                    </p>
                </div>
            </div>
            <div class="box signup" ref="signup">
                <div class="form-content">
                    <div class="avtar">
                        <div class="pic"><img src="/src/assets/login/T1.jpg" alt=""></div>
                    </div>
                    <h1>Let's get started</h1>
                    <form class="form">
                        <div>
                            <i class="fa fa-address-card"></i>
                            <input type="text" placeholder="Account" v-model="signup_form.account">
                        </div>
                        <div>
                            <i class="fa fa-key"></i>
                            <input type="password" placeholder="Password" v-model="signup_form.password">
                        </div>
                        <div>
                            <i class="fa fa-phone"></i>
                            <input type="tel" placeholder="Phone" v-model="signup_form.phone">
                        </div>
                        <div>
                            <i class="fa fa-user"></i>
                            <input type="text" placeholder="Name" v-model="signup_form.name">
                        </div>
                        <div>
                            <i class="fa fa-calendar-plus-o"></i>
                            <input type="date" placeholder="Birthday" v-model="signup_form.birthday">
                        </div>
                        <div class="btn">
                            <el-button type="primary" @click="signup_btn" :loading="loading">signup</el-button>
                        </div>
                    </form>
                    <p class="btn-something">
                        Already have an account ? <span class="loginbtn" @click="loginbtn">login</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useMainStore } from "@/store"
import { useRouter } from 'vue-router'
import { empLogin, empSignIn } from '@/api/employee'

const router = useRouter()
const mainStore = useMainStore()
const signup = ref(null)
const login = ref(null)
let loading = ref(false)
let login_form = reactive({
    account: '',
    password: ''
}
)
let signup_form = reactive({
    account: '',
    password: '',
    phone: '',
    name: '',
    birthday: ''
}
)

let login_btn = async () => {
    if (login_form.account == '' || login_form.account == '') {
        ElMessage.error('账号或密码不能为空')
        return
    }
    loading.value = true
    empLogin(login_form).then(res => {
        if (res.success) {
            ElMessage({
                message: res.msg,
                type: 'success'
            })
            mainStore.$patch(state => {
                state.employee.id = res.data.id
                state.employee.name = res.data.name
                state.employee.password = res.data.password
                state.employee.account = res.data.account
                state.employee.job = res.data.job
                state.employee.face = res.data.face
                state.employee.phone = res.data.phone
                state.employee.birthday = res.data.birthday
            })
            setTimeout(() => {
                router.push('/home')
            }, 1000)
        } else {
            setTimeout(() => {
                loading.value = false
                ElMessage.error('账号或密码错误')
            }, 1000)
        }
    })
}

let signup_btn = async () => {
    for (let key in signup_form) {
        if (signup_form[key] == '') {
            ElMessage.error(key + '\t不能为空')
            return
        }
    }
    loading.value = true
    empSignIn(signup_form).then((res) => {
        if (res.success) {
            ElMessage({
                message: res.msg,
                type: 'success'
            })
        } else {
            ElMessage.error('注册失败')
        }
        loading.value = false
    })
}
let siginupbtn = () => {
    login.value.style.transform = "rotateY(180deg)"
    signup.value.style.transform = "rotateY(0deg)";
}

let loginbtn = () => {
    login.value.style.transform = "rotateY(0deg)"
    signup.value.style.transform = "rotateY(-180deg)";
}

</script>

<style src="@/assets/login/login.css"  scoped>
</style>
<style scoped>
#bg {
    width: 100vw;
    height: 100vh;
    background: url("assets/login/bg.jpg");
    background-size: cover;
}
</style>