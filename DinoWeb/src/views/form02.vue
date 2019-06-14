<template>
  <div class="demo-block demo-zh-CN demo-form">
    <div class="source">
      <div>
        <el-form :model="mainForm" :rules="rules" ref="mainForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="mainForm.name" style="width: 100%;"></el-input>
          </el-form-item>
          <!-- <el-form-item label="活动区域" prop="region">
            <el-select v-model="mainForm.region" placeholder="请选择活动区域" style="width: 100%;">
              <el-option label="北京" value="beijing"></el-option>
              <el-option label="上海" value="shanghai"></el-option>
              <el-option label="广州" value="guangzhou"></el-option>
              <el-option label="深圳" value="shenzhen"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="mainForm.date1" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker placeholder="选择时间" v-model="mainForm.date2" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="活动开始" prop="delivery">
            <el-switch v-model="mainForm.delivery" style="width: 100%;"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="mainForm.type" style="width: 100%;">
              <el-checkbox label="线上活动" name="type"></el-checkbox>
              <el-checkbox label="线下活动" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="mainForm.resource" style="width: 100%;">
              <el-radio :label="'1'">线上赞助</el-radio>
              <el-radio :label="'2'">线下赞助</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="mainForm.desc" style="width: 100%;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('mainForm')">立即创建</el-button>
            <el-button @click="resetForm('mainForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { formSubmit } from '@/views/apis/posts'

export default {
  data() {
    return {
      mainForm: {
        name: '',
        // region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // region: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' }
        // ],
        date1: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    if (this.IsNullOrEmpty(localStorage.username)) {
      this.$router.push({
        name: 'form01',
        query: { ...this.$route.query }
      })
    }
  },
  methods: {
    submitForm(formName) {
      const self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {

          // // test only
          // self.$router.push({
          //   name: 'form03',
          //   query: { ...self.$route.query }
          // })


          let obj = self.deepCopy(self.mainForm)
          obj.type = JSON.stringify(self.mainForm.type)
          obj.username = localStorage.username || ''

          formSubmit(obj, self)
            .then((res) => {
              if (res && res.code === '000000') {
                self.$router.push({
                  name: 'form03',
                  query: { ...self.$route.query }
                })
              } else {
                self.$alert(res.error.exception || 'error', 'Warning', {
                  confirmButtonText: '确定',
                  callback: action => {
                    self.$message({
                      type: 'info',
                      message: `action: ${action}`
                    });
                  }
                });
              }
            }).catch((error) => {
              console.log(error.message)
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
