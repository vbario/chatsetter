<template>
  <button class="setup-guide-button" @click="$emit('openGuide')">
    <span class="label">Setup guide</span>
    <svg class="progress-ring" viewBox="0 0 36 36">
      <circle
        class="ring-bg"
        cx="18"
        cy="18"
        r="16"
        fill="none"
        stroke-width="4"
      />
      <circle
        class="ring-progress"
        cx="18"
        cy="18"
        r="16"
        fill="none"
        stroke-width="4"
        :stroke-dasharray="dashArray"
        stroke-dashoffset="25"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'SetupGuideButton',
  props: {
    // progress in percent (0-100)
    progress: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // Calculate the dash array for the progress circle
    dashArray() {
      const circumference = 2 * Math.PI * 16
      const offset = ((100 - this.progress) / 100) * circumference
      return `${circumference} ${circumference}`
    }
  }
}
</script>

<style lang="scss" scoped>
$chatsetterGreen: #046c38;

@keyframes slide-in {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.setup-guide-button {
  display: flex;
  align-items: center;
  background: #f3f4f6;
  border: none;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  position: absolute;
  top: 20px;
  right: 22px;
  /* Slide in animation */
  animation: slide-in 0.4s ease-out both;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-right: 0.5rem;
}

.progress-ring {
  width: 1.5rem;
  height: 1.5rem;
  transform: rotate(-90deg);
}

.ring-bg {
  stroke: #ebe7eb;
}

.ring-progress {
  stroke: $chatsetterGreen;
  transition: stroke-dasharray 0.3s ease;
}
</style>