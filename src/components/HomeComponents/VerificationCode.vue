<template>
  <el-card class="verificationCode-card">
    <template #header>
      <el-text type="info" size="large">注册邀请码</el-text>
    </template>
    <div class="verificationCode-box">
      <div>
        <el-text type="primary" size="large" class="verificationCode-code">{{ code }}</el-text>
      </div>
      <el-divider />
      <div style="width: 300px; display: flex; justify-content: space-between">
        <el-button round class="verificationCode-button" @click="copy">复制</el-button
        ><el-button type="primary" round class="verificationCode-button" @click="reset"
          >重置</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { getAdminInvitationCode, resetAdminInvitationCode } from '@/apis'
import { ElMessage } from 'element-plus'

import { onMounted, ref } from 'vue'

const code = ref('123456')

onMounted(async () => {
  try {
    const result = await getAdminInvitationCode()
    if (result.code) {
      ElMessage.error(result.msg)
    } else {
      code.value = result.data
    }
  } catch (e) {
    ElMessage.error('获取邀请码失败, 请重试')
  }
})

const copy = () => {
  const type = 'text/plain'
  const blob = new Blob([code.value], { type })
  const data = [new ClipboardItem({ [type]: blob })]
  navigator.clipboard.write(data).then(
    () => {
      ElMessage.success('复制成功')
    },
    () => {
      ElMessage.error('复制失败')
    }
  )
}

const reset = async () => {
  const result = await resetAdminInvitationCode()
  code.value = result.data
  ElMessage.success('重置成功')
}
</script>
<style scoped>
.verificationCode-card {
  height: 600px;
}
.verificationCode-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 500px;
  width: 100%;
}
.verificationCode-code {
  font-size: 50px;
  font-weight: bold;
  letter-spacing: 10px;
}
.verificationCode-button {
  width: 100px;
  margin-top: 20px;
}
</style>
