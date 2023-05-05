<template>
	<footer class="tm-footer">
		Copyright &copy; 2023 口口口. All Rights Reserved. 口口口口口有限公司
		版权所有
		<a :href="'tel:' + phone">联系电话：{{ phone }}</a>
		&nbsp;
		<a href="http://www.beian.miit.gov.cn/" target="_blank">
			备案号：蜀ICP备88888888号
		</a>
	</footer>
</template>

<script setup lang="ts">
const phone = ref('1XXXXXXXXXX')
</script>

<style lang="less">
.tm-footer {
	height: @layout-footer;
	line-height: @layout-footer;
	text-align: center;
	color: @text-color-secondary;
	a {
		color: @text-color-secondary;
		// text-decoration: underline;
		&:hover {
			color: @primary-color;
		}
	}
}
</style>
