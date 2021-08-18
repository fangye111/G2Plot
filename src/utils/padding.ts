import { Types } from '@antv/g2';
import { isNumber, isArray } from '@antv/util';

/**
 * 把 padding 转换成统一的数组写法
 * @param padding
 */
export function normalPadding(padding: number | number[] | 'auto'): [number, number, number, number] {
  if (isNumber(padding)) {
    return [padding, padding, padding, padding];
  }
  if (isArray(padding)) {
    const length = padding.length;

    if (length === 1) {
      return [padding[0], padding[0], padding[0], padding[0]];
    }
    if (length === 2) {
      return [padding[0], padding[1], padding[0], padding[1]];
    }
    if (length === 3) {
      return [padding[0], padding[1], padding[2], padding[1]];
    }
    if (length === 4) {
      return padding as [number, number, number, number];
    }
  }

  return [0, 0, 0, 0];
}

/**
 * 获取调整的 appendPadding
 */
export function getAdjustAppendPadding(padding: Types.ViewAppendPadding, position = 'bottom', append = 25) {
  const currentAppendPadding = normalPadding(padding);

  const PADDING = [
    position.startsWith('top') ? append : 0,
    position.startsWith('right') ? append : 0,
    position.startsWith('bottom') ? append : 0,
    position.startsWith('left') ? append : 0,
  ];
  return [
    currentAppendPadding[0] + PADDING[0],
    currentAppendPadding[1] + PADDING[1],
    currentAppendPadding[2] + PADDING[2],
    currentAppendPadding[3] + PADDING[3],
  ];
}
