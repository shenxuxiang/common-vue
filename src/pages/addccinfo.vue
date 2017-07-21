<template>
    <div
        class="addccinfo-page"
        @touchstart.capture="isTap = true"
        @touchmove.capture="isTap = false"
    >
        <type-select
            title="医院(门店名称)"
            nameType="hospitalName"
            idx="hospitalName"
            :selectVal="hospitalName"
            :list="hospitalNameList"
            @emitGetInputValue="getInputValue"
        ></type-select>
        <type-input
            type="text"
            title="门店号"
            idx="storeNumber"
            placeHolder="请输入门店号"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="cc姓名"
            idx="ccName"
            placeHolder="请输入姓名"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-radio
            :list="sexList"
            :inputValue="sex"
            nameType="sex"
            title="性别"
            idx="sex"
            @emitGetInputValue="getInputValue"
        >
        </type-radio>
        <type-radio
            :list="isMarryList"
            :inputValue="isMarry"
            nameType="marry"
            title="婚否"
            idx="isMarry"
            @emitGetInputValue="getInputValue"
        >
        </type-radio>
        <type-input
            type="date"
            title="入职时间"
            idx="inComeTime"
            placeHolder="年/月/日"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="手机号"
            idx="mobilePhone"
            placeHolder="请输入手机号"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="date"
            title="生日"
            idx="birthday"
            placeHolder="年/月/日"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="年龄"
            idx="age"
            placeHolder="请输入年龄"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="身高"
            idx="height"
            placeHolder="以(cm)为单位"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="体重"
            idx="weight"
            placeHolder="以(kg)为单位"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="喜欢的颜色"
            idx="likeColor"
            placeHolder="请输入您所喜欢的颜色"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="喜欢的食物"
            idx="likeFood"
            placeHolder="请输入您所喜欢的食物"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="喜欢的明星"
            idx="likeStar"
            placeHolder="请输入您所喜爱的明星"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="喜欢的运动"
            idx="likeStar"
            placeHolder="请输入您所喜爱的运动"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="喜欢的奢侈品牌"
            idx="likeBrand"
            placeHolder="请输入您所喜欢的奢侈品牌"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="其他"
            idx="likeOther"
            placeHolder=""
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-select
            title="客情关系维护"
            nameType="relationship"
            idx="relationship"
            :selectVal="relationship"
            :list="relationList"
            @emitGetInputValue="getInputValue"
        ></type-select>
        <type-upload-images
            idx="imageUrlList"
            @emitGetInputValue="getInputValue"
            :isTap="isTap"
        ></type-upload-images>



        <div
            class="login-page-button"
        >
            登录
        </div>
    </div>
</template>

<script>
import TypeInput from '../components/addccinfo/typeinput.vue'
import TypeRadio from '../components/addccinfo/typeradio.vue'
import TypeSelect from '../components/addccinfo/typeselect.vue'
import TypeUploadImages from '../components/addccinfo/typeuploadimages.vue'

export default {
    name: 'hello',
    components: { TypeInput, TypeRadio, TypeSelect, TypeUploadImages },
    data () {
        return {
            hospitalName: '',
            storeNumber: '',
            ccName: '',
            inComeTime: '',
            mobilePhone: '',
            age:'',
            birthday: '',
            height: '',
            weight: '',
            likeColor: '',
            likeFood: '',
            likeStar: '',
            likeSport: '',
            likeBrand: '',
            likeOther: '',
            sexList: ['男', '女'],
            sex: '男',
            isMarryList: ['是', '否'],
            isMarry: false,
            hospitalNameList: ['aaa', 'vvv', 'dddd', 'ssss', 'eeeee', 'ffffff'],
            relationList: ['极好', '好', '一般', '差'],
            relationship: '',
            imageUrlList: [],
            isTap: true
        }
    },
    mounted () {
        document.getElementsByTagName('body')[0].style.background = '#fff'
    },
    methods: {
        getInputValue (val, id) {
            this[id] = val
        }
    }
}
</script>

<style scoped lang="scss">
.addccinfo-page {
    margin-top: 1.2rem;
    padding: 0 .2667rem;
    width: 100%;
    height: auto;
    background: #fff;
    box-sizing: border-box;
    z-index: 2;
}
.login-page-button {
    width: 100%;
    height: 1.12rem;
    background: #26a2ff;
    border-radius: 6px;
    line-height: 1.12rem;
    text-align: center;
    color: #fff;
    font-size: .48rem;
    margin-bottom: 3rem;
}
</style>
