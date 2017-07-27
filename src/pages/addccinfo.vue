<template>
    <div
        class="addccinfo-page"
        @touchstart.capture="isTap = true"
        @touchmove.capture="isTap = false"
    >
        <type-select
            title="医院(门店名称)"
            nameType="storeName"
            idx="storeName"
            :selectVal="storeName"
            :list="storeNameList"
            @emitGetInputValue="getInputValue"
        ></type-select>
        <type-input
            type="text"
            title="门店号"
            idx="storeId"
            :contentVal="storeId"
            placeHolder="请输入门店号"
            @emitGetInputValue="getInputValue"
            disabled="true"
        ></type-input>
        <type-input
            type="text"
            title="cc姓名"
            idx="ccName"
            :contentVal="ccName"
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
            :inputValue="isMarryed"
            nameType="marry"
            title="婚否"
            idx="isMarryed"
            @emitGetInputValue="getInputValue"
        >
        </type-radio>
        <type-input
            type="date"
            title="入职时间"
            idx="entryDate"
            :contentVal="entryDate"
            placeHolder="年/月/日"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="手机号"
            idx="phone"
            :contentVal="phone"
            placeHolder="请输入手机号"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="date"
            title="生日"
            idx="brithday"
            :contentVal="brithday"
            placeHolder="年/月/日"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="年龄"
            idx="age"
            :contentVal="age"
            placeHolder="请输入年龄"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="身高"
            idx="height"
            :contentVal="height"
            placeHolder="以(cm)为单位"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="体重"
            idx="weight"
            :contentVal="weight"
            placeHolder="以(kg)为单位"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="喜欢的颜色"
            idx="favoriteColor"
            :contentVal="favoriteColor"
            placeHolder="请输入您所喜欢的颜色"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="喜欢的食物"
            idx="favoriteFood"
            :contentVal="favoriteFood"
            placeHolder="请输入您所喜欢的食物"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="喜欢的明星"
            idx="favoriteStar"
            :contentVal="favoriteStar"
            placeHolder="请输入您所喜爱的明星"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="喜欢的运动"
            idx="favoriteMovement"
            :contentVal="favoriteMovement"
            placeHolder="请输入您所喜爱的运动"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="喜欢的奢侈品牌"
            idx="favoriteBrand"
            :contentVal="favoriteBrand"
            placeHolder="请输入您所喜欢的奢侈品牌"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-input
            type="text"
            title="其他"
            idx="other"
            placeHolder=""
            :contentVal="other"
            @emitGetInputValue="getInputValue"
        ></type-input>
        <type-select
            title="客情关系维护"
            nameType="custRela"
            idx="custRela"
            :selectVal="custRela"
            :list="custRelaList"
            @emitGetInputValue="getInputValue"
        ></type-select>
        <type-upload-images
            idx="images"
            @emitGetInputValue="getInputValue"
            :isTap="isTap"
        ></type-upload-images>
        <div
            class="login-page-button"
            @touchend="handleSubmit"
        >
            提交
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import utils from '../common/utils.js'
import apis from '../common/apis.js'
import TypeInput from '../components/addccinfo/typeinput.vue'
import TypeRadio from '../components/addccinfo/typeradio.vue'
import TypeSelect from '../components/addccinfo/typeselect.vue'
import TypeUploadImages from '../components/addccinfo/typeuploadimages.vue'

export default {
    name: 'hello',
    components: { TypeInput, TypeRadio, TypeSelect, TypeUploadImages },
    data () {
        return {
            uid: '',
            depid: '',
            storeNameList: [], // 门店名称列表
            storeName: '', // 门店名称
            storeNameObj: [],
            storeId: '', // 门店号
            ccName: '', // cc姓名
            entryDate: '', // 入职时间
            phone: '', // 联系方式
            age:'', // 年龄
            brithday: '', // 生日
            height: '', // 身高
            weight: '', // 体重
            favoriteColor: '', // 喜欢的颜色
            favoriteFood: '', // 喜欢的食物
            favoriteStar: '', // 喜欢的明星
            favoriteMovement: '', // 喜欢的运动
            favoriteBrand: '', // 喜欢的品牌
            other: '', // 其他
            sexList: ['男', '女'],
            sex: '男', //性别
            isMarryList: ['是', '否'],
            isMarryed: '是', // 婚否
            custRelaList: ['好', '一般', '差'],
            custRela: '好', //客户关系
            images: [], //上传图片
            isTap: true
        }
    },
    beforeMount () {
        const depid = utils.getCookie('depid')
        this.uid = utils.getCookie('uid')
        this.depid = depid
        apis.queryStroe(depid).then(resp => {
            if (resp.data.code === '00000' && resp.data.result.length > 0) {
                const storeNameList = resp.data.result.map(item => item.storename)
                const storeNameObj = resp.data.result.map(item => ({storename: item.storename, storeid: item.storeid}))
                this.storeNameList = storeNameList
                this.storeName = storeNameList[0]
                this.storeNameObj = storeNameObj
            }
        }).catch(error => {
            console.log(error)
        })
    },
    mounted () {
        document.getElementsByTagName('body')[0].style.background = '#fff'
    },
    watch: {
        storeName () {
            const storeId = this.storeNameObj.find(item => {
                if (item.storename === this.storeName) {
                    return item
                }
            }).storeid
            this.storeId = storeId
        }
    },
    methods: {
        getInputValue (val, id) {
            this[id] = val
        },
        handleSubmit () {
            if (!this.isTap) {return}
            let custRela, isMarryed, sex
            switch (this.custRela) {
                case '好':
                    custRela = 1;
                case '一般':
                    custRela = 2;
                case '差':
                    custRela = 3;
            }
            switch (this.isMarryed) {
                case '是':
                    isMarryed = 1;
                case '否':
                    isMarryed = 2;
            }
            switch (this.sex) {
                case '男':
                    sex = 1;
                case '女':
                    sex = 2;
            }
            const sendData = {
                uid: this.uid,
                storeName: this.storeName,
                storeId: this.storeId,
                entryDate: this.entryDate,
                ccName: this.ccName,
                sex: sex,
                age: this.age,
                isMarryed: isMarryed,
                phone: this.phone,
                brithday: this.brithday,
                weight: this.weight,
                height: this.height,
                favoriteColor: this.favoriteColor,
                favoriteFood: this.favoriteFood,
                favoriteStar: this.favoriteStar,
                favoriteMovement: this.favoriteMovement,
                favoriteBrand: this.favoriteBrand,
                other: this.other,
                custRela: custRela,
            }
            for(var key in sendData) {
                if (sendData[key] === '') {
                    Toast({
                        message: '必填项信息不能为空',
                        duration: 2000
                    })
                    break
                }
            }
            sendData['images'] = this.images

            apis.saveCCInfo(sendData).then(resp => {
                if (resp.data.code === '00000') {
                    Toast({
                        message: '信息提交成功',
                        duration: 1000
                    })
                    setTimeout(() => {
                        window.location.reload()
                    },1000)
                }
            }).catch(error => {
                console.log(error)
            })
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
