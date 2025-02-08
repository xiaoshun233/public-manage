<template>
  <el-card>
    <template #header><el-text type="info" size="large">封禁用户管理</el-text></template>
    <el-table :data="pageInfoView.list" style="width: 100%" v-loading="loadingDataIn">
      <el-table-column prop="banId" label="序号" width="100" :show-overflow-tooltip="true" />
      <el-table-column
        prop="userView.username"
        label="封禁用户"
        width="150"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="userView.nickname"
        label="用户昵称"
        width="150"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="userView.email"
        label="用户邮箱"
        width="180"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="banReason"
        label="封禁原因"
        width="200"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="banStartTime"
        label="封禁时间"
        width="150"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="banExpireTime"
        label="解封时间"
        width="150"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="id">
        <template #default="scope">
          <el-button
            type="danger"
            text
            size="small"
            @click="upSubmitCheck(scope.row as RowData, scope.$index)"
            >解封</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="user-Pagination"
      :page-count="pageInfoView.pages"
      layout=" prev, pager, next"
      :pager-count="5"
      v-model:current-page="page"
    />
    <el-dialog v-model="submitCheck" width="800">
      <el-descriptions title="用户信息">
        <el-descriptions-item label="序号">{{ selectedUserRow.userView.id }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{
          selectedUserRow.userView.username
        }}</el-descriptions-item>
        <el-descriptions-item label="电子邮箱">{{
          selectedUserRow.userView.email
        }}</el-descriptions-item>
      </el-descriptions>
      <el-button type="primary" @click="submitUnbanUser">解封</el-button>
      <el-button type="default" @click="submitCheck = false">取消</el-button>
    </el-dialog>
  </el-card>
</template>
<script lang="ts" setup>
import { getBanUserList, unbanUser } from '@/apis/userApi'
import type { BanUserView, PageInfoView } from '@/types'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'

const pageInfoView = ref<PageInfoView<BanUserView>>({
  pageNum: 0,
  pages: 0,
  pageSize: 0,
  total: 0,
  list: []
})
const loadingDataIn = ref<boolean>(true)
const submitCheck = ref<boolean>(false)
const selectedUserRow = ref<RowData>({
  banId: 0,
  banReason: '',
  banStartTime: new Date(),
  banExpireTime: new Date(),
  userView: {
    id: 0,
    username: '',
    email: '',
    nickname: '',
    headshot: '',
    regtime: new Date(),
    lastlogintime: new Date(),
    state: 0
  },
  tableIndex: 0
})
interface RowData extends BanUserView {
  tableIndex: number
}

const page = ref<number>(1)
onMounted(async () => {
  try {
    const result = await getBanUserList(page.value)
    pageInfoView.value = result.data

  } finally {
    loadingDataIn.value = false
  }
})

const upSubmitCheck = (row: RowData, index: number) => {
  submitCheck.value = true
  selectedUserRow.value = row
  selectedUserRow.value.tableIndex = index
}

const submitUnbanUser = async () => {
  try {
    const result = await unbanUser(selectedUserRow.value.userView.id)
    if (result.code) {
      ElMessage.error(result.msg)
    } else {
      ElMessage.success('封禁成功')
      pageInfoView.value.list.splice(selectedUserRow.value.tableIndex, 1)
    }
  } finally {
    submitCheck.value = false
  }
}
</script>
<style scoped></style>
