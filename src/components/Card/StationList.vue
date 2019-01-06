<template>
  <div>
    <div class="station_info_wrap">
      <div class="timeline_dot_wrap">
        <v-icon color="#45a5f5">brightness_1</v-icon>
      </div>
      <div class="bus_icon_wrap">
        <div>
          <v-badge right small class="bus_icon_badge" v-if="datamsg.driveInBusNumber.length >= 2">
            <span slot="badge">{{ datamsg.driveInBusNumber.length }}</span>
            <v-icon color="#2979ff">directions_bus</v-icon>
          </v-badge>
          <v-icon
            v-else
            color="#2979ff"
            v-show="datamsg.driveInBusNumber.length === 1"
          >directions_bus</v-icon>
        </div>
        <div>
          <v-badge right small class="bus_icon_badge" v-if="datamsg.driveOutBusNumber.length >= 2">
            <span slot="badge">{{ datamsg.driveOutBusNumber.length }}</span>
            <v-icon color="#2979ff">directions_bus</v-icon>
          </v-badge>
          <v-icon
            v-else
            color="#2979ff"
            v-show="datamsg.driveOutBusNumber.length === 1"
          >directions_bus</v-icon>
        </div>
      </div>
      <div class="station_details_wrap">
        <span>{{ datamsg.Name }}</span>
      </div>
    </div>
    <v-divider inset class="station-drive"></v-divider>
  </div>
</template>
<script>
export default {
  props: ['datamsg'],
  data: () => ({}),
  methods: {},
};
</script>
<style lang="css" scoped>
.station_info_wrap {
  display: flex;
  min-height: 50px;
  width: 100%;
}

.timeline_dot_icon_wrap {
  position: absolute;
}

.bus_icon_wrap {
  display: flex;
  flex-direction: column;
}

.bus_icon_wrap > div {
  height: 25px;
  width: 50px;
}

.station-drive {
  position: relative;
  top: -15px;
}

.station_details_wrap > span {
  font-size: 1em;
}
</style>
