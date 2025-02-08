<template>
  <el-card>
    <template #header>
      <div style="display: flex; justify-content: space-between">
        <el-text type="info" size="large">评论管理</el-text>
        <el-tree-select
          :data="treeData"
          v-model="selectTitle"
          lazy
          :load="treeSelectLoad"
          :props="propTree"
          style="width: 240px"
          :placeholder="'请选择先选择话题'"
          accordion
        ></el-tree-select></div
    ></template>
    <el-table :data="pageInfoView?.list" style="width: 100%" v-loading="loadingDataIn">
      <el-table-column prop="comment_id" label="序号" width="100" :show-overflow-tooltip="true" />
      <el-table-column
        prop="comment_user_id"
        label="用户ID"
        width="100"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="comment_score"
        label="评论评分"
        width="100"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="comment_like"
        label="评论点赞数"
        width="100"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="comment_time"
        label="评论时间"
        width="200"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="comment_content"
        label="评论内容"
        width="300"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="info" text size="small" @click="dataViewDialog(scope.row as RowData)"
            >查看</el-button
          >
          <el-button
            type="danger"
            text
            size="small"
            @click="deleteCommentDialog(scope.row as RowData, scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="900" v-model="dataViewVisible">
      <el-tabs v-model="dataView" class="demo-tabs">
        <el-tab-pane label="评论信息" name="comment"
          ><CommentDescription :commentView="commentData"
        /></el-tab-pane>
        <el-tab-pane label="用户信息" name="user"
          ><UserDescription :userEntity="userData" v-show="dataView"
        /></el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog v-model="deleteCommentVisible" width="800">
      <CommentDescription :commentView="commentData" />
      <el-form :v-model="deletCommentForm">
        <el-form-item label="删除原因:" prop="deleteReason">
          <el-select v-model="deletCommentForm.reasonId" placeholder="请选择删除原因--">
            <el-option
              v-for="item in deleteReasons"
              :key="item.reason_id"
              :label="item.reason_name"
              :value="item.reason_id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="danger" @click="deleteCommentSubmit">删除</el-button>
      <el-button type="default" @click="deleteCommentVisible = false">取消</el-button>
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
import UserDescription from '../Descriptions/UserDescription.vue'
import {
  deleteComment,
  getAllSubjects,
  getCommentDeleteReason,
  getCommentView,
  getCommentsViewByTitleId,
  getTitlesBySubjectId,
  getUserByID
} from '@/apis'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type {
  CommentDeleteReasonEntity,
  CommentEntity,
  CommentView,
  DeleteCommentAdminDto,
  PageInfoView,
  SubjectEntity,
  TitleEntity,
  UserEntity
} from '@/types'
import { onMounted, ref, watch } from 'vue'
import CommentDescription from '../Descriptions/CommentDescription.vue'
import { ElMessage } from 'element-plus'

interface RowData extends CommentEntity {
  tableIndex: number
}
interface Tree {
  label: string
  value: number
  children?: Tree[]
  isLeaf?: boolean
}
const propTree = {
  children: 'children',
  label: 'label',
  value: 'value',
  isLeaf: 'isLeaf'
}

const pageInfoView = ref<PageInfoView<CommentEntity>>({
  pageNum: 0,
  pages: 0,
  pageSize: 0,
  total: 0,
  list: []
})

const page = ref<number>(1)
const treeData = ref<Tree[]>([])
const selectTitle = ref<number>()
const treeSelectLoad = (node: Node, resolve: (data: Tree[]) => void) => {
  if (node.level === 0) {
    return resolve(treeData.value)
  }

  if (node.isLeaf) return resolve([])
  const result = getTitlesBySubjectId(node.data.value)
  result
    .then((res) => {
      resolve(
        res.data.map<Tree>((item: TitleEntity) => {
          return {
            label: item.title_name,
            value: item.title_id,
            isLeaf: true
          }
        })
      )
    })
    .catch(() => {
      resolve([])
    })
}
const loadingDataIn = ref(false)

onMounted(async () => {
  const result = await getAllSubjects()
  treeData.value = result.data.map<Tree>((item: SubjectEntity) => {
    return {
      label: item.subject_name,
      children: [],
      value: item.subject_id,
      isLeaf: false
    }
  })
})

const userData = ref<UserEntity>()
const commentData = ref<CommentView>()

const dataView = ref('comment')

const dataViewVisible = ref(false)
const deleteCommentVisible = ref(false)

const selectedRow = ref<RowData>()

const deleteReasons = ref<CommentDeleteReasonEntity[]>([])

const dataViewDialog = async (row: RowData) => {
  selectedRow.value = row
  dataViewVisible.value = true
  const [commentResult, userResult] = [
    await getCommentView(row.comment_id),
    await getUserByID(row.comment_user_id)
  ]
  commentData.value = commentResult.data
  userData.value = userResult.data
}

const deleteCommentDialog = async (row: RowData, index: number) => {
  selectedRow.value = row
  selectedRow.value.tableIndex = index
  if (deleteReasons.value.length === 0) {
    const result = await getCommentDeleteReason()
    deleteReasons.value = result.data
  }
  deleteCommentVisible.value = true
}

watch(selectTitle, async (newVal) => {
  page.value = 1
  if (newVal) {
    loadingDataIn.value = true
    const result = await getCommentsViewByTitleId(newVal, page.value)
    pageInfoView.value = result.data
    loadingDataIn.value = false
  }
})

watch(page, async (newVal) => {
  if (selectTitle.value) {
    loadingDataIn.value = true
    const result = await getCommentsViewByTitleId(selectTitle.value, newVal)
    pageInfoView.value = result.data
    loadingDataIn.value = false
  }
})

const deletCommentForm = ref({
  reasonId: ''
})

const deleteCommentSubmit = async () => {
  if (selectedRow.value == undefined || deletCommentForm.value.reasonId == undefined) {
    ElMessage.error('请先选择删除原因,和评论')
  }
  const deleteCommentAdminDto: DeleteCommentAdminDto = {
    commentId: selectedRow.value!.comment_id,
    reasonId: parseInt(deletCommentForm.value.reasonId)
  }
  try {
    await deleteComment(deleteCommentAdminDto)
    ElMessage.success('删除成功')
    pageInfoView.value.list.splice(selectedRow.value!.tableIndex, 1)
  } finally {
    deleteCommentVisible.value = false
  }
}
</script>
<style scoped></style>
