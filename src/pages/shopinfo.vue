<template>
  <div class="competitor-total">
    <div class="hospital-header">
      <div class="hospital">
        <div class="hospital-name">
          <label>医院(门店名称)</label>
          <div class="hospital-select">
            <input type="text" @focus="showHospital = true"  v-model = "hospitalText">
            <ul class="show-hospital" v-if="newHishospital.length > 0" v-show="showHospital">
              <template v-for="(item, index) in newHishospital">
                <li @click.stop.prevent="chooseHospital(item)">{{ item.text }}</li>
              </template>
            </ul>
          </div>
          <!-- <select name="" v-model="hospitalValue">
            <option value="" v-for="option in hishospital" v-bind:value="option.value">
              {{option.text}}
            </option>
          </select> -->
        </div>
        <div class="store-number">
          <label>门店号</label>
          <input type="text" v-model="storeNumber">
        </div>
      </div>
      <div class="store-time">
        <div class="start-time">
          <label>开始驻店时间</label>
          <select name="" v-model="selectStartTime">
            <option value="" v-for="option in startTimeList" v-bind:value="option">
              {{option}}
            </option>
          </select>
        </div>
        <div class="end-time">
          <label>结束驻店时间</label>
          <select name="" v-model="selectEndTime">
            <option value="" v-for="option in startTimeList" v-bind:value="option">
              {{option}}
            </option>
          </select>
        </div>
      </div>
      <div class="onduty-people">
        <span>今日值班咨询人数</span>
        <input type="text" v-model="onDutyPeople">
        <span>人</span>
      </div>
    </div>
    <template v-for="(item, index) in competitorList">
      <div class="competitor-list">
        <div class="competitor-header">
          <span class="competitor-title">竞品信息{{index}}</span>
          <div class="competitor-top">
            <span>竞品名称</span>
            <select v-model="competitorList[index].name">
              <option v-for="option in competitorStore" v-bind:value="option.value">
                {{ option.text }}
              </option>
            </select>
            <span>竞品驻店人数</span>
            <input type="text" v-model="competitorList[index].peopleNbr">
            <span>今日订单数</span>
            <input type="text" v-model="competitorList[index].orderQuantity">
            单
          </div>
          <template v-for="(orderintem, orderindex) in item.competitiveOrder">
            <div class="order-list">
              <ul class="order-list-ul">
                <li>订单</li>
                <li>订单名称</li>
                <li>期数</li>
                <li>金额</li>
                <li>是否过件</li>
              </ul>
              <ul class="order-list-operat">
                <li class="order-list-title"><span>订单{{orderindex}}</span><span class="add-list" @click.stop.prevent="addOrder(index)">添加</span><span @click.stop.prevent="reduceOrder(index, orderindex)" class="reduce-list" v-if="orderindex !== 0">减少</span></li>
                <li><input type="text" v-model="competitorList[index].competitiveOrder[orderindex].orderName"/></li>
                <li><input type="text" v-model="competitorList[index].competitiveOrder[orderindex].periodsNbr"/></li>
                <li><input type="text" v-model="competitorList[index].competitiveOrder[orderindex].amount"/></li>
                <li>
                  <select name="" v-model="competitorList[index].competitiveOrder[orderindex].isAfter">
                    <option value="0" >是</option>
                    <option value="1" >否</option>
                  </select>
                </li>
              </ul>
            </div>
          </template>
          <div class="day-people">
            <span>每日客流</span>
            <input type="text" v-model="competitorList[index].traffic"/>
            <i>人</i>
          </div>
          <div class="day-money">
            <span>每日客流</span>
            <input type="text" v-model="competitorList[index].turnover"/>
            <i>万元</i>
          </div>
        </div>
      </div>
    </template>
    <span class="competitor-add" @click.stop.prevent="addCompetitorList">增加竞品信息</span>
    <div class="edit-summary">
      <span>今日总结</span>
      <textarea v-model="competitorSummary"></textarea>
    </div>
    <div class="competitor-submit" @click.stop.prevent="competitorSubmit">提交</div>
  </div>
</template>
<script>
import utils from '../common/utils.js'
import apis from '../common/apis.js'
import Vue from 'vue'
import { MessageBox } from 'mint-ui'
import _ from 'lodash'

Vue.component(MessageBox.name, MessageBox)
let isEmpty = (obj) => {
  if (obj == '' || obj == null || obj == undefined) {
      return true
    } else {
      return false
    }
}

export default {
  name: 'hello',
  data () {
    return {
      mgs: 'this is the detail page',
      hospitalText: "",
      hospitalValue: "",
      startTimeList: ['0: 00', '1: 00', '2: 00', '3: 00',
                      '4: 00', '5: 00', '6: 00', '7: 00',
                      '8: 00', '9: 00', '10: 00', '11: 00',
                      '12: 00', '13: 00', '14: 00', '15: 00',
                      '17:00', '18: 00', '17: 00', '18: 00',
                      '19: 00', '20: 00', '21; 00', '22: 00',
                      '23: 00', '24: 00'],
      hishospital: [
        {'text': '个人个人是', 'value': 0},
        {'text': '覆盖广泛的', 'value': 1},
        {'text': '额额为', 'value': 2},
        {'text': '二热风管是', 'value': 3},
        {'text': '哈哈哈地方', 'value': 4},
        {'text': '法国红酒是', 'value': 5},
        {'text': '覆盖大环境', 'value': 6}
      ],
      showHospital: false,
      selectStartTime: '',
      selectEndTime: '',
      hisInstore: [],
      instoreValue: '',
      showInstore: false,
      showStartstore: false,
      showEndstore: false,
      onDutyPeople: '',
      storeNumber: '',
      competitorSummary: '',
      competitorStore: [
        {'text': '星计划', 'value': 0},
        {'text': '即科分期', 'value': 1},
        {'text': '医分期', 'value': 2},
        {'text': '即有分期', 'value': 3},
        {'text': '百度有钱花', 'value': 4},
        {'text': '小牛分期', 'value': 5},
        {'text': '赫美分期', 'value': 6},
        {'text': '人买分期', 'value': 7},
        {'text': '马上分期', 'value': 8},
        {'text': '佰仟分期', 'value': 9},
        {'text': '呜咔熊', 'value': 10}
      ],
      competitorList: [
        {'name': '',
          'peopleNbr': '',
          'orderQuantity': '',
          'competitiveOrder': [{'orderName': '', 'periodsNbr': '','amount':'','isAfter': ''}],
          'traffic': '',
          'turnover': ''
        }
      ]
    }
  },
  computed: {
    newHishospital () {
      return _.filter(this.hishospital, (hospital) => {
        if (this.hospitalText == '') {
          return hospital
        } else {
          return hospital.text.toLowerCase().indexOf(this.hospitalText) !== -1;
        }
      })
    }
  },
  mounted () {
      document.getElementsByTagName('body')[0].style.background = '#e0dfdf';
      apis.queryStroe(utils.getCookie('depid')).then(resp => {

      })
  },
  methods: {
    addOrder (index) {
      console.log(index)
      this.competitorList[index].competitiveOrder.push({'orderName': '', 'periodsNbr': '','amount':'','isAfter': ''})
      console.log(this.competitorList)
    },
    reduceOrder (index, orderindex) {
      this.competitorList[index].competitiveOrder.splice(orderindex, 1);
    },
    chooseHospital (item) {
      console.log(item);
      this.showHospital = false;
      this.hospitalText = item.text;
      this.hospitalValue = item.value;
    },
    addCompetitorList () {
      this.competitorList.push(
      {'name': '',
        'peopleNbr': '',
        'orderQuantity': '',
        'competitiveOrder': [{'orderName': '', 'periodsNbr': '','amount':'','isAfter': ''}],
        'traffic': '',
        'turnover': ''
      });
    },
    competitorSubmit () {
      var competitorFinal = {};
      var stratTime = new Date().getTime() + 60*this.selectStartTime.split(":")[0]*60*1000;
      var endTime = new Date().getTime() + 60*this.selectEndTime.split(":")[0]*60*1000;
      competitorFinal.storeName = this.hospitalValue;//门店名称
      competitorFinal.storeId = this.storeNumber;//门店号
      competitorFinal.startTime = stratTime;//起始时间
      competitorFinal.endTime = endTime;//结束时间
      competitorFinal.advisoryNbr = this.onDutyPeople;//当期咨询人数
      competitorFinal.competitiveInfoList = this.competitorList;//竞品信息
      competitorFinal.summary = this.competitorSummary;//概述
      competitorFinal.uid = 1;

      if (isEmpty(competitorFinal.storeName + '') ||
           isEmpty(competitorFinal.storeId + '') ||
           isEmpty(competitorFinal.startTime + '') ||
           isEmpty(competitorFinal.endTime + '') ||
           isEmpty(competitorFinal.advisoryNbr + '') ||
           isEmpty(competitorFinal.summary + '') ) {
        MessageBox({
          title: '提示',
          message: '请输入完整',
          showCancelButton: true
        });
        return
      }
      if (parseInt(this.selectStartTime.split(":")[0]) > this.selectEndTime.split(":")[0]) {
        MessageBox({
          title: '提示',
          message: '结束时间要大于开始时间',
          showCancelButton: true
        });
        return
      }
      if (utils.chinaLength(this.competitorSummary)%2 !==0) {
        MessageBox({
          title: '提示',
          message: '请全部输入中文',
          showCancelButton: true
        });
        return
      }
      if (utils.chinaLength(this.competitorSummary) <10 || utils.chinaLength(this.competitorSummary) > 20) {
        MessageBox({
          title: '提示',
          message: '字数在200-500间',
          showCancelButton: true
        });
        return
      }

      for (var i = 0; i < this.competitorList.length; i++) {
        for (var key in this.competitorList[i]) {
          if (isEmpty(this.competitorList[i][key] + '')) {
            MessageBox({
              title: '提示',
              message: '请输入完整',
              showCancelButton: true
            });
            return
          }
        }
      };
      console.log(this.competitorList)
      for (var i = 0; i < this.competitorList.length; i++) {
        for (var j = 0; j < this.competitorList[i].competitiveOrder.length; j++) {
          for (var key in this.competitorList[i].competitiveOrder[j]) {
            // var boxalert = isEmpty(this.competitorList[i].competitiveOrder[j][key] + '')
            // console.log(boxalert)
            if (isEmpty(this.competitorList[i].competitiveOrder[j][key] + '')) {
              console.log('empty')
              MessageBox({
                title: '提示',
                message: '请输入完整',
                showCancelButton: true
              });
              return
            }
          }
        }
      };

      // apis.saveStagnationInfo(competitorFinal).then(resp => {
      //   console.log(resp)
      // })
    }
  }
}
</script>

<style scoped lang="scss">
body {
}
input {
  border: none;
  border: 1px solid gray;
  border-radius: 3px;
}
input, select {
  height: 25px;
}
.home {
  color: #999;
}
.hospital-header {
  background-color: #fff;
  padding: 10px;
}
.competitor-total {
  color: #8a9399;
  padding: 10px;
  margin-top: 45px;
}
.order-list-ul {
  li {
    diplay: inline-block;
    width: 1.8rem;
    height: 27px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
.order-list-operat {
  input, select{
    // width: 100%;
  }
  li {
      margin-top: 5px;
      margin-bottom: 5px;
    }
  .order-list-title {
    height: 27px;
  }
}
.day-people, .day-money {
  span {
    display: inline-block;
    width: 1.8rem;
  }
}
.hospital {
  overflow: hidden;
  .hospital-name {
    width: 4rem;
    float: left;
    label {
      display: inline-block;
      width: 1rem;
    }
    input {
      vertical-align: top;
      width: 2.8rem;
    }
  }
  .hospital-select {
    position: absolute;
    display: inline-block;
    width: 2.8rem;
    vertical-align: top;
    ul {
      display: block;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      z-index: 100;
      max-height: 90px;
      overflow-y: scroll;
      border: 1px solid #5093e1;
      background-color: #b5dcee;
      li {
        width: 100%;
        height: 20px;
        text-indent: 5px;
        line-height: 20px;
        font-size: 16px;
        color: #393f4f;
        cursor: pointer;
        box-sizing: border-box;
      }
    }
  }
  .store-number {
    width: 4.2rem;
    float: right;
    margin-left: 0.2rem;
    input {
      vertical-align: top;
      width: 2.7rem;
    }
    label {
      display: inline-block;
      width: 1.2rem;
    }
  }
}
.store-time {
  overflow: hidden;
  padding-top: 10px;
  .start-time {
    label {
      display: inline-block;
      width: 1.2rem;
      vertical-align: top;
    }
    position: relative;
    width: 4.4rem;
    float: left;
    select {
      width: 2.6rem;
    }
  }
  .end-time {
    width: 4.3rem;
    float: right;
    label {
      display: inline-block;
      width: 1.2rem;
      vertical-align: top;
    }
    select {
      width: 2.8rem;
    }
  }
  .show-start {

  }
}
.onduty-people {
  padding-top: 10px;
  input {
    width: 3rem;
  }
}
.competitor-list {
  background-color: #fff;
  margin-top: 10px;
  padding: 10px;
  .competitor-title {
    font-size: 16px;
    padding-bottom: 10px;
    display: block;
    color: black;
  }
}
.competitor-top {
  span {
    display: inline-block;
    width: 1rem;
    vertical-align: top;
  }
  input, select {
    width: 1.4rem;
  }
}
.order-list {
  overflow: hidden;
  ul {
    float: left;
  }
  .add-list, .reduce-list{
    width: 1.5rem;
    background-color: skyblue;
    display: inline-block;
    margin-left: 0.7rem;
    color: #fff;
    text-align: center;
    border-radius: 5px;
  }
}
.day-money {
  padding-top: 10px;
}
.day-people {
  padding-top: 10px;
}
.competitor-add {
  display: inline-block;
  width: 3rem;
  height: 20px;
  background-color: #fff;
  margin-top: 10px;
  border-radius: 4px;
  text-align: center;
  line-height: 20px;
}
.edit-summary {
  margin-top: 20px;
 textarea {
  width: 7.7rem;
  height: 100px;
 }
 span {
  vertical-align: top;
 }
}
.competitor-submit {
  width: 3rem;
  height: 40px;
  background-color: skyblue;
  margin: 0 auto;
  text-align: center;
  line-height: 40px;
  color: #fff;
  border-radius: 4px;
  margin-top: 20px;
}
</style>
