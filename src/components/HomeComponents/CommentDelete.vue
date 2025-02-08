<template>
  <el-card>
    <template #header>
      <el-text type="info" size="large">删除评论列表</el-text>
    </template>
    <el-table :data="pageInfoView?.list" style="width: 100%" v-loading="loadingDataIn">
      <el-table-column prop="deleteId" label="删评序号" width="80" :show-overflow-tooltip="true" />
      <el-table-column
        prop="commentContent"
        label="删除内容"
        width="250"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="reasonName"
        label="原因名称"
        width="100"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="reasonType"
        label="原因类型"
        width="150"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="titleName"
        label="所在话题"
        width="120"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="userName" label="用户名" width="120" :show-overflow-tooltip="true" />
      <el-table-column
        prop="userNickname"
        label="用户昵称"
        width="120"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="adminName" label="管理员" width="120" :show-overflow-tooltip="true" />
      <el-table-column
        prop="deleteTime"
        label="删除时间"
        width="100"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="info"
            text
            size="small"
            @click="dataViewDialog(scope.row as CommentDeleteView)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="900" v-model="dataViewVisible">
      <CommentDeleteDescription :commentDeleteView="selectedRow" />
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
import CommentDeleteDescription from '../Descriptions/CommentDeleteDescription.vue'
import { getCommentDeleteViewList } from '@/apis'
import type { CommentDeleteView, PageInfoView } from '@/types'
import { onMounted, ref } from 'vue'

const pageInfoView = ref<PageInfoView<CommentDeleteView>>({
  list: [],
  total: 0,
  pageNum: 1,
  pageSize: 0,
  pages: 0
})
const loadingDataIn = ref<boolean>(true)

const page = ref<number>(1)

const dataViewVisible = ref<boolean>(false)

const selectedRow = ref<CommentDeleteView>()

onMounted(async () => {
  try {
    const result = await getCommentDeleteViewList(page.value)
    pageInfoView.value = result.data
  } finally {
    loadingDataIn.value = false
  }
})

const dataViewDialog = (row: CommentDeleteView) => {
  selectedRow.value = row
  dataViewVisible.value = true
}
</script>
<style scoped></style>
