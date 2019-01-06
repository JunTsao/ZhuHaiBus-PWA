<template>
  <v-layout column>
    <v-slide-y-transition>
      <v-text-field
        hide-details
        label="请输入线路号码"
        class="search"
        background-color="#F1F3F4"
        solo
        v-model="inputString"
        @focus="changeState"
        @blur="changeState"
      ></v-text-field>
    </v-slide-y-transition>
    <v-list class="search_prompt_box" v-show="inputString" two-line>
      <div v-for="(items,index) of candidateArray" :key="index">
        <template v-for="item of items">
          <v-list-tile :key="item.id" ripple @click="postLineMsg(item)">
            <v-list-tile-content>
              <v-list-tile-title>{{item.lineNumber}}</v-list-tile-title>
              <v-list-tile-sub-title class="candidate_list_item_subtitle_wrap">
                <span>{{item.originStation}}</span>
                <v-icon small>arrow_forward</v-icon>
                <span>{{item.terminal}}</span>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </div>
    </v-list>
  </v-layout>
</template>
<script>
import { error } from 'util';
import { setTimeout } from 'timers';
import promplist from '../assets/json/promplist';

export default {
  data() {
    return {
      candidateArray: [],
      inputString: '',
      lineNumArray: null,
      select: null,
      state: false,
    };
  },
  watch: {
    inputString(val) {
      this.candidateArray = [];
      val && val !== this.select && val.length <= 5 && this.queryData(val);
    },
  },
  methods: {
    getSearchTopping() {
      return this.searchTopping;
    },
    fuzzyQuery(str, lineArray) {
      return lineArray
        .filter(v => v.indexOf(str.toUpperCase()) != -1)
        .sort((a, b) => {
          a = a.length;
          b = b.length;
          if (a > b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }
          return 0;
        })
        .slice(0, 2);
    },
    queryData(str) {
      this.candidateArray = this.fuzzyQuery(str, this.lineNumArray).map(
        value => promplist[value],
      );
    },
    changeState() {
      if (!this.candidateArray.length) {
        this.state = !this.state;
        this.$emit('PostSearchState', this.state);
      }
    },
    postLineMsg(info) {
      this.$emit('postLineMsg', info);
      setTimeout(
        (self) => {
          self.inputString = '';
        },
        500,
        this,
      );
    },
  },
  mounted() {
    this.lineNumArray = Object.keys(promplist);
  },
};
</script>

<style lang="css" scoped>
.candidate_list_item_subtitle_wrap {
  display: flex;
  align-items: center;
}

.search_prompt_box {
  position: absolute;
  width: 100%;
  top: 100px;
  z-index: 999;
}
</style>
