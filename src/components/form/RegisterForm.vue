<template>
  <div id="form-register">
    <el-form label-width="100px" :model="form" :label-position="'right'" @submit.prevent>
      <el-form-item label="用户名:">
        <el-input v-model="form.username" placeholder="请输入用户名" @blur="clearTips" />
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
      <el-form-item label="确认密码:">
        <el-input
          v-model="form.confirmPassword"
          placeholder="请再次输入密码"
          type="password"
          show-password
          @blur="clearTips"
        />
      </el-form-item>
      <el-form-item label="邮箱:">
        <el-input v-model="form.email" placeholder="请输入邮箱" @blur="clearTips" />
      </el-form-item>
      <el-form-item label="邮箱验证码:">
        <el-input
          v-model="form.emailVerificationCode"
          placeholder="请输入邮箱验证码"
          @blur="clearTips"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="sendEmailVerificationCode"
          :disabled="isSendingEmailVerificationCode"
          >发送邮箱验证码</el-button
        >
      </el-form-item>
      <el-form-item label="注册邀请码:">
        <el-input v-model="form.invitationCode" placeholder="注册邀请码" @blur="clearTips" />
      </el-form-item>
      <el-row justify="space-evenly">
        <el-col :span="12">
          <el-text class="mx-1" type="warning" size="small">{{ tips }}</el-text>
        </el-col>
        <el-col :span="2" v-loading="isRegistering"> </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="register" :disabled="isRegistering">注册</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { registerAdmin, sendEmailVerificationCodeAdmin } from '@/apis/adminApi'
import { adminViewStore } from '@/stores'
import type { RegisterAdminDto } from '@/types'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const form = ref<RegisterAdminDto>({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  emailVerificationCode: '',
  invitationCode: ''
})

const isRegistering = ref(false)
const tips = ref('')
const router = useRouter()
const store = adminViewStore()
const register = async () => {
  await registerAdmin(form.value)
  ElMessage.success('注册成功,正在自动登录...')
  store.clear()
  store.setAdminView()
  setTimeout(() => {
    router.push({ name: 'home' })
  }, 1000)
}

const isSendingEmailVerificationCode = ref(false)
const sendEmailVerificationCode = async () => {
  try {
    isSendingEmailVerificationCode.value = true
    await sendEmailVerificationCodeAdmin(form.value.email)
    ElMessage.success('验证码发送成功, 请查收')
  } catch (error) {
    ElMessage.error('发送失败：' + error)
  } finally {
    isSendingEmailVerificationCode.value = false
  }
}

const clearTips = () => {
  tips.value = ''
}
</script>

<style scoped>
#form-register {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px #ccc;
}
</style>
