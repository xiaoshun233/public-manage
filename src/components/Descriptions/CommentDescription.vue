<template>
  <el-descriptions title="评论信息" direction="vertical" :column="5" size="large" border>
    <el-descriptions-item label="评论序号" width="150">{{
      props.commentView?.commentId
    }}</el-descriptions-item>
    <el-descriptions-item label="所在话题名称" width="150">{{
      props.commentView?.titleName
    }}</el-descriptions-item>
    <el-descriptions-item label="评论内容" :span="3">{{
      props.commentView?.content
    }}</el-descriptions-item>
    <el-descriptions-item label="用户ID">{{ props.commentView?.userId }}</el-descriptions-item>
    <el-descriptions-item label="用户昵称">{{
      props.commentView?.userNickname
    }}</el-descriptions-item>
    <el-descriptions-item label="用户头像" width="100"
      ><el-avatar :src="`${IMG_PREFIX}${props.commentView?.userHeadshot}`" :icon="UserFilled"
    /></el-descriptions-item>
    <el-descriptions-item label="评论时间">{{
      dayjs(props.commentView?.commentTime).format('YYYY-MM-DD HH:mm:ss')
    }}</el-descriptions-item>
    <el-descriptions-item label="评论评分">{{ props.commentView?.score }}</el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { IMG_PREFIX } from '@/config'
import type { CommentView } from '@/types'
import { UserFilled } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
const props = defineProps<{
  commentView?: CommentView
}>()
</script>
