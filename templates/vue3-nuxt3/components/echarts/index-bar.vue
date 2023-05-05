<template>
	<div class="index-page-echarts-bar">
		<a-skeleton
			active
			:title="false"
			:paragraph="{
				rows: 18,
				width: '100%',
			}"
			:loading="loading"
		></a-skeleton>
		<div class="display-flex">
			<div v-show="!loading" id="indexPageEchartsBar"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { _getRandomNumber } from '~/assets/tsx/tool'
import * as echarts from 'echarts'

defineProps({
	loading: {
		type: Boolean,
		default: true,
	},
})

const textStyle = (opacit = '0.65') => ({
	color: `rgba(0, 0, 0, ${opacit})`,
	fontWeight: 'bold',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji','Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
})

let echartsBarChart: echarts.ECharts | null = null

const handleindexPageEchartsBar = (name = '') => {
	if (!echartsBarChart) {
		// eslint-disable-next-line import/namespace
		echartsBarChart = echarts.init(
			document.getElementById('indexPageEchartsBar')!
		)
	}
	echartsBarChart &&
		echartsBarChart.setOption({
			title: [
				{
					text: '课件学习进度',
					left: '18%',
					textStyle: textStyle('0.86'),
				},
				{
					text: '口口 学习时长',
					left: '68%',
					textStyle: textStyle('0.86'),
				},
			],
			toolbox: {
				feature: {
					saveAsImage: {
						name: `${name}-课件学习进度-口口 学习时长`,
					},
				},
			},
			tooltip: {
				trigger: 'axis',
				gridIndex: 1,
				xAxisIndex: 1,
				yAxisIndex: 1,
				axisPointer: {
					type: 'shadow',
				},
				formatter: function (params: any) {
					return `${params[0].marker}${params[0].seriesName}<br />${
						params[0].name
					} <span style="color:${params[0].color};">${params[0].value}</span> ${
						params[0].seriesName === '课程学习进度' ? '%' : '分钟'
					}`
				},
				textStyle: textStyle(),
			},
			grid: [
				{
					top: 80,
					width: '50%',
					bottom: '0',
					left: 0,
					right: '50%',
					containLabel: true,
				},
				{
					top: 80,
					width: '50%',
					bottom: '0',
					left: '50%',
					right: 0,
					containLabel: true,
				},
			],
			xAxis: [
				{
					data: ['平均进度', '最快进度', '最慢进度'],
					// show: false,
					boundaryGap: ['20%', '0'],
					axisTick: {
						alignWithLabel: true,
					},
				},
				{
					gridIndex: 1,
					data: ['平均时长', '最快时长', '最慢时长'],
					// show: false,
					boundaryGap: ['20%', '0'],
					axisTick: {
						alignWithLabel: true,
					},
				},
			],
			yAxis: [
				{
					// show: false,
					splitLine: {
						show: false, // 背景线 false 隐藏，true 现实
					},
					axisLabel: {
						formatter: '{value}%',
					},
				},
				{
					gridIndex: 1,
					// show: false,
					splitLine: {
						show: false, // 背景线 false 隐藏，true 现实
					},
					axisLabel: {
						formatter: '{value} min',
					},
				},
			],
			series: [
				{
					name: '课程学习进度',
					type: 'bar',
					label: {
						show: true,
						position: 'top',
						formatter: function (params: any) {
							return `${params.value}%`
							// return `${params.name}\n${params.value} %`
						},
						textStyle: textStyle(),
					},
					data: [
						{
							value: _getRandomNumber(100),
							itemStyle: {
								color: '#1E85D1',
							},
						},
						{
							value: _getRandomNumber(100),
							itemStyle: {
								color: '#4AD7A6',
							},
						},
						{
							value: _getRandomNumber(100),
							itemStyle: {
								color: '#faad14',
							},
						},
					],
				},
				{
					name: '口口 学习时长',
					type: 'bar',
					xAxisIndex: 1,
					yAxisIndex: 1,
					label: {
						show: true,
						position: 'top',
						formatter: function (params: any) {
							return `${params.value} 分钟`
							// return `${params.name}\n${params.value} 分钟`
						},
						textStyle: textStyle(),
					},
					data: [
						{
							value: _getRandomNumber(),
							itemStyle: {
								color: '#1E85D1',
							},
						},
						{
							value: _getRandomNumber(),
							itemStyle: {
								color: '#4AD7A6',
							},
						},
						{
							value: _getRandomNumber(),
							itemStyle: {
								color: '#faad14',
							},
						},
					],
				},
			],
		})
	window.addEventListener('resize', () => {
		echartsBarChart && echartsBarChart.resize()
	})
}

defineExpose({
	handleindexPageEchartsBar,
})
</script>

<style lang="less">
#indexPageEchartsBar {
	height: 500px;
	width: 100%;
}
</style>
