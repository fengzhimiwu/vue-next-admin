<template v-if="visiable">
    <el-button @click="actionDone" type="text" size="small" :disabled="disabled">{{title}}</el-button>
</template>
<script lang="ts">
/**
 * 通用按钮（Action）控件: 
 * @author mst
 */
import { computed, defineComponent, reactive } from "vue";
export default defineComponent({
  components: {  },
    name: 'ax-action',
    props: {
        /** 标题 */
        title: {
            type: String,
            required: true
        },
        /** 输入值 */
        inParam: {
            type: Object,
            required: true
        },
        /** 是否禁用，缺省false，true将会被置为不可用状态 */
        disabled: {
            type: Boolean,
            default: false
        },
        /** 是否可见，缺省true，false将会被置为不可见 */
        visiable: {
            type: Boolean,
            default: true
        },
    },
    emits:['actionDone'],
    setup(props, { emit }) {

        /** 操作完成后时间 */
        const actionDone = () => {
            console.log('action done ：' + props.inParam);
            emit('actionDone', '执行的返回值，无返回则为空');
        };

        return {
            actionDone,
        }
    }
});
</script>
<style lang="scss" scoped>
</style>