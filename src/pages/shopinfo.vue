<template>
  <div class="competitor-total">
    <div class="hospital-header">
      <div class="hospital">
        <div class="hospital-name">
          <label>医院(门店名称)</label>
          <!-- <input type="text" @focus="showHospital = true"  v-model = "hospitalValue">
          <ul class="show-hospital" v-if="hishospital.length > 0" v-show="showHospital">
            <template v-for="(item, index) in hishospital">
              <li @click.stop.prevent="chooseHospital(item)">{{ item }}</li>
            </template>
          </ul> -->
          <select name="" v-model="hospitalValue">
            <option value="" v-for="option in hishospital" v-bind:value="option.value">
              {{option.text}}
            </option>
          </select>
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
            <select v-model="competitorList[index].competitorValue">
              <option v-for="option in competitorStore" v-bind:value="option.value">
                {{ option.text }}
              </option>
            </select>
            <span>竞品驻店人数</span>
            <input type="text" v-model="competitorList[index].competitorPeople">
            <span>今日订单数</span>
            <input type="text" v-model="competitorList[index].orderNumber">
            单
          </div>
          <template v-for="(orderintem, orderindex) in item.orderList">
            <div class="order-list">
              <ul class="order-list-ul">
                <li>订单</li>
                <li>订单名称</li>
                <li>期数</li>
                <li>金额</li>
                <li>是否过件</li>
              </ul>
              <ul>
                <li><span>订单{{orderindex}}</span><span class="add-list" @click.stop.prevent="addOrder(index)">添加</span><span @click.stop.prevent="reduceOrder(index, orderindex)" class="reduce-list" v-if="orderindex !== 0">减少</span></li>
                <li><input type="text" v-model="competitorList[index].orderList[orderindex].name"/></li>
                <li><input type="text" v-model="competitorList[index].orderList[orderindex].periods"/></li>
                <li><input type="text" v-model="competitorList[index].orderList[orderindex].money"/></li>
                <li><input type="text" v-model="competitorList[index].orderList[orderindex].isPiece"/></li>
              </ul>
            </div>
          </template>
          <div class="day-people">
            <span>每日客流</span>
            <input type="text" v-model="competitorList[index].passengerPeople"/>
            <i>人</i>
          </div>
          <div class="day-money">
            <span>每日客流</span>
            <input type="text" v-model="competitorList[index].businessMoney"/>
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

export default {
  name: 'hello',
  data () {
    return {
      mgs: 'this is the detail page',
      hospitalValue: '',
      startTimeList: ['0: 00', '1: 00', '2: 00', '3: 00',
                      '4: 00', '5: 00', '6: 00', '7: 00',
                      '8: 00', '9: 00', '10: 00', '11: 00',
                      '12: 00', '13: 00', '14: 00', '15: 00',
                      '17:00', '18: 00', '17: 00', '18: 00',
                      '19: 00', '20: 00', '21; 00', '22: 00',
                      '23: 00', '24: 00'],
      hishospital: [{'text': 'value0', 'value': 0},
                    {'text': 'value1', 'value': 1},
                    {'text': 'value2', 'value': 2}],
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
      competitorList: [{'competitorValue': '',
                      'competitorPeople': '',
                      'orderNumber': '',
                      'orderList': [{'name': '', 'periods': '','money':'','isPiece': ''}],
                      'passengerPeople': '',
                      'businessMoney': ''
                      }
                    ]
    }
  },
    mounted () {
        document.getElementsByTagName('body')[0].style.background = '#e0dfdf'
    },
  methods: {
    addOrder (index) {
      console.log(index)
      this.competitorList[index].orderList.push({'name': '', 'periods': '','money':'','isPiece': ''})
    },
    reduceOrder (index, orderindex) {
      this.competitorList[index].orderList.splice(orderindex, 1);
    },
    addCompetitorList () {
      this.competitorList.push(
                      {'competitorValue': '',
                      'competitorPeople': '',
                      'orderNumber': '',
                      'orderList': [{'name': '', 'periods': '','money':'','isPiece': ''}],
                      'passengerPeople': '',
                      'businessMoney': ''
                      });
    },
    competitorSubmit () {
      var competitorFinal  = {};
      competitorFinal.hospitalValue = this.hospitalValue;
      competitorFinal.storeNumber = this.storeNumber;
      competitorFinal.selectStartTime = this.selectStartTime;
      competitorFinal.selectEndTime = this.selectEndTime;
      competitorFinal.onDutyPeople = this.onDutyPeople;
      competitorFinal.competitorList = this.competitorList;
      competitorFinal.competitorSummary = this.competitorSummary
      console.log(competitorFinal)
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
    height: 25px;
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
    label {
      display: inline-block;
      width: 1rem;
    }
    width: 4rem;
    float: left;
    select {
      vertical-align: top;
      width: 2.8rem;
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
    li {
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
  .add-list, .reduce-list{
    width: 1.5rem;
    background-color: #ff017d;
    display: inline-block;
    padding-left: 1rem;
    color: #fff
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
  width: 8rem;
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
