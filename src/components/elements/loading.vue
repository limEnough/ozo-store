<template>
  <span class="loading-component">
    <div class="loading-component__image">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="margin: auto; /* background: rgb(241, 242, 243); */ display: block"
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#403B58"
          stroke-width="6"
          r="20"
          stroke-dasharray="94.24777960769379 33.41592653589793"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1.25s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  </span>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  @import '@/styles/components/elements/loading.scss';
</style>
