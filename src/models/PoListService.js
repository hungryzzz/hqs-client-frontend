/*
 * @Created on: 2022-09-27 00:44:45
 * @@LastEditTime: 2022-09-27 00:47:33
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

}