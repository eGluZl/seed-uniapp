<template>
	<view class="content">
		<view>
			<text class="title">{{title}}</text>
      <view class="cu-btn" @tap.stop="toA">page A</view>
      <view class="cu-btn" @tap.stop="toB">page B</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello-index'
			}
		},
		onLoad() {


		},
		methods: {
      toA(){
        this._$router.push(this.$routers.A)
      },
      toB(){
        this._$router.push(this.$routers.B, {
          source: 'index'
        })
      },
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
