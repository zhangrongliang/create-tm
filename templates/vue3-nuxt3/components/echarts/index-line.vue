<template>
	<!-- echarts -->
	<div class="index-echarts-array">
		<h3>
			开课信息
			<div class="flex-grow"></div>
			<a-dropdown :disabled="loadingEcharts">
				<a @click.prevent>
					{{ dropdownActive }}
					<span class="iconfont m-r-small">&#xe6ee;</span>
				</a>
				<template #overlay>
					<a-menu @click="handleDropdown">
						<a-menu-item v-for="item in dropdownList" :key="item">
							<a href="javascript:;">{{ item }}</a>
						</a-menu-item>
					</a-menu>
				</template>
			</a-dropdown>
		</h3>

		<div id="echartsID" class="echarts-box">
			<a-skeleton
				active
				:paragraph="paragraphEcharts"
				:loading="loadingEcharts"
				:title="false"
			></a-skeleton>
		</div>
	</div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { fetchBaseData } from '@/fetch/http'
import { _getRandomNumber } from '~/assets/tsx/tool'
import { menuStore } from '@/stores/admin.js'
import dayjs from 'dayjs'

const adminMenu = menuStore()

// 概览
const baseData = ref({
	coursewareNumber: 0,
	theoryNumber: 0,
	materials: 0,
	discuss: 0,
	student: 0,
	teacher: 0,
})

// echats
// 记录用户选择倾向，本周、本月
const echartsDropdownActive = useCookie('echarts-dropdown-active')
const paragraphEcharts = reactive({
	rows: 21,
	width: '100%',
})
const loadingEcharts = ref(true)
// 开课概览范围切换
let echartsObject: echarts.ECharts | null = null
const dropdownList = ref(['本周', '本月'])
const dropdownActive = ref('')
const downloadText = ref('本周课概览')
const textStyle = {
	color: 'rgba(0, 0, 0, 0.65)',
	fontWeight: 'bold',
}
const xWeekBase = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const xWeek: object[] = []
let total1 = 0
let total2 = 0
const xWeekData1: number[] = []
const xWeekData2: number[] = []
const xMonth: object[] = []
const xMonthData1: number[] = []
const xMonthData2: number[] = []
const handleDropdown = (data: any = '本周') => {
	loadingEcharts.value = true
	dropdownActive.value = data.key || data
	echartsDropdownActive.value = data.key || data
	echartsObject && echartsObject.dispose()
	total1 = 0
	total2 = 0
	if (dropdownActive.value === '本月') {
		const days = dayjs().daysInMonth()
		xMonth.length = 0
		xMonthData1.length = 0
		xMonthData2.length = 0

		let i = 0
		while (i < days) {
			xMonth.push({
				value: i + 1 + '',
				textStyle,
			})
			const data1 = _getRandomNumber(baseData.value.teacher)
			const data2 = _getRandomNumber(baseData.value.student)
			total1 += data1
			total2 += data2
			xMonthData1.push(data1)
			xMonthData2.push(data2)
			i++
		}
		downloadText.value = dayjs().month() + 1 + '月开课概览'
		// TODO ajax
		echartsInit(xMonth, xMonthData1, xMonthData2)
	} else {
		xWeek.length = 0
		xWeekData1.length = 0
		xWeekData2.length = 0
		let i = 0
		while (i < 7) {
			xWeek.push({
				value: xWeekBase[i],
				textStyle,
			})
			const data1 = _getRandomNumber(baseData.value.teacher)
			const data2 = _getRandomNumber(baseData.value.student)
			total1 += data1
			total2 += data2
			xWeekData1.push(data1)
			xWeekData2.push(data2)
			i++
		}
		downloadText.value = '本周开课概览'
		// TODO ajax
		echartsInit(xWeek, xWeekData1, xWeekData2)
	}
}
// 开课概览图表
const echartsSeries = (
	name: string,
	color: string,
	formatter: string,
	position: string | number[]
) => {
	return {
		name,
		type: 'line',
		smooth: true, // 曲线
		showSymbol: true, // 峰值点
		step: dropdownActive.value !== '本周', // 梯形图
		symbol: 'circle', // 将小圆点改成实心 不写symbol默认空心
		symbolSize: 8, // 小圆点的大小
		stack: 'Total',
		lineStyle: {
			shadowColor: 'rgba(0, 0, 0, 0.5)',
			shadowBlur: 6,
			color,
			width: 4,
			shadowOffsetY: 8,
			shadowOffsetX: 3,
		},
		label: {
			show: true,
			formatter,
			position,
			color: 'rgba(0, 0, 0, 0.65)',
			fontWeight: 'bold',
		},
	}
}
// echarts
const echartsInit = (
	xAxisData: string[] | object[],
	data1: number[],
	data2: number[]
) => {
	loadingEcharts.value = false
	nextTick(() => {
		// eslint-disable-next-line import/namespace
		const echartsPieChart = echarts.init(document.getElementById('echartsID')!)
		echartsPieChart.setOption({
			color: ['#1E85D1', '#4AD7A6'],
			title: {
				text: `${downloadText.value}`,
				textStyle: {
					fontSize: 14,
					lineHeight: 20,
					color: '#1E85D1',
				},
				subtext: `开课 ${total1} 次，参加 ${total2} 人`,
				subtextStyle: {
					color: 'rgba(0, 0, 0, 0.45)',
					fontWeight: 'bold',
				},
				left: -5,
			},
			tooltip: {
				trigger: 'axis',
				formatter:
					(dropdownActive.value === '本月' ? dayjs().month() + 1 + '月' : '') +
					`{b}` +
					(dropdownActive.value === '本月' ? '日' : '') +
					`<br />开课 {c0} 次<br />参加 {c1} 人`,
				textStyle: {
					color: 'rgba(0, 0, 0, 0.65)',
					fontWeight: 'bold',
				},
			},
			legend: {
				data: ['开课次数', '', '参加人数'],
				align: 'right',
				right: 65,
				icon: 'roundRect',
				itemHeight: 5,
				itemWidth: 50,
				textStyle: {
					color: 'rgba(0, 0, 0, 0.45)',
					fontWeight: 'bold',
				},
			},
			grid: {
				left: '-10',
				right: '30',
				bottom: '20',
				containLabel: true,
			},
			toolbox: {
				feature: {
					saveAsImage: {
						name: downloadText.value, // download name
					},
				},
			},
			xAxis: [
				{
					position: 'top',
					offset: 8,
					type: 'category',
					boundaryGap: false,
					axisLine: {
						show: false,
					},
					axisTick: {
						show: false,
					},
					// inverse: true, // 是否是反向坐标
					data: xAxisData,
					splitLine: {
						show: false, // 背景线 false 隐藏，true 现实
						lineStyle: {
							type: 'dashed',
						},
					},
				},
			],
			yAxis: [
				{
					show: false,
					type: 'value',
					splitLine: {
						show: false, // 背景线 false 隐藏，true 现实
						lineStyle: {
							type: 'dashed',
						},
					},
				},
			],
			series: [
				{
					data: data1,
					...echartsSeries('开课次数', '#1E85D1', '{c}次', [-10, 12]),
				},
				{
					data: data2,
					...echartsSeries('参加人数', '#4AD7A6', '{c}人', [-10, -12]),
				},
			],
		})
		echartsObject = echartsPieChart
		window.addEventListener('resize', () => {
			echartsPieChart.resize()
		})
	})
}

watch(
	() => adminMenu.collapsed,
	() => {
		setTimeout(() => {
			if (echartsObject) echartsObject.resize()
		}, 300)
	}
)

onMounted(async () => {
	try {
		const resBaseData = await fetchBaseData()
		baseData.value = resBaseData.data
		handleDropdown(echartsDropdownActive.value || '本周')
	} catch (error) {}
})
</script>

<style lang="less">
.index-echarts-array {
	width: calc(100% / 4 * 3 - @padding);
	background-color: #fff;
	border-radius: @border-radius-base;
	box-shadow: @box-shadow-base;
	h3 {
		border-bottom: solid 1px @border-color-base;
		padding: @padding;
		font-size: 16px;
		display: flex;
		margin-bottom: 0;
		a {
			font-weight: normal;
		}
	}
	.echarts-box {
		padding: @padding @padding 0 @padding;
		overflow: hidden;
		height: calc(
			100vh - @layout-height - @layout-footer - @layout-footer - @padding * 2 -
				90px - 47px - @padding * 3
		);
	}
}
</style>
