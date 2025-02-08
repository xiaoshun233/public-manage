<template>
  <div class="menu-user">
    <div class="menu-item">
      <el-button
        ><el-icon @click="refresh"><Refresh /></el-icon
      ></el-button>
    </div>
    <el-popover placement="bottom-start" :width="300" trigger="hover">
      <template #reference>
        <el-icon><User /></el-icon>
      </template>
      <el-descriptions :column="2" size="small" border>
        <el-descriptions-item label="用户名:" :span="2">{{
          adminView?.username
        }}</el-descriptions-item>
        <el-descriptions-item label="邮箱:" :span="2">{{ adminView?.email }}</el-descriptions-item>
        <el-descriptions-item label="注册时间" :span="2">{{
          adminView?.regtime
        }}</el-descriptions-item>
        <el-descriptions-item label="序号">{{ adminView?.id }}</el-descriptions-item>
        <el-descriptions-item label="权限">{{
          adminView?.permission == 0 ? '超级管理员' : '管理员'
        }}</el-descriptions-item>
      </el-descriptions>
      <div style="display: flex; justify-content: space-around; margin-top: 10px">
        <el-button text size="small" @click="switchAccount">切换账号</el-button>
        <el-button text size="small" @click="logout">退出登录</el-button>
      </div>
    </el-popover>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { adminViewStore } from '@/stores'
import { useRouter } from 'vue-router'
import { StorageUtil } from '@/utils'
import { ADMININFO, AUTHORIZATION_TOKEN, REFRECH_TOKEN } from '@/config'
import { ElMessage, ElNotification } from 'element-plus'
import { layoutAdmin } from '@/apis'

const store = adminViewStore()
const adminView = computed(() => store.adminView)
const router = useRouter()

onMounted(async () => {
  if (!store.hasAdminView()) {
    store.setAdminView()
  }
})

const refresh = () => {
  location.reload()
}

const switchAccount = () => {
  router.push({ name: 'login' })
}

const logout = () => {
  try {
    StorageUtil.removeItem(AUTHORIZATION_TOKEN)
    StorageUtil.removeItem(ADMININFO)
    StorageUtil.removeItem(REFRECH_TOKEN)
    layoutAdmin()
    router.push({ name: 'login' })
    ElNotification({
      message: '退出登录成功',
      type: 'success',
      duration: 2000
    })
  } catch (e) {
    ElMessage({
      type: 'error',
      message: '未知错误'
    })
  }
}
</script>
<style scoped>
.menu-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  height: 100%;
  word-spacing: 5px;
}
.menu-text {
  font-size: 14px;
  color: #bbb;
  letter-spacing: 2px;
}
.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
}
</style>
