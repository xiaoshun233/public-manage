<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-aside width="200px" class="home-menu">
        <el-scrollbar view-style="background-color: #545c64;">
          <menu-nav />
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header>
          <menu-user />
        </el-header>
        <el-scrollbar>
          <el-main class="home-card">
            <router-view v-slot="{ Component }">
              <component :is="Component" />
            </router-view>
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import MenuNav from '@/components/HomeComponents/MenuNav.vue'
import MenuUser from '@/components/HomeComponents/MenuUser.vue'
</script>

<style scoped>
.common-layout {
  position: fixed;
  width: 100%;
  height: calc(100%);
  background-color: #f2f2f2;
}
.home-menu {
  background-color: #545c64;
  color: #fff;
  height: 100%;
}
.home-card {
  background-color: #eeeeee;
}
</style>
