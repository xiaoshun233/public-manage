<template>
  <div class="cropper-component">
    <el-upload
      ref="showImage"
      list-type="picture-card"
      :auto-upload="false"
      :limit="1"
      :on-exceed="handleExceed"
      :on-change="startCropperImage"
      :file-list="fileList"
      ><el-icon><Plus /></el-icon>
      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        </div>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="picturePreview = true">
            <el-icon><zoom-in /></el-icon>
          </span>
          <span class="el-upload-list__item-delete" @click="cancelCropperImage">
            <el-icon><Delete /></el-icon>
          </span>
        </span> </template
    ></el-upload>
    <el-dialog v-model="picturePreview">
      <img w-full :src="imageBase64" alt="预览图片" />
    </el-dialog>
    <el-dialog
      width="500px"
      v-model="cropperDialog"
      style=""
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      ><VueCropper
        ref="cropper"
        :outputType="'jpeg'"
        :centerBox="true"
        :canScale="false"
        :autoCrop="true"
        :fixed="true"
        :fixedNumber="[1, 1]"
        mode="cover"
        :img="imageBase64"
        style="height: 500px; margin: 0 auto 30px; background-image: none; border: 2px solid #ccc"
      />
      <div style="display: flex; justify-content: space-evenly">
        <el-button type="primary" text @click="comfirmCropperImage">确认</el-button>
        <el-button type="primary" text @click="rotateCropperImage">旋转</el-button>
        <el-button type="primary" text @click="cancelCropperImage">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { genFileId } from 'element-plus'
import type {
  UploadFile,
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile
} from 'element-plus'
import { ref } from 'vue'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'

const imageBase64 = ref('')

const emit = defineEmits(['update:modelValue'])

const cropperDialog = ref(false)

const picturePreview = ref(false)

const showImage = ref<UploadInstance>()

const cropper = ref<InstanceType<typeof VueCropper>>()

const fileList = ref<UploadUserFile[]>([])
const handleExceed: UploadProps['onExceed'] = (files) => {
  showImage.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  showImage.value!.handleStart(file)
}

const startCropperImage = (file: UploadFile) => {
  if (file.raw) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageBase64.value = e.target!.result as string
    }
    reader.readAsDataURL(file.raw)
    cropperDialog.value = true
  }
}
const rotateCropperImage = () => {
  cropper.value.rotateRight()
}

const comfirmCropperImage = () => {
  cropper.value.getCropData((data: string) => {
    imageBase64.value = data
    const file: UploadUserFile = {
      name: 'image',
      status: 'success',
      url: data,
      uid: genFileId()
    }
    fileList.value = [file]
    cropperDialog.value = false
    emit('update:modelValue', imageBase64.value as string)
  })
}

const cancelCropperImage = () => {
  imageBase64.value = ''
  showImage.value!.clearFiles()
  cropperDialog.value = false
}
</script>
