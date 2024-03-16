<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧的滑动区-->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
				<view>xxx</view>
			</scroll-view>
			<!-- 右侧的滑动区-->
			<scroll-view class="right-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
				<view>yyy</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//当前设备可用的高度
				wh: 0
			};
		},
		
		onLoad() {
			// 获取当前系统的信息
			const sysInfo = uni.getSystemInfoSync()
			// 为 wh 窗口可用高度动态赋值
			this.wh = sysInfo.windowHeight
		}
	}
	
	
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
}
.left-scroll-view{
	width: 120 px;
}

</style>
