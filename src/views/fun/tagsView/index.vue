<template>
	<div class="fun-tagsview">
		<NoticeBar
			text="已删除非当前页 tagsView 演示，后续有时间可以再加回来！，tagsview 支持多标签（参数不同）、单标签共用（参数不同）"
			background="#ecf5ff"
			color="#409eff"
		/>
		<el-card shadow="hover" header="tagsView 当前页演示" class="mt15">
			<div class="flex-warp">
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="primary" size="small" icon="el-icon-refresh-right" @click="refreshCurrentTagsView">刷新当前页 </el-button>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="info" size="small" icon="el-icon-close" @click="closeCurrentTagsView">关闭当前页</el-button>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="warning" size="small" icon="el-icon-circle-close" @click="closeOtherTagsView">关闭其它 </el-button>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="danger" size="small" icon="el-icon-folder-delete" @click="closeAllTagsView">全部关闭 </el-button>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="success" size="small" icon="el-icon-full-screen" @click="openCurrenFullscreen">当前页全屏 </el-button>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts">
import { getCurrentInstance, reactive, toRefs } from 'vue';
import NoticeBar from '/@/components/noticeBar/index.vue';
import { useRoute } from 'vue-router';
export default {
	name: 'funTagsView',
	components: { NoticeBar },
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const route = useRoute();
		const state = reactive({});
		// 0 刷新当前，1 关闭当前，2 关闭其它，3 关闭全部 4 当前页全屏
		// 1、刷新当前 tagsView
		const refreshCurrentTagsView = () => {
			proxy.mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 0, ...route }));
		};
		// 2、关闭当前 tagsView
		const closeCurrentTagsView = () => {
			proxy.mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 1, ...route }));
		};
		// 3、关闭其它 tagsView
		const closeOtherTagsView = () => {
			proxy.mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 2, ...route }));
		};
		// 4、关闭全部 tagsView
		const closeAllTagsView = () => {
			proxy.mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 3, ...route }));
		};
		// 5、开启当前页面全屏
		const openCurrenFullscreen = () => {
			proxy.mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 4, ...route }));
		};
		return {
			refreshCurrentTagsView,
			closeCurrentTagsView,
			closeOtherTagsView,
			closeAllTagsView,
			openCurrenFullscreen,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.fun-tagsview {
	.fun-tagsview-from-item {
		::v-deep(.el-form-item__content) {
			margin-left: 0 !important;
		}
	}
}
</style>
