import request from ".";

//查询所有客户
export function getAllCustomer(data?: any) {
    return request.get({
        url: 'user/select',
        params: data
    })
}

//添加客户
export function addCustomer(data?: any) {
    return request.post({
        url: 'user/insert',
        params: data
    })
}

//修改客户
export function editCustomer(data?: any) {
    return request.put({
        url: 'user/update',
        params: data
    })
}