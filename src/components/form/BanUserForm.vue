<template>
  <el-dialog v-model="visible" width="800" @close="closeDialog">
    <el-descriptions title="用户信息">
      <el-descriptions-item label="序号">{{ props.banUserView?.id }}</el-descriptions-item>
      <el-descriptions-item label="用户名">{{ props.banUserView?.username }}</el-descriptions-item>
      <el-descriptions-item label="电子邮箱">{{ props.banUserView?.email }}</el-descriptions-item>
    </el-descriptions>
    <el-form style="max-width: 600px" :model="form" size="default" status-icon :rules="rules">
      <el-form-item prop="banReason" label="封禁理由:">
        <el-input v-model="form.banReason" style="width: 240px" placeholder="输入封禁理由"
      /></el-form-item>
      <el-form-item prop="banDay" label="封禁天数:">
        <el-input-number v-model="form.banDay" style="width: 240px" placeholder="输入封禁天数" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitBanUser">封禁</el-button>
        <el-button type="default" @click="visible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref, toRef, watch } from 'vue'
import type { BanUserDto, UserView } from '@/types'
import { ElMessage, type FormRules } from 'element-plus'
import { banUser } from '@/apis/userApi'
const props = defineProps<{
  banUserFormVisible: boolean
  banUserView: UserView
}>()
const form = ref<BanUserDto>({
  userId: 0,
  banReason: '',
  banDay: 0
})

const visible = ref<boolean>(props.banUserFormVisible)
watch(toRef(props, 'banUserFormVisible'), (newVal) => {
  visible.value = newVal
})

const rules = reactive<FormRules<BanUserDto>>({
  banDay: [{ required: true, type: 'number', message: '请输入封禁天数', trigger: 'blur' }]
})
const emit = defineEmits(['update:banUserFormVisible', 'submitSuccess'])
const closeDialog = () => {
  emit('update:banUserFormVisible', false)
  form.value = { userId: 0, banReason: '', banDay: 0 }
}
const submitBanUser = async () => {
  try {
    form.value.userId = props.banUserView.id
    await banUser(form.value)
    ElMessage.success('封禁成功')
    emit('submitSuccess')
  } finally {
    visible.value = false
  }
}
</script>
<style scoped></style>
