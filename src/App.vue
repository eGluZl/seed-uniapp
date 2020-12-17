<script>
import {_API_STATUS_OK, _API_UserInfo} from "./apis";
import {SAVE_USER_INFO} from "./store/mutation-types";

  export default {
		onLaunch: async function () {
      console.log('App Launch')
      await new Promise(resolve => {
        this.$login().then(() => {
          this.$request(_API_UserInfo()).then(res => {
            if (res.code === _API_STATUS_OK) {
              this.$store.commit(SAVE_USER_INFO, res.data)
              resolve()
            } else {
              this.$toast(res.msg)
            }
          })
        }).catch(err => {
          console.log(err)
        })
      })
    },
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
