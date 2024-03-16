<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧的滑动区-->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
				<block v-for="(item, i) in cateList" :key = "i">
					<view :class="['left-scroll-view-item', i === active ? 'active':'']" @click="activeChanged(i)">{{item.cat_name}}</view>
				</block>
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
				wh: 0,
				cateList: [],
				active: 0
			};
		},
		
		onLoad() {
			// 获取当前系统的信息
			const sysInfo = uni.getSystemInfoSync()
			// 为 wh 窗口可用高度动态赋值
			this.wh = sysInfo.windowHeight
			//获取分类列表的数据
			this.getCateList()
		},
		methods: {
			//获取分类列表的数据
			async getCateList(){
				// 发起请求
				const { data: res } = await uni.$http.get('/api/public/v1/categories')
				// 判断是否获取失败
				if (res.meta.status !== 200) return uni.$showMsg()
				// 转存数据
				this.cateList = res.message
			},
			
			//点击的设定为active
			activeChanged(i){
				this.active = i
			}
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
.left-scroll-view-item{
	background-color: #f7f7f7;
	line-height: 60px;
	text-align: center;
	font-size: 12px;
	
	&.active{
		background-color: #ffffff;
		position: relative;
		
		&::before {
			content: ' ';
			display: block;
			width: 3px;
			height: 30px;
			background-color: coral;
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
		}
	}
}
</style>
