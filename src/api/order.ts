import request from ".";

//查询所有订单
export function getAllOrder(data?: any) {
    return request.get({
        url: 'order/selectLikeAll',
        params: data
    })
}

//修改订单
export function updataOrder(data?: any) {
    return request.put({
        url: 'order/update',
        data: data
    })
}