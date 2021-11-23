<template>
  <template v-if="isForSearch">
    <el-popover
      placement="bottom"
      :width="tableWeight"
      trigger="manual"
      v-if="visible"
      v-model:visible="popverVisbile"
    >
      <template #reference>
        <el-form-item
          :label="lableText == '' ? attribute.displayName : lableText"
          :prop="attribute.name"
          :title="titleText == '' ? attribute.description : titleText"
        >
          <el-input
            ref="singleInput"
            v-model="formModel.attr"
            :placeholder="placeholder"
            :disabled="disabled"
            @blur="hidePopover"
            @focus="showPopover"
            @input="searchHandler"
            @clearable="clearable"
          ></el-input>
        </el-form-item>
      </template>
      <el-table
        ref="tableElem"
        :data="entries"
        highlight-current-row
        style="width: 100%"
        :show-header="showHeader"
        v-loading="tableLoading"
        element-loading-text="列表正在加载中"
        @row-click="valueChanged"
        height="300"
      >
        <el-table-column
          class="overflow-point"
          :header-align="'left'"
          v-for="(item, index) in tableParams"
          :key="index"
          :prop="item.name"
          :label="item.displayName"
        ></el-table-column>
      </el-table>
    </el-popover>
  </template>
  <template v-else>
    <el-popover
      placement="bottom"
      :width="tableWeight"
      trigger="manual"
      v-if="visible"
      v-model:visible="popverVisbile"
    >
      <template #reference>
        <el-form
          :model="formModel"
          ref="refForm"
          :label-width="labelWidth + 'px'"
          display:flex
          flex-direction:
          row
          flex-wrap:
          wrap
        >
          <el-form-item
            :label="lableText == '' ? attribute.displayName : lableText"
            prop="attr"
            :title="titleText == '' ? attribute.description : titleText"
            :rules="rules()"
          >
            <el-input
              ref="inputElem"
              v-model="formModel.attr"
              :placeholder="placeholder"
              :disabled="disabled || !attribute.isInput"
              @blur="hidePopover"
              @focus="showPopover"
              @input="searchHandler"
              @clearable="clearable"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <el-table
        ref="tableElem"
        :data="entries"
        highlight-current-row
        style="width: 100%"
        :show-header="showHeader"
        v-loading="tableLoading"
        element-loading-text="列表正在加载中"
        @row-click="valueChanged"
        height="300"
      >
        <el-table-column
          class="overflow-point"
          :header-align="'left'"
          v-for="(item, index) in tableParams"
          :key="index"
          :prop="item.name"
          :label="item.displayName"
        ></el-table-column>
      </el-table>
    </el-popover>
  </template>
</template>
<script lang="ts">
import settings from "@/config/settings";
import { MDAttribute } from "@/infrastructure/md/MDAttribute";
import { Validate } from "@/infrastructure/util/Validate";
import { defineComponent, onMounted, ref, reactive, computed } from "vue";

export default defineComponent({
  name: "ax-input-table",
  props: {
    popoverWidth: {
      type: Number,
      default: 0,
    },
    tableParams: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: "请输入内容",
    },
    entries: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      default: "",
    },
    modelSearchKey: {
      type: String,
      default: "",
    },
    /** 默认显示名称 */
    valueKey: {
      type: String,
      default: "",
    },
    /** 属性元数据 */
    attribute: {
      type: MDAttribute,
      required: true,
    },
    /** 是否用于搜索，搜索情况下不做录入校验，不封装form */
    isForSearch: {
      type: Boolean,
      default: false,
    },
    /** title文本 */
    titleText: {
      type: String,
      default: "",
    },
    /** 禁用 */
    disabled: {
      type: Boolean,
      default: false,
    },
    /** 可见性 */
    visible: {
      type: Boolean,
      default: true,
    },
    /** 是否显示表头 */
    showHeader: {
      type: Boolean,
      default: false,
    },
    /** 属性文本的长度，默认100px */
    labelWidth: {
      type: Number,
      default: 100,
    },
    /** 属性文本 */
    lableText: {
      type: String,
      default: "",
    },
  },
  emits: [
    "valueChanged",
    "update:modelValue",
    "update:modelSearchKey",
    "pageLoad",
  ],
  setup(props, { emit }) {
    // 数据值
    const value = computed<string>({
      get: () => props.modelSearchKey,
      set: (val) => {
        emit("update:modelSearchKey", val);
      },
    });
    /** 表单数据模型，包装了v-model */
    const formModel = reactive({ attr: value });
    /** 本身ELForm的引用，此对象在onmounted之后可用 */
    const refForm = ref(null);
    /** 查询模型 */
    const datas = reactive({
      totalCount: 0,
      curPage: 1,
      pageSize: 10,
      queryKeyword: "",
      reload: true,
    });
    const tableElem = ref(null);
    const inputElem = ref(null);
    const popverVisbile = ref(false);
    const tableLoading = ref(false);
    const tableWeight = ref(0);
    const propsPopoverWidth = computed<number>(() => {
      return props.popoverWidth;
    });
    /** 设置列表宽度 */
    if (propsPopoverWidth.value > 0)
      tableWeight.value = propsPopoverWidth.value;
    else {
      tableWeight.value = props.tableParams.length > 1 ? 500 : 230;
    }
    let timer: NodeJS.Timeout;

    /** 加载数据方法 */
    const loadHandler = () => {
      tableLoading.value = true;
      emit("pageLoad", datas);
    };
    /** 重置查询条件 */
    const resetSearchCondition = (value: string) => {
      datas.curPage = 1;
      datas.totalCount = 0;
      datas.reload = true;
      datas.queryKeyword = value;
    };
    /** 开启列表 */
    const showPopover = () => {
      if (!props.disabled) {
        popverVisbile.value = true;
      }
      if (props.entries.length <= 0) {
        resetSearchCondition(props.modelSearchKey);
        loadHandler();
      }
    };
    /** 关闭列表 */
    const hidePopover = () => {
      popverVisbile.value = false;
    };
    /** 重置查询 */
    const resetSearchHandler = (value: string | number) => {
      resetSearchCondition("");
      loadHandler();
    };
    /** 下一页 */
    const loadNextPage = () => {
      if (datas.curPage >= datas.totalCount / datas.pageSize) {
        return;
      }
      datas.curPage = datas.curPage + 1;
      //保证分页加载数据累加
      datas.reload = false;
      loadHandler();
    };
    /** 查询过滤器 */
    const searchHandler = (value: string | number) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        //重置基础查询条件
        resetSearchCondition(value as string);
        loadHandler();
      }, settings.queryKeyTimeOut);
      emit("valueChanged");
    };
    /** 提交选择后数据 */
    const valueChanged = (row: any) => {
      emit("valueChanged");
      emit("update:modelSearchKey", row[props.valueKey]);
      emit("update:modelValue", row.id);
      if(inputElem.value){
        (inputElem.value as any).$el.children[0].focus();
        //确保触发blur事件
        setTimeout(() => {
        (inputElem.value as any).$el.children[0].blur();
        }, 1);
      }
    };
    /** 获取校验规则 */
    const rules = () => {
      if (!props.isForSearch) {
        return Validate.getRules(props.attribute, "blur");
      } else {
        return [];
      }
    };
    /** 校验结果是否通过，由外层统一调用 (此处仅验证非空)*/
    const isValid = (): boolean => {
      let result = true;
      if (!props.attribute.isNullable) {
        if (value.value === "") result = false;
      }
      return result;
    };
    /** 清空事件 */
    const clearable = () => {
      emit("update:modelSearchKey", "");
      emit("update:modelValue", "");
      emit("valueChanged");
      resetSearchCondition("");
      loadHandler();
    };
    onMounted(() => {
      if (tableElem.value) {
        (tableElem.value as any).$el
          .querySelector(".el-table__body-wrapper")
          .addEventListener(
            "scroll",
            function (this: any) {
              const clientHeight = this.clientHeight;
              const scrollTop = this.scrollTop;
              const scrollHeight = this.scrollHeight;
              const scrollDistance =
                this.scrollHeight - this.scrollTop - this.clientHeight;

              if (scrollDistance <= 0) {
                console.log("下一页****");
                // 滚动到最底时，加载下一页
                if (datas.totalCount / datas.pageSize <= datas.curPage) return;
                loadNextPage();
              }
            },
            true
          );
      }
    });

    return {
      value,
      tableElem,
      popverVisbile,
      tableLoading,
      datas,
      showPopover,
      hidePopover,
      searchHandler,
      valueChanged,
      resetSearchHandler,
      resetSearchCondition,
      loadNextPage,
      formModel,
      refForm,
      isValid,
      rules,
      clearable,
      tableWeight,
      inputElem,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>