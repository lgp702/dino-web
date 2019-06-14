<template>
  <el-form :model="userInfo" :rules="rules" ref="signin" label-width="100px" class="demo-ruleForm" :hide-required-asterisk=true label-position="left">
    <img src="@/assets/dino.png" style="width: 474px;" />
    <el-form-item label="用户名" prop="name">
      <el-input v-model="userInfo.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="userInfo.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm()">登录</el-button>
    <el-button @click="resetForm()">重置</el-button>
    <el-button @click="signup()">注册</el-button>
  </el-form>
</template>

<script>
import { login } from '@/views/apis/posts'

export default {
  data() {
    return {
      userInfo: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    localStorage.clear()
  },
  methods: {
    submitForm() {
      const self = this
      this.$refs['signin'].validate((valid) => {
        if (valid) {

          // test only
          // self.$router.push({
          //   name: 'form02',
          //   query: { ...self.$route.query }
          // })

          login(self.userInfo, self)
            .then((res) => {
              if (res && res.code === "000000") {
                // save user name
                localStorage.username = self.userInfo.name
                self.$router.push({
                  name: 'form02',
                  query: { ...self.$route.query }
                })
              } else {
                self.$confirm(res.error.exception + '<br />是否跳转到注册页面?', '提示', {
                  dangerouslyUseHTMLString: true,
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  // type: 'warning'
                }).then(() => {
                  self.$router.push({
                    name: 'form01b',
                    query: { ...self.$route.query }
                  })
                })
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
    resetForm() {
      this.$refs['signin'].resetFields();
    },
    signup() {
      this.$router.push({
        name: 'form01b',
        query: { ...this.$route.query }
      })
    }
  }
}
</script>
