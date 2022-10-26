let BASE_URL = ''
//判断生成环境
if (process.env.NODE_ENV === 'production') {
    BASE_URL = 'http://127.0.0.1:8080/api/'
} else if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://127.0.0.1:8080/api/'
} else {
    BASE_URL = 'http://127.0.0.1:8080/api/'
}
const TIME_OUT = 10000
//最后将其导出
export { TIME_OUT, BASE_URL }