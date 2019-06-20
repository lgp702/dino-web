<template>
    <el-form>
        <el-form-item label="请选择您要上传的文件（支持多文件，最多不超过5个）："></el-form-item>
        <el-upload
            class="upload-demo"
            action="https://xxx.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            fileList: []
        };
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    }
}
</script>