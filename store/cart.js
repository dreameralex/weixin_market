export default {
	 // 为当前模块开启命名空间
	namespaced: true,
	
	// 模块的 state 数据
	state: () => ({
	    // 购物车的数组，用来存储购物车中每个商品的信息对象
	    // 每个商品的信息对象，都包含如下 6 个属性：
		//state中的数据只能被mutations 中的方法修改
	    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
	    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
	  }),
	
	// 模块的 mutations 方法
	mutations: {
		addToCart(state, goods){
			// 根据提交的商品的Id，查询购物车中是否存在这件商品
			// 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新购物车中商品的勾选状态
		updateGoodsState(state, goods){
			// 根据 goods_id 查询购物车中对应商品的信息对象
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			// 有对应的商品信息对象
			if (findResult){
				// 更新对应商品的勾选状态
				findResult.goods_state = goods.goods_state
				// 持久化存储到本地
				this.commit('m_cart/saveToStorage')
			}
		},
		// 更新购物车中商品的数量
		updateGoodsCount(state, goods) {
		  // 根据 goods_id 查询购物车中对应商品的信息对象
		  const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
		
		  if(findResult) {
		    // 更新对应商品的数量
		    findResult.goods_count = goods.goods_count
		    // 持久化存储到本地
		    this.commit('m_cart/saveToStorage')
		  }
		},
		// 根据 Id 从购物车中删除对应的商品信息
		removeGoodsById(state,goods_id){
			// 调用数组的 filter 方法进行过滤
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			// 持久化存储到本地
			this.commit('m_cart/saveToStorage')
		},
		// 更新所有商品的勾选状态
		updateAllGoodsState(state, newState){
			// 循环更新购物车中每件商品的勾选状态
			state.cart.forEach( x=> x.goods_state = newState)
			// 持久化存储到本地
			this.commit('m_cart/saveToStorage')
		}
		
	},
	
	// 模块的 getters 属性
	getters: {
		//购物车中所有商品的总数量
		total(state){
/* 			
			老方法：
			let c = 0
			// 循环统计商品的数量，累加到变量 c 中
			state.cart.forEach(goods => c += goods.goods_count)
			return c */
			return state.cart.reduce((total,item) => total += item.goods_count ,0)
		},
		//购物车中勾选商品的总数量
		checkedCount(state){
			// 先使用 filter 方法，从购物车中过滤器已勾选的商品
			// 再使用 reduce 方法，将已勾选的商品总数量进行累加
			 // reduce() 的返回值就是已勾选的商品的总数量
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count,0)
		},
		// 已勾选的商品的总价
		checkedGoodsAmount(state){
			return state.cart.filter( x => x.goods_state).reduce((total,item)=>total+=item.goods_count*item.goods_price,0).toFixed(2)
		}
	},
}