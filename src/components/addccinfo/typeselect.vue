<template>
    <div class="select-component">
        <span class="ic-title">{{title}}<i>*</i></span>
        <div class="ic-content">
            <select
                :name="nameType"
                class="ic-select"
                @focus="focus($event)"
                @blur="blur($event)"
                @change="handleEmit($event)"
                v-model="inputVal"
            >
               <option
                    key="defaultSelect"
                    value="请选择您所需要的选项"
                    disabled
                >请选择您所需要的选项</option>
               <option
                    v-for="(val, index) in list"
                    :key="index"
                    :value="val"
                >{{ val }}</option>
            </select>
        </div>
        <div class='ic-placeholder'>
            <span :class="active ? 'active' : ''"></span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        list: Array,
        idx: String,
        nameType: String,
        selectVal: [String, Number, Boolean]
    },
    data () {
        return {
            active: false,
            inputVal: ''
        }
    },
    beforeMount () {
        this.inputVal = this.selectVal
    },
    watch: {
        selectVal () {
            this.inputVal = this.selectVal
        }
    },
    methods: {
        focus (event) {
            this.active = true
            window.scrollTo(0, event.target.offsetParent.offsetTop - 150)
        },
        blur (event) {
            this.active = false
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
.select-component {
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
.ic-content {
    flex: 1;
    height: .96rem;
}
.ic-select {
    display: block;
    width: 100%;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.ic-placeholder {
    position: absolute;
    top: 0;
    right: 10px;
    height: 1.4rem;
    font-size: $font-size;
    color: $placeholder-color;
    z-index: 1;
    display: flex;
    align-items:center;
}
.ic-placeholder > span {
    display: block;
    width: 0;
    height: 0;
    border: none;
    border-top: 7px solid #999;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
}
.ic-placeholder > .active {
    border-top: 7px solid #ff017d;
}
.ic-placeholder.hide {
    display: none
}
</style>
