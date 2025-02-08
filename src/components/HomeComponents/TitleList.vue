<template>
  <el-card>
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <el-text type="info" size="large">话题管理</el-text>
        <div style="display: flex">
          <div style="display: flex; width: 300px">
            <el-select v-model="sort.field" @change="updatePageInfoView">
              <el-option label="按序号" value="titleId" />
              <el-option label="按主题" value="subjectId" />
            </el-select>
            <el-select v-model="sort.order" @change="updatePageInfoView">
              <el-option label="升序" value="asc" />
              <el-option label="降序" value="desc" />
            </el-select>
          </div>

          <el-button @click="resetPageInfoView" style="margin: 0 10px">重置</el-button>
          <el-input
            v-model="searchForm.searchText"
            style="max-width: 400px"
            placeholder="搜索...."
            class="input-with-select"
          >
            <template #prepend>
              <el-switch v-model="searchForm.switch" />
            </template>
            <template #append>
              <el-button @click="searchTitle"
                ><el-icon><Search /></el-icon
              ></el-button> </template
          ></el-input>
        </div>
      </div>
    </template>
    <el-table :data="pageInfoView.list" style="width: 100%" v-loading="loadingDataIn">
      <el-table-column prop="title_id" label="序号" width="100" :show-overflow-tooltip="true" />
      <el-table-column
        prop="title_name"
        label="话题名称"
        width="200"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="title_description"
        label="话题描述"
        width="400"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="title_subject_id"
        label="主题序号"
        width="100"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="cover" label="话题图片" width="200" :show-overflow-tooltip="true">
        <template #default="scope">
          <el-popover placement="bottom-start" :width="100" trigger="hover"
            ><template #reference> {{ (scope.row as RowData).title_cover }} </template>
            <el-image
              style="width: 100px; height: 100px"
              :src="`${IMG_PREFIX}${(scope.row as RowData).title_cover}`"
              fit="cover"
            />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="info" text size="small" @click="titleViewDialog(scope.row as RowData)"
            >查看</el-button
          >
          <el-button
            type="primary"
            text
            size="small"
            @click="editTitleDialog(scope.row as RowData, scope.$index)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            text
            size="small"
            @click="deleteTitleDialog(scope.row as RowData, scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="800px" v-model="viewDialog">
      <el-descriptions title="话题信息" direction="vertical" :column="4" size="large" border>
        <el-descriptions-item label="话题序号" width="120px">{{
          selectTitleView?.titleId
        }}</el-descriptions-item>
        <el-descriptions-item label="话题名称" width="120px">{{
          selectTitleView?.titleName
        }}</el-descriptions-item>
        <el-descriptions-item label="话题描述" :span="2">{{
          selectTitleView?.description
        }}</el-descriptions-item>
        <el-descriptions-item label="评论数">
          {{ selectTitleView?.countComment }}
        </el-descriptions-item>
        <el-descriptions-item label="评分">
          {{ selectTitleView?.averageScore }}
        </el-descriptions-item>
        <el-descriptions-item label="主题序号">
          {{ selectTitleView?.subjectId }}
        </el-descriptions-item>
        <el-descriptions-item label="主题名称">
          {{ selectTitleView?.subjectName }}
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
    <el-dialog v-model="editDialog" width="800">
      <el-descriptions title="话题信息" direction="vertical">
        <el-descriptions-item label="序号" width="100">{{
          selectEditTitle.title_id
        }}</el-descriptions-item>
        <el-descriptions-item label="话题名称" width="150">{{
          selectEditTitle.title_name
        }}</el-descriptions-item>
        <el-descriptions-item label="话题描述">{{
          selectEditTitle.title_description
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
      <el-form class="updateInfo" v-show="!editForm" v-model="titleInfoForm">
        <el-form-item label="话题名称" prop="name">
          <el-input v-model="titleInfoForm.name" placeholder="请输入话题名称" />
        </el-form-item>
        <el-form-item label="话题描述" prop="description">
          <el-input v-model="titleInfoForm.description" placeholder="请输入话题描述" />
        </el-form-item>
        <el-form-item lable="话题所在主题">
          <el-select
            v-model="titleInfoForm.subjectId"
            placeholder="请选择所在主题"
            style="width: 240px"
          >
            <el-option
              v-for="(item, index) in subjectEntitys"
              :key="index"
              :label="item.subject_name"
              :value="item.subject_id"
            />
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="editTitleInfo">更改</el-button>
        <el-button type="default" @click="editDialog = false">取消</el-button>
      </el-form>
      <el-form class="updateCover" v-show="editForm" subjectCoverForm>
        <el-form-item>
          <CropperComponent v-model="showImageUrl" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editTitleCover">更改</el-button>
          <el-button type="default" @click="editDialog = false">取消</el-button></el-form-item
        >
      </el-form>
    </el-dialog>
    <el-dialog v-model="deleteDialog" width="800">
      <el-descriptions title="主题信息" direction="vertical">
        <el-descriptions-item label="序号" width="100">{{
          selectDeleteTitle.title_id
        }}</el-descriptions-item>
        <el-descriptions-item label="主题名称" width="150">{{
          selectDeleteTitle.title_name
        }}</el-descriptions-item>
        <el-descriptions-item label="主题描述">{{
          selectDeleteTitle.title_description
        }}</el-descriptions-item>
      </el-descriptions>
      <el-button type="danger" @click="deleteTitleSubmit">删除</el-button>
      <el-button type="default" @click="deleteDialog = false">取消</el-button>
    </el-dialog>
    <el-pagination
      class="user-Pagination"
      :page-count="pageInfoView.pages"
      layout=" prev, pager, next"
      :pager-count="5"
      v-model:current-page="page"
    />
  </el-card>
</template>
<script lang="ts" setup>
import CropperComponent from '../public/CropperComponent.vue'
import {
  deleteTitle,
  getAllSubjects,
  getTitleViewByTitleId,
  getTitles,
  getTitlesOrder,
  searchTitles,
  updateTitleCover,
  updateTitleInfo
} from '@/apis'
import { IMG_PREFIX } from '@/config'
import type {
  TitleView,
  PageInfoView,
  SubjectEntity,
  TitleEntity,
  TitleInfoDto,
  Result
} from '@/types'
import { ElMessage } from 'element-plus'
import { onMounted, ref, watch } from 'vue'
import { Search, Sort } from '@element-plus/icons-vue'
import { base64ToBlob } from '@/utils'

interface RowData extends TitleEntity {
  tableIndex: number
}

const pageInfoView = ref<PageInfoView<TitleEntity>>({
  pageNum: 0,
  pages: 0,
  pageSize: 0,
  total: 0,
  list: []
})

const page = ref<number>(1)
const loadingDataIn = ref<boolean>(true)

const titleDefault: RowData = {
  title_id: 0,
  title_name: '',
  title_subject_id: 0,
  title_cover: '',
  title_description: '',
  tableIndex: 0
}

const subjectEntitys = ref<SubjectEntity[]>([])

const searchForm = ref({
  searchText: '',
  switch: false
})

const sort = ref({
  field: 'titleId',
  order: 'asc'
})

const titleInfoForm = ref<TitleInfoDto>({ name: '', description: '', subjectId: 0 })

const editForm = ref<boolean>(false)

const selectEditTitle = ref<RowData>({ ...titleDefault })

const selectDeleteTitle = ref<RowData>({ ...titleDefault })

const selectTitleView = ref<TitleView>()

const editDialog = ref<boolean>(false)
const deleteDialog = ref<boolean>(false)
const viewDialog = ref<boolean>(false)

const showImageUrl = ref<string>('')
onMounted(async () => {
  try {
    const titleResult = await getTitlesOrder(page.value, sort.value.field, sort.value.order)
    pageInfoView.value = titleResult.data
    const subjectResult = await getAllSubjects()
    subjectEntitys.value = subjectResult.data
  } catch (error) {
    ElMessage.error('获取用户列表失败')
  } finally {
    loadingDataIn.value = false
  }
})

const titleViewDialog = async (row: RowData) => {
  const result = await getTitleViewByTitleId(row.title_id)
  selectTitleView.value = result.data
  viewDialog.value = true
}

const editTitleDialog = (row: RowData, index: number) => {
  selectEditTitle.value = row
  selectEditTitle.value.tableIndex = index
  titleInfoForm.value = {
    name: row.title_name,
    description: row.title_description,
    subjectId: row.title_subject_id
  }
  editDialog.value = true
}
const deleteTitleDialog = (row: RowData, index: number) => {
  selectDeleteTitle.value = row
  selectDeleteTitle.value.tableIndex = index
  deleteDialog.value = true
}

const deleteTitleSubmit = async () => {
  try {
    const result = await deleteTitle(selectDeleteTitle.value.title_id)
    if (result.code) {
      ElMessage.error(result.msg)
    } else {
      ElMessage.success('删除成功')
      pageInfoView.value.list.splice(selectDeleteTitle.value.tableIndex, 1)
    }
  } finally {
    deleteDialog.value = false
  }
}

const editTitleInfo = async () => {
  try {
    const result = await updateTitleInfo(selectEditTitle.value.title_id, titleInfoForm.value)
    if (result.code) {
      ElMessage.error(result.msg)
    } else {
      ElMessage.success('修改成功')
      selectEditTitle.value.title_name = titleInfoForm.value.name
      selectEditTitle.value.title_description = titleInfoForm.value.description
    }
  } finally {
    editDialog.value = false
  }
}
const editTitleCover = async () => {
  const formdata = new FormData()
  const imageFile = base64ToBlob(showImageUrl.value)
  formdata.append('imageFile', imageFile.blob, `${new Date().getTime()}.${imageFile.fileExtension}`)
  try {
    const result = await updateTitleCover(selectEditTitle.value.title_id, formdata)
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
    titleInfoForm.value = { name: '', description: '', subjectId: 0 }
    showImageUrl.value = ''
    editForm.value = false
  }
})

watch(page, (newPage) => {
  loadingDataIn.value = true
  try {
    let result: Promise<Result<PageInfoView<TitleEntity>>>
    if (searchForm.value.switch) {
      result = searchTitles(newPage, searchForm.value.searchText)
    } else {
      result = getTitlesOrder(newPage, sort.value.field, sort.value.order)
    }
    result.then((res) => {
      pageInfoView.value = res.data
    })
  } catch (error) {
    ElMessage.error('获取用户列表失败')
  } finally {
    loadingDataIn.value = false
  }
})

const updatePageInfoView = async () => {
  loadingDataIn.value = true
  try {
    const result = await getTitlesOrder(page.value, sort.value.field, sort.value.order)
    pageInfoView.value = result.data
  } catch (error) {
    ElMessage.error('获取用户列表失败')
  } finally {
    loadingDataIn.value = false
  }
}

const searchTitle = async () => {
  if (!searchForm.value.switch) {
    ElMessage.warning('请先打开搜索开关')
    return
  }
  if (!searchForm.value.searchText) {
    ElMessage.warning('请输入搜索内容')
    return
  }
  try {
    loadingDataIn.value = true
    page.value = 1
    const result = await searchTitles(page.value, searchForm.value.searchText)
    pageInfoView.value = result.data
  } catch (error) {
    ElMessage.error('获取用户列表失败')
  } finally {
    loadingDataIn.value = false
  }
}

const resetPageInfoView = async () => {
  loadingDataIn.value = true
  searchForm.value.searchText = ''
  searchForm.value.switch = false
  sort.value.field = 'titleId'
  sort.value.order = 'asc'
  page.value = 1
  try {
    const result = await getTitles(page.value)
    pageInfoView.value = result.data
  } catch (error) {
    ElMessage.error('获取用户列表失败')
  } finally {
    loadingDataIn.value = false
  }
}
</script>
<style scoped></style>
