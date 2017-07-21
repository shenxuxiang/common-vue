<template>
    <div
        class="login-page"
        @touchstart.capture="isTap=true"
        @touchmove.capture="isTap=false"
    >
        <div class="login-page-content">
            <div class="login-page-content-dv">
                <input
                    type="text"
                    placeholder="请输入邮箱"
                    class="login-page-content-input"
                    v-model="userEmail"
                >
            </div>
            <div class="login-page-content-dv login-page-content-password">
                <input
                    type="password"
                    placeholder="请输入密码"
                    class="login-page-content-input"
                    v-model="userpwd"
                >
            </div>
            <div
                class="login-page-button"
                @touchend="handleSubmit"
            >
                登录
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import utils from '../common/utils.js'
export default {
    data () {
        return {
            userEmail: '',
            userpwd: '',
            isTap: true
        }
    },
    mounted () {
        document.getElementsByTagName('body')[0].style.background = '#EDF1F5'
    },
    methods: {
        handleSubmit () {
            if(this.isTap) {
                const userEmail = utils.toReg(this.userEmail, 'email')
                const userpwd = utils.toReg(this.userpwd, 'passWord')
                let alerts
                console.log(userEmail, userpwd)
                if (!userEmail || !userpwd) {
                    if (this.userEmail === '') {
                        alerts = '邮箱不能为空'
                    } else if (this.userpwd === '') {
                        alerts = '密码不能为空'
                    } else {
                        alerts = '信息填写错误'
                    }
                } else {
                    alerts = ''
                }
                if (alerts !== '') {
                    Toast({
                        message: alerts,
                        duration: 3000
                    });
                } else {
                    console.log(this.userEmail, this.userpwd)
                }
            }
        }
    }
}
</script>
<style scoped lang="scss">
.login-page {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    padding: 2rem .2667rem .2667rem;
    background: #EDF1F5;
    box-sizing: border-box;
}
.login-page-content-dv {
    width: 100%;
    height: 1.2rem;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 6px;
    box-sizing: border-box;
    margin-bottom: 10px;
}
.login-page-content-password {
    margin-bottom: 30px;
}
.login-page-content-input {
    width: 100%;
    height: 100%;
    border: none;
    appearance: none;
    background: transparent;
    color: #666;
    font-size: .3733rem;
    padding: 0 .2667rem;
    box-sizing: border-box;
    outline: none;
}
.login-page-content-input::-webkit-input-placeholder {
    color: #ccc;
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
}
</style>
