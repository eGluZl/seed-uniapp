import request from '@/utils/request'

export const _API_STATUS_OK = 200

export const _API_Login = data => request.post('/api/login', data ? data : {})

export const _API_UserInfo = () => request.post('/api/user')

