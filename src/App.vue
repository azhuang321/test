<script setup>
import { ElNotification } from 'element-plus';
import { getNimInstance } from '@/utils/init';

ElNotification.success({message:'test',duration:1000})

const res = await getNimInstance()
console.log(res)
</script>

<template>
<h3>test</h3>
</template>

<style>

</style>
