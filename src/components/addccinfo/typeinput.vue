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
        />
        <div
            :class="transparent ? 'ic-placeholder ' : 'ic-placeholder hide'"
        >
            <span>{{placeHolder}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        type: String,
        title: String,
        placeHolder: String,
        idx: String
    },
    data () {
        return {
            transparent: true,
            inputVal: 123
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
            if (event.target.value === '') {
                this.transparent = true
            } else {
                this.transparent = false
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
