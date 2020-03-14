<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="机构名称" prop="name">
        <el-input v-model="ruleForm.orgName "></el-input>
      </el-form-item>
      <el-form-item label="机构联系人" prop="region">
        <el-input v-model="ruleForm.linkMan "></el-input>
      </el-form-item>
      <el-form-item label="联系人号码" prop="region">
        <el-input v-model="ruleForm.tel "></el-input>
      </el-form-item>
      <el-form-item label="所属行政区" prop="region">
        <area-cascader v-model="ruleForm.regionName" :data="$pcaa"></area-cascader>
      </el-form-item>
      <el-form-item label="机构地址" prop="region">
        <el-input v-model="ruleForm.orgAddress "></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"  :loading="loading">立即创建</el-button>
        <el-button @click="ruleForm.name='',ruleForm.region='',ruleForm.name='',$emit('close')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading:false,
      ruleForm: {
        orgName : '',//机构名称
        orgAddress  : '',//机构地址
        linkMan : '',//联系人
        tel  : '',//联系电话
        regionName: '',//行政区地址
      },
      rules: {
        orgName : [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        regionName: [
          { required: true, message: '请选择所属行政区', trigger: 'change' }
        ],
        linkMan : [
          { required: true, message: '请填写联系人', trigger: 'blur' }
        ],
        tel  : [
          { required: true, message: '请填写电话', trigger: 'blur' }
        ],
        orgAddress : [
          { required: true, message: '请填写机构地址', trigger: 'blur' }
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
  },
}
</script>

<style  >
</style>
