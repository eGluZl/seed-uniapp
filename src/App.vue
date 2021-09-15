<script>
import G from '@/G'
import { SET_QUERY } from '@/store/mutation-types'

export default {
  onLaunch: async function (query) {
    console.log('App Launch')
    G.$update()
    await G.$store.commit(SET_QUERY, query)
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
@import "uview-ui/index.scss";
/*每个页面公共css */
</style>
