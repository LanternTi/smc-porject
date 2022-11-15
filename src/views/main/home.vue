<template>
    <div>
        <div>
            <el-row :gutter="40">
                <el-col :span="6">
                    <el-card shadow="hover">
                        <div id="pie_chart" style="width: 277px;height: 230px;margin-left: -20px;">

                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover">
                        <div id="line_chart" style="width: 277px;height: 230px;margin-left: -20px;">

                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <CalendarLan></CalendarLan>
                </el-col>
            </el-row>
            <el-card shadow="hover" style="margin-top: 50px;width: 925px;">
                <div id="card_chart" style="width: 925px;height: 400px;">

                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import { PieChart, LineChart, ScatterChart } from 'echarts/charts';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted } from 'vue';
import {
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    GridComponent,
    ToolboxComponent
} from 'echarts/components';

echarts.use([
    PieChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    TooltipComponent,
    TitleComponent,
    GridComponent,
    ToolboxComponent,
    LineChart,
    LegendComponent,
    ScatterChart
])

onMounted(() => {
    var pieChart = echarts.init(document.getElementById('pie_chart'))
    var lineChart = echarts.init(document.getElementById('line_chart'))
    var cardChart = echarts.init(document.getElementById('card_chart'))
    pieChart.setOption(pieOption)
    lineChart.setOption(lineOption)
    cardChart.setOption(cardOption)
})
var pieOption = {
    title: {
        text: '订单情况',
        left: 100
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '10%',
        left: 'center'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            top: 20,
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '25',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 15, name: '已完成' },
                { value: 1, name: '已取消' },
                { value: 1, name: '待支付' }
            ]
        }
    ]
}

// prettier-ignore
const hours = [
    '12a', '1a', '2a', '3a', '4a', '5a', '6a',
    '7a', '8a', '9a', '10a', '11a',
    '12p', '1p', '2p', '3p', '4p', '5p',
    '6p', '7p', '8p', '9p', '10p', '11p'
];
// prettier-ignore
const days = [
    'Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday', 'Sunday'
];
// prettier-ignore
const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]
    .map(function (item) {
        return [item[1], item[0], item[2]];
    });
var cardOption = {
    title: {
        text: '员工打卡情况'
    },
    tooltip: {
        position: 'top',
        formatter: function (params) {
            return (
                params.value[2] +
                ' commits in ' +
                hours[params.value[0]] +
                ' of ' +
                days[params.value[1]]
            );
        }
    },
    grid: {
        left: 2,
        bottom: 10,
        right: 10,
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: hours,
        boundaryGap: false,
        splitLine: {
            show: true
        },
        axisLine: {
            show: false
        }
    },
    yAxis: {
        type: 'category',
        data: days,
        axisLine: {
            show: false
        }
    },
    series: [
        {
            name: 'Punch Card',
            type: 'scatter',
            symbolSize: function (val) {
                return val[2] * 2;
            },
            data: data,
            animationDelay: function (idx) {
                return idx * 5;
            }
        }
    ]
};

var lineOption = {
    title: {
        text: '收入情况',
        left: 100
    },
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '净收入',
            type: 'line',
            stack: 'Total',
            data: [230, 153, 140, 220, 213, 200, 243]
        },
        {
            name: '收入',
            type: 'line',
            stack: 'Total',
            data: [1200, 1425, 1455, 1724, 1711, 1682, 1856]
        }

    ]
};
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
}
</style>