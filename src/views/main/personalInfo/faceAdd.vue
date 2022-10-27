<template>
    <el-button :plain="true" @click="takePhoto" class="uploadPhotos">拍照</el-button>
    <Photo ref="clearCamera" v-if="visible" @closed="clearIntervals" />
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

let visible = ref(false)
//控制拍照功能的显示和隐藏
const takePhoto = () => {
    visible.value = true;
}

//清除拍照功能
const clearCamera = ref();
const clearIntervals = () => {
    nextTick(() => {
        clearCamera.value.stopNavigator();
    });
    visible.value = false;
}
</script>

<style scoped>
</style>