<template>
    <el-pagination
      @size-change="onPageSizeChange"
      @current-change="onCurrentPageChange"
      :current-page="value"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
</template>
<script lang="ts">
/**
 * 通用布尔控件: 分页
 * @author mst
 */
import { computed, defineComponent } from "vue";
export default defineComponent({
  components: {  },
    name: 'ax-pagination',
    props: {
        /** 总记录条数 */
        totalCount: {
            type: Number,
            default: 0
        },
        /** 当前页 */
        modelValue: {
            type: Number,
            default: 1
        },
        /** 分页大小：取值10，20，50，100，缺省为10 */
        pageSize: {
            type: Number,
            default: 10
        },
    },
    emits:['update:modelValue', 'onPageSizeChange', 'onCurrentPageChange'],
    setup(props, { emit }) {
        // 数据值
        const value = computed<number>({
            get: () => props.modelValue,
            set: val => {
                emit('update:modelValue', val);
            }
        });

        const onPageSizeChange = (pageSize: number) => {
            emit('onPageSizeChange', pageSize);
        };

        const onCurrentPageChange = (pageNo: number) => {
            emit('onCurrentPageChange', pageNo);
        };

        return {
            value: value as unknown as number,
            onPageSizeChange,
            onCurrentPageChange,
        }
    }
});
</script>
<style lang="scss" scoped>
</style>