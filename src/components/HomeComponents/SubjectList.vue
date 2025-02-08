<template>
  <el-card>
    <template #header><el-text type="info" size="large">主题管理</el-text></template>
    <el-table :data="SubjectEntitys" style="width: 100%" v-loading="loadingDataIn">
      <el-table-column prop="subject_id" label="序号" width="100" :show-overflow-tooltip="true" />
      <el-table-column
        prop="subject_name"
        label="主题名称"
        width="200"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="subject_description"
        label="主题描述"
        width="500"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="subject_cover"
        label="主题图片"
        width="200"
        :show-overflow-tooltip="true"
      >
        <template #default="scope">
          <el-popover placement="bottom-start" :width="100" trigger="hover"
            ><template #reference> {{ (scope.row as RowData).subject_cover }} </template>
            <el-image
              style="width: 100px; height: 100px"
              :src="`${IMG_PREFIX}${(scope.row as RowData).subject_cover}`"
              fit="cover"
            />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            text
            size="small"
            @click="editSubjectDialog(scope.row as RowData, scope.$index)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            text
            size="small"
            @click="deleteSubjectDialog(scope.row as RowData, scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="editDialog" width="800">
      <el-descriptions title="主题信息" direction="vertical">
        <el-descriptions-item label="序号" width="100">{{
          selectEditSubject.subject_id
        }}</el-descriptions-item>
        <el-descriptions-item label="主题名称" width="150">{{
          selectEditSubject.subject_name
        }}</el-descriptions-item>
        <el-descriptions-item label="主题描述">{{
          selectEditSubject.subject_description
        }}</el-descriptions-item>
      </el-descriptions>
      <el-divider content-position="right">
        <el-button
          text
          size="large"
          type="primary"
          @click="editForm = !editForm"
          style="transform: rotate(90deg)"
          ><el-icon><Sort /></el-icon></el-button
      ></el-divider>
      <el-form class="updateInfo" v-show="!editForm" v-model="subjectInfoForm">
        <el-form-item label="主题名称" prop="name">
          <el-input v-model="subjectInfoForm.name" placeholder="请输入主题名称" />
        </el-form-item>
        <el-form-item label="主题描述" prop="description">
          <el-input v-model="subjectInfoForm.description" placeholder="请输入主题描述" />
        </el-form-item>
        <el-button type="primary" @click="editSubjectInfo">更改</el-button>
        <el-button type="default" @click="editDialog = false">取消</el-button>
      </el-form>
      <el-form class="updateCover" v-show="editForm" subjectCoverForm>
        <el-form-item>
          <CropperComponent v-model="showImageUrl" />
        </el-form-item>
        <el-button type="primary" @click="editSubjectCover">更改</el-button>
        <el-button type="default" @click="editDialog = false">取消</el-button>
      </el-form>
    </el-dialog>
    <el-dialog v-model="deleteDialog" width="800">
      <el-descriptions title="主题信息" direction="vertical">
        <el-descriptions-item label="序号" width="100">{{
          selectDeleteSubject.subject_id
        }}</el-descriptions-item>
        <el-descriptions-item label="主题名称" width="150">{{
          selectDeleteSubject.subject_name
        }}</el-descriptions-item>
        <el-descriptions-item label="主题描述">{{
          selectDeleteSubject.subject_description
        }}</el-descriptions-item>
      </el-descriptions>
      <el-button type="danger" @click="deleteSubjectSubmit">删除</el-button>
      <el-button type="default" @click="deleteDialog = false">取消</el-button>
    </el-dialog>
  </el-card>
</template>
<script lang="ts" setup>
import CropperComponent from '../public/CropperComponent.vue'
import { deleteSubject, getAllSubjects, updateSubjectCover, updateSubjectInfo } from '@/apis'
import { IMG_PREFIX } from '@/config'
import type { SubjectInfoDto, SubjectEntity } from '@/types'
import { ElMessage } from 'element-plus'
import { onMounted, ref, watch } from 'vue'
import { Sort } from '@element-plus/icons-vue'
import { base64ToBlob } from '@/utils'

interface RowData extends SubjectEntity {
  tableIndex: number
}

const SubjectEntitys = ref<SubjectEntity[]>([])
const loadingDataIn = ref<boolean>(true)

const subjectDefault: RowData = {
  subject_id: 0,
  subject_name: '',
  subject_description: '',
  subject_cover: '',
  tableIndex: 0
}
const subjectInfoForm = ref<SubjectInfoDto>({ name: '', description: '' })

const editForm = ref<boolean>(false)

const selectEditSubject = ref<RowData>({ ...subjectDefault })

const selectDeleteSubject = ref<RowData>({ ...subjectDefault })

const editDialog = ref<boolean>(false)
const deleteDialog = ref<boolean>(false)

const showImageUrl = ref<string>('')
onMounted(async () => {
  try {
    const result = await getAllSubjects()
    SubjectEntitys.value = result.data
  } catch (error) {
    ElMessage.error('获取用户列表失败')
  } finally {
    loadingDataIn.value = false
  }
})

const editSubjectDialog = (row: RowData, index: number) => {
  selectEditSubject.value = row
  selectDeleteSubject.value.tableIndex = index
  subjectInfoForm.value = {
    name: row.subject_name,
    description: row.subject_description
  }
  editDialog.value = true
}
const deleteSubjectDialog = (row: RowData, index: number) => {
  selectDeleteSubject.value = row
  selectDeleteSubject.value.tableIndex = index
  deleteDialog.value = true
}

const deleteSubjectSubmit = async () => {
  try {
    const result = await deleteSubject(selectDeleteSubject.value.subject_id)
    if (result.code) {
      ElMessage.error(result.msg)
    } else {
      ElMessage.success('删除成功')
      SubjectEntitys.value.splice(selectDeleteSubject.value.tableIndex, 1)
    }
  } finally {
    deleteDialog.value = false
  }
}

const editSubjectInfo = async () => {
  try {
    const result = await updateSubjectInfo(
      selectEditSubject.value.subject_id,
      subjectInfoForm.value
    )
    if (result.code) {
      ElMessage.error(result.msg)
    } else {
      ElMessage.success('修改成功')
      selectEditSubject.value.subject_name = subjectInfoForm.value.name
      selectEditSubject.value.subject_description = subjectInfoForm.value.description
    }
  } finally {
    editDialog.value = false
  }
}
const editSubjectCover = async () => {
  const formdata = new FormData()
  const imageFile = base64ToBlob(showImageUrl.value)
  formdata.append('imageFile', imageFile.blob, `${new Date().getTime()}.${imageFile.fileExtension}`)
  try {
    const result = await updateSubjectCover(selectEditSubject.value.subject_id, formdata)
    if (result.code == 0) {
      ElMessage.success('修改成功')
      location.reload()
    } else {
      ElMessage.error(result.msg)
    }
  } catch (error) {
    ElMessage.error('修改失败,未知错误')
  } finally {
    editDialog.value = false
  }
}

watch(editDialog, (newVal) => {
  if (!newVal) {
    subjectInfoForm.value = { name: '', description: '' }
    showImageUrl.value = ''
    editForm.value = false
  }
})
</script>
<style scoped></style>
