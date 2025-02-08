<template>
  <el-card>
    <template #header><el-text type="info" size="large">添加主题</el-text></template>
    <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap">
      <el-form :model="form" label-width="auto" style="width: 500px">
        <el-form-item label="主题名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入主题名称" />
        </el-form-item>
        <el-form-item label="主题描述" prop="description">
          <el-input
            v-model="form.description"
            placeholder="请输入主题描述"
            type="textarea"
            rows="3"
            resize="none"
            maxlength="50"
          />
        </el-form-item>
        <el-form-item label="主题图片" prop="image">
          <CropperComponent v-model="form.image" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitDialog = true">添加</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  <el-dialog v-model="submitDialog" title="确认提示">
    <div>是否确认添加主题?</div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">确认</el-button>
        <el-button @click="submitDialog = false"> 取消 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import CropperComponent from '../public/CropperComponent.vue'
import { ElMessage } from 'element-plus'

import { ref } from 'vue'
import { base64ToBlob } from '@/utils'
import { addSubject } from '@/apis'
const formDeafult = {
  name: '',
  description: '',
  image: ''
}

const submitDialog = ref(false)

const form = ref({
  ...formDeafult
})

const resetForm = () => {
  form.value = { ...formDeafult }
}

const submitForm = async () => {
  try {
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('description', form.value.description)
    const imageFile = base64ToBlob(form.value.image)
    formData.append(
      'imageFile',
      imageFile.blob,
      `${new Date().getTime()}.${imageFile.fileExtension}`
    )
    await addSubject(formData)
    ElMessage.success('添加成功')
    resetForm()
  } finally {
    submitDialog.value = false
  }
}
</script>
<style scoped></style>
