/*
 * @Created on: 2022-09-28 01:31:37
 * @@LastEditTime: 2022-09-28 01:34:51
 * @@Author: ring
 * 
 * @@Desc: 
 * 
 */
export function formatDate (date) {
  let objectDate = new Date(date);

  let day = objectDate.getDate();
  let month = objectDate.getMonth() + 1;
  let year = objectDate.getFullYear();
  if (day < 10) {
      day = '0' + day;
  }

  if (month < 10) {
      month = `0${month}`;
  }
  return `${year}-${month}-${day}`;
}