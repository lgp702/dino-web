<template>
  <div class="demo-block demo-zh-CN demo-form">
    <div class="source">
      <div>
        <el-form :model="mainForm" ref="mainForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="活动名称" prop="name">
            <span>{{mainForm.name}}</span>
          </el-form-item>
          <!-- <el-form-item label="活动区域" prop="region">
            <span>{{getRegion}}</span>
          </el-form-item> -->
          <el-form-item label="活动时间" required>
            <span>{{getActivityDate}}</span>
          </el-form-item>
          <el-form-item label="活动开始" prop="delivery">
            <span>{{getActivityIsStart}}</span>
          </el-form-item>
          <el-form-item label="活动性质" prop="eventType">
            <span>{{getType}}</span>
          </el-form-item>
          <el-form-item label="特殊资源" prop="resource">
            <span>{{getResource}}</span>
          </el-form-item>
          <el-form-item label="活动形式" prop="description">
            <span>{{mainForm.description}}</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">完成并回到首页</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { formLoadData } from '@/views/apis/gets'

export default {
  data() {
    return {
      mainForm: {
        name: '',
        // region: '',
        date1: '',
        date2: '',
        delivery: '',
        eventType: [],
        resource: '',
        description: ''
      }
    };
  },
  created() {
    const self = this
    if (this.IsNullOrEmpty(localStorage.username)) {
      this.$router.push({
        name: 'form01',
        query: { ...this.$route.query }
      })
    } else {
      formLoadData(localStorage.username).then((res) => {
        if (res && res.code === '000000' && res.data.length > 0) {
          self.mainForm = res.data[0]
        } else {
          self.$alert('找不到记录，请先填单', 'Warning', {
            confirmButtonText: '确定',
            callback: action => {
              self.$router.push({
                name: 'form02',
                query: { ...self.$route.query }
              })
            }
          })
        }
      })
    }
  },
  computed: {
    // getRegion() {
    //   let result = ''
    //   switch (this.mainForm.region) {
    //     case 'beijing':
    //       result = '北京'
    //       break
    //     case 'shanghai':
    //       result = '上海'
    //       break
    //     case 'guangzhou':
    //       result = '广州'
    //       break
    //     case 'shenzhen':
    //       result = '深圳'
    //       break
    //   }
    //   return result
    // },
    getActivityDate() {
      let result = this.DateFormat(new Date(this.mainForm.date1), "yyyy-MM-dd")
      result += ' - '
      result += this.DateFormat(new Date(this.mainForm.date2), "hh:mm:ss")
      return result
    },
    getActivityIsStart() {
      let result = ''
      if (!this.IsNullOrEmpty(this.mainForm.delivery)) {
        if (this.mainForm.delivery.data[0] === 1) {
          result = '是'
        } else {
          result = '否'
        }
      }
      return result
    },
    getType() {
      let result = ''
      let type = ''
      if (!this.IsNullOrEmpty(this.mainForm.eventType)) {
        type = JSON.parse(this.mainForm.eventType)

        result += type[0]

        if (!this.IsNullOrEmpty(type[1])) {
          result += ',' + type[1]
        }
      }
      return result
    },
    getResource() {
      let result = ''
      if (this.mainForm.resource === '1') {
        result = '线上赞助'
      } else {
        result = '线下赞助'
      }
      return result
    }
  },
  methods: {
    submitForm() {
      localStorage.clear()
      this.$router.push({
        name: 'form01',
        query: { ...this.$route.query }
      })
    }
  }
}
</script>
