<template>
  <div id="login-view">
    <div id="login-item">
      <el-menu
        :default-active="activeIndex"
        class="menu-toggle"
        mode="horizontal"
        :ellipsis="false"
        :router="true"
      >
        <el-menu-item index="/login">登录</el-menu-item>
        <el-menu-item index="/login/register">注册</el-menu-item>
      </el-menu>
      <router-view v-slot="{ Component }">
        <transition name="transition-form" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
const activeIndex = ref('')
const route = useRoute()
onMounted(() => {
  activeIndex.value = route.path
})
</script>

<style scoped>
#login-view {
  width: 100%;
  height: calc(100vh);
  background-image: url(@/assets/image/login-bg.jpg);
  background-size: cover;
  background-position: center;
}

#login-item {
  position: absolute;
  top: 40%;
  left: 70%;
  transform: translate(-20%, -30%);
  width: 400px;
  height: 600px;
  border-radius: 10px;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

/* 路由切换动画 */
.transition-form-enter-active,
.transition-form-leave-active {
  transition: all 0.4s ease;
}

.transition-form-enter-from,
.transition-form-leave-to {
  opacity: 0;
  transform: rotateY(90deg);
}
.menu-toggle {
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 40px;
}
</style>
