<template>
	<div class="layout-view-bg-white flex" :style="{ height: `calc(100vh - ${setViewHeight}` }">
		<div class="flex-margin">
			<el-result icon="success" title="普通路由" subTitle="可 `开启 TagsView 共用` 进行单标签测试">
				<template #extra>
					<el-input v-model="value" placeholder="请输入路由参数id值" clearable></el-input>
					<el-button type="primary" size="small" icon="iconfont icon-putong" class="mt15" @click="onGoDetailsClick">普通路由传参</el-button>
				</template>
			</el-result>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed } from 'vue';
import { useStore } from '/@/store/index';
import { useRouter } from 'vue-router';
export default defineComponent({
	name: 'paramsCommon',
	setup() {
		const store = useStore();
		const state = reactive({
			value: '',
		});
		const router = useRouter();
		// 设置 view 的高度
		const setViewHeight = computed(() => {
			let { isTagsview } = store.state.themeConfig.themeConfig;
			let { isTagsViewCurrenFull } = store.state.tagsViewRoutes;
			if (isTagsViewCurrenFull) {
				return `30px`;
			} else {
				if (isTagsview) return `114px`;
				else return `80px`;
			}
		});
		// 跳转到详情
		const onGoDetailsClick = () => {
			router.push({
				path: '/params/common/details',
				query: { id: state.value, name: 'vue-next-admin' },
			});
			state.value = '';
		};
		return {
			setViewHeight,
			onGoDetailsClick,
			...toRefs(state),
		};
	},
});
</script>
