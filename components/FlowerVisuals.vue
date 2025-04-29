<template>
  <div class="flowers-wrap">
    <div
      v-for="flower in flowerData"
      :key="flower.person.name"
      class="flower-item flex-col items-center"
      v-show="flower.person.count > 0"
    >
      <svg
        :width="flower.svgSize"
        :height="flower.svgSize + flower.stemLength - (flower.textOffset/2)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path
            :id="flower.stemId"
            :d="`M ${flower.center},${flower.center + flower.centerRadius} L ${flower.center},${flower.center + flower.centerRadius + flower.stemLength}`"
            stroke="none"
            fill="none"
          />
        </defs>

        <!-- Petals -->
        <ellipse
          v-for="(angle, idx) in flower.petalAngles"
          :key="idx"
          :cx="getPetalPosition(flower, angle).x"
          :cy="getPetalPosition(flower, angle).y"
          :rx="flower.petalSize"
          :ry="flower.petalSize * 1.2"
          :fill="flower.petalColor"
          opacity="0.8"
        />

        <!-- Center -->
        <circle
          :cx="flower.center"
          :cy="flower.center"
          :r="flower.centerRadius"
          :fill="flower.centerColor"
        />

        <!-- Count in center -->
        <text
          :x="flower.center"
          :y="flower.center"
          text-anchor="middle"
          dominant-baseline="middle"
          :font-size="flower.textFontSize"
          fill="#fff"
          font-weight="600"
        >
          {{ flower.person.count }}
        </text>

        <!-- Stem -->
        <path
          :d="`M ${flower.center},${flower.center + flower.centerRadius} L ${flower.center},${flower.center + flower.centerRadius + flower.stemLength}`"
          :stroke="flower.stemColor"
          stroke-width="4"
        />

        <!-- Name background -->
        <path
          :d="`M ${flower.center + 14},${flower.center + flower.centerRadius} L ${flower.center + 14},${flower.center + flower.centerRadius + flower.stemLength}`"
          :stroke="'#00000055'"
          stroke-width="18"
        />

        <!-- Name on stem -->
        <text
          :font-size="flower.textFontSize"
          fill="#fff"
          font-weight="500"
          style="transform: translateX(10px);"
        >
          <textPath
            :href="`#${flower.stemId}`"
            startOffset="50%"
            text-anchor="middle"
          >
            {{ flower.person.name }}
          </textPath>
        </text>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlowerVisuals',
  props: {
    people: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    flowerData() {
      return this.people.map((person) => {
        const seed = this.hashString(person.name + person.count);
        const palette = this.palettes[seed % this.palettes.length];
        const petalCount = 5 + (seed % 4);
        const centerRadius = 16 + Math.sqrt(person.count);
        const svgSize = centerRadius * 5;
        const petalSize = centerRadius * 0.7;
        const center = svgSize / 2;
        const rotationOffset = seed % 360;
        const petalAngles = Array.from(
          { length: petalCount },
          (_, i) => i * (360 / petalCount) + rotationOffset
        );
        const stemLength = centerRadius * 6;
        const textOffset = 20;
        const textFontSize = `${Math.max(14, centerRadius / 2)}px`;
        return {
          person,
          seed,
          petalAngles,
          petalSize,
          centerRadius,
          svgSize,
          center,
          stemLength,
          textOffset,
          textFontSize,
          stemId: `stem-${seed}`,
          petalColor: palette.petal,
          centerColor: palette.center,
          stemColor: '#6B8E23'
        };
      });
    }
  },
  data() {
    return {
      palettes: [
        { petal: '#FDE68A', center: '#FBBF24' },
        { petal: '#BFDBFE', center: '#3B82F6' },
        { petal: '#FECACA', center: '#EF4444' },
        { petal: '#D1FAE5', center: '#10B981' },
        { petal: '#E9D5FF', center: '#8B5CF6' },
        { petal: '#FEE2E2', center: '#EC4899' }
      ]
    };
  },
  methods: {
    hashString(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash);
    },
    getPetalPosition(flower, angleDeg) {
      const rad = (angleDeg * Math.PI) / 180;
      const offset = flower.centerRadius + flower.petalSize;
      return {
        x: flower.center + Math.cos(rad) * offset,
        y: flower.center + Math.sin(rad) * offset
      };
    }
  }
};
</script>

<style scoped>
.flowers-wrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.flower-item svg {
  display: block;
}
</style>