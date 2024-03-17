<template>
	<view>
		<!-- 使用自定义的搜索组件 -->
		<my-search></my-search>
		<view class="scroll-view-container">
			<!-- 左侧的滑动区 -->
			
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
				<block v-for="(item, i) in cateList" :key = "i">
					<view :class="['left-scroll-view-item', i === active ? 'active':'']" @click="activeChanged(i)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧的滑动区 -->
			<scroll-view class="right-scroll-view" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2, i2) in cateList2" :key="i2">
					<!-- 二级分类的标题 -->
					<view class="cate-lv2-title"> /{{item2.cat_name}}/</view>
					<!-- 动态渲染三级分类的列表数据 -->
					<view class="cate-lv3-list">
						<!-- 三级分类的item项 -->
						<view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
							<!-- 三级分类的图片  <image :src="item3.cat_icon"></image>  -->
							<image src="/static/tab_icons/tiger.png" mode="widthFix"/>
							<!-- 三级分类的文字 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
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
				active: 0,
				//二级分类列表
				cateList2: [],
				scrollTop: 0
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
				
				//为二级分类赋值
				this.cateList2 = res.message[0].children
			},
			
			//点击的设定为active
			activeChanged(i){
				this.active = i
				//重新为二级分类赋值
				this.cateList2 = this.cateList[i].children
				
				this.scrollTop = 0
			},
			//跳转到商品列表页面
			gotoGoodsList(item){
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			}
		}
	}
	
	
</script>

<style lang="scss">
	.scroll-view-container{
		display: flex;
	}
	.left-scroll-view{
		width: 120px;
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
	.cate-lv2-title{
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}
	.cate-lv3-list{
		display: flex;
		flex-wrap: wrap;
		.cate-lv3-item{
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;
			image{
				width: 60px;
				height: 60px;
			}
			text{
				font-size: 10px;
			}
		}
	}
</style>
