<template>
  <el-card>
    <template #header><el-text type="info" size="large">用户管理</el-text></template>
    <el-table :data="pageInfoView.list" style="width: 100%" v-loading="loadingDataIn">
      <el-table-column prop="id" label="用户ID" width="100" :show-overflow-tooltip="true" />
      <el-table-column prop="username" label="用户名" width="200" :show-overflow-tooltip="true" />
      <el-table-column prop="nickname" label="昵称" width="200" :show-overflow-tooltip="true" />
      <el-table-column prop="email" label="电子邮箱" width="240" :show-overflow-tooltip="true" />
      <el-table-column prop="regtime" label="注册时间" width="180" :show-overflow-tooltip="true" />
      <el-table-column
        prop="lastlogintime"
        label="最后登录时间"
        width="180"
        :formatter="
          (row: RowData) => {
            if (!row.lastlogintime) return '未登录过'
            return dayjs(row.lastlogintime).format('YYYY-MM-DD HH:mm:ss')
          }
        "
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="id">
        <template #default="scope">
          <el-button type="info" text size="small" @click="viewUser(scope.row as RowData)"
            >查看</el-button
          >
          <el-button
            type="danger"
            text
            size="small"
            @click="banUser(scope.row as RowData, scope.$index)"
            :disabled="(scope.row as RowData).state !== 0"
            >封禁</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="900" v-model="dataViewVisible">
      <UserPagination :userEntity="selectedUserEntity" />
    </el-dialog>
    <BanUserForm
      v-model:banUserFormVisible="banUserFormVisible"
      :banUserView="selectedRow"
      @submitSuccess="pageInfoView.list[selectedRow.tableIndex].state = 1"
    />
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
import UserPagination from '@/components/Descriptions/UserDescription.vue'
import BanUserForm from '../form/BanUserForm.vue'
import { getUserByID, getUserList } from '@/apis/userApi'
import type { PageInfoView, UserEntity, UserView } from '@/types'
import dayjs from 'dayjs'
import { onMounted, ref, watch } from 'vue'
const pageInfoView = ref<PageInfoView<UserView>>({
  pageNum: 0,
  pages: 0,
  pageSize: 0,
  total: 0,
  list: []
})
const page = ref<number>(1)
const banUserFormVisible = ref<boolean>(false)
const loadingDataIn = ref<boolean>(true)
const dataViewVisible = ref<boolean>(false)
const selectedRow = ref<RowData>({
  id: 0,
  username: '',
  email: '',
  nickname: '',
  headshot: '',
  regtime: new Date(),
  lastlogintime: new Date(),
  state: 0,
  tableIndex: 0
})

const selectedUserEntity = ref<UserEntity>()

interface RowData extends UserView {
  tableIndex: number
}

const getUserListData = async (page: number) => {
  loadingDataIn.value = true
  const result = await getUserList(page)
  pageInfoView.value = result.data
  loadingDataIn.value = false
}
onMounted(async () => {
  await getUserListData(page.value)
})

watch(page, async (newPage) => {
  await getUserListData(newPage)
})

const selectUser = async (rowData: RowData, index: number) => {
  selectedRow.value = rowData
  selectedRow.value.tableIndex = index
}

const banUser = async (rowData: RowData, index: number) => {
  selectUser(rowData, index)
  banUserFormVisible.value = true
}

const viewUser = async (rowData: RowData) => {
  selectedUserEntity.value = (await getUserByID(rowData.id)).data
  dataViewVisible.value = true
}
</script>
<style scoped>
.user-Pagination {
  margin-top: 20px;
}
</style>
