import { useState, useCallback } from 'react';
export function useInputValue(initialValue = '') {
    const [value, setValue] = useState(initialValue);
    const onChange = useCallback((e) => setValue(e.target.value), []);
    return { value, onChange };
}
//# sourceMappingURL=index.js.map