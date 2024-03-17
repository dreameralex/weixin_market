<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancel-button="None" focus="true"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item)">
				<view class="goods_name"> {{item.goods_name}} </view>
				<uni-icons type='arrowright' size = '16'></uni-icons>
			</view>
		</view>
		<!-- 搜素历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="historyClean"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,i) in histories" :key='i' interted="true" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
import { computed } from "vue";
	export default {
		data() {
			return {
				timer: null,
				kw: '',
				//搜索结果列表
				searchResults: [],
				//搜索历史
				historyList: []
			};
		},
		
		onLoad(){
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		
		methods: {
			//input 输入世家难道处理函数
			input(e){
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e
					this.getSearchList()
				}, 500)
			},
			//获取请推荐请求列表
			async getSearchList(){
				//判断搜索关键词是否为空
				if(this.kw === ''){
					this.searchResults = []
					return
				}
				
				// 发起请求，获取搜索建议列表
				const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
				
				this.saveSearchHistory()
			},
			//跳转到推荐详情
			gotoDetail(item){
				console.log(item.goods_id)
				uni.navigateTo({
				    // 指定详情页面的 URL 地址，并传递 goods_id 参数
				    url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				  })
			},
			//保存搜索历史记录
			saveSearchHistory(){
				const set = new Set(this.historyList)
				//移除
				set.delete(this.kw)
				//追加，实现逆向
				set.add(this.kw)
				//Set转化为数组
				this.historyList = Array.from(set)
				//this.historyList = this.historyList.reverse() 
				// 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			//清空历史记录
			historyClean(){
				this.historyList = []
				uni.setStorageSync('kw','[]')
			},
			//根据历史标签跳转到页面
			gotoGoodsList(kw){
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + kw
				})
			}
		},
		computed: {
			histories(){
				return [...this.historyList].reverse()			
			}
			
		}
		
	}
</script>

<style lang="scss">
	.search-box{
		position: sticky;
		top: 0;
		z-index: 999;
	}
	
	.sugg-list{
		padding: 0 5px;
		.sugg-item{	
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid  #efefef;
			.goods_name{
				//文字不与允许换行（单行文本）
				white-space: nowrap;
				//超出区域隐藏
				overflow: hidden;
				//文本溢出后使用...代替
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}
	.history-box{
		padding: 0 5px;
		.history-title{
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			font-size: 13px;
			border-bottom: 1px solid  #efefef;
		}
		.history-list{
			display: flex;
			flex-wrap: wrap;
			.uni-tag{
				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}
</style>
