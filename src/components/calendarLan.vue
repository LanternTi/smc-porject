<template>
    <el-card shadow="hover">
        <el-calendar ref="calendar">
            <template #header="{ date }">
                <span class="data-month">{{ date }}</span>
                <el-button-group>
                    <el-button size="small" :icon="ArrowLeftBold" circle @click="selectDate('prev-month')" />
                    <el-button size="small" :icon="ArrowRightBold" circle @click="selectDate('next-month')" />
                </el-button-group>
            </template>
            <template #date-cell="{ data }">
                <div :class="data.day.isSelected ? 'is-selected' : ''">
                    {{ data.day.split("-")[2] }}
                </div>
            </template>
        </el-calendar>
    </el-card>
</template>

<script setup lang="ts">
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'

import { ref } from 'vue'

const calendar = ref()
const selectDate = (val: string) => {
    calendar.value.selectDate(val)
}
</script>

<style lang="scss" scoped>
.data-month {
    font-weight: bold;
    font-size: 13px;
}

:deep(.el-card__body) {
    padding-top: 0px;
}

:deep(.el-calendar) {
    font-size: 12px;

    .el-calendar-table {
        border-collapse: separate;
        border-spacing: 7.5px 0px
    }

    .el-calendar-table thead th {
        font-weight: bold;
        color: #9879f7;
    }

    .next {
        border: none;
    }

    td {
        border: none;
    }

    .el-calendar__body {
        padding: 0px;
    }

    .el-calendar-day {
        line-height: 10px;
        width: 25px !important;
        height: 25px !important;
        text-align: center;
        border: none;
    }

    .el-calendar-day:hover {
        border-radius: 100%;
    }

    .el-calendar__header {
        justify-content: space-between;
    }

    .is-selected {
        border-radius: 100%;
        background-color: #e3dafc;
        color: #a890f8;
    }

    .el-calendar-day div {
        margin-left: -2px;
    }
}
</style>