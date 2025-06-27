import { useAnimate, stagger } from "framer-motion";

export const useShakeAnimation = () => {
    const [scope, animate] = useAnimate();

    const triggerShake = (selector: string) => {
        animate(
            selector,
            { x: [-10, 0, 10, 0] },
            { type: "tween", duration: 0.2, delay: stagger(0.05) },
        );
    };

    return { scope, triggerShake };
};
