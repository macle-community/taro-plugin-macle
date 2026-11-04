const _true = 'true'
const _false = 'false'
const _empty = ''
const _zero = '0'
const _object = '{}'

/**
 * Macle Native Component Prop Definitions
 * Extracted and mapped from Macle's View Engine (view.js) and IDE Extension definitions.
 */
export const components: Record<string, Record<string, string>> = {
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
    'hover-class': "'button-hover'",
    'hover-stop-propagation': _false,
    'hover-start-time': '20',
    'hover-stay-time': '70'
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
    focus: _false,
    'confirm-type': "'done'",
    'confirm-hold': _false,
    cursor: '-1',
    'selection-start': '-1',
    'selection-end': '-1',
    'adjust-position': _true,
    'hold-keyboard': _false,
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
    'header-text': _empty,
    bindChange: _empty,
    bindCancel: _empty,
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
    'auto-height': _false,
    focus: _false,
    'auto-focus': _false,
    cursor: '-1',
    'selection-start': '-1',
    'selection-end': '-1',
    'adjust-position': _true,
    'hold-keyboard': _false,
    'disable-default-padding': _false,
    bindFocus: _empty,
    bindBlur: _empty,
    bindLineChange: _empty,
    bindInput: _empty,
    bindConfirm: _empty,
    bindKeyboardHeightChange: _empty
  },

  // Navigation
  Navigator: {
    url: _empty,
    'open-type': "'navigate'",
    delta: '1',
    'hover-class': "'navigator-hover'",
    'hover-stop-propagation': _false,
    'hover-start-time': '50',
    'hover-stay-time': '600'
  },

  // Media
  Image: {
    src: _empty,
    mode: "'scaleToFill'",
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
    direction: _empty,
    'show-progress': _true,
    'show-fullscreen-btn': _true,
    'show-play-btn': _true,
    'show-center-play-btn': _true,
    'enable-progress-gesture': _true,
    'object-fit': "'contain'",
    poster: _empty,
    'show-mute-btn': _false,
    'title': _empty,
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

  // Map
  Map: {
    longitude: _zero,
    latitude: _zero,
    scale: '16',
    markers: '[]',
    polyline: '[]',
    circles: '[]',
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
