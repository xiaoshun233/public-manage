<template>
  <el-card>
    <template #header>
      <el-text type="info" size="large">修改密码</el-text>
    </template>
    <el-form :v-model="form" class="updatePassword-form" label-width="auto" @submit.prevent>
      <el-form-item label="邮箱验证码:">
        <el-input v-model="form.emailVerificationCode" placeholder="请输入邮箱验证码">
          <template #append>
            <el-button
              :loading="isSendingEmailVerificationCode"
              @click="sendEmailVerificationCode"
              type="primary"
              >发送验证码</el-button
            >
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="password">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePassword">修改密码</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { ChangePasswordDto } from '@/types'
import { changeAdminPassword, sendEmailVerificationCodeJWT } from '@/apis'
import { ElMessage } from 'element-plus'
const form = ref<ChangePasswordDto>({
  password: '',
  confirmPassword: '',
  emailVerificationCode: ''
  
})

const updatePassword = async () => {
  try {
    const result = await changeAdminPassword(form.value)
    if (result.code) {
      ElMessage.error(result.msg)
    } else {
      ElMessage.success('修改密码成功')
    }
  } catch (error) {
    ElMessage.error('修改密码失败, 请稍后再试')
  }
}

const sendEmailVerificationCode = async () => {
  try {
    isSendingEmailVerificationCode.value = true
    const result = await sendEmailVerificationCodeJWT()
    if (result.code) {
      ElMessage.error(result.msg)
    } else {
      ElMessage.success('验证码发送成功')
    }
  } catch (error) {
    ElMessage.error('验证码发送失败, 请稍后再试')
  } finally {
    isSendingEmailVerificationCode.value = false
  }
}

const isSendingEmailVerificationCode = ref(false)
</script>

<style scoped>
.updatePassword-form {
  width: 400px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
}
</style>
