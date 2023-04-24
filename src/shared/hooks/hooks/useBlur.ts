import React, {useEffect} from "react";

const useBlur = <T extends HTMLElement, >(elementRef: React.RefObject<T>, onBlur: () => void) => {
    useEffect(() => {
        const root = document.getRootNode();
        const listener = (event: Event) => {
            if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
                onBlur();
            }
        }
        root.addEventListener("click", listener)
        return () => root.removeEventListener("click", listener)
    }, [])
}
export {useBlur};