/*
 * @Created on: 2022-09-27 00:44:45
 * @LastEditTime: 2022-10-20 22:28:44
 * @@Author: ring
 * 
 * @@Desc: 
 * 
 */
import { Post, Get } from './req';

export default class PoListService {

  static async find() {
    return await Get(`/api/sort/getPoList`);
  }

  static async findByHour(){
    return await Get(`/api/sort/getPoListByHour`);
  }

  static async getSortList(){
    return await Get(`/api/sort/getSortList`);
  }
}