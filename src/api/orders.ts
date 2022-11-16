import request from ".";

//查询所有外卖订单
export function getAllOrder(data?: any) {
    return request.get({
        url: 'orders/selectAll',
        params: data
    })
}