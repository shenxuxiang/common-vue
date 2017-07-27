<template>
    <div class="input-component">
        <span class="ic-title">{{title}}<i>*</i></span>
        <input
            class="ic-input"
            :type="type"
            @focus="focus($event)"
            @blur="blur($event)"
            @input="handleEmit($event)"
            :style="getLineHeight"
            :value="contentVal"
            :disabled="disabled"
        />
        <div
            :class="transparent ? 'ic-placeholder ' : 'ic-placeholder hide'"
        >
            <span>{{placeHolder}}</span>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import utils from '../../common/utils.js'
export default {
    props: {
        type: String,
        title: String,
        placeHolder: String,
        idx: String,
        contentVal: {
            default: ''
        },
        disabled: {
            default: false
        }
    },
    data () {
        return {
            transparent: true,
        }
    },
    watch: {
        contentVal () {
            this.transparent = !this.contentVal ? true : false
        }
    },
    computed: {
        getLineHeight () {
            if (this.type === 'date') {
                return {lineHeight: '.9067rem'}
            } else {
                return
            }
        }
    },
    methods: {
        focus (event) {
            this.transparent = false
            window.scrollTo(0, event.target.offsetParent.offsetTop - 150)
        },
        blur (event) {
            const val = event.target.value
            let alerts = ''
            if (val === '') {
                this.transparent = true
                alerts = this.title + '不能为空'
            } else {
                this.transparent = false
                if (this.title.indexOf('cc姓名') > -1) {
                    alerts = utils.toReg(val, 'chsName') ? '' : this.title + '格式填写错误'
                }
                if (this.title.indexOf('手机号') > -1) {
                    alerts = utils.toReg(val, 'mobile') ? '' : this.title + '格式填写错误'
                }
                if (
                    this.title.indexOf('门店号') > -1 ||
                    this.title.indexOf('年龄') > -1 ||
                    this.title.indexOf('身高') > -1 ||
                    this.title.indexOf('体重') > -1
                ) {
                    alerts = /^(?=.*\d+)\d+$/.test(val) ? '' : this.title + '格式填写错误'
                }
                if (this.title.indexOf('喜欢的') > -1 || this.title.indexOf('其他') > -1) {
                    alerts = /^[0-9a-zA-Z\u4e00-\u9fff]+$/.test(val) ? '' : this.title + '格式填写错误'
                }
            }
            if (alerts === '') {
                return
            } else {
                Toast({
                    message: alerts,
                    duration: 2000
                });
            }

        },
        handleEmit (event) {
            this.$emit('emitGetInputValue', event.target.value, this.idx)
        }
    }
}
</script>

<style scoped lang="scss">
$font-size: .3733rem;
$title-font-color: #8a9399;
$placeholder-color: #bbc3c8;
$input-color: #475966;
$input-border-color: #c7c7c7;
.input-component {
    width: 100%;
    height: 1.4rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    position: relative;
}
.ic-title {
    display: block;
    width: 2rem;
    color: $title-font-color;
    font-size: $font-size;
}
.ic-title > i {
    font-style: normal;
    color: #ff017d;
}
.ic-input {
    display: block;
    flex: 1;
    height: .96rem;
    padding: 0 .2667rem;
    font-size: $font-size;
    color: $input-color;
    border:1px solid $input-border-color;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    position: relative;
    z-index: 2;
    -webkit-appearance: none;
    outline: none;
}
.ic-placeholder {
    position: absolute;
    top: 0;
    left: 2.2667rem;
    height: 1.4rem;
    font-size: $font-size;
    color: $placeholder-color;
    z-index: 1;
    display: flex;
    align-items:center;
}
.ic-placeholder.hide {
    display: none
}
</style>
