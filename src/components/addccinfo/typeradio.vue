<template>
    <div class="radio-component">
        <span class="rc-title">{{title}}<i>*</i></span>
        <div class="rc-radio">
        <template v-for="(val, index) in list">
            <label class="rc-radio-label"  :key="index">
                <input
                    type="radio"
                    :name="nameType"
                    :value="val"
                    :checked="val === inputValue ? true : false"
                    class="hide"
                    @change="handleEmit($event)"
                />
                <span :class="val === inputValue ? 'active rc-radio-select' : 'rc-radio-select'"></span>
                <span class="rc-radio-value">{{val}}</span>
            </label>
        </template>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        nameType: String,
        idx: String,
        list: Array,
        inputValue: [String, Number, Boolean]
    },
    data () {
        return {

        }
    },
    methods: {
        handleEmit (event) {
            this.$emit('emitGetInputValue', event.target.value, this.idx)
            console.log(event.target.value)
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
$radio-border: 1px solid #ccc;
$radio-active-border: 1px solid #ff017d;
.radio-component {
    width: 100%;
    height: 1.4rem;
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: left;
    -webkit-box-align: center;
    position: relative;
}
.rc-title {
    display: block;
    width: 2rem;
    inline-height: 1.4rem;
    color: $title-font-color;
    font-size: $font-size;
}
.rc-title > i {
    font-style: normal;
    color: #ff017d;
}
.rc-radio {
    flex: 1;
    height: 1.4rem;
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: left;
    -webkit-box-align: center;
}
.rc-radio-label {
    display: block;
    width: 2rem;
    height: 1.4rem;
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: left;
    -webkit-box-align: center;
}
.rc-radio-select {
    display: block;
    width: 20px;
    height: 20px;
    margin: 0px;
    padding: 0px;
    line-height: 1.4rem;
    border: $radio-border;
    border-radius: 50%;
    box-sizing: border-box;
    position: relative;
}
.rc-radio-select.active {
    border: $radio-active-border;
}

.rc-radio-select.active:after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 10px;
    height:10px;
    border-radius: 50%;
    background: #ff017d;
}
.rc-radio-value {
    display: block;
    margin-left: 10px;
    font-size: $font-size;
}
.hide {
    display: none;
}
</style>
