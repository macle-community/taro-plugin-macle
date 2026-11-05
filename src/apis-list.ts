/**
 * Macle (ma.*) Mini Program APIs List
 * Extracted and compiled from official Macle OpenDoc specifications.
 */

/**
 * APIs that take callback options ({ success, fail, complete })
 * and should return a Promise in Taro when called without callbacks.
 */
export const needPromiseApis = new Set<string>([
  // Network
  'request',
  'uploadFile',
  'downloadFile',
  'connectSocket',
  'closeSocket',
  'sendSocketMessage',

  // Media & Images
  'chooseImage',
  'previewImage',
  'getImageInfo',
  'saveImage',
  'saveImageToPhotosAlbum',
  'saveBase64Image',
  'compressImage',
  'uploadImage',
  'downloadImage',
  'chooseVideo',
  'playVoice',
  'stopVoice',
  'playAudio',
  'stopAudio',

  // File System
  'saveFile',
  'getFileInfo',
  'getSavedFileList',
  'getSavedFileInfo',
  'removeSavedFile',
  'openDocument',
  'saveFileToPhone',

  // Location
  'getLocation',

  // Device & Hardware
  'getBatteryInfo',
  'getClipboardData',
  'setClipboardData',
  'getNetworkType',
  'makePhoneCall',
  'scanCode',
  'vibrateShort',
  'vibrateLong',
  'setKeepScreenOn',
  'getScreenBrightness',
  'setScreenBrightness',
  'startGyroscope',
  'stopGyroscope',

  // Bluetooth Low Energy (BLE)
  'openBluetoothAdapter',
  'closeBluetoothAdapter',
  'startBluetoothDevicesDiscovery',
  'stopBluetoothDevicesDiscovery',
  'createBLEConnection',
  'closeBLEConnection',
  'getBLEDeviceServices',
  'getBLEDeviceCharacteristics',
  'readBLECharacteristicValue',
  'writeBLECharacteristicValue',

  // Storage
  'setStorage',
  'getStorage',
  'removeStorage',
  'clearStorage',
  'getStorageInfo',
  'getBackgroundFetchData',
  'backgroundFetchData',

  // UI & Feedback
  'showToast',
  'hideToast',
  'showModal',
  'showLoading',
  'hideLoading',
  'showActionSheet',
  'setNavigationBarTitle',
  'setNavigationBarColor',
  'setBackgroundColor',
  'setBackgroundTextStyle',
  'setTabBarStyle',
  'setTabBarItem',
  'setTabBarBadge',
  'removeTabBarBadge',
  'showTabBarRedDot',
  'hideTabBarRedDot',
  'showTabBar',
  'hideTabBar',
  'pageScrollTo',
  'loadFontFace',
  'startPullDownRefresh',
  'stopPullDownRefresh',
  'hideKeyboard',

  // Routing & Navigation
  'navigateTo',
  'redirectTo',
  'switchTab',
  'navigateBack',
  'reLaunch',
  'navigateToMiniProgram',
  'exitMiniProgram',
  'gotoBrowser',

  // Open APIs & Auth
  'getAuthCode',
  'getOpenUserInfo',
  'authorize',
  'deauthorize',
  'cancelAuthorize',
  'getSetting',
  'openSetting',
  'chooseContact',
  'getsmallappinfo',
  'getStatusBarHeight',
  'getSystemInfo',
  'getLocalImgData',

  // Payment (Macle Ethio-Telecom & Partner)
  'tradePay',
  'startPay',
  'getKbzBackendServerUrl',

  // Platform & Capsule Controls
  'capsuleStyle',
  'setCapsuleShow',
  'setSwipeBack',

  // Reporting & Metrics
  'reportPerformance',
  'reportLog',
  'reportEvent',
  'submitReport',

  // Timers & Custom Events
  'createTimer',
  'cancelTimer',
  'setCustomEvent',
  'removeCustomEvent',
  'postMessage'
])

/**
 * Synchronous APIs that return values directly (no callbacks/Promises)
 */
export const syncApis = new Set<string>([
  'getSystemInfoSync',
  'getStorageSync',
  'setStorageSync',
  'getSystemSetting',
  'getLaunchOptionsSync',
  'getMenuButtonBoundingClientRect',
  'canIUse',
  'arrayBufferToBase64',
  'base64ToArrayBuffer',
  'isOnline',
  'nextTick'
])

/**
 * Context & Manager Factory APIs
 */
export const creatorApis = new Set<string>([
  'createSelectorQuery',
  'createAudioContext',
  'createVideoContext',
  'createCameraContext',
  'createMapContext',
  'createWebviewContext',
  'getFileSystemManager',
  'getRecorderManager',
  'getUpdateManager'
])

/**
 * Event Listener & Subscription APIs (on* and off*)
 */
export const eventApis = new Set<string>([
  'onAppShow',
  'offAppShow',
  'onAppHide',
  'offAppHide',
  'onError',
  'offError',
  'onNetworkStatusChange',
  'offNetworkStatusChange',
  'onKeyboardHeightChange',
  'offKeyboardHeightChange',
  'onMemoryWarning',
  'offMemoryWarning',
  'onGyroscopeChange',
  'offGyroscopeChange',
  'onBluetoothDeviceFound',
  'offBluetoothDeviceFound',
  'onSocketOpen',
  'offSocketOpen',
  'onSocketClose',
  'offSocketClose',
  'onSocketError',
  'offSocketError',
  'onSocketMessage',
  'offSocketMessage',
  'onScreenRecordingStateChanged',
  'offScreenRecordingStateChanged',
  'onMessage'
])

/**
 * Specific APIs native to the Macle / Huawei / Ethio-Telecom platform
 */
export const macleSpecificApis = new Set<string>([
  'tradePay',
  'startPay',
  'getKbzBackendServerUrl',
  'gotoBrowser',
  'capsuleStyle',
  'setCapsuleShow',
  'setSwipeBack',
  'getsmallappinfo',
  'getStatusBarHeight',
  'setCustomEvent',
  'removeCustomEvent',
  'createTimer',
  'cancelTimer',
  'reportEvent',
  'reportLog',
  'reportPerformance',
  'submitReport',
  'saveFileToPhone',
  'saveBase64Image',
  'downloadImage',
  'uploadImage',
  'isOnline',
  'playVoice',
  'stopVoice',
  'playAudio',
  'stopAudio',
  'getBackgroundFetchData',
  'backgroundFetchData',
  'createWebviewContext'
])
