<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="机构名称" prop="orgName">
        <el-input v-model="ruleForm.orgName "></el-input>
      </el-form-item>
      <el-form-item label="机构联系人" prop="linkMan">
        <el-input v-model="ruleForm.linkMan "></el-input>
      </el-form-item>
      <el-form-item label="联系人号码" prop="tel">
        <el-input v-model="ruleForm.tel "></el-input>
      </el-form-item>
      <el-form-item label="所属行政区">
        <el-cascader size="large" :options="options" v-model="ruleForm.selectedOptions" @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="机构地址" prop="orgAddress">
        <el-input v-model="ruleForm.orgAddress "></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"  :loading="loading">立即创建</el-button>
        <el-button @click="ruleForm.orgName='',ruleForm.linkMan='',ruleForm.tel='',selectedOptions=[],ruleForm.regionName='',ruleForm.orgAddress='',$emit('close')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { regionData, CodeToText } from "element-china-area-data";
export default {
  data () {
    return {
      loading:false,
      options: regionData,
      ruleForm: {
        selectedOptions: [],
        orgName : '',//机构名称
        orgAddress  : '',//机构地址
        linkMan : '',//联系人
        tel  : '',//联系电话
        regionName: '',//行政区地址
      },
      rules: {
        orgName : [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
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
    handleChange() {
      var loc = "";
      for (let i = 0; i < this.ruleForm.selectedOptions.length; i++) {
        loc += CodeToText[this.ruleForm.selectedOptions[i]];
      }
     this.ruleForm.regionName = loc
      console.log( this.ruleForm.regionName)
    },
    submitForm(){
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true
          setTimeout(()=>{
            this.$emit('submit',false)
            this.loading = false
          },1000)
        }
      })


    }
  },
}
</script>

<style  >
</style>
