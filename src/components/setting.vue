<script setup lang="ts">
import { onMounted, ref } from 'vue';
import storage from '@/lib/storage';

const token = ref("");
const input = ref(null);

onMounted(async () => {
  token.value = await storage.get();
  (input.value! as HTMLInputElement).focus();
});

const onSave = ()=> {
  if(!token.value) return
  storage.set(token.value)
}  
</script>

<template>
  <div class="container">
    <div class="back-btn" @click="$router.push('/')">
      <img class="setting-icon" src="/thin-arrow-left-icon.svg">
    </div>
    <form @submit.prevent="onSave">
      <label>通知先: </label>
      <input ref="input" v-model="token"/>
    </form>
    <button class="send-btn" @click="onSave">保存</button>
  </div>
</template>
