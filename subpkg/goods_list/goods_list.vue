<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
		<my-goods :goods='goods'></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				//请求参数对象
				queryObj:{
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				// 商品列表的数据
				goodsList: [],
				// 总数量，用来实现分页
				total: 0,
				// 是否正在请求数据
				isloading: false
				
			};
		},
		onLoad(options) {
			//this.queryObj.query = options.query || ''
			//this.queryObj.cid = options.cid || ''
			this.getGoodsLsit()
		},
		methods: {
			//获取商品类别数据的方法
			async getGoodsLsit(cb){
				// ** 打开节流阀
				this.isloading = true
				// 发起请求
				const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				if (res.meta.status !== 200) return uni.$showMsg()
				// ** 关闭节流阀
				this.isloading = false
				cb && cb()
			    // 为数据赋值
			    this.goodsList = [...this.goodsList,...res.message.goods]
			    this.total = res.message.total
			},
			//转跳至详情页面
			gotoDetail(goods){
				uni.navigateTo({
					url:  '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})
			}
		},
		onReachBottom(){
			//判断是否还有下一页数据
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
			// 判断是否正在请求其它数据，如果是，则不发起额外的请求
			if (this.isloading) return
			//让页码之自增加1
			this.queryObj.pagenum++
			this.getGoodsLsit()
		},
		onPullDownRefresh(){
			//充值关键数据
			this.queryObj.pagenum = 1
			this.total = 0
			this.isloading = false
			this.goodsList = []
			
			//重新发起数据请求
			this.getGoodsLsit(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">


</style>
