<template>
  <v-container grid-list-md>
    <v-card class="line_card">
      <div class="line_card_info_wrap">
        <div class="line_title_wrap">
          <h3 class="line_title">{{ lineDetails.lineNumber }}</h3>
          <span>开往 {{ lineDetails.terminal }}</span>
        </div>
        <div class="line_card_actions_wrap">
          <v-btn
            :class="{loading: load}"
            class="sync"
            color="grey"
            flat
            icon
            :disabled="load"
            @click="updateRealTimeData"
          >
            <v-icon>sync</v-icon>
          </v-btn>

          <v-btn
            flat
            icon
            color="grey"
            style="margin: 0 auto"
            :disabled="!judgeDisabledState"
            @click="changeLineDirection"
          >
            <v-icon>swap_horiz</v-icon>
          </v-btn>
          <v-btn flat icon color="grey" style="margin: 0 auto" @click="showMore = !showMore">
            <v-icon>{{showMore ? "keyboard_arrow_down" : "keyboard_arrow_up"}}</v-icon>
          </v-btn>
        </div>
      </div>
      <v-divider></v-divider>
      <v-slide-y-transition>
        <div class="overflow" v-if="lineDetails.stations !== undefined" v-show="showMore">
          <div class="timeline"></div>
          <StationList v-for="(item, index) in lineDetails.stations" :datamsg="item" :key="index"></StationList>
        </div>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</template>
<script>
// 单向线路406 407 Z103 Z105 Z107 Z116 Z117 Z121A Z261 Z265 Z267 Z16 Z56 Z75 Z76 101

import { setTimeout } from 'timers';

export default {
  props: ['msg'],
  components: {
    StationList: () => import('./StationList'),
  },
  data() {
    return {
      lineDetails: this.msg,
      showMore: false,
      load: false,
      disabledState: true,
    };
  },
  computed: {
    judgeDisabledState() {
      return this.lineDetails.direction && this.disabledState && !this.load;
    },
  },

  methods: {
    mergeData(realTimeData) {
      this.clearRealData();
      this.lineDetails.stations.forEach((station) => {
        realTimeData.forEach((item) => {
          if (station.Name === item.name) {
            if (item.state) {
              station.driveInBusNumber.push(item);
            } else {
              station.driveOutBusNumber.push(item);
            }
          }
        });
      });
    },
    clearRealData() {
      this.lineDetails.stations.forEach((station) => {
        station.driveInBusNumber = [];
        station.driveOutBusNumber = [];
      });
    },
    changeLineDirection() {
      this.$http
        .getLineDetails(this.lineDetails.reverseLineInfo)
        .then((details) => {
          this.$http.getStationsList(details[0]).then((stationArray) => {
            this.lineDetails = {
              ...details[0],
              stations: stationArray,
            };

            this.updateRealTimeData();
          });
        });
    },
    updateRealTimeData() {
      this.load = true;
      this.$http.getRealTimeData(this.lineDetails).then((response) => {
        this.mergeData(response);
        setTimeout(
          (self) => {
            self.load = false;
          },
          2000,
          this,
        );
      });
    },
  },

  created() {
    this.$http.getStationsList(this.lineDetails).then((response) => {
      this.lineDetails.stations = response;
      this.updateRealTimeData();
    });
  },
};
</script>

<style lang="css" scoped>
.container {
  padding: 6px;
}

.line_card {
  margin: 10px 0;
  border-radius: 5px;
}

.line_card_info_wrap {
  display: flex;
  justify-content: space-between;
  min-height: 80px;
  padding: 10px;
}

.line_card_actions_wrap {
  display: flex;
  align-items: center;
}

.line_title_wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.line_title_wrap > span {
  text-align: center;
  font-size: 12px;
}

.overflow {
  max-height: 350px;
  overflow: auto;
  overflow-x: hidden;
  padding: 20px 10px;
}

.test_icon {
  position: absolute;
  left: 0;
  top: 30px;
}

.icon_forward {
}

ul {
  position: relative;
  padding-top: 20px;
}

.station_wrap {
  display: flex;
  min-height: 50px;
  list-style-type: disc;
}

.drive_out_bus_icon {
  position: absolute;
  left: 0;
  top: 24px;
}

.station_name_wrap {
  left: 24px;
}

.station_details_wrap {
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.loading {
  animation: rotation 0.6s linear infinite;
}
</style>
