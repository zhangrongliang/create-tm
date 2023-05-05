<template>
	<div class="index-page-echarts-pie">
		<a-skeleton
			active
			:title="false"
			:paragraph="{
				rows: 16,
				width: '100%',
			}"
			:loading="loading"
		></a-skeleton>
		<div v-show="!loading" id="indexPageEchartsPieID"></div>
	</div>
</template>

<script setup lang="ts">
import { _getRandomNumber } from '~/assets/tsx/tool'
import * as echarts from 'echarts'
import dayjs from 'dayjs'

defineProps({
	loading: {
		type: Boolean,
		default: true,
	},
})

interface dataType {
	name: string
	timeStart: String
	timeEnd: String
}
const textStyle = (opacit = '0.65') => ({
	color: `rgba(0, 0, 0, ${opacit})`,
	fontWeight: 'bold',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji','Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
})
let echartsPieChart: echarts.ECharts | null = null
const handleEchartsPie = (data: dataType) => {
	if (!echartsPieChart) {
		// eslint-disable-next-line import/namespace
		echartsPieChart = echarts.init(
			document.getElementById('indexPageEchartsPieID')!
		)
	}

	let time = ''
	if (data.timeStart && data.timeEnd) {
		time = `${data.timeStart} 至 ${data.timeEnd}`
	} else {
		time = `截止 ${dayjs().subtract(1, 'day').format('YYYY-MM-DD')}`
	}

	echartsPieChart &&
		echartsPieChart.setOption({
			color: ['#f5222d', '#faad14', '#4AD7A6', '#73C0DE', '#1E85D1'],
			title: {
				text: '课件：' + data.name,
				subtext: `口口 成绩分布图，${time}`,
				left: 'center',
				textStyle: textStyle('0.85'),
				subtextStyle: textStyle(),
			},
			legend: {
				left: '0',
				top: '0',
				orient: 'vertical',
			},
			toolbox: {
				feature: {
					saveAsImage: {
						name: `课件-${data.name}-口口 成绩分布图-${time}`,
					},
				},
			},
			tooltip: {
				trigger: 'item',
				textStyle: textStyle(),
				formatter: function (params: any) {
					// console.log(params)
					return (
						`${params.marker}${params.seriesName}，${params.name}<br /><span style="color:${params.color};">${params.value}</span>` +
						` 人，占 <span style="color:${params.color};">${params.percent}</span> %`
					)
				},
				// top: '0',
			},
			series: [
				{
					name: '分数区间',
					type: 'pie',
					top: '40px',
					left: '0',
					selectedMode: 'series',
					// 饼图的扇区是否是顺时针排布
					clockwise: false,
					// 小于这个角度（0 ~ 360）的扇区，不显示标签（label 和 labelLine）
					minShowLabelAngle: 0.01,
					// 是否展示成南丁格尔图，通过半径区分数据大小。
					// 'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
					// 'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
					roseType: 'radius',
					itemStyle: {
						borderRadius: 10,
						borderColor: '#fff',
						borderWidth: 2,
					},
					label: {
						formatter: function (params: any) {
							return `${params.name}\n ${params.value} 人\n${params.percent} %`
						},
						textStyle: textStyle(),
					},
					data: [
						{ value: _getRandomNumber(), name: '0-60分' },
						{ value: _getRandomNumber(), name: '60-70分' },
						{ value: _getRandomNumber(), name: '70-80分' },
						{ value: _getRandomNumber(), name: '80-90分' },
						{ value: _getRandomNumber(), name: '90-100分' },
					],
				},
			],
		})
	window.addEventListener('resize', () => {
		echartsPieChart && echartsPieChart.resize()
	})
}

defineExpose({
	handleEchartsPie,
})
</script>

<style lang="less">
#indexPageEchartsPieID {
	height: 500px;
	overflow: hidden;
}
</style>
