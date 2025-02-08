<template>
  <div id="form-login">
    <el-form label-width="100px" :model="form" :label-position="'right'">
      <el-form-item label="用户名:">
        <el-input v-model="form.account" placeholder="请输入用户名/邮箱" @blur="clearTips" />
      </el-form-item>
      <el-form-item label="密码:">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
          show-password
          @blur="clearTips"
        />
      </el-form-item>
      <el-row justify="space-around">
        <el-col :span="14">
          <el-text class="mx-1" type="danger" size="small">{{ tips }}</el-text>
        </el-col>
        <el-col :span="2" v-loading="isLoggingIn"> </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="login" :disabled="isLoggingIn">登录</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { LoginDto } from '@/types'
import { loginAdmin } from '../../apis/adminApi'
import { useRouter } from 'vue-router'
import { adminViewStore } from '@/stores'
import { ElMessage } from 'element-plus'

const form = ref<LoginDto>({
  account: '',
  password: ''
})

const router = useRouter()

const tips = ref('')

const isLoggingIn = ref(false)

const store = adminViewStore()

const login = async () => {
  await loginAdmin(form.value)
  ElMessage.success('登录成功,正在跳转到主页...')
  store.clear()
  store.setAdminView()
  setTimeout(() => {
    router.push({ name: 'home' })
  }, 1000)
}

const clearTips = () => {
  tips.value = ''
}
</script>

<style scoped>
#form-login {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fefefe;
  border-radius: 5px;
  box-shadow: 0 0 10px #ccc;
}
</style>
