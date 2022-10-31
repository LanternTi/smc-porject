import request from ".";

//员工登录
export function empLogin(data?: any) {
    return request.get({
        url: 'emp/login',
        params: data
    })
}

//员工注册
export function empSignIn(data?: any) {
    return request.post({
        url: 'emp/signIn',
        params: data
    })
}

//员工人脸注册
export function empFaceAdd(file: string, groupId: number, id: number) {
    return request.post({
        url: 'face/faceAdd',
        params: { file, groupId, id }
    })
}

//员工修改密码
export function updatePwd(id: number, password: string) {
    return request.put({
        url: 'emp/updatePwd',
        params: { id, password }
    })
}

//查询所有员工
export function findAll(data?:any){
    return request.get({
        url:'emp/select',
        params:data
    })
}

//修改
export function updateByid(data?:any){
    return request.put({
        url:'emp/update',
        params:data
    })
}