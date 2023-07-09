/*
 * @Created on: 2022-09-15 23:38:33
 * @@LastEditTime: 2023-03-01 01:09:02
 * @@Author: fduxuan
 * 
 * @@Desc: 
 * 
 */
/*
 * Created on 2021/11/18 12:43 下午
 *
 * @Author: fduxuan
 *
 * Desc:
 */
import axios from "axios"
import { Message } from '@arco-design/web-vue'

// const HOST = "https://hqs.droproblem.com";
const HOST = "";


export async function Get(url, config=undefined, disable_message_error=false) {

    if(config === undefined) {config = {}}
    if(config.params === undefined) {config.params = {}}
    config.headers = {'Content-Type': 'application/json;charset=UTF-8'}
    config.withCredentials=true
    let resp = await axios.get(`${HOST}${url}`, config);
    let data = resp.data;
    if(resp.status !== 200) {
        throw resp.statusText
    }
    if(data.code !== 0) {
        // console.log(data)
        if (!disable_message_error){
            Message.error(data.data)
        }
        throw data.data
    }
    return data.data
}

export async function Post(url, data, config=undefined, disable_message_error=false) {
    if(config === undefined) {config = {}}
    if (config.headers === undefined) {
        config['headers'] = {'Content-Type': 'application/json;charset=UTF-8'}
    }
    config.withCredentials=true
    let resp = await axios.post(`${HOST}${url}`, data, config)

    let respData = resp.data
    if(resp.status !== 200) {
        throw resp.statusText
    }
    if(respData.code !== 0) {
        if (!disable_message_error){
            Message.error(respData.data)
        }
        throw respData.data
    }
    return respData.data
}
