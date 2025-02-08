import { defineStore } from 'pinia'
import { getAdminInfo } from '../apis'
import { StorageUtil } from '../utils'
import { ADMININFO } from '../config'
import type { AdminView } from '../types'

export const refreshTimeOutStore = defineStore({
  id: 'refreshTimeOut',
  state: () => ({
    refreshTimeOut: null as number | null
  }),
  actions: {
    getRefreshTimeOut() {
      return this.refreshTimeOut
    },
    setRefreshTimeOut(delay: number) {
      this.refreshTimeOut = setTimeout(() => {
        this.refreshToken()
        this.setRefreshTimeOut(1000 * 60 * 60 * 1.5)
      }, delay)
    },
    clearRefreshTimeOut() {
      if (this.refreshTimeOut !== null) {
        clearTimeout(this.refreshTimeOut)
        this.refreshTimeOut = null
      }
    },
    async refreshToken() {
      return null
    }
  }
})

export const adminViewStore = defineStore({
  id: 'adminView',
  state: () => ({
    adminView: StorageUtil.getItemWithExpiry(ADMININFO) as AdminView | null
  }),
  actions: {
    getAdminView() {
      return this.adminView
    },
    async setAdminView() {
      const storageData = StorageUtil.getItemWithExpiry(ADMININFO)
      if (storageData) {
        this.adminView = storageData
      } else {
        this.adminView = (await getAdminInfo()).data
      }
    },
    hasAdminView() {
      return !!this.adminView
    },
    clear() {
      StorageUtil.removeItem(ADMININFO)
      this.adminView = null
    }
  }
})
