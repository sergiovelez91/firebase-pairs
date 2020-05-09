<template lang="pug">
    button {{ value }}
</template>



<script>
export default {
    name: 'CustomButton',
    props: {
        value: {
            type: String
        }
    }
}
</script>

<style lang="scss" scoped>
button {
    width: 100%;
    padding: 8px;
    background-color: white;
    color: #0d4657;
    font-weight: 700;
    font-size: 1.8rem;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    outline: none;
}
button:hover {
    background-color: #0d4657;
    color: white;
}
</style>