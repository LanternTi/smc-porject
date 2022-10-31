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

//订单结算
export function addOrderOver(data?: any) {
    return request.post({
        url: 'order/insert',
        data: data
    })
}

//查看订单详情
export function getOrderInfo(data?: any) {
    return request.get({
        url: 'order/findAll',
        params: data
    })
}