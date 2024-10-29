import { useState } from "react";

const useRerender = () => {
    const [renderKey, setRenderKey] = useState<number>(0);
    const rerender = () => {
        setRenderKey(renderKey + 1);
    }
    return { renderKey, rerender };
}

export default useRerender;