const _true = 'true'
const _false = 'false'
const _empty = ''
const _zero = '0'
const _object = '{}'

/**
 * Macle Native Component Prop Definitions
 * Extracted and mapped from Macle's View Engine (view.js) and IDE Extension definitions.
 */
export const nativeComponents: Record<string, Record<string, string>> = {
  // View Container
  View: {
    'hover-class': "'none'",
    'hover-stop-propagation': _false,
    'hover-start-time': '50',
    'hover-stay-time': '400'
  },
  ScrollView: {
    'scroll-x': _false,
    'scroll-y': _false,
    'upper-threshold': '50',
    'lower-threshold': '50',
    'scroll-top': _empty,
    'scroll-left': _empty,
    'scroll-into-view': _empty,
    'scroll-with-animation': _false,
    'enable-back-to-top': _false,
    enhanced: _false,
    'show-scrollbar': _true,
    bindScrollToUpper: _empty,
    bindScrollToLower: _empty,
    bindScroll: _empty,
    bindDragStart: _empty,
    bindDragging: _empty,
    bindDragEnd: _empty
  },
  Swiper: {
    'indicator-dots': _false,
    'indicator-color': "'rgba(0, 0, 0, .3)'",
    'indicator-active-color': "'#000000'",
    autoplay: _false,
    current: _zero,
    interval: '5000',
    duration: '500',
    circular: _false,
    vertical: _false,
    'easing-function': "'default'",
    bindChange: _empty,
    bindTransition: _empty,
    bindAnimationFinish: _empty
  },
  SwiperItem: {
    'item-id': _empty,
    'skip-hidden-item-layout': _false
  },
  CoverView: {
    'scroll-top': _zero
  },
  CoverImage: {
    src: _empty,
    bindLoad: _empty,
    bindError: _empty
  },

  // Basic Content
  Icon: {
    type: _empty,
    size: '23',
    color: _empty
  },
  Text: {
    'user-select': _false,
    space: _empty,
    decode: _false
  },
  RichText: {
    nodes: '[]',
    space: _empty
  },
  Progress: {
    percent: _zero,
    'show-info': _false,
    'border-radius': _zero,
    'font-size': '16',
    'stroke-width': '6',
    activeColor: "'#09BB07'",
    backgroundColor: "'#EBEBEB'",
    active: _false,
    'active-mode': "'backwards'",
    duration: '30',
    bindActiveEnd: _empty
  },

  // Form Controls
  Button: {
    size: "'default'",
    type: "'default'",
    plain: _false,
    disabled: _false,
    loading: _false,
    'form-type': _empty,
    'open-type': _empty,
    'hover-class': "'button-hover'",
    'hover-stop-propagation': _false,
    'hover-start-time': '20',
    'hover-stay-time': '70',
    'app-parameter': _empty,
    'send-message-title': _empty,
    'send-message-path': _empty,
    'send-message-img': _empty,
    'show-message-card': _false,
    bindGetUserInfo: _empty,
    bindContact: _empty,
    bindGetPhoneNumber: _empty,
    bindError: _empty,
    bindOpenSetting: _empty,
    bindLaunchApp: _empty,
    bindAgreePrivacyAuthorization: _empty
  },
  Checkbox: {
    value: _empty,
    disabled: _false,
    checked: _false,
    color: "'#09BB07'"
  },
  CheckboxGroup: {
    bindChange: _empty
  },
  Form: {
    'report-submit': _false,
    'report-submit-timeout': _zero,
    bindSubmit: _empty,
    bindReset: _empty
  },
  Input: {
    value: _empty,
    type: "'text'",
    password: _false,
    placeholder: _empty,
    'placeholder-style': _empty,
    'placeholder-class': "'input-placeholder'",
    disabled: _false,
    maxlength: '140',
    'cursor-spacing': _zero,
    'auto-focus': _false,
    focus: _false,
    'confirm-type': "'done'",
    'always-embed': _false,
    'confirm-hold': _false,
    cursor: _empty,
    'selection-start': '-1',
    'selection-end': '-1',
    'adjust-position': _true,
    'hold-keyboard': _false,
    'safe-password-cert-path': _empty,
    'safe-password-length': _empty,
    'safe-password-time-stamp': _empty,
    'safe-password-nonce': _empty,
    'safe-password-salt': _empty,
    'safe-password-custom-hash': _empty,
    bindInput: _empty,
    bindFocus: _empty,
    bindBlur: _empty,
    bindConfirm: _empty,
    bindKeyboardHeightChange: _empty
  },
  Label: {
    for: _empty
  },
  Picker: {
    mode: "'selector'",
    disabled: _false,
    range: '[]',
    'range-key': _empty,
    value: _zero,
    start: _empty,
    end: _empty,
    fields: "'day'",
    'custom-item': _empty,
    bindCancel: _empty,
    bindChange: _empty,
    bindColumnChange: _empty
  },
  PickerView: {
    value: '[]',
    'indicator-style': _empty,
    'indicator-class': _empty,
    'mask-style': _empty,
    'mask-class': _empty,
    bindChange: _empty,
    bindPickStart: _empty,
    bindPickEnd: _empty
  },
  PickerViewColumn: {},
  Radio: {
    value: _empty,
    checked: _false,
    disabled: _false,
    color: "'#09BB07'"
  },
  RadioGroup: {
    bindChange: _empty
  },
  Slider: {
    min: _zero,
    max: '100',
    step: '1',
    disabled: _false,
    value: _zero,
    color: "'#e9e9e9'",
    'selected-color': "'#1aad19'",
    activeColor: "'#1aad19'",
    backgroundColor: "'#e9e9e9'",
    'block-size': '28',
    'block-color': "'#ffffff'",
    'show-value': _false,
    bindChange: _empty,
    bindChanging: _empty
  },
  Switch: {
    checked: _false,
    disabled: _false,
    type: "'switch'",
    color: "'#04BE02'",
    bindChange: _empty
  },
  Textarea: {
    value: _empty,
    placeholder: _empty,
    'placeholder-style': _empty,
    'placeholder-class': "'textarea-placeholder'",
    disabled: _false,
    maxlength: '140',
    'auto-focus': _false,
    focus: _false,
    'auto-height': _false,
    fixed: _false,
    'cursor-spacing': _zero,
    cursor: '-1',
    'show-confirm-bar': _true,
    'selection-start': '-1',
    'selection-end': '-1',
    'adjust-position': _true,
    'hold-keyboard': _false,
    'disable-default-padding': _false,
    'confirm-type': "'return'",
    'confirm-hold': _false,
    bindFocus: _empty,
    bindBlur: _empty,
    bindLineChange: _empty,
    bindInput: _empty,
    bindConfirm: _empty,
    bindKeyboardHeightChange: _empty
  },

  // Navigation
  Navigator: {
    target: "'self'",
    url: _empty,
    'open-type': "'navigate'",
    delta: '1',
    'app-id': _empty,
    path: _empty,
    'extra-data': _object,
    version: "'version'",
    'hover-class': "'navigator-hover'",
    'hover-stop-propagation': _false,
    'hover-start-time': '50',
    'hover-stay-time': '600',
    bindSuccess: _empty,
    bindFail: _empty,
    bindComplete: _empty
  },

  // Media Components
  Audio: {
    id: _empty,
    src: _empty,
    loop: _false,
    controls: _false,
    poster: _empty,
    name: _empty,
    author: _empty,
    bindError: _empty,
    bindPlay: _empty,
    bindPause: _empty,
    bindTimeUpdate: _empty,
    bindEnded: _empty
  },
  Image: {
    src: _empty,
    mode: "'scaleToFill'",
    webp: _false,
    'lazy-load': _false,
    'show-menu-by-longpress': _false,
    bindError: _empty,
    bindLoad: _empty
  },
  Video: {
    src: _empty,
    duration: _empty,
    controls: _true,
    'danmu-list': '[]',
    'danmu-btn': _false,
    'enable-danmu': _false,
    autoplay: _false,
    loop: _false,
    muted: _false,
    'initial-time': _zero,
    'page-gesture': _false,
    direction: _empty,
    'show-progress': _true,
    'show-fullscreen-btn': _true,
    'show-play-btn': _true,
    'show-center-play-btn': _true,
    'enable-progress-gesture': _true,
    'object-fit': "'contain'",
    poster: _empty,
    'show-mute-btn': _false,
    title: _empty,
    'play-btn-position': "'bottom'",
    'enable-play-gesture': _false,
    'auto-pause-if-navigate': _true,
    'auto-pause-if-open-native': _true,
    'vslide-gesture': _false,
    'vslide-gesture-in-fullscreen': _true,
    bindPlay: _empty,
    bindPause: _empty,
    bindEnded: _empty,
    bindTimeUpdate: _empty,
    bindFullScreenChange: _empty,
    bindWaiting: _empty,
    bindError: _empty,
    bindProgress: _empty
  },
  Camera: {
    mode: "'normal'",
    resolution: "'medium'",
    'device-position': "'back'",
    flash: "'auto'",
    'frame-size': "'medium'",
    bindStop: _empty,
    bindError: _empty,
    bindInitDone: _empty,
    bindScanCode: _empty
  },

  // Map
  Map: {
    longitude: _empty,
    latitude: _empty,
    scale: '16',
    markers: '[]',
    covers: '[]',
    polyline: '[]',
    circles: '[]',
    controls: '[]',
    'include-points': '[]',
    'show-location': _false,
    polygons: '[]',
    subkey: _empty,
    'layer-style': '1',
    rotate: _zero,
    skew: _zero,
    'enable-3D': _false,
    'show-compass': _false,
    'show-scale': _false,
    'enable-overlooking': _false,
    'enable-zoom': _true,
    'enable-scroll': _true,
    'enable-rotate': _false,
    'enable-satellite': _false,
    'enable-traffic': _false,
    'enable-poi': _true,
    'enable-building': _true,
    setting: _object,
    bindTap: _empty,
    bindMarkerTap: _empty,
    bindControlTap: _empty,
    bindCalloutTap: _empty,
    bindRegionChange: _empty
  },

  // Open & Meta
  WebView: {
    src: _empty,
    bindMessage: _empty,
    bindLoad: _empty,
    bindError: _empty
  },
  PageMeta: {
    'background-text-style': _empty,
    'background-color': _empty,
    'background-color-top': _empty,
    'background-color-bottom': _empty,
    'root-background-color': _empty,
    'scroll-top': "''",
    'scroll-duration': '300',
    'page-style': "''",
    'root-font-size': "''",
    'page-orientation': "''",
    bindResize: _empty,
    bindScroll: _empty,
    bindScrollDone: _empty
  }
}

/**
 * Macle UI Component Library (MAUI) Prop Definitions
 * Extracted from Macle_25.9.0_DevSuite_UI component packages
 */
export const mauiComponents: Record<string, Record<string, string>> = {
  MauiButton: {
    id: _empty,
    type: "'default'",
    size: "'normal'",
    plain: _false,
    block: _false,
    round: _false,
    square: _false,
    loading: _false,
    hairline: _false,
    disabled: _false,
    'loading-text': _empty,
    'custom-style': _empty,
    'loading-type': "'circular'",
    'loading-size': "'20px'",
    color: _empty,
    icon: _empty,
    'form-type': _empty,
    bindClick: _empty
  },
  MauiCell: {
    title: _empty,
    value: _empty,
    size: _empty,
    label: _empty,
    center: _false,
    required: _false,
    clickable: _false,
    'title-width': _empty,
    'custom-style': _empty,
    icon: _empty,
    border: _true,
    'title-style': _empty,
    bindClick: _empty
  },
  MauiCellGroup: {
    title: _empty,
    border: _true
  },
  MauiCheckbox: {
    name: _empty,
    value: _empty,
    'custom-icon': _empty,
    'icon-size': _empty,
    disabled: _false,
    'checked-color': _empty,
    'label-position': "'right'",
    'label-disabled': _false,
    shape: "'round'",
    bindChange: _empty
  },
  MauiCheckboxGroup: {
    value: '[]',
    max: _zero,
    direction: "'vertical'",
    disabled: _false,
    bindChange: _empty
  },
  MauiCol: {
    span: '24',
    offset: _zero
  },
  MauiRow: {
    gutter: _zero
  },
  MauiDialog: {
    show: _false,
    title: _empty,
    'title-style': _empty,
    message: _empty,
    'message-style': _empty,
    theme: "'default'",
    'custom-style': _empty,
    'message-align': "'center'",
    'overlay-style': _empty,
    'use-slot': _false,
    'show-cancel-button': _false,
    'close-on-click-overlay': _false,
    width: _empty,
    'z-index': '100',
    'confirm-button-text': "'Confirm'",
    'cancel-button-text': "'Cancel'",
    'confirm-button-color': _empty,
    'cancel-button-color': _empty,
    'show-confirm-button': _true,
    overlay: _true,
    bindClose: _empty,
    bindConfirm: _empty,
    bindCancel: _empty
  },
  MauiDivider: {
    dashed: _false,
    hairline: _true,
    'content-position': "'center'",
    'font-size': _empty,
    'border-color': _empty,
    'text-color': _empty,
    'custom-style': _empty
  },
  MauiEmpty: {
    description: _empty,
    image: "'default'"
  },
  MauiField: {
    value: _empty,
    label: _empty,
    error: _false,
    disabled: _false,
    placeholder: _empty,
    'placeholder-style': _empty,
    focus: _false,
    'adjust-position': _true,
    password: _false,
    'confirm-hold': _false,
    type: "'text'",
    'confirm-type': "'done'",
    'cursor-spacing': _zero,
    'input-align': "'left'",
    'error-message': _empty,
    'show-word-limit': _false,
    'error-message-align': "'left'",
    autosize: _false,
    maxlength: '140',
    bindInput: _empty,
    bindFocus: _empty,
    bindBlur: _empty,
    bindConfirm: _empty,
    bindLineChange: _empty
  },
  MauiIcon: {
    dot: _false,
    info: _empty,
    size: "'16px'",
    color: _empty,
    'custom-style': _empty,
    'class-prefix': "'maui-icon'",
    name: _empty,
    bindClick: _empty
  },
  MauiImage: {
    src: _empty,
    round: _false,
    width: _empty,
    height: _empty,
    radius: _empty,
    mode: "'scaleToFill'",
    'show-error': _true,
    'show-loading': _true,
    bindLoad: _empty,
    bindError: _empty,
    bindClick: _empty
  },
  MauiLoading: {
    color: "'#c9c9c9'",
    type: "'circular'",
    size: "'30px'",
    'text-size': "'14px'",
    vertical: _false,
    'custom-style': _empty
  },
  MauiOverlay: {
    show: _false,
    'z-index': '1',
    duration: '300',
    'custom-style': _empty,
    'lock-scroll': _true,
    bindClick: _empty
  },
  MauiPopup: {
    show: _false,
    duration: '300',
    closeable: _false,
    'overlay-style': _empty,
    'custom-style': _empty,
    round: _false,
    transition: _empty,
    'z-index': '100',
    overlay: _true,
    position: "'center'",
    'close-icon': "'cancel'",
    'close-icon-position': "'top-right'",
    'close-on-click-overlay': _true,
    'safe-area-inset-bottom': _true,
    'safe-area-inset-top': _false,
    'lock-scroll': _true,
    bindClose: _empty,
    bindClickOverlay: _empty
  },
  MauiProgress: {
    inactive: _false,
    percentage: _zero,
    'pivot-text': _empty,
    'pivot-color': _empty,
    'track-color': _empty,
    'show-pivot': _true,
    color: "'#1989fa'",
    'text-color': "'#ffffff'",
    'stroke-width': "'4px'"
  },
  MauiRadio: {
    name: _empty,
    value: _empty,
    'custom-icon': "'success-white'",
    'icon-size': _empty,
    disabled: _false,
    'checked-color': _empty,
    'label-position': "'right'",
    'label-disabled': _false,
    shape: "'round'",
    bindChange: _empty
  },
  MauiRadioGroup: {
    value: _empty,
    direction: "'vertical'",
    disabled: _false,
    bindChange: _empty
  },
  MauiSidebar: {
    'active-key': _zero,
    bindChange: _empty
  },
  MauiSidebarItem: {
    dot: _false,
    badge: _empty,
    info: _empty,
    title: _empty,
    disabled: _false,
    bindClick: _empty
  },
  MauiSlider: {
    value: _zero,
    disabled: _false,
    'use-button-slot': _false,
    max: '100',
    min: _zero,
    'inactive-color': _empty,
    step: '1',
    vertical: _false,
    'bar-height': "'2px'",
    'active-color': _empty,
    bindDragStart: _empty,
    bindDragEnd: _empty,
    bindDrag: _empty,
    bindChange: _empty
  },
  MauiStepper: {
    value: '1',
    min: '1',
    max: _empty,
    step: '1',
    integer: _false,
    disabled: _false,
    'disable-input': _false,
    'async-change': _false,
    'input-width': _empty,
    'button-size': _empty,
    'show-plus': _true,
    'show-minus': _true,
    'decimal-length': _empty,
    theme: _empty,
    'long-press': _true,
    bindChange: _empty,
    bindOverlimit: _empty,
    bindPlus: _empty,
    bindMinus: _empty,
    bindFocus: _empty,
    bindBlur: _empty
  },
  MauiSteps: {
    steps: '[]',
    active: _zero,
    direction: "'horizontal'",
    'active-color': "'#07c160'",
    'inactive-color': "'#969799'",
    'active-icon': "'success-black'",
    'inactive-icon': _empty,
    bindClickStep: _empty
  },
  MauiSticky: {
    'z-index': '99',
    'offset-top': _zero,
    disabled: _false,
    container: _empty,
    'scroll-top': _zero,
    bindScroll: _empty
  },
  MauiSwitch: {
    checked: _false,
    loading: _false,
    disabled: _false,
    size: "'30px'",
    'active-color': "'#1989fa'",
    'inactive-color': "'#ffffff'",
    'active-value': _true,
    'inactive-value': _false,
    bindChange: _empty
  },
  MauiTab: {
    dot: _false,
    info: _empty,
    title: _empty,
    disabled: _false,
    'title-style': _empty,
    name: _empty
  },
  MauiTabs: {
    color: _empty,
    sticky: _false,
    border: _true,
    swipeable: _false,
    'custom-style': _empty,
    'title-active-color': _empty,
    'title-inactive-color': _empty,
    type: "'line'",
    active: _zero,
    'z-index': '99',
    animated: _false,
    ellipsis: _true,
    duration: '0.3',
    'offset-top': _zero,
    'line-width': "'40px'",
    'line-height': "'3px'",
    'lazy-render': _true,
    'swipe-threshold': '5',
    bindClick: _empty,
    bindChange: _empty,
    bindDisabled: _empty,
    bindScroll: _empty
  },
  MauiTag: {
    size: _empty,
    mark: _false,
    color: _empty,
    plain: _false,
    round: _false,
    'text-color': _empty,
    type: "'default'",
    closeable: _false,
    bindClose: _empty
  },
  MauiTitleBar: {
    title: _empty,
    'title-style': _empty,
    fixed: _false,
    placeholder: _false,
    'left-text': _empty,
    'right-text': _empty,
    'custom-style': _empty,
    'left-arrow': _false,
    'left-icon': _empty,
    'left-image': _empty,
    border: _true,
    'z-index': '99',
    'safe-area-inset-top': _true,
    'use-slot': _false,
    bindClickLeft: _empty,
    bindClickRight: _empty
  },
  MauiToast: {
    show: _false,
    type: "'text'",
    mask: _false,
    'z-index': '1000',
    duration: '2000',
    position: "'middle'",
    'forbid-click': _false,
    'loading-type': "'circular'",
    message: _empty,
    bindClose: _empty
  },
  MauiModal: {
    visible: _false,
    title: _empty,
    content: _empty,
    type: "'default'",
    closable: _false,
    'primary-button-text': _empty,
    'secondary-button-text': _empty,
    'cancel-button-text': _empty,
    bindClose: _empty,
    bindPrimaryButtonTap: _empty,
    bindSecondaryButtonTap: _empty,
    bindCancelButtonTap: _empty
  },
  MauiList: {
    header: _empty,
    footer: _empty,
    radius: _false
  },
  MauiListItem: {
    title: _empty,
    brief: _empty,
    extra: _empty,
    'extra-brief': _empty,
    arrow: _empty,
    disabled: _false,
    'show-divider': _true,
    image: _empty,
    bindClick: _empty
  }
}

/**
 * Combined Component Prop Definitions (Native Macle built-ins only)
 * Note: MAUI components are registered separately via thirdPartyComponents
 * to ensure uncompressed property mapping and standard custom element lifecycle.
 */
export const components: Record<string, Record<string, string>> = {
  ...nativeComponents
}
