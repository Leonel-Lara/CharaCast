<script setup>
import { ref, onMounted, watch } from "vue";

const tabs = ref(null);
const activeBorder = ref(null);

const emit = defineEmits(["setActiveTab"]);

const props = defineProps({
  character: {
    type: Object,
    default: () => {
      return {};
    },
  },
  tabs: {
    type: Array,
    default: () => {
      return [];
    },
  },
  selectedTab: {
    type: Number,
    default: 1,
  },
  tabColor: {
    type: String,
    default: "",
  },
});

watch(
  () => props.tabs,
  (val) => {
    setCss(val.length);
  }
);
watch(
  () => props.selectedTab,
  (val) => {
    setCss(val.length);
  }
);

onMounted(() => {
  setCss(props.tabs.length);
});

const setCss = (tabsLength) => {
  const tabItems = [...tabs.value.children];
  tabItems.map((obj) => {
    obj.style.width = `${100 / tabsLength}%`;
    obj.style.color = `#b6b6b6`;
  });
  tabItems[props.selectedTab - 1].style.color = "#000";

  activeBorder.value.style.width = `${100 / tabsLength}%`;
  activeBorder.value.style.background = "#000";
  activeBorder.value.style.transform = `translateX(${
    100 * (props.selectedTab - 1)
  }%)`;
};

const setActiveTab = (index) => {
  emit("setActiveTab", index + 1, props.character);
};
</script>

<template>
  <div v-if="props.tabs.length > 0" class="tabs" ref="tabs">
    <div
      v-for="(tab, index) in props.tabs"
      :key="index"
      @click="setActiveTab(index)"
      class="tab"
    >
      {{ tab }}
    </div>
    <div ref="activeBorder" class="active-border"></div>
  </div>
</template>
<style lang="scss" scoped>
.tabs {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  margin-top: 5px;
  .active-border {
    position: absolute;
    width: 0;
    height: 1px;
    left: 0;
    bottom: -1px;
    background-color: var(--green1);
    transition: width 0.25s ease, transform 0.25s ease;
  }
  .tab {
    position: relative;
    padding: 1em 0;
    display: flex;
    font-size: 0.9em;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: var(--green1);
    cursor: pointer;
    transition: color 0.2s ease-in-out;
  }
}
</style>
