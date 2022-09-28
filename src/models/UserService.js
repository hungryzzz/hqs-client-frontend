/*
 * @Created on: 2022-09-28 23:51:39
 * @@LastEditTime: 2022-09-28 23:55:31
 * @@Author: ring
 * 
 * @@Desc: 
 * 
 */
import { Post, Get } from './req';

export default class UserService {

  static async checkLogin() {
    return await Get(`/api/user/info`);
  }

  static async login(email, password) {
    return await Post(`/api/user/login`, {
      email, password,
    });
  }

  static async logout() {
    return await Post(`/api/user/logout`);
  }

}