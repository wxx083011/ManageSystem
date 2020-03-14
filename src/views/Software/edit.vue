<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="产品信号" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="品牌分类" prop="region">
        <el-input v-model="ruleForm.region"></el-input>
      </el-form-item>
      <el-form-item label="车型" prop="region">
        <el-input v-model="ruleForm.region"></el-input>
      </el-form-item>
      <el-form-item label="软件名称" prop="region">
        <el-input v-model="ruleForm.region"></el-input>
      </el-form-item>
      <el-form-item label="更新明细" prop="region">
        <el-input type="textarea" :rows="5" v-model="ruleForm.region"></el-input>
      </el-form-item>
      <el-form-item label="软件地址" prop="region">
        <el-input v-model="ruleForm.region"></el-input>
      </el-form-item>
      <el-form-item label="发布类型" prop="region">
        <el-input v-model="ruleForm.region"></el-input>
      </el-form-item>
      <el-form-item label="发布白名单" prop="region">
        <el-input type="textarea" :rows="5" v-model="ruleForm.region"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">提交</el-button>
        <el-button @click="$emit('close')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading:false,
      roles:[
        {'value':1,'label':'管理员'},
        {'value':2,'label':'客服'}
      ],
      orgs:[
        {'value':1,'label':'机构1'},
        {'value':2,'label':'机构2'}
      ],
      ruleForm: {
        orgr:1,
        roler:2,
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
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
    }
  },
  methods:{
    submitForm(){
      this.loading = true


      setTimeout(()=>{
        this.$emit('submit',false)
        this.loading = false

      },1000)
    }
  }
}
</script>

<style  >
</style>
