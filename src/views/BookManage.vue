<template>
    <div>
        <el-input
                placeholder="可以输入书名或作者"
                prefix-icon="el-icon-search"
                v-model="searchContent"
                style="width: 20%">
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button type="primary" icon="el-icon-back" @click="returnHome">返回</el-button>
        <br>
        <el-table :data="tableData">
            <el-table-column prop="id" label="编号" width="140">
            </el-table-column>
            <el-table-column prop="name" label="书名" width="120">
            </el-table-column>
            <el-table-column prop="author" label="作者" width="140">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="edit(scope.row)">修改</el-button>
                    <el-button type="primary" size="mini" @click="deleteById(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
                @current-change="change">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        methods:{
            returnHome(){
                const _this = this;
              /*  _this.$router.push({
                    path: '/'
                })*/
                window.location.reload();
            },
            search(){
                var _this = this;
                // alert(_this.searchContent)
                if(_this.searchContent.length==0||_this.searchContent===''){
                    _this.$message.warning("请输入查询内容")
                }else{
                    axios.get("http://localhost:8082/books/search?keyword="+_this.searchContent).then(function (resp) {
                        console.log(resp)
                        _this.tableData = resp.data;
                        _this.total = resp.data.length;
                    })
                }
            },
            change(currentPage){
                // console.log(currentPage)
                var _this = this;
                axios.get("http://localhost:8082/books/findAll/"+(currentPage-1)+"/6").then(function (resp) {
                    console.log(resp)
                    _this.tableData = resp.data.content;
                    _this.total  = resp.data.totalElements;
                })
            },
            edit(row){
                this.$router.push({
                    path: '/update',
                    query:{
                        id: row.id
                    }
                })
            },
            deleteById(row){
                const _this = this;
                _this.$confirm('确认删除吗, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete("http://localhost:8082/books/delete/"+row.id).then(function (resp) {
                        _this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        clearTimeout(_this.timer);
                        _this.timer = setTimeout(()=>{
                            window.location.reload();
                        },1000)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        data(){
            return {
                searchContent: '',
                pageSize: 6,
                total: 10,
                tableData:[
                    {id:1,name:"test1",author:"author1"},
                    {id:2,name:"test1",author:"author1"},
                    {id:3,name:"test1",author:"author1"}
                    ]
            }
        },
        created(){
            var _this = this;
            axios.get("http://localhost:8082/books/findAll/0/6").then(function (resp) {
                // console.log(resp)
                _this.tableData = resp.data.content;
                _this.total = resp.data.totalElements;
            })
        }
    }
</script>

<style scoped>

</style>