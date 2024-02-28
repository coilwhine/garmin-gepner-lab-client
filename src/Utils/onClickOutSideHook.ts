import { useEffect } from "react";

export function useOnClickOutside(ref: any, handler: any) {
    useEffect(
        () => {
            const listener = (event: any) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mouseup", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mouseup", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
    );
}