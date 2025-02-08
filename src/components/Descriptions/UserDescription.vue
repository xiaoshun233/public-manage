<template>
  <el-descriptions title="用户信息" direction="vertical" :column="4" size="large" border>
    <el-descriptions-item label="用户ID" width="200">{{
      props.userEntity?.user_id
    }}</el-descriptions-item>
    <el-descriptions-item label="用户名" width="200">{{
      props.userEntity?.user_username
    }}</el-descriptions-item>
    <el-descriptions-item label="昵称" :span="2" width="300">{{
      props.userEntity?.user_nickname
    }}</el-descriptions-item>
    <el-descriptions-item label="电子邮箱">{{ props.userEntity?.user_email }}</el-descriptions-item>
    <el-descriptions-item label="用户头像" width="100" :icon="UserFilled"
      ><el-avatar :src="`${IMG_PREFIX}${props.userEntity?.user_headshot}`"
    /></el-descriptions-item>
    <el-descriptions-item label="密码" :span="2">{{
      props.userEntity?.user_password
    }}</el-descriptions-item>
    <el-descriptions-item label="注册时间" :span="2">{{
      dayjs(props.userEntity?.user_regtime).format('YYYY-MM-DD')
    }}</el-descriptions-item>
    <el-descriptions-item label="最后登陆时间" :span="2">{{
      dayjs(props.userEntity?.user_lastlogintime).format('YYYY-MM-DD HH:mm:ss')
    }}</el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { IMG_PREFIX } from '@/config'
import type { UserEntity } from '@/types'
import { UserFilled } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
const props = defineProps<{
  userEntity?: UserEntity
}>()
</script>
