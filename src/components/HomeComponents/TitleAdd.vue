<template>
  <el-card>
    <template #header><el-text type="info" size="large">添加话题</el-text></template>
    <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap">
      <el-form :model="form" label-width="auto" style="width: 500px">
        <el-form-item label="话题名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入话题名称" />
        </el-form-item>
        <el-form-item label="话题描述" prop="description">
          <el-input
            v-model="form.description"
            placeholder="请输入话题描述"
            type="textarea"
            rows="3"
            resize="none"
            maxlength="50"
          />
        </el-form-item>
        <el-form-item label="所在主题">
          <el-select v-model="form.subjectId" placeholder="请选择所在主题">
            <el-option
              v-for="(item, index) in subjectEntitys"
              :key="index"
              :label="item.subject_name"
              :value="item.subject_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="话题图片" prop="image">
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
    <div>是否确认添加话题?</div>
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
import { onMounted, ref } from 'vue'
import { base64ToBlob } from '@/utils'
import { addTitle, getAllSubjects } from '@/apis'
import type { SubjectEntity } from '@/types'
const formDeafult = {
  name: '',
  description: '',
  subjectId: '',
  image: ''
}
const subjectEntitys = ref<SubjectEntity[]>([])

onMounted(async () => {
  const result = await getAllSubjects()
  if (result.code) {
    ElMessage.error(result.msg)
  } else {
    subjectEntitys.value = result.data
  }
})

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
    formData.append('subjectId', form.value.subjectId)
    const imageFile = base64ToBlob(form.value.image)
    formData.append(
      'imageFile',
      imageFile.blob,
      `${new Date().getTime()}.${imageFile.fileExtension}`
    )
    const result = await addTitle(formData)
    if (result.code) {
      ElMessage.error(result.msg)
    } else {
      ElMessage.success('添加成功')
      resetForm()
    }
  } catch (error) {
    ElMessage.error('添加失败, 未知错误')
  } finally {
    submitDialog.value = false
  }
}
</script>
<style scoped></style>
