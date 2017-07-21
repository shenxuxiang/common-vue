<template>
    <div class="upload-images-component-image-item">
        <img
            class='upload-images-component-image-item-img'
            src="../../assets/downloading.gif"
            alt="下载图片"
            v-onLoad="imgUrl"
        >
        <span
            class="upload-images-component-image-item-cancel"
            @touchend="handle"
        >&times;</span>
    </div>
</template>

<script>
import downLoading from '../../assets/downloading.gif'
export default {
    props: {
        imgUrl: String,
        isTap: Boolean
    },
    data () {
        return {
            imageShow: false
        }
    },
    methods: {
        handle () {
            this.$emit('emitRemoveImageUrl', this.imgUrl)
        }
    },
    directives: {
        onLoad (el, binding) {
            let img = new Image()
            img.src = binding.value
            if (img.complete) {
                img.onload = null
                el.src = img.src
                return
            }
            img.onload = () => {
                img.onload = null
                el.src = img.src
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .hide {
        display: none;
    }
    .upload-images-component-image-item {
        width: 32.5%;
        height: 3rem;
        margin-left: 1.25%;
        position: relative;
    }
    .upload-images-component-image-item:nth-child(3n+1) {
        margin-left: 0;
    }
    .upload-images-component-image-item-img {
        width: 100%;
        height: 100%;
    }
    .upload-images-component-image-item-cancel {
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 20px;
        color: #ccc;
        font-size: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 100%;
        background: #666;
    }
</style>
