<template>
	<div class="index-page">
		<div class="index-page-overview m-t">
			<!-- 概览 -->
			<div class="index-page-overview-detail">
				<a-skeleton
					active
					:paragraph="paragraphOverview"
					:loading="loadingOverview"
				>
					<a-statistic title="口口 " :value="baseData.student">
						<template #prefix>
							<span class="iconfont">&#xe659;</span>
						</template>
					</a-statistic>
				</a-skeleton>
			</div>
			<div class="index-page-overview-detail">
				<a-skeleton
					active
					:paragraph="paragraphOverview"
					:loading="loadingOverview"
				>
					<a-statistic :value="baseData.teacher" title="教师">
						<template #prefix>
							<span class="iconfont">&#xe65f;</span>
						</template>
					</a-statistic>
				</a-skeleton>
			</div>
			<div class="index-page-overview-detail">
				<a-skeleton
					active
					:paragraph="paragraphOverview"
					:loading="loadingOverview"
				>
					<a-statistic :value="baseData.class" title="口口 数量">
						<template #prefix>
							<span class="iconfont">&#xe630;</span>
						</template>
					</a-statistic>
				</a-skeleton>
			</div>
			<div class="index-page-overview-detail">
				<a-skeleton
					active
					:paragraph="paragraphOverview"
					:loading="loadingOverview"
				>
					<a-statistic :value="baseData.studentNum" title="累积学习人次">
						<template #prefix>
							<span class="iconfont">&#xe610;</span>
						</template>
					</a-statistic>
				</a-skeleton>
			</div>
			<div class="index-page-overview-detail">
				<a-skeleton
					active
					:paragraph="paragraphOverview"
					:loading="loadingOverview"
				>
					<a-statistic :value="baseData.loginNum" title="累积登录人次">
						<template #prefix>
							<span class="iconfont">&#xe653;</span>
						</template>
					</a-statistic>
				</a-skeleton>
			</div>
			<div class="index-page-overview-detail">
				<a-skeleton
					active
					:paragraph="paragraphOverview"
					:loading="loadingOverview"
				>
					<a-statistic :value="baseData.coursewareNumber" title="课件总数">
						<template #prefix>
							<span class="iconfont">&#xe696;</span>
						</template>
					</a-statistic>
				</a-skeleton>
			</div>
			<div class="index-page-overview-detail">
				<a-skeleton
					active
					:paragraph="paragraphOverview"
					:loading="loadingOverview"
				>
					<a-statistic :value="baseData.coursewareSize" title="资源总量">
						<template #prefix>
							<span class="iconfont">&#xe727;</span>
						</template>
						<template #suffix>
							<span>GB</span>
						</template>
					</a-statistic>
				</a-skeleton>
			</div>
		</div>
		<!-- 口口 成绩分布 -->
		<div class="display-flex index-page-echarts">
			<a-card class="box-shadow-base width-4-2 m-b">
				<template #title>
					<span class="iconfont m-r-small">&#xe68e;</span>
					口口 成绩分布
				</template>
				<div>
					<a-form
						class="tm-form index-page-echarts-form"
						layout="inline"
						:model="formStudentEchartsPie"
						autocomplete="off"
					>
						<a-form-item class="m-r" label="课件" name="name">
							<a-select
								ref="select"
								v-model:value="formStudentEchartsPie.name"
								show-search
								:disabled="formStudentEchartsPie.loading"
							>
								<a-select-option value="课件一课件一课件一">
									课件一课件一课件一
								</a-select-option>
								<a-select-option value="课件二课件二课件二">
									课件二课件二课件二
								</a-select-option>
								<a-select-option value="课件三课件三课件三">
									课件三课件三课件三
								</a-select-option>
								<a-select-option value="课件四课件四课件四">
									课件四课件四课件四
								</a-select-option>
							</a-select>
						</a-form-item>
						<a-form-item label="时间" name="class" class="a-range-picke">
							<a-range-picker
								v-model:value="formStudentEchartsPie.time"
								:disabledDate="disabledDate"
								:disabled="formStudentEchartsPie.loading"
							/>
						</a-form-item>
					</a-form>
					<echarts-index-pie
						ref="echartsPie"
						:loading="formStudentEchartsPie.loading"
					/>
				</div>
			</a-card>
			<a-card class="box-shadow-base width-4-2 m-b">
				<template #title>
					<span class="iconfont m-r-small">&#xe632;</span>
					口口 学习进度
				</template>
				<div>
					<a-form
						class="tm-form index-page-echarts-form"
						layout="inline"
						:model="formStudentEchartsBar"
						autocomplete="off"
					>
						<a-form-item class="m-r" label="口口 " name="name">
							<a-select
								ref="select"
								v-model:value="formStudentEchartsBar.name"
								show-search
								:disabled="formStudentEchartsBar.loading"
							>
								<a-select-option value="2023年1班">2023年1班</a-select-option>
								<a-select-option value="2023年2班">2023年2班</a-select-option>
								<a-select-option value="2023年3班">2023年3班</a-select-option>
								<a-select-option value="2023年4班">2023年5班</a-select-option>
							</a-select>
						</a-form-item>
					</a-form>
					<echarts-index-bar
						ref="echartsBar"
						:loading="formStudentEchartsBar.loading"
					/>
				</div>
			</a-card>
		</div>

		<div class="display-flex index-page-msg">
			<!-- <a-card class="box-shadow-base width-4-3">
				<template #title>
					<span class="iconfont m-r-small">&#xe7de;</span>
					课件详细数据
				</template>
				<admin-table-page
					ref="tablePageRef"
					:columns="formPage.columns"
					:fetchData="fetchData"
					:isPageTableClass="false"
					:rowSelection="handleSelection"
					size="middle"
				>
					<template #search="{ loading, handleTable }">
						<a-form
							class="tm-form index-page-echarts-form"
							layout="inline"
							:model="formPage"
							autocomplete="off"
						>
							<a-form-item class="m-r" label="课件" name="name">
								<a-input
									v-model:value="formPage.name"
									:maxlength="50"
									placeholder="请输入课件名称"
								/>
							</a-form-item>
							<a-form-item label="时间" name="class" class="a-range-picker">
								<a-range-picker
									v-model:value="formPage.time"
									:disabledDate="disabledDate"
								/>
							</a-form-item>

							<a-button
								class="m-l"
								type="primary"
								:loading="loading"
								@click="handleTable(1)"
							>
								<span class="iconfont m-r-small">&#xe67c;</span>
								搜索
							</a-button>
						</a-form>
						<div class="table-search-add m-t-0">
							<a-button size="small">
								<span class="iconfont m-r-small">&#xe60e;</span>
								下载所有课件数据
							</a-button>
							<a-button size="small" :disabled="!selectedRowKeys.arr.length">
								<span class="iconfont m-r-small">&#xe60e;</span>
								批量下载已选课件数据
							</a-button>
						</div>
					</template>
				</admin-table-page>
			</a-card> -->
			<echarts-index-line />
			<!-- log -->
			<a-card class="box-shadow-base width-4-1">
				<template #title>
					<span class="iconfont m-r-small">&#xe69d;</span>
					操作日志
				</template>
				<a-skeleton
					active
					:title="false"
					:paragraph="{
						rows: 25,
						width: '100%',
					}"
					:loading="dataLog.loading"
				>
					<a-timeline class="index-page-msg-height">
						<a-timeline-item v-for="item in dataLog.data" :key="item.id">
							<template #dot>
								<span
									class="iconfont"
									:class="{
										'error-color': item.active.name === '删除',
										'success-color': item.active.name === '添加',
										'warning-color ': item.active.name === '退出登录',
									}"
									v-html="item.active.icon"
								></span>
							</template>
							{{ item.name }}
							<span
								class="primary-color"
								:class="{
									'error-color': item.active.name === '删除',
									'success-color': item.active.name === '添加',
									'warning-color ': item.active.name === '退出登录',
								}"
							>
								{{ item.active.name }}
							</span>
							{{ item.content }}
							<span class="time">{{ item.date }}</span>
						</a-timeline-item>
					</a-timeline>
				</a-skeleton>
			</a-card>
		</div>
		<admin-footer />
		<!-- 学习详情 modal -->
		<a-modal
			v-model:visible="modelTable.visible"
			:width="960"
			:footer="null"
			:centered="true"
		>
			<template #title>
				<span class="iconfont m-r-small">&#xe69c;</span>
				{{ '学习详情：<' + modelTable.title + '>' }}
			</template>
			<!-- table page  -->
			<admin-table-page
				ref="tablePageRef"
				:columns="modelTable.columns"
				:fetchData="fetchData"
				:isPageTableClass="false"
				size="middle"
			>
				<!-- search -->
				<template #search>
					<div class="table-search-add">
						<a
							href="./口口 口口 导入模板.xls"
							download="口口 口口 导入模板.xls"
						>
							<a-button size="small">
								<span class="iconfont m-r-small">&#xe60e;</span>
								下载本课件所有学习数据
							</a-button>
						</a>
					</div>
				</template>
			</admin-table-page>
		</a-modal>
	</div>
</template>

<script setup lang="ts">
import { pageColumns, modalColumns } from '~/assets/tsx/index-columns'
import { fetchBaseData, fetchOperation, fetch口口 } from '@/fetch/http' // 引入moment
import dayjs, { Dayjs } from 'dayjs'

useHead({
	title: '口口口 管理后台-首页',
})

// type
interface formType {
	name: string
	time: Dayjs[]
	columns?: object[]
	loading?: boolean
	timeStart?: string
	timeEnd?: string
}

// 三位数加逗号
// const addCommas = (nStr: string) => {
// 	nStr += ''
// 	const x = nStr.split('.')
// 	let x1 = x[0]
// 	const x2 = x.length > 1 ? '.' + x[1] : ''
// 	const rgx = /(\d+)(\d{3})/
// 	while (rgx.test(x1)) {
// 		x1 = x1.replace(rgx, '$1' + ',' + '$2')
// 	}
// 	return x1 + x2
// }
// 概览
const baseData = ref({
	coursewareNumber: 0,
	theoryNumber: 0,
	materials: 0,
	discuss: 0,
	student: 0,
	teacher: 0,
})
const paragraphOverview = reactive({
	rows: 1,
	width: '100%',
})
const loadingOverview = ref(true)

// student score echarts
// can't select a previous time
const disabledDate = (current: Dayjs) => {
	return current && current > dayjs().endOf('day')
}

// 饼图
const echartsPie = ref()
const formStudentEchartsPie = reactive<formType>({
	name: '课件一课件一课件一',
	time: [],
	loading: true,
	timeStart: '',
	timeEnd: '',
})

watch(
	[() => formStudentEchartsPie.name, () => formStudentEchartsPie.time],
	_ => {
		handleStudentEchartsPie()
	}
)

const handleStudentEchartsPie = () => {
	formStudentEchartsPie.loading = true
	const data = toRaw(formStudentEchartsPie)
	try {
		if (data.time[1]) {
			data.timeStart = dayjs(data.time[0]).format('YYYY-MM-DD')
			data.timeEnd = dayjs(data.time[1]).format('YYYY-MM-DD')
		}
	} catch (error) {
		data.timeStart = ''
		data.timeEnd = ''
	}
	// TODO  ajax
	formStudentEchartsPie.loading = false
	nextTick(() => {
		echartsPie.value.handleEchartsPie({
			name: formStudentEchartsPie.name,
			timeStart: data.timeStart,
			timeEnd: data.timeEnd,
		})
	})
}

// 柱状图
const echartsBar = ref()
const formStudentEchartsBar = reactive({
	name: '2023年1班',
	loading: true,
})
const handleStudentEchartsBar = () => {
	formStudentEchartsBar.loading = true
	// TODO  ajax
	formStudentEchartsBar.loading = false
	nextTick(() => {
		echartsBar.value.handleindexPageEchartsBar(formStudentEchartsBar.name)
	})
}
watch(
	() => formStudentEchartsBar.name,
	_ => {
		handleStudentEchartsBar()
	}
)

// log
const dataLog = reactive({
	data: [],
	loading: true,
})

// table
const tablePageRef = ref()
const handleStudyMsg = (data: any) => {
	modelTable.visible = true
	modelTable.title = data.name
}
const formPage = reactive<formType>({
	name: '',
	time: [],
	// page table 列
	columns: pageColumns(handleStudyMsg).data,
})

// table fetchData
const fetchData = (currentPage?: number | undefined) => {
	return new Promise(resolve => {
		try {
			const data = { ...toRaw(formPage) }
			fetchVr({
				currentPage: currentPage || 1,
				...data,
			}).then(data => {
				resolve(data)
			})
		} catch (error) {}
	})
}
// table 多选
const selectedRowKeys = reactive({
	arr: [],
	obj: [],
})
const handleSelection = {
	onChange: (rowKeys: [], rowObj: []) => {
		selectedRowKeys.arr = rowKeys
		selectedRowKeys.obj = rowObj
	},
}

/**
 * 学习详情 弹窗
 */
const modelTable = reactive({
	visible: false,
	title: '',
	// page table 列
	columns: modalColumns().data,
})

onMounted(async () => {
	try {
		const resBaseData = await fetchBaseData()
		baseData.value = resBaseData.data
		loadingOverview.value = false
		const resOperation = await fetchOperation()
		dataLog.data = resOperation.data
		dataLog.loading = false
		handleStudentEchartsPie()
		handleStudentEchartsBar()
	} catch (error) {}
})
</script>
