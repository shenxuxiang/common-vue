<template>
    <div class="upload-images-component">
        <div class="upload-images-component-head">
            <span
                class="upload-images-component-head-title"
            >上传cc照片</span>
            <label class="upload-images-component-head-upload">
                <input
                    type="file"
                    accept="image/png,image/gif,image/jpg,image/bmp,image/jpeg"
                    name="file"
                    class="hide"
                    multiple="multiple"
                    @change="uploadImage($event)"
                    >
                <span>上传文件按</span>
            </label>
            <div
                class="upload-images-component-head-cancel"
                @touchend="uploadImageCancel"
            ><span>清除所有图片</span></div>
        </div>
        <div class="upload-images-component-image">
            <component-image
                v-for="(val, index) in imageList"
                :key="index"
                :imgUrl="val"
                :isTap="isTap"
                @emitRemoveImageUrl="removeImageUrl"
            ></component-image>
        </div>
    </div>
</template>

<script>
import apis from '../../common/apis.js'
import ComponentImage from './componentimage.vue'

export default {
    components: { ComponentImage },
    props: {
        idx: String,
        isTap: Boolean
    },
    data () {
        return {
            imageList: []
        }
    },
    methods: {
        uploadImage (event) {
            let files = event.target.files
            let arr = []
            let len = files.length
            let form = new FormData()
            for(var i = 0; i < len; i++) {
                form.append('file', files[i])
                this.imageList.push(' ')
            }
            apis.upload(form).then(resp => {
                if (resp.data.code === '00000' && resp.data.result.length > 0) {
                    let list = resp.data.result.map(item => (item.url))
                    this.imageList = list
                    this.$emit('emitGetInputValue', list, this.idx)
                }
            }).catch(error => {
                console.log(error)
            })
        },
        uploadImageCancel () {
            if (this.isTap) {
                this.imageList = []
                this.$emit('emitGetInputValue', [], this.idx)
            }
        },
        removeImageUrl (url) {
            const arr = this.imageList.filter(item => (item !== url))
            this.imageList = arr
            this.$emit('emitGetInputValue', arr, this.idx)
        }
    }
}
</script>

<style scoped lang="scss">
    .hide {
        display: none;
    }
    .upload-images-component {
        width: 100%;
        height: auto;
        margin-bottom: 1.2rem;
    }
    .upload-images-component-head {
        width: 100%;
        height: 1.4rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-satrt;
        align-items: center;
    }
    .upload-images-component-head-title {
        width: 2rem;
        color: #8a9399;
        font-size: .3733rem;
    }
    .upload-images-component-head-upload {
        width: 3rem;
        height: .8533rem;
        border: none;
        background: #26a2ff;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
    }
    .upload-images-component-head-cancel {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333;
        width: 3rem;
        height: .8533rem;
        margin-left: .32rem;
        border: none;
        background: #ccc;
        border-radius: 6px;
    }

    .upload-images-component-image {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
    }
</style>
