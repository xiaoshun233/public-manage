<template>
  <el-descriptions title="删评信息" direction="vertical" :column="5" size="large" border>
    <el-descriptions-item label="删评序号" width="150">{{
      props.commentDeleteView?.deleteId
    }}</el-descriptions-item>
    <el-descriptions-item label="删评时间" width="150">{{
      dayjs(props.commentDeleteView?.deleteTime).format('YYYY-MM-DD HH:mm:ss')
    }}</el-descriptions-item>
    <el-descriptions-item label="删除内容" :span="3">{{
      props.commentDeleteView?.commentContent
    }}</el-descriptions-item>
    <el-descriptions-item label="原因ID" width="150">{{
      props.commentDeleteView?.reasonId
    }}</el-descriptions-item>
    <el-descriptions-item label="原因名称" width="150">{{
      props.commentDeleteView?.reasonName
    }}</el-descriptions-item>
    <el-descriptions-item label="原因类型" :span="3">{{
      props.commentDeleteView?.reasonType
    }}</el-descriptions-item>
    <el-descriptions-item label="用户ID">{{
      props.commentDeleteView?.userId
    }}</el-descriptions-item>
    <el-descriptions-item label="用户名">{{
      props.commentDeleteView?.userName
    }}</el-descriptions-item>
    <el-descriptions-item label="用户昵称">{{
      props.commentDeleteView?.userNickname
    }}</el-descriptions-item>
    <el-descriptions-item label="管理员ID">{{
      props.commentDeleteView?.adminId
    }}</el-descriptions-item>
    <el-descriptions-item label="管理员名称">{{
      props.commentDeleteView?.adminName
    }}</el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import type { CommentDeleteView } from '@/types'
import dayjs from 'dayjs'
const props = defineProps<{
  commentDeleteView?: CommentDeleteView
}>()
</script>
