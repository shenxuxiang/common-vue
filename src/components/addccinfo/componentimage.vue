<template>
    <div class="upload-images-component-image-item">
        <img
            class='upload-images-component-image-item-img'
            src="../../assets/downloading.gif"
            alt="下载图片"
            v-onLoad="imgUrl"
        >
    </div>
</template>

<script>
import downLoading from '../../assets/downloading.gif'
export default {
    props: {
        imgUrl: String
    },
    data () {
        return {
            imageShow: false
        }
    },
    directives: {
        onLoad: {
            bind (el, binding) {
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
    }
    .upload-images-component-image-item:nth-child(3n+1) {
        margin-left: 0;
    }
    .upload-images-component-image-item-img {
        width: 100%;
        height: 100%;
    }
</style>
