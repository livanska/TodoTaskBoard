import { useEffect, useRef, useCallback } from "react";

export function useDebouncedCallback<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const fnRef = useRef(fn);

    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    return useCallback(
        (...args: Parameters<T>) => {
            timeoutRef.current && clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                fnRef.current(...args);
            }, delay);
        },
        [delay]
    );
}
