<template>
	<view class="goods-item">
	  <!-- 商品左侧图片区域 -->
	  <view class="goods-item-left">
	    <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
	  </view>
	  <!-- 商品右侧信息区域 -->
	  <view class="goods-item-right">
	    <!-- 商品标题 -->
	    <view class="goods-name">{{goods.goods_name}}</view>
	    <view class="goods-info-box">
	      <!-- 商品价格 -->
	      <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
	    </view>
	  </view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			goods: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
				
			};
		},
		filters: {
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods-item{
	display: flex;
	pedding: 10px 5px;
	border: 1px solid #f0f0f0;
	.goods-item-left{
		margin-right: 5px;
		.goods-pic{
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods-item-right{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods-name{
			font: 13px;
		}
		.goods-info-box{
			.goods-price{
				color: coral;
				font-size: 16px;
			}
		}
	}
}
</style>