/**
 * Type declarations for Macle (ma.*) Mini Program APIs
 */

export interface TradePayOptions {
  tradeNO: string
  sign?: string
  orderStr?: string
  extendParam?: string
  success?: (res: any) => void
  fail?: (err: any) => void
  complete?: (res: any) => void
}

export interface StartPayOptions {
  prepayId: string
  orderInfo: string
  sign: string
  amount: string | number
  success?: (res: any) => void
  fail?: (err: any) => void
  complete?: (res: any) => void
}

export interface CapsuleStyleOptions {
  /** 0: light mode, 1: dark mode */
  style: 0 | 1
  success?: (res: any) => void
  fail?: (err: any) => void
  complete?: (res: any) => void
}

export interface SetCapsuleShowOptions {
  show: boolean
  success?: (res: any) => void
  fail?: (err: any) => void
  complete?: (res: any) => void
}

export interface SetSwipeBackOptions {
  enableSwipeBack: boolean
  success?: (res: any) => void
  fail?: (err: any) => void
  complete?: (res: any) => void
}

export interface GotoBrowserOptions {
  openUrl: string
  success?: (res: any) => void
  fail?: (err: any) => void
  complete?: (res: any) => void
}

export interface CustomEventOptions {
  eventName: string
  callback: (data: any) => void
  success?: (res: any) => void
  fail?: (err: any) => void
  complete?: (res: any) => void
}

export interface TimerOptions {
  duration: number
  success?: (res: any) => void
  fail?: (err: any) => void
  complete?: (res: any) => void
}

export interface ReportLogOptions {
  log: string
  success?: (res: any) => void
  fail?: (err: any) => void
  complete?: (res: any) => void
}

export interface ReportPerformanceOptions {
  reportEvent: string
  reportParams: Record<string, any>
  success?: (res: any) => void
  fail?: (err: any) => void
  complete?: (res: any) => void
}

export interface ReportEventOptions {
  eventId: string
  data?: Record<string, any>
  success?: (res: any) => void
  fail?: (err: any) => void
  complete?: (res: any) => void
}

export interface SaveFileToPhoneOptions {
  filePath: string
  success?: (res: { savedFilePath: string }) => void
  fail?: (err: any) => void
  complete?: (res: any) => void
}

export interface SaveBase64ImageOptions {
  base64: string
  success?: (res: { savedFilePath: string }) => void
  fail?: (err: any) => void
  complete?: (res: any) => void
}

export interface BackgroundFetchOptions {
  fetchType: string
  success?: (res: { data: any[] }) => void
  fail?: (err: any) => void
  complete?: (res: any) => void
}

/**
 * Macle Global API Interface (ma.*)
 */
export interface MacleGlobal {
  // Navigation
  navigateTo (options: { url: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  redirectTo (options: { url: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  switchTab (options: { url: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  reLaunch (options: { url: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  navigateBack (options?: { delta?: number; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  navigateToMiniProgram (options: { appId: string; path?: string; extraData?: any; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  exitMiniProgram (options?: { success?: Function; fail?: Function; complete?: Function }): Promise<any>

  // Network & WebSocket
  request (options: any): Promise<any>
  uploadFile (options: any): Promise<any>
  downloadFile (options: any): Promise<any>
  connectSocket (options: { url: string; header?: any; protocols?: string[]; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  closeSocket (options?: any): Promise<any>
  sendSocketMessage (options: { data: string | ArrayBuffer; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  onSocketOpen (callback: Function): void
  onSocketClose (callback: Function): void
  onSocketError (callback: Function): void
  onSocketMessage (callback: (res: { data: string | ArrayBuffer }) => void): void
  isOnline (): boolean

  // Media
  chooseImage (options?: any): Promise<any>
  previewImage (options: { urls: string[]; current?: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  getImageInfo (options: { src: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  saveImage (options: { filePath: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  saveImageToPhotosAlbum (options: { filePath: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  saveBase64Image (options: SaveBase64ImageOptions): Promise<any>
  compressImage (options: { src: string; quality?: number; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  uploadImage (options: any): Promise<any>
  downloadImage (options: any): Promise<any>
  chooseVideo (options?: any): Promise<any>
  createAudioContext (id: string): any
  createVideoContext (id: string): any
  createCameraContext (): any
  playVoice (options: { filePath: string; url: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  stopVoice (): Promise<any>
  playAudio (options: any): Promise<any>
  stopAudio (): Promise<any>
  getRecorderManager (): any

  // File System
  getFileSystemManager (): any
  saveFile (options: { tempFilePath: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  getFileInfo (options: { filePath: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  getSavedFileList (options?: any): Promise<any>
  getSavedFileInfo (options: { filePath: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  removeSavedFile (options: { filePath: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  openDocument (options: { filePath: string; fileType?: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  saveFileToPhone (options: SaveFileToPhoneOptions): Promise<any>

  // Storage
  setStorage (options: { key: string; data: any; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  setStorageSync (key: string, data: any): void
  getStorage (options: { key: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  getStorageSync (key: string): any
  removeStorage (options: { key: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  removeStorageSync (key: string): void
  clearStorage (options?: any): Promise<any>
  clearStorageSync (): void
  getStorageInfo (options?: any): Promise<any>
  getBackgroundFetchData (options: BackgroundFetchOptions): Promise<any>
  backgroundFetchData (options: BackgroundFetchOptions): Promise<any>

  // Device & System
  getSystemInfo (options?: any): Promise<any>
  getSystemInfoSync (): any
  getSystemSetting (): any
  getBatteryInfo (options?: any): Promise<any>
  getClipboardData (options?: any): Promise<any>
  setClipboardData (options: { data: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  getNetworkType (options?: any): Promise<any>
  onNetworkStatusChange (callback: (res: { isConnected: boolean; networkType: string }) => void): void
  offNetworkStatusChange (callback?: Function): void
  makePhoneCall (options: { phoneNumber: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  scanCode (options?: any): Promise<any>
  vibrateShort (options?: { type?: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  vibrateLong (options?: any): Promise<any>
  setKeepScreenOn (options: { keepScreenOn: boolean; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  getScreenBrightness (options?: any): Promise<any>
  setScreenBrightness (options: { value: number; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  startGyroscope (options?: any): Promise<any>
  stopGyroscope (options?: any): Promise<any>
  onGyroscopeChange (callback: (res: { x: number; y: number; z: number }) => void): void
  offGyroscopeChange (callback?: Function): void
  onMemoryWarning (callback: (res: { level: number }) => void): void
  offMemoryWarning (callback?: Function): void
  onKeyboardHeightChange (callback: (res: { height: number }) => void): void
  offKeyboardHeightChange (callback?: Function): void
  hideKeyboard (options?: any): Promise<any>

  // Bluetooth Low Energy
  openBluetoothAdapter (options?: any): Promise<any>
  closeBluetoothAdapter (options?: any): Promise<any>
  startBluetoothDevicesDiscovery (options?: any): Promise<any>
  stopBluetoothDevicesDiscovery (options?: any): Promise<any>
  onBluetoothDeviceFound (callback: Function): void
  offBluetoothDeviceFound (callback?: Function): void
  createBLEConnection (options: { deviceId: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  closeBLEConnection (options: { deviceId: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  getBLEDeviceServices (options: { deviceId: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  getBLEDeviceCharacteristics (options: { deviceId: string; serviceId: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  readBLECharacteristicValue (options: any): Promise<any>
  writeBLECharacteristicValue (options: any): Promise<any>

  // UI
  showToast (options: { title: string; icon?: 'success' | 'error' | 'loading' | 'none'; duration?: number; mask?: boolean; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  hideToast (options?: any): Promise<any>
  showModal (options: { title?: string; content?: string; showCancel?: boolean; cancelText?: string; confirmText?: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  showLoading (options: { title: string; mask?: boolean; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  hideLoading (options?: any): Promise<any>
  showActionSheet (options: { itemList: string[]; itemColor?: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  setNavigationBarTitle (options: { title: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  setNavigationBarColor (options: { frontColor: string; backgroundColor: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  setBackgroundColor (options: { backgroundColor?: string; backgroundColorTop?: string; backgroundColorBottom?: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  setBackgroundTextStyle (options: { textStyle: 'dark' | 'light'; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  setTabBarStyle (options: any): Promise<any>
  setTabBarItem (options: any): Promise<any>
  setTabBarBadge (options: { index: number; text: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  removeTabBarBadge (options: { index: number; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  showTabBarRedDot (options: { index: number; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  hideTabBarRedDot (options: { index: number; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  showTabBar (options?: any): Promise<any>
  hideTabBar (options?: any): Promise<any>
  pageScrollTo (options: { scrollTop?: number; duration?: number; selector?: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  loadFontFace (options: { family: string; source: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  startPullDownRefresh (options?: any): Promise<any>
  stopPullDownRefresh (options?: any): Promise<any>
  getMenuButtonBoundingClientRect (): { width: number; height: number; top: number; right: number; bottom: number; left: number }

  // Location & Map
  getLocation (options?: { type?: string; altitude?: boolean; isHighAccuracy?: boolean; highAccuracyExpireTime?: number; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  createMapContext (mapId: string): any

  // Selectors & DOM
  createSelectorQuery (): any
  nextTick (callback: Function): void

  // Open APIs & Auth
  getAuthCode (options: { scopes: string[]; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  getOpenUserInfo (options?: any): Promise<any>
  authorize (options: { scope: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  deauthorize (options?: any): Promise<any>
  cancelAuthorize (options: { scopes: string[]; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  getSetting (options?: any): Promise<any>
  openSetting (options?: any): Promise<any>
  chooseContact (options?: any): Promise<any>
  getsmallappinfo (options?: any): Promise<any>
  getStatusBarHeight (options?: any): Promise<any>
  getLaunchOptionsSync (): any
  canIUse (schema: string): boolean
  getUpdateManager (): any

  // Macle Payments
  tradePay (options: TradePayOptions): Promise<any>
  startPay (options: StartPayOptions): Promise<any>
  getKbzBackendServerUrl (): string

  // Webview & Messaging
  createWebviewContext (webviewId?: string): any
  postMessage (message: any): Promise<any>
  onMessage (callback: Function): void

  // Capsule & Swipe controls
  capsuleStyle (options: CapsuleStyleOptions): Promise<any>
  setCapsuleShow (options: SetCapsuleShowOptions): Promise<any>
  setSwipeBack (options: SetSwipeBackOptions): Promise<any>
  gotoBrowser (options: GotoBrowserOptions): Promise<any>

  // Custom Events, Reporting, Timers
  setCustomEvent (options: CustomEventOptions): Promise<any>
  removeCustomEvent (options: { eventName: string; success?: Function; fail?: Function; complete?: Function }): Promise<any>
  createTimer (options: TimerOptions): Promise<any>
  cancelTimer (options?: any): Promise<any>
  reportPerformance (options: ReportPerformanceOptions): Promise<any>
  reportLog (options: ReportLogOptions): Promise<any>
  reportEvent (options: ReportEventOptions): Promise<any>
  submitReport (options?: any): Promise<any>

  // Data helpers
  arrayBufferToBase64 (buffer: ArrayBuffer): string
  base64ToArrayBuffer (base64: string): ArrayBuffer

  // Sub-namespaces & Constants
  miniProgram: {
    postMessage (data: any): void
    close (): void
    getEnv (callback: (res: { miniprogram: boolean }) => void): void
  }
  env: {
    USER_DATA_PATH: string
    [key: string]: any
  }

  // Dynamic index signature for any future / unlisted APIs
  [key: string]: any
}

declare global {
  const ma: MacleGlobal
}

export interface MauiModalProps {
  visible?: boolean
  title?: string
  content?: string
  type?: 'default' | string
  closable?: boolean
  maskClosable?: boolean
  destroyOnClose?: boolean
  maskStyle?: string
  bodyStyle?: string
  bodyClassName?: string
  primaryButtonText?: string
  primaryButtonStyle?: string
  secondaryButtonText?: string
  secondaryButtonStyle?: string
  cancelButtonText?: string
  cancelButtonStyle?: string
  zIndex?: number
  className?: string
  style?: string | any
  onClose?: (event?: any) => void
  onPrimaryButtonTap?: (event?: any) => void
  onSecondaryButtonTap?: (event?: any) => void
  onCancelButtonTap?: (event?: any) => void
  children?: any
}

export interface MauiListProps {
  header?: string
  footer?: string
  radius?: boolean
  className?: string
  style?: string | any
  children?: any
}

export interface MauiListItemProps {
  title?: string
  brief?: string
  extra?: string
  extraBrief?: string
  arrow?: 'right' | 'up' | 'down' | ''
  disabled?: boolean
  showDivider?: boolean
  radius?: boolean
  image?: string
  className?: string
  style?: string | any
  onClick?: (event: any) => void
  onTap?: (event: any) => void
  children?: any
}
