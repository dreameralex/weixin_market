<template>
	<view class="my-search-container" :style="{'backgroundColor': bgcolor}">
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}" @click="serchBoxHandler">
			<!-- 使用uni ui -->
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		
		props: {
			//背景颜色
			bgcolor: {
				type: String,
				default: '#C00000'
			},
			//圆角尺寸
			radius: {
				type: Number,
				default: 10 // px
			}
		},
		
		data() {
			return {
				
			};
		},
		methods: {
			serchBoxHandler(){
				console.log('~~~~~~~~')
				//触发外部的事件, 组件内部调用
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container{
		height: 50px;
		display: flex;
		align-items: center;
		padding: 0 10px;
		
		.my-search-box{
			height: 36px;
			background-color: aliceblue;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			.placeholder{
				font-size: 15px;
				margin-left: 5px;
			}
		}
	}
</style>