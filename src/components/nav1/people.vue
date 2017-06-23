<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model.trim="formInline.user" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      v-loading="listLoading"
      style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="新增人员"
      :visible.sync="addPeopleDia"
      size="tiny">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="日期" required prop="date">
          <el-date-picker

            v-model="addForm.date"
            placeholder="选择日期"
            style="width:100%">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddForm">取消</el-button>
        <el-button type="primary" @click="_addData" :loading="addLoading">提交</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑人员"
      :visible.sync="editPeopleDia"
      size="tiny">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="日期" required prop="date">
          <el-date-picker
            v-model="editForm.date"
            placeholder="选择日期"
            style="width:100%">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditForm">取消</el-button>
        <el-button type="primary" @click="_editData" :loading="editLoading">提交</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
  import {peopleList, addPeople, editPeople, deletePeople} from '@/api/people'
  import moment from 'moment'
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        tableData: [],
        sourceData: [],
        listLoading: false,
        addPeopleDia: false,
        addForm: {
          name: '',
          date: '',
          address: ''
        },
        addLoading: false,
        addFormRules: {
          name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          date: [{
            type: 'date', // 参数必须，否侧验证不通过
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          address: [{
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }]
        },
        editPeopleDia: false,
        editForm: {
          name: '',
          date: '',
          address: ''
        },
        editLoading: false,
        editFormRules: {
          name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          date: [{
            type: 'date', // 参数必须，否侧验证不通过
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          address: [{
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }]
        },
        rowIndex: -1
      }
    },
    created() {
      this._getData()
    },
    methods: {
      onSubmit() {
        if (this.formInline.user == null || this.formInline.user === '') {
          this.tableData = this.sourceData
        } else {
          this.tableData = this.tableData.filter((v) => {
            return v.name === this.formInline.user
          })
        }
      },
      _getData() {
        this.listLoading = true
        peopleList({}).then((res) => {
          this.listLoading = false
          this.sourceData = res.content
          this.tableData = res.content
          console.log(this.tableData)
        })
      },
      handleAdd() {
        this.addPeopleDia = true
      },
      _addData() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true
              let param = Object.assign({}, this.addForm)
              param.date = moment(param.date).format('YYYY-MM-DD')
              addPeople(param).then((res) => {
                if (res.success) {
                  this.addLoading = false
                  this.$message({
                    message: res.content.msg,
                    type: 'success'
                  })
                  this.$refs.addForm.resetFields()
                  this.addPeopleDia = false
                  this._getData()
                }
              })
            })
          }
        })
      },
      closeAddForm() {
        this.addPeopleDia = false
        this.addForm = {
          name: '',
          date: '',
          address: ''
        }
        this.$refs.addForm.resetFields()
      },
      handleEdit(index, row) {
        this.rowIndex = index
        this.editPeopleDia = true
        this.editForm = Object.assign({}, row)
        this.editForm.date = new Date(this.editForm.date)
      },
      closeEditForm() {
        this.editPeopleDia = false
      },
      _editData() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true
              let row = Object.assign({}, this.editForm)
              row.date = moment(row.date).format('YYYY-MM-DD')
              let param = {index: this.rowIndex, row}
              editPeople(param).then((res) => {
                if (res.success) {
                  this.editLoading = false
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  })
                  this.$refs.editForm.resetFields()
                  this.editPeopleDia = false
                  this._getData()
                }
              })
            })
          }
        })
      },
      handleDelete(index, row) {
        let param = {index}
        this.$confirm('确认删除吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          deletePeople(param).then((res) => {
            if (res.success) {
              this.countDelete()
              this.listLoading = false
              this.$message({
                message: '删除成功！',
                type: 'success'
              })
              this._getData()
            }
          })
        }).catch(() => {
          console.log(2)
        })
      },
      ...mapActions([
        'countDelete'
      ])
    }
  }
</script>
<style scoped lang="stylus" ref="stylesheet/stylus"></style>
