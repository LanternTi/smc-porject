import request from ".";

//查询所有商品
export function allCommodity(data?: any) {
    return request.get({
        url: 'comm/selectLikeAll',
        params: data
    })
}

//删除商品
export function deleteComm(id: number) {
    return request.delete({
        url: 'comm/delete',
        params: { cid: id }
    })
}

//增加商品
export function addComm(data?: any) {
    return request.post({
        url: 'comm/insert',
        params: data
    })
}

//修改商品
export function updateComm(data?: any) {
    return request.put({
        url: 'comm/update',
        params: data
    })
}