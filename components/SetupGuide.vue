<template>
  <div class="setup-guide-card">
    <div class="flex flex-col w-full relative">
      <!-- Heading -->
      <h2 class="guide-heading">Setup guide</h2>

      <!-- Progress bar -->
      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>

      <!-- Sections -->
      <div
        v-for="(section, index) in sections"
        :key="index"
        class="guide-section"
      >
        <!-- Section header -->
        <div class="section-header" @click="toggleSection(index)">
          <span>{{ section.title }}</span>
          <span>{{ section.open ? '▾' : '▸' }}</span>
        </div>

        <!-- Section items -->
        <ul v-if="section.open" class="section-items">
          <li
            v-for="(item, idx) in section.items"
            :key="idx"
            @click="onItemClick(section, item)"
            :class="{ completed: item.completed }"
          >
            <span class="icon" @click="handleCheck(item, index, idx)">
              <template v-if="item.completed">✔️</template>
              <template v-else>◻️</template>
            </span>
            <span @click="handleClick(item)">{{ item.label }}</span>
          </li>
        </ul>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="x-close-startup-guide" @click="$emit('closeGuide')"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SetupGuide',
  data() {
    return {
      sections: [
        {
          title: 'Connect Instagram',
          open: true,
          items: [
            { label: 'Accept invite on Instagram', completed: false, link: '/instagraminvite', check: true },
            { label: 'Authorize Instagram to use ChatSetter', completed: false, link: '/settings' }
          ],
        },
        {
          title: 'Set up your identity',
          open: false,
          items: [
            { label: 'Add your name', completed: false, link: '/identity?tab=general&idtab=basic' },
            { label: 'Add basic info (recommended)', completed: false, link: '/identity?tab=general&idtab=basic' },
            { label: 'Add advanced info (recommended)', completed: false, link: '/identity?tab=general&idtab=advanced' }
          ],
        },
        {
          title: 'Add a script',
          open: false,
          items: [
            { label: 'Add a script to follow', completed: false, link: '/identity?tab=script' },
            { label: 'Add objections & responses', completed: false, link: '/identity?tab=script' }
          ],
        },
        {
          title: 'Actions',
          open: false,
          items: [
            { label: 'Review your objective', completed: false, link: '/actions', check: true },
            { label: 'Enable followup messages (recommended)', completed: false, link: '/actions?followup=true' },
            { label: 'Enable comment replies (recommended)', completed: false, link: '/actions?commentreplies=true' },
            { label: 'Turn on ChatSetter', completed: false, link: '/actions?turnon=true' }
          ],
        },
        {
          title: 'Try it!',
          open: false,
          items: [
            { label: 'Try a test chat as a customer', completed: false, link: '/tryit' },
            { label: 'Try a live chat on Instagram', completed: false }
          ],
        }
      ]
    }
  },
  computed: {
    progress() {
      const total = this.sections.reduce((sum, sec) => sum + sec.items.length, 0)
      const done = this.sections.reduce(
        (sum, sec) => sum + sec.items.filter(item => item.completed).length,
        0
      )
      return total ? Math.round((done / total) * 100) : 0
    }
  },
  methods: {
    handleClick (item) {
      if (item.link) {
        this.$router.push(item.link)
      }
    },
    handleCheck (item, index, idx) {
      console.log('handleCheck', item, index, idx)
      if (item.check) {
        this.sections[index].items[idx].completed = true
        this.saveSetupGuide()
      }
    },
    toggleSection(index) {
      console.log('index', index)
      for (let s in this.sections) {
        console.log('s', s)
        if (!(s === index.toString())) {
          this.sections[s].open = false
        }
      }
      this.sections[index].open = !this.sections[index].open
    },
    onItemClick(section, item) {
      // TODO: emit event or navigate
      console.log(`Clicked on ${section.title} → ${item.label}`)
    },
    getMySetupGuide () {
      this.$store.dispatch('identity/getMySetupGuide', {}).then((sections) => {
        if (sections) {
          this.sections = sections
        }
      })
    },
    saveSetupGuide () {
      this.$store.dispatch('identity/saveSetupGuide', {sections: this.sections})
    },
    updateCompletionStatuses () {

      let loaded = this.$store.state.auth.loaded
      let uid = this.$fire.auth.currentUser && this.$fire.auth.currentUser.uid
      let loadedB = this.$store.state.auth && this.$store.state.identity.personaData.loaded
      console.log(this.$store.state.identity.personaData)
      console.log('loaded', loaded)
      if (loaded && uid) {
        console.log('*** LOADED ***')
        // console.log('1', this.$store.state.identity.personaData.loaded)
        let completionStatuses = [
          [null, this.$store.state.instagram.has_access_token],
          [
            this.$store.state.identity.personaData['persona_name'] ? true : false,
            Object.keys(this.$store.state.identity.personaData).length > 1,
            Object.keys(this.$store.state.identity.personaData).length > 2
          ],
          [
            this.$store.state.identity.memory.script ? true : false,
            this.$store.state.identity.memory.objections ? true : false
          ],
          [
            false,
            this.$store.state.messages.followUpMode ? true : false,
            this.$store.state.messages.commentReplyMode ? true : false,
            (this.$store.state.identity.sequencesLoaded && this.$store.state.identity.sequences[0] && this.$store.state.identity.sequences[0].active) ? true : false
          ]
        ]
        console.log('completionStatuses', completionStatuses)
        for (let i in completionStatuses) {
          let category = completionStatuses[i]
          for (let j in category) {
            let v = category[j]
            if (v) {
              this.sections[i].items[j].completed = v
            }
          }
        }
      } else if (loaded) {
        //
      } else {
        setTimeout(()=> {
          this.updateCompletionStatuses()
        }, 1500)
      }

    }
  },
  created () {
    this.getMySetupGuide()
    this.updateCompletionStatuses()
  }
}
</script>

<style lang="scss" scoped>
$chatsetterGreen: #046c38;
.setup-guide-card {
  background: #ffffff;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  position: absolute;
  bottom: 20px;
  right: 22px;
  animation: slide-in-from-bottom 0.4s ease-out both;
}
.guide-heading {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}
.progress-bar {
  background: #e5e7eb;
  height: 0.25rem;
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 1rem;
}
.progress {
  background: $chatsetterGreen;
  height: 100%;
  transition: width 0.3s ease;
}
.section-header {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  font-weight: 500;
  /* removed underline */
}
.section-items {
  list-style: none;
  padding: 0.75rem 0.5rem;
  margin: 0.5rem 0 1rem;
  background: #f3f4f6;
  border-radius: 0.375rem;
}
.section-items li {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.25rem;
  cursor: pointer;
  border-radius: 0.3rem;

  &:hover {
    background-color: #00000011;
  }
}
.section-items li + li {
  /*border-top: 1px solid #e5e7eb;*/
  padding-top: 0.5rem;
}
.section-items li.completed span.icon {
  color: #10b981;
}
.section-items li .icon {
  width: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
}
.x-close-startup-guide {
  width: 16px;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0.5;
  cursor: pointer;
}
@keyframes slide-in-from-bottom {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
