<template lang="pug">
    .cross
</template>

<script>
export default {
    name: 'Cross'
}
</script>

<style lang="scss" scoped>
.cross {
  position: absolute;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
  }
  .cross:hover {
    opacity: 1;
  }
  .cross:before, .cross:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: #333;
  }
  .cross:before {
    transform: rotate(45deg);
  }
  .cross:after {
    transform: rotate(-45deg);
  }

</style>