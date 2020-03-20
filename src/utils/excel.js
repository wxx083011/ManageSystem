/*
 * 表格导出
 * */

import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export const exportExcel = function(node, name) { // 节点，文件名
  let wb = XLSX.utils.table_to_book(node)
  /* 获取二进制字符串作为输出 */
  console.log(wb)
  let wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })
  try {
    FileSaver.saveAs(
      new Blob([wbout], { type: 'application/octet-stream' }),
      name + '.xlsx' // 设置导出文件名称
    )
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, wbout)
  }
  return wbout

  /* 某一个项固定时使用 */

  /* let fix =  document.querySelector('.el-table__fixed-right');
 let wb;
 if(fix){
   //判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去
   wb = XLSX.utils.table_to_book(document.querySelector('#table').removeChild(fix));
   document.querySelector('#table').appendChild(fix);
 }else{
   wb = XLSX.utils.table_to_book(document.querySelector('#table'));
 } */
}