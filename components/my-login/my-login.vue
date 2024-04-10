<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<text class="tips-text">登陆以后尽享更多权益</text>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user', ['redirectInfo'])
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
			// 用户授权后获取用户基本信息
			getUserInfo(e){
				// 判断是否获取用户信息成功
				if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
				// 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
				//console.log(e.detail.userInfo)
				this.updateUserInfo(e.detail.userInfo)
				
				this.getToken(e.detail)
			},
			// 获取登录成功后的 Token 字符串
			async getToken(info){
				//获取 code 对应的值
				const [err, res] = await  uni.login().catch(err => err)
				console.log(res)
				if(err || res.errMsg != "login:ok") return uni.$showMsg("登录失败！")
				// 准备参数
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
			
				// 换取 token
				const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				//if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
				//token非法，拿不到token
				uni.$showMsg('登录成功')
				this.updateToken('sdjghf7657d78sf689sxcvbdf6g98sg786dff7sd6f78sd76s89d6fg78sd')
				// 2. 更新 vuex 中的 token
				//this.updateToken(loginResult.message.token)
				this.navigateBack()
			},
			navigateBack() {
			  // redirectInfo 不为 null，并且导航方式为 switchTab
			  if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
			    // 调用小程序提供的 uni.switchTab() API 进行页面的导航
			    uni.switchTab({
					// 要导航到的页面地址
					url: this.redirectInfo.from,
					// 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
					complete: () => {
					this.updateRedirectInfo(null)
					}
			    })
			  }
			}
		},
		
	}
</script>

<style lang="scss">
	.login-container{
		height: 750rpx;
		background-color: #f8f8f8;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;
		// 绘制登录盒子底部的半椭圆造型
		// 伪元素
		&::after{
			content: " ";
			display: block;
			width: 100%;
			height: 40px;
			background-color: white;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);
		}
		.btn-login{
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}
		.tips-text{
			font-size: 12px;
			color: gray;
		}
	}
	
</style>