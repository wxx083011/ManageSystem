<template>
  <el-dialog title="" :visible.sync="dialogVisible" :close-on-click-modal='false' :before-close="handleCloseBindWarnStandard" width="500px" center>
    <el-form :model="dialogForm" :rules="rules" ref="ruleForm" label-width="100px" class="dialog-wrap scroll_content">
      <el-form-item label="车主名字" prop="name">
        <el-input v-model="dialogForm.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="name">
        <el-input v-model="dialogForm.name"></el-input>
      </el-form-item>
      <el-form-item label="车牌号" prop="name">
        <el-input v-model="dialogForm.name"></el-input>
      </el-form-item>
      <el-form-item label="设备号" prop="name">
        <el-input v-model="dialogForm.name"></el-input>
      </el-form-item>
      <el-form-item label="车系" prop="name">
        <el-input v-model="dialogForm.name"></el-input>
      </el-form-item>
      <el-form-item label="车型" prop="name">
        <el-input v-model="dialogForm.name"></el-input>
      </el-form-item>
      <el-form-item label="燃油种类" prop="region">
        <el-select v-model="dialogForm.region" placeholder="请选择活动区域">
          <el-option label="汽油" value="shanghai"></el-option>
          <el-option label="柴油" value="beijing"></el-option>
          <el-option label="天然气" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排放标准" prop="name">
        <el-input v-model="dialogForm.name"></el-input>
      </el-form-item>
      <el-form-item label="VIN" prop="name">
        <el-input v-model="dialogForm.name"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="name">
        <el-input v-model="dialogForm.name"></el-input>
      </el-form-item>
      <el-form-item label="绑定SIM号" prop="name">
        <el-input v-model="dialogForm.name"></el-input>
      </el-form-item>
      <el-form-item label="车辆类型" prop="name">
        <el-input v-model="dialogForm.name"></el-input>
      </el-form-item>
      <el-form-item label="发动机型号" prop="name">
        <el-input v-model="dialogForm.name"></el-input>
      </el-form-item>
      <el-form-item label="所属机构" prop="name">
        <el-input v-model="dialogForm.name"></el-input>
      </el-form-item>
      <el-form-item label="车主名字" prop="name">
        <el-input v-model="dialogForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="dialogForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="dialogForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker placeholder="选择时间" v-model="dialogForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean
    },
    dialogForm: {
      type: Object
    }
  },
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
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
        ]
      }
    }
  },
  created () {
    console.log(this.dialogForm)
  },
  computed: {
  },
  methods: {
    // 提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.$emit('submitForm', this.dialogForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 关闭弹窗
    handleCancel () {
      this.$emit('getCancel')
    },
    // 关闭弹窗，不可以删这个方法。不用这个方法点击遮罩层关闭会报错
    handleCloseBindWarnStandard () {
      this.$emit('closeBindWarnStandard')
    }
  }
}
</script>
<style lang="scss"  scoped>
</style>
