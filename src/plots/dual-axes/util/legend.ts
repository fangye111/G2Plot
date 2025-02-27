import { reduce, get, isEmpty, isFunction } from '@antv/util';
import { View, Util } from '@antv/g2';
import { deepAssign, findGeometry } from '../../../utils';
import { GeometryOption } from '../types';
import { Legend } from '../../../types/legend';
import { isLine } from './option';

/**
 * 获取 view 的 legendItem，供存在不含有 seriesField 的图形使用
 * @param params
 */
export function getViewLegendItems(params: {
  view: View;
  yField: string;
  geometryOption: GeometryOption;
  legend: Legend;
}) {
  const { view, geometryOption, yField, legend } = params;
  const userMarker = get(legend, 'marker');

  const geometry = findGeometry(view, isLine(geometryOption) ? 'line' : 'interval');
  if (!geometryOption.seriesField) {
    const legendItemName = get(view, `options.scales.${yField}.alias`) || yField;
    // 返回 g2 设置的图例
    const colorAttribute = geometry.getAttribute('color');
    const color = Util.getMappingValue(colorAttribute, legendItemName, colorAttribute.values[0]);

    const marker =
      (isFunction(userMarker)
        ? userMarker
        : !isEmpty(userMarker) &&
          deepAssign(
            {},
            {
              style: {
                stroke: color,
                fill: color,
              },
            },
            userMarker
          )) ||
      (isLine(geometryOption)
        ? {
            symbol: (x: number, y: number, r: number) => {
              return [
                ['M', x - r, y],
                ['L', x + r, y],
              ];
            },
            style: {
              lineWidth: 2,
              r: 6,
              stroke: color,
            },
          }
        : {
            symbol: 'square',
            style: {
              fill: color,
            },
          });
    return [
      {
        value: yField,
        name: legendItemName,
        marker,
        isGeometry: true,
        viewId: view.id,
      },
    ];
  }

  const attributes = geometry.getGroupAttributes();
  return reduce(
    attributes,
    (items, attr) => {
      const attrItems = Util.getLegendItems(view, geometry, attr, view.getTheme(), userMarker);
      return items.concat(attrItems);
    },
    []
  );
}
