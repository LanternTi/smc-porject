import request from ".";

//查询所有外卖订单
export function getAllCate(data?: any) {
    return request.get({
        url: 'cate/select',
        params: data
    })
}

//删除商品
export function deleteCate(id: number) {
    return request.delete({
        url: 'cate/delete',
        params: { id: id }
    })
}

//增加商品
export function addCate(data?: any) {
    return request.post({
        url: 'cate/insert',
        params: data
    })
}

//修改商品
export function updateCate(data?: any) {
    return request.put({
        url: 'cate/update',
        params: data
    })
}
