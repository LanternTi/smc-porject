<template>
    <div id="bg">
        <div class="login-container">
            <div class="box login" ref="login">
                <div class="form-content">
                    <div class="avtar">
                        <div class="pic"><img src="/src/assets/login/T1.jpg" alt=""></div>
                    </div>
                    <div style="display: flex;flex-direction: column;margin-top: -30px;">
                        <h1>超市收银系统</h1>
                        <h2 style="margin-top: 20px;">欢迎登录</h2>
                    </div>
                    <form class="form">
                        <div>
                            <i class="fa fa-address-card"></i>
                            <input type="text" placeholder="账号" v-model="login_form.account">
                        </div>
                        <div>
                            <i class="fa fa-key"></i>
                            <input type="password" placeholder="密码" v-model="login_form.password">
                        </div>
                        <div class="btn">
                            <el-button type="primary" @click="login_btn" :loading="loading">登录</el-button>
                        </div>
                    </form>
                    <p class="btn-something">
                        切换人脸登录？ <span class="signupbtn" @click="siginupbtn">人脸登录</span>
                    </p>
                </div>
            </div>
            <div class="box signup" ref="signup">
                <div class="form-content">
                    <video :width="videoWidth" :height="videoHeight" id="video" autoPlay></video>
                    <canvas id="canvas"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import { useMainStore } from "@/store"
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { empLogin, empFaceLogin } from '@/api/employee'
import axios from 'axios'

const videoWidth = ref(200)
const videoHeight = ref(200)
const router = useRouter()
const mainStore = useMainStore()
const { employee } = storeToRefs(mainStore)
const signup = ref(null)
const login = ref(null)
let loading = ref(false)
let login_form = reactive({
    account: '',
    password: ''
})

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
                state.employee.groupId = res.data.groupId
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

const getCompetence = () => {
    nextTick(() => {
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {}
        }

        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
                // 首先获取现存的getUserMedia(如果存在)
                let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
                if (!getUserMedia) {
                    return Promise.reject(new Error("getUserMedia is not implemented in this browser"))
                }
                return new Promise(function (resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                })
            }
        }

        const constraints = {
            audio: false,
            video: { width: videoWidth.value, height: videoHeight.value, transform: "scaleX(-1)" },
        }

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (stream) {
                if ("srcObject" in document.getElementById("video")) {
                    document.getElementById("video").srcObject = stream;
                } else {
                    document.getElementById("video").src = window.URL.createObjectURL(stream);
                }
                document.getElementById("video").onloadedmetadata = function (e) {
                    document.getElementById("video").play();
                }
            })
            .catch((err) => {
                ElMessage.error("没有开启摄像头权限或浏览器版本不兼容");
            })
    })
}
const faceLogin = () => {
    let thisCancas = document.getElementById("canvas")
    let thisContext = thisCancas.getContext("2d")
    let thisVideo = document.getElementById("video")
    thisContext.drawImage(thisVideo, 0, 0, 200, 200)
    empFaceLogin(thisCancas.toDataURL(), 3).then(res => {
        if (res.success) {
            axios.get('http://127.0.0.1:8080/api/emp/selectByName', {
                params: {
                    name: res.data.name
                }
            })
                .then(res => {
                    mainStore.$patch(state => {
                        state.employee.id = res.data.data.id
                        state.employee.name = res.data.data.name
                        state.employee.password = res.data.data.password
                        state.employee.account = res.data.data.account
                        state.employee.job = res.data.data.job
                        state.employee.face = res.data.data.face
                        state.employee.phone = res.data.data.phone
                        state.employee.birthday = res.data.data.birthday
                        state.employee.groupId = res.data.data.groupId
                    })
                })
            ElMessage({
                message: '认证成功',
                type: 'success'
            })
            setTimeout(() => {
                thisVideo.srcObject.getTracks()[0].stop();
                router.push('/home')
            }, 3000)
        } else if (res.success) {
            ElMessage({
                message: res.msg,
                type: res.success
            })
            setTimeout(() => {
                router.push('/login')
            }, 2000)
        }
    })
}
let siginupbtn = () => {
    login.value.style.transform = "rotateY(180deg)"
    signup.value.style.transform = "rotateY(0deg)";
    setTimeout(faceLogin, 3000)
}

let loginbtn = () => {
    login.value.style.transform = "rotateY(0deg)"
    signup.value.style.transform = "rotateY(-180deg)";
}

getCompetence()
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