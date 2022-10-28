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

//查询库存
export function selectLikeAll(data?: any) {
    return request.get({
        url: 'stock/selectLikeAll',
        params: data
    })
}

//修改库存数量
export function updateScount(data?: any) {
    return request.post({
        url: 'stock/update',
        data: data
    })
}

//增加库存商品
export function addStock(data?: any) {
    return request.post({
        url: 'stock/insert',
        params: data
    })
}

//查询所有商品名称
export function selName(data?: any) {
    return request.get({
        url: 'comm/selName',
        params: data
    })
}