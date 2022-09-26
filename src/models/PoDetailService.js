/*
 * @Created on: 2022-09-27 00:44:45
 * @@LastEditTime: 2022-09-27 00:48:30
 * @@Author: ring
 * 
 * @@Desc: 
 * 
 */
import { Post, Get } from './req';

export default class PoDetailService {

  static async find(sort, start_date, end_date) {
    return await Post(`/api/sort/getPoDetail`, {
      sort, start_date, end_date,
    });
  }

}