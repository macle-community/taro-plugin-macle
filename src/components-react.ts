import type * as React from 'react'

// Standard Macle Native Components
export const View = 'view'
export const Icon = 'icon'
export const Progress = 'progress'
export const RichText = 'rich-text'
export const Text = 'text'
export const Button = 'button'
export const Checkbox = 'checkbox'
export const CheckboxGroup = 'checkbox-group'
export const Form = 'form'
export const Input = 'input'
export const Label = 'label'
export const Picker = 'picker'
export const PickerView = 'picker-view'
export const PickerViewColumn = 'picker-view-column'
export const Radio = 'radio'
export const RadioGroup = 'radio-group'
export const Slider = 'slider'
export const Switch = 'switch'
export const CoverImage = 'cover-image'
export const Textarea = 'textarea'
export const CoverView = 'cover-view'
export const ScrollView = 'scroll-view'
export const Swiper = 'swiper'
export const SwiperItem = 'swiper-item'
export const Navigator = 'navigator'
export const Audio = 'audio'
export const Camera = 'camera'
export const Image = 'image'
export const Video = 'video'
export const WebView = 'web-view'
export const Block = 'block'
export const Map = 'map'
export const Slot = 'slot'
export const NativeSlot = 'native-slot'
export const CustomWrapper = 'custom-wrapper'
export const PageMeta = 'page-meta'

// ============================================================================
// Macle UI Component Library (MAUI) Constants
// ============================================================================
export const MauiButton = 'maui-button'
export const MauiCell = 'maui-cell'
export const MauiCellGroup = 'maui-cell-group'
export const MauiCheckbox = 'maui-checkbox'
export const MauiCheckboxGroup = 'maui-checkbox-group'
export const MauiCol = 'maui-col'
export const MauiRow = 'maui-row'
export const MauiDialog = 'maui-dialog'
export const MauiDivider = 'maui-divider'
export const MauiEmpty = 'maui-empty'
export const MauiField = 'maui-field'
export const MauiIcon = 'maui-icon'
export const MauiImage = 'maui-image'
export const MauiLoading = 'maui-loading'
export const MauiOverlay = 'maui-overlay'
export const MauiPopup = 'maui-popup'
export const MauiProgress = 'maui-progress'
export const MauiRadio = 'maui-radio'
export const MauiRadioGroup = 'maui-radio-group'
export const MauiSidebar = 'maui-sidebar'
export const MauiSidebarItem = 'maui-sidebar-item'
export const MauiSlider = 'maui-slider'
export const MauiStepper = 'maui-stepper'
export const MauiSteps = 'maui-steps'
export const MauiSticky = 'maui-sticky'
export const MauiSwitch = 'maui-switch'
export const MauiTab = 'maui-tab'
export const MauiTabs = 'maui-tabs'
export const MauiTag = 'maui-tag'
export const MauiTitleBar = 'maui-title-bar'
export const MauiToast = 'maui-toast'
export const MauiModal = 'maui-modal'
export const MauiList = 'maui-list'
export const MauiListItem = 'maui-list-item'

// ============================================================================
// TypeScript Prop Types for MAUI Components
// ============================================================================

export interface MauiBaseProps {
  id?: string
  className?: string
  style?: string | React.CSSProperties
  customStyle?: string
  children?: React.ReactNode
  key?: React.Key
}

export interface MauiButtonProps extends MauiBaseProps {
  type?: 'default' | 'primary' | 'info' | 'warning' | 'danger'
  size?: 'normal' | 'large' | 'small' | 'mini'
  plain?: boolean
  block?: boolean
  round?: boolean
  square?: boolean
  loading?: boolean
  hairline?: boolean
  disabled?: boolean
  loadingText?: string
  loadingType?: 'circular' | 'spinner'
  loadingSize?: string
  color?: string
  icon?: string
  formType?: string
  onClick?: (event: any) => void
}

export interface MauiCellProps extends MauiBaseProps {
  title?: React.ReactNode
  value?: React.ReactNode
  size?: string
  label?: string
  center?: boolean
  required?: boolean
  clickable?: boolean
  titleWidth?: string
  icon?: string
  border?: boolean
  titleStyle?: string
  onClick?: (event: any) => void
}

export interface MauiCellGroupProps extends MauiBaseProps {
  title?: string
  border?: boolean
}

export interface MauiCheckboxProps extends MauiBaseProps {
  name?: any
  value?: any
  customIcon?: string
  iconSize?: string | number
  disabled?: boolean
  checkedColor?: string
  labelPosition?: 'left' | 'right'
  labelDisabled?: boolean
  shape?: 'round' | 'square'
  onChange?: (event: any) => void
}

export interface MauiCheckboxGroupProps extends MauiBaseProps {
  value?: any[]
  max?: number
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
  onChange?: (event: any) => void
}

export interface MauiColProps extends MauiBaseProps {
  span?: number | string
  offset?: number | string
}

export interface MauiRowProps extends MauiBaseProps {
  gutter?: number | string
}

export interface MauiDialogProps extends MauiBaseProps {
  show?: boolean
  title?: string
  titleStyle?: string
  message?: string
  messageStyle?: string
  theme?: string
  messageAlign?: 'left' | 'center' | 'right'
  overlayStyle?: string
  useSlot?: boolean
  showCancelButton?: boolean
  closeOnClickOverlay?: boolean
  width?: string
  zIndex?: number
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonColor?: string
  cancelButtonColor?: string
  showConfirmButton?: boolean
  overlay?: boolean
  onClose?: (event?: any) => void
  onConfirm?: (event?: any) => void
  onCancel?: (event?: any) => void
}

export interface MauiDividerProps extends MauiBaseProps {
  dashed?: boolean
  hairline?: boolean
  contentPosition?: 'left' | 'center' | 'right'
  fontSize?: string
  borderColor?: string
  textColor?: string
}

export interface MauiEmptyProps extends MauiBaseProps {
  description?: string
  image?: 'default' | 'error' | 'network' | 'search' | string
}

export interface MauiFieldProps extends MauiBaseProps {
  value?: string
  label?: string
  error?: boolean
  disabled?: boolean
  placeholder?: string
  placeholderStyle?: string
  focus?: boolean
  adjustPosition?: boolean
  password?: boolean
  confirmHold?: boolean
  type?: 'text' | 'number' | 'idcard' | 'digit'
  confirmType?: 'done' | 'go' | 'next' | 'search' | 'send'
  cursorSpacing?: number
  inputAlign?: 'left' | 'center' | 'right'
  errorMessage?: string
  showWordLimit?: boolean
  errorMessageAlign?: 'left' | 'center' | 'right'
  autosize?: boolean
  maxlength?: number
  onInput?: (event: any) => void
  onFocus?: (event: any) => void
  onBlur?: (event: any) => void
  onConfirm?: (event: any) => void
  onLineChange?: (event: any) => void
}

export interface MauiIconProps extends MauiBaseProps {
  name: string
  dot?: boolean
  info?: string | number
  size?: string
  color?: string
  classPrefix?: string
  onClick?: (event: any) => void
}

export interface MauiImageProps extends MauiBaseProps {
  src: string
  round?: boolean
  width?: string | number
  height?: string | number
  radius?: string | number
  mode?: string
  showError?: boolean
  showLoading?: boolean
  onLoad?: (event: any) => void
  onError?: (event: any) => void
  onClick?: (event: any) => void
}

export interface MauiLoadingProps extends MauiBaseProps {
  color?: string
  type?: 'circular' | 'spinner'
  size?: string
  textSize?: string
  vertical?: boolean
}

export interface MauiOverlayProps extends MauiBaseProps {
  show?: boolean
  zIndex?: number
  duration?: number | string
  lockScroll?: boolean
  onClick?: (event: any) => void
}

export interface MauiPopupProps extends MauiBaseProps {
  show?: boolean
  duration?: number | string
  closeable?: boolean
  overlayStyle?: string
  round?: boolean
  transition?: string
  zIndex?: number
  overlay?: boolean
  position?: 'top' | 'bottom' | 'right' | 'left' | 'center'
  closeIcon?: string
  closeIconPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  closeOnClickOverlay?: boolean
  safeAreaInsetBottom?: boolean
  safeAreaInsetTop?: boolean
  lockScroll?: boolean
  onClose?: (event?: any) => void
  onClickOverlay?: (event?: any) => void
}

export interface MauiProgressProps extends MauiBaseProps {
  inactive?: boolean
  percentage: number
  pivotText?: string
  pivotColor?: string
  trackColor?: string
  showPivot?: boolean
  color?: string
  textColor?: string
  strokeWidth?: string | number
}

export interface MauiRadioProps extends MauiBaseProps {
  name?: any
  value?: any
  customIcon?: string
  iconSize?: string | number
  disabled?: boolean
  checkedColor?: string
  labelPosition?: 'left' | 'right'
  labelDisabled?: boolean
  shape?: 'round' | 'square'
  onChange?: (event: any) => void
}

export interface MauiRadioGroupProps extends MauiBaseProps {
  value?: any
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
  onChange?: (event: any) => void
}

export interface MauiSidebarProps extends MauiBaseProps {
  activeKey?: number
  onChange?: (event: any) => void
}

export interface MauiSidebarItemProps extends MauiBaseProps {
  dot?: boolean
  badge?: string | number
  info?: string | number
  title?: string
  disabled?: boolean
  onClick?: (event: any) => void
}

export interface MauiSliderProps extends MauiBaseProps {
  value?: number
  disabled?: boolean
  useButtonSlot?: boolean
  max?: number
  min?: number
  inactiveColor?: string
  step?: number
  vertical?: boolean
  barHeight?: string
  activeColor?: string
  onChange?: (event: any) => void
  onDrag?: (event: any) => void
}

export interface MauiStepperProps extends MauiBaseProps {
  value?: number | string
  min?: number | string
  max?: number | string
  step?: number | string
  integer?: boolean
  disabled?: boolean
  disableInput?: boolean
  asyncChange?: boolean
  inputWidth?: string
  buttonSize?: string
  showPlus?: boolean
  showMinus?: boolean
  decimalLength?: number
  theme?: string
  longPress?: boolean
  onChange?: (event: any) => void
  onOverlimit?: (event: any) => void
  onPlus?: (event: any) => void
  onMinus?: (event: any) => void
}

export interface MauiStepsProps extends MauiBaseProps {
  steps: any[]
  active: number
  direction?: 'horizontal' | 'vertical'
  activeColor?: string
  inactiveColor?: string
  activeIcon?: string
  inactiveIcon?: string
  onClickStep?: (event: any) => void
}

export interface MauiStickyProps extends MauiBaseProps {
  zIndex?: number
  offsetTop?: number
  disabled?: boolean
  container?: any
  scrollTop?: number
  onScroll?: (event: any) => void
}

export interface MauiSwitchProps extends MauiBaseProps {
  checked?: boolean
  loading?: boolean
  disabled?: boolean
  size?: string
  activeColor?: string
  inactiveColor?: string
  activeValue?: any
  inactiveValue?: any
  onChange?: (event: any) => void
}

export interface MauiTabProps extends MauiBaseProps {
  dot?: boolean
  info?: string | number
  title: string
  disabled?: boolean
  titleStyle?: string
  name?: string | number
}

export interface MauiTabsProps extends MauiBaseProps {
  color?: string
  sticky?: boolean
  border?: boolean
  swipeable?: boolean
  titleActiveColor?: string
  titleInactiveColor?: string
  type?: 'line' | 'card'
  active?: number | string
  zIndex?: number
  animated?: boolean
  ellipsis?: boolean
  duration?: number
  offsetTop?: number
  lineWidth?: string
  lineHeight?: string
  lazyRender?: boolean
  swipeThreshold?: number
  onClick?: (event: any) => void
  onChange?: (event: any) => void
  onDisabled?: (event: any) => void
}

export interface MauiTagProps extends MauiBaseProps {
  size?: 'medium' | 'large' | string
  mark?: boolean
  color?: string
  plain?: boolean
  round?: boolean
  textColor?: string
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  closeable?: boolean
  onClose?: (event: any) => void
}

export interface MauiTitleBarProps extends MauiBaseProps {
  title?: string
  titleStyle?: string
  fixed?: boolean
  placeholder?: boolean
  leftText?: string
  rightText?: string
  leftArrow?: boolean
  leftIcon?: string
  leftImage?: string
  border?: boolean
  zIndex?: number
  safeAreaInsetTop?: boolean
  useSlot?: boolean
  onClickLeft?: (event: any) => void
  onClickRight?: (event: any) => void
}

export interface MauiToastProps extends MauiBaseProps {
  show?: boolean
  type?: 'text' | 'loading' | 'success' | 'fail' | 'html'
  mask?: boolean
  zIndex?: number
  duration?: number
  position?: 'top' | 'middle' | 'bottom'
  forbidClick?: boolean
  loadingType?: 'circular' | 'spinner'
  message?: string
  onClose?: (event?: any) => void
}

export interface MauiModalProps extends MauiBaseProps {
  visible?: boolean
  title?: string
  content?: string
  type?: 'default' | 'focus' | string
  closable?: boolean
  primaryButtonText?: string
  secondaryButtonText?: string
  cancelButtonText?: string
  onClose?: (event?: any) => void
  onPrimaryButtonTap?: (event?: any) => void
  onSecondaryButtonTap?: (event?: any) => void
  onCancelButtonTap?: (event?: any) => void
}

export interface MauiListProps extends MauiBaseProps {
  header?: string
  footer?: string
  radius?: boolean
}

export interface MauiListItemProps extends MauiBaseProps {
  title?: React.ReactNode
  brief?: string
  extra?: string
  extraBrief?: string
  arrow?: 'right' | 'up' | 'down' | string
  disabled?: boolean
  showDivider?: boolean
  image?: string
  onClick?: (event: any) => void
}

// Augment JSX.IntrinsicElements for lowercase custom elements (<maui-button>, etc.)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'maui-button': MauiButtonProps
      'maui-cell': MauiCellProps
      'maui-cell-group': MauiCellGroupProps
      'maui-checkbox': MauiCheckboxProps
      'maui-checkbox-group': MauiCheckboxGroupProps
      'maui-col': MauiColProps
      'maui-row': MauiRowProps
      'maui-dialog': MauiDialogProps
      'maui-divider': MauiDividerProps
      'maui-empty': MauiEmptyProps
      'maui-field': MauiFieldProps
      'maui-icon': MauiIconProps
      'maui-image': MauiImageProps
      'maui-loading': MauiLoadingProps
      'maui-overlay': MauiOverlayProps
      'maui-popup': MauiPopupProps
      'maui-progress': MauiProgressProps
      'maui-radio': MauiRadioProps
      'maui-radio-group': MauiRadioGroupProps
      'maui-sidebar': MauiSidebarProps
      'maui-sidebar-item': MauiSidebarItemProps
      'maui-slider': MauiSliderProps
      'maui-stepper': MauiStepperProps
      'maui-steps': MauiStepsProps
      'maui-sticky': MauiStickyProps
      'maui-switch': MauiSwitchProps
      'maui-tab': MauiTabProps
      'maui-tabs': MauiTabsProps
      'maui-tag': MauiTagProps
      'maui-title-bar': MauiTitleBarProps
      'maui-toast': MauiToastProps
      'maui-modal': MauiModalProps
      'maui-list': MauiListProps
      'maui-list-item': MauiListItemProps
    }
  }
}
