<script setup lang="ts">
import { onMounted, ref } from 'vue';
import storage from '@/lib/storage';

const url = ref("");
const input = ref(null);

onMounted(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  url.value = tab["url"];
  (input.value! as HTMLInputElement).focus();
});

const onSubmit = async ()=> {
  const notifyURL = await storage.get();
  const options = {
    method : "POST",
    headers: {"Content-type": "application/json"},
    body : `{"content":"${url.value}"}`
  };
  fetch(notifyURL, options)
}  
</script>

<template>
  <div class="container">
    <span>ページを転送する</span>
    <div class="setting-btn" @click="$router.push('/setting')">
      <img class="setting-icon" src="/setting-line-icon.svg">
    </div>
    <form @submit.prevent="onSubmit">
      <label>url: </label>
      <input ref="input" v-model="url" readonly/>
    </form>
    <button class="send-btn" @click="onSubmit">送信</button>
  </div>
</template>
