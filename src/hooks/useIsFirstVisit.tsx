import { useEffect } from "react";

export function useTrackFirstVisit(onFirstVisit: () => void) {
    useEffect(() => {
        const key = "visited";
        if (!localStorage.getItem(key)) {
            onFirstVisit();
            localStorage.setItem(key, "true");
        }
    }, [onFirstVisit]);
}
