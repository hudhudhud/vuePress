<template>
<section>
    <h3>{{txt}}</h3>
    <slot></slot>
</section>
</template>
<script>
export default {
    name:'MyTest',
    data(){
        return {
            txt:'This is customer component.'
        }
    }
}
</script>
<style>
section{
    border:1px solid pink;
}
</style>