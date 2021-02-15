
export const state = () => ({
  auth: null,
  authError: null,
  userInfo: {}, // isAuth: 1、未认证  2、已认证  3、认证成功；isCompleted 是否完善企业信息 1：未完成 2：已完成
  msgCountComment: 0,
  msgCountSys: 0,
  data: {
    provincePlatform: { businessList: [], platformList: [] }, 
    centralPlatform: { businessList: [], platformList: [] }, 
    chinaTree: [],
  },
})

export const mutations = {
  setAuth(state, auth) {
    state.auth = auth
  },
  setAuthError(state, authError) {
    state.authError = authError
  },
  setUserInfo(state, payload) {
    state.userInfo = { ...state.userInfo, ...payload }
  },
  setMsgCountComment(state, payload) {
    state.msgCountComment = payload
  },
  setMsgCountSys(state, payload) {
    state.msgCountSys = payload
  },
  setData(state, payload) {
    state.data = { ...state.data, ...payload }
  },
}

export const actions = {

}