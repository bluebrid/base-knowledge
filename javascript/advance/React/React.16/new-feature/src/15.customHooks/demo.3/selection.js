import { useReducer, useCallback } from 'react';
import union from 'lodash/union';
import without from 'lodash/without';
import difference from 'lodash/difference';
import range from 'lodash/range';
const DEFAULT_OPTIONS = {
    multiple: false,
    range: false,
};
const getActionType = (e, options = DEFAULT_OPTIONS) => {
    if (!e) {
        return 'single';
    }
    if (e.shiftKey) {
        return options.range ? 'range' : 'single';
    }
    if (e.metaKey || e.ctrlKey) {
        return options.multiple ? 'multiple' : 'single';
    }
    return 'single';
};
const toggleSingleSelected = (selected, target) => {
    if (selected.includes(target)) {
        return without(selected, target);
    }
    return selected.concat(target);
};
export function useSelection(initialSelection = [], options) {
    const [{ selected }, dispatch] = useReducer((state, action) => {
        const { rangeStart, rangeEnd, selected } = state;
        const { type, payload } = action;
        if (type === 'range') {
            if (rangeEnd === undefined) {
                const extra = payload < rangeStart
                    ? range(payload, rangeStart + 1)
                    : range(rangeStart, payload + 1);
                return {
                    rangeStart,
                    rangeEnd: payload,
                    selected: union(selected, extra),
                };
            }
            else if (payload === rangeEnd) {
                return state;
            }
            else {
                const currentRange = range(Math.min(rangeStart, rangeEnd), Math.max(rangeStart, rangeEnd) + 1);
                const nextRange = range(Math.min(rangeStart, payload), Math.max(rangeStart, payload) + 1);
                const nextSelected = union(difference(selected, currentRange), nextRange);
                return {
                    rangeStart,
                    rangeEnd: payload,
                    selected: nextSelected,
                };
            }
        }
        const nextSelected = type === 'single' ? [payload] : toggleSingleSelected(selected, payload);
        return {
            rangeStart: payload,
            rangeEnd: undefined,
            selected: nextSelected,
        };
    }, { rangeStart: 0, rangeEnd: undefined, selected: initialSelection });
    const selectIndex = useCallback((index, e) => dispatch({ type: getActionType(e, options), payload: index }), [options]);
    return [selected, { selectIndex }];
}
//# sourceMappingURL=index.js.map