<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical"
    text-color="#fff"
    :router="true"
    :unique-opened="true"
    :default-active="activeIndex"
  >
    <h5 class="home-logo">后台管理系统</h5>
    <el-sub-menu index="/home/user">
      <template #title><span>用户管理</span></template>
      <el-menu-item index="/home/user/list">用户列表</el-menu-item>
      <el-menu-item index="/home/user/banlist">封禁列表</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/home/subject">
      <template #title><span>主题管理</span></template>
      <el-menu-item index="/home/subject/list">主题列表</el-menu-item>
      <el-menu-item index="/home/subject/add">添加主题</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/home/title">
      <template #title><span>话题管理</span></template>
      <el-menu-item index="/home/title/list">话题列表</el-menu-item>
      <el-menu-item index="/home/title/add">添加话题</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/home/comment">
      <template #title><span>评论管理</span></template>
      <el-menu-item index="/home/comment/list">评论列表</el-menu-item>
      <el-menu-item index="/home/comment/delete">删除列表</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="/home/info">
      <template #title><span>个人中心</span></template>
      <el-menu-item index="/home/info/updatePassword">修改密码</el-menu-item>
      <el-menu-item index="/home/info/verificationCode">获取注册邀请码</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/home">
      <template #title><span>系统设置</span></template>
      <el-menu-item>暂未开发</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const activeIndex = ref('/home/user')
onMounted(() => {
  activeIndex.value = useRoute().path
})
</script>
<style scoped>
.home-logo {
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  padding: 20px;
}
.el-menu-vertical {
  border: none;
}
</style>
