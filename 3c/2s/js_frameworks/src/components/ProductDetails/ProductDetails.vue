<script setup lang="ts">
import DetailsLine from '@/components/ProductDetails/DetailsLine.vue'
import SecondaryLayout from '@/components/SecondaryLayout.vue'

const details = [
  { title: 'Screen diagonal', values: ['6.7"'] },
  { title: 'The screen resolution', values: ['2796x1290'] },
  { title: 'The screen refresh rate', values: ['120 Hz'] },
  { title: 'The pixel density', values: ['460 ppi'] },
  { title: 'Screen type', values: ['OLED'] },
  {
    title: 'Additionally',
    values: [
      'Dynamic Island',
      'Always-On display',
      'HDR display',
      'True Tone',
      'Wide color (P3)',
    ],
  },
  { title: 'CPU', values: ['A16 Bionic'] },
]
</script>

<template>
  <div :class="$style.container">
    <SecondaryLayout>
      <div :class="$style.content">
        <h4 :class="$style.heading">Details</h4>
        <p :class="$style.text">
          Just as a book is judged by its cover, the first thing you notice when
          you pick up a modern smartphone is the display. Nothing surprising,
          because advanced technologies allow you to practically level the
          display frames and cutouts for the front camera and speaker, leaving
          no room for bold design solutions. And how good that in such realities
          Apple everything is fine with displays. Both critics and mass
          consumers always praise the quality of the picture provided by the
          products of the Californian brand. And last year's 6.7-inch Retina
          panels, which had ProMotion, caused real admiration for many.
        </p>
        <div :class="$style.details">
          <DetailsLine
            v-for="{ title, values } in details"
            :key="title"
            :title
            :values
          />
        </div>
      </div>
    </SecondaryLayout>
  </div>
</template>

<style module>
.container {
  background-color: #fafafa;
  padding: 5rem 0;
}
.content {
  padding: 3rem 2.5rem 2.5rem;
  background-color: #fff;
}
.heading {
  font-family: var(--font-abeezee);
  font-size: 1.5rem;
  font-style: italic;
  color: black;
  line-height: 2rem;
  margin-bottom: 2rem;
}
.text {
  font-family: var(--font-abeezee);
  font-size: 0.875rem;
  line-height: 1.5rem;
  font-style: italic;
  color: #9d9d9d;
  margin-bottom: 2rem;
}
.details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
