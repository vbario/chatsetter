<template>
  <div class="leaderboard-wrapper">
    <!-- {{$store.state.slam.slamLeaderboard}} -->
    <div class="farm-wrapper">
      <FlowerVisuals :people="visualArray()" />
    </div>
    <!-- <div class="leaderboard">
      <h2>Test</h2>
      <div v-for="(key, k) in Object.keys($store.state.slam.slamLeaderboard)" class="leaderboard-entry w100p df jcfs aic">
        <h1 class="username">@{{key}}</h1>
        <h1 class="username">{{totalEmojis($store.state.slam.slamLeaderboard[key]) || '-'}}</h1>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'SlamFarmPage',
  data () {
    return {
      loading: false,
      actions: {
        'heart': 0,
        '100': 0,
        'laugh': 0,
        'gasp': 0,
        'cry': 0,
        'clap': 0,
        'fist': 0,
        'thumbs-up': 0,
        'thumbs-down': 0,
        'wave': 0,
        'hand-up': 0
      }
    }
  },
  props: [],
  components: {
  },
  methods: {
    visualArray () {
      let start = this.$store.state.slam.slamLeaderboard
      return Object.keys(start || {}).map((v, i) => {
        return {
          name: v,
          count: this.totalEmojis(start[v])
        }
      })
    },
    iconImage (name) {
      let images = {
        'heart': '❤️️',
        '100': '💯',
        'laugh': '😂',
        'gasp': '😮',
        'cry': '😢',
        'clap': '👏',
        'fist': '✊',
        'thumbs-up': '👍',
        'thumbs-down': '🦴',
        'wave': '👋',
        'hand-up': '🙋'
      }
      return images[name] || ''
    },
    totalEmojis (entry) {
      let total = 0
      for (let e in entry) {
        if ((e !== 'username') && (e !== 'hand-up') && (e !== 'total') && (e !== 'topEmoji')) {
          let number = parseInt(entry[e] || 0)
          total = total + number
        }
      }
      return total
    },
  },
  computed: {
  },
  watch: {
  },
  created () {
    console.log('* SLAM PAGE CREATED *')
    let spaceid = this.$route.query.spaceid
    console.log('spaceid', spaceid)
    this.$store.dispatch('slam/watchSlamLeaderboards', {spaceid})
    console.log(this.visualArray())
    // this.grandTotal()
  }
}
</script>

<style scoped lang="scss">
  .leaderboard-wrapper {
    padding-left: 800px;
    padding-right: 100px;
    background-color: #000;
    background-image: url(~/assets/images/farm-1.jpg);
    /*background-image: url(../../static/images/farm-background.jpg);*/
    background-size: cover;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    /*justify-content: flex-end;*/
    justify-content: center;
    /*align-items: center;*/
  }
  .leaderboard {
    height: 100vw;
    width: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /*padding: 20px 120px 20px 30px;*/
    gap: 5px;
    transform: rotate(-90deg);
    padding-top: 30px;
    padding-left: 5px;
  }
  .emoji-row {
    /*gap: 10px;*/
  }

  .emoji-unit {
    background-color: #00000033;
    border: 1px solid #ffffff66;
    border-radius: 10px;
    padding: 4px 8px;
    width: 300px;
    font-size: 30px;
    /*width: 100%;*/
    color: #2cac14 !important;
    text-align: center;
    font-weight: 700;
    & > p {
      font-size: 30px;
      font-weight: 500;
      font-family: Helvetica;
    }
  }
  .emoji-unit-top {
    border: none;
    background-color: transparent;
  }
  .fzx {
    font-size: 28px;
  }
  .leaderboard-entry {
    padding-left: 20px;
  }
  .leaderboard-entry, .emoji-row {
    color: #fff !important;
    /*margin-bottom: 30px;*/

    & > * {
      /*color: #fff !important;*/
      & > * {
        /*color: #fff !important;*/
      }
    }
  }
  .total-emojis {
    border: none;
    background-color: transparent;
    transform: translateX(-10px);
    height: 70px;
    /*padding-right: 20px;*/
    p {
      border-radius: 10px;
      /*width: 140px;*/
      /*border: 1px solid #fff;*/
      /*background-color: #fff;*/
      font-weight: 900;
      font-family: Helvetica;
      font-size: 45px;
      color: #000 !important;
      padding: 5px 5px;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .o0 {
    opacity: 0;
  }
  .username {
    font-size: 20px;
    margin-right: 260px;
    width: 40vh;
    display: flex;
    justify-content: flex-end;
  }
  .heading-username {
    margin-left: calc(50vh - 180px);
  }
  .emoji-top {
    font-size: 60px !important;
  }
  .flower-top {
    font-size: 100px;
    position: absolute;
    left: -15px;
  }
  .g_ {
    gap: 20px;
  }
  .emoji-count {
    padding-left: 90px;
  }
</style>
