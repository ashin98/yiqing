<template>
  <div class="box" :style="{ background: `url(${bg})` }">
    <div class="box-left">
      <div class="box-left-card">
        <section>
          <div>较上日+ {{ store.chinaAdd.localConfirmH5 }}</div>
          <div>{{ store.chinaTotal.localConfirm }}</div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.nowConfirm }}</div>
          <div>{{ store.chinaTotal.nowConfirm }}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.confirm }}</div>
          <div>{{ store.chinaTotal.confirm }}</div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.noInfect }}</div>
          <div>{{ store.chinaTotal.noInfect }}</div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.importedCase }}</div>
          <div>{{ store.chinaTotal.importedCase }}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.dead }}</div>
          <div>{{ store.chinaTotal.dead }}</div>
          <div>累计死亡</div>
        </section>
      </div>
      <div class="box-left-pie"></div>
      <div class="box-left-line"></div>
    </div>
    <div class="box-contain" id="china"></div>
    <div class="box-right">
      <table class="table" cellspacing="0" border="1">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group
          tag="tbody"
          enter-active-class="animate__animated animate__heartBeat"
        >
          <tr v-for="item in store.item" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.today.confirm }}</td>
            <td>{{ item.total.confirm }}</td>
            <td>{{ item.total.heal }}</td>
            <td>{{ item.total.dead }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import bg from "./assets/1.jpg";
import { useStore } from "./stores";
import * as echarts from "echarts";
import "animate.css";
import "./assets/china.js"; // 中国地图
import { geoCoordMap } from "./assets/geoMap"; // 各城市的经纬度
const store = useStore();

// 地图
const initCharts = () => {
  const city = store.list.data.diseaseh5Shelf.areaTree[0].children;
  store.item = city[1].children;
  const data = city.map((v) => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
      children: v.children,
    };
  });
  const charts = echarts.init(document.querySelector("#china") as HTMLElement);
  charts.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      itemStyle: {
        //  normal: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
        // },
      },
      emphasis: {
        areaColor: "#0f5d9d",
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            //normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
            //},
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "100%",
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        symbol: "pin",
        symbolSize: [45, 45],
        label: {
          show: true,
          color: "#fff",
          formatter(value: any) {
            return value.data.value[2];
          },
        },
        itemStyle: {
          color: "#1E90FF", //标志颜色
        },
        data: data,
      },
    ],
  });
  charts.on("click", (e: any) => {
    console.log(e);
    store.item = e.data.children;
    console.log(store.item);
  });
};

// 饼状图
const initPie = () => {
  const charts = echarts.init(
    document.querySelector(".box-left-pie") as HTMLElement
  );
  charts.setOption({
    backgroundColor: "#223651",
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        itemStyle: {
          borderRadius: 4,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "15",
          },
        },
        data: store.cityDetail.map((v) => {
          return {
            name: v.city,
            value: v.nowConfirm,
          };
        }),
      },
    ],
  });
};

// 线图
const initLine = () => {
  const charts = echarts.init(
    document.querySelector(".box-left-line") as HTMLElement
  );
  charts.setOption({
    backgroundColor: "#223651",
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: store.cityDetail.map((v) => v.city),
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
    },
    label: {
      show: true,
    },
    series: [
      {
        data: store.cityDetail.map((v) => v.nowConfirm),
        type: "line",
        smooth: true,
      },
    ],
  });
};
onMounted(async () => {
  const charts = echarts.init(document.querySelector("#china") as HTMLElement);
  await store.getList();
  initCharts();
  initPie();
  initLine();
});

store.getList();
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
@itemColor: #41b0db;
@itemBg: #223651;
@itemBorder: #212028;
#app,
body,
html {
  height: 100%;
  overflow: hidden;
  margin: 0;
}
.box {
  height: 100%;
  display: flex;
  .box-left {
    width: 400px;
    &-pie {
      height: 320px;
      margin-top: 20px;
    }
    &-line {
      height: 320px;
      margin-top: 20px;
    }
    section {
      background: @itemBg;
      border: 1px solid @itemBorder;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      div:nth-child(2) {
        color: @itemColor;
        padding: 10px 0;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .box-contain {
    flex: 1;
  }
  .box-right {
    width: 400px;
    height: 100%;
    .table {
      color: #fff;
      width: 100%;
      background-color: #212028;
      tr {
        th {
          padding: 5px;
          width: 100px;
          white-space: nowrap;
        }
        td {
          padding: 5px;
          width: 100px;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
