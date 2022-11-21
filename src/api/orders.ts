import request from ".";

//查询所有外卖订单
export function getAllOrder(data?: any) {
    return request.get({
        url: 'orders/selectAll',
        params: data
    })
}

//修改
export function update(data?:any){
    return request.put({
        url:'orders/updateStatus',
        params:data
    })
}