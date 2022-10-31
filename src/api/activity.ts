import request from ".";

//活动查询
export function findAll(data?:any){
    return request.get({
        url:'act/select',
        params:data
    })
}
//修改
export function update(data?:any){
    return request.put({
        url:'act/update',
        params:data
    })
}
//删除
export function deleteAct(id: number) {
    return request.delete({
        url: 'act/delete',
        params: { cid: id }
    })
}
//增加
export function addAct(data?: any) {
    return request.post({
        url: 'act/insert',
        params: data
    })
}