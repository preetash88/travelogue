/**
 * routeBlock.ts
 *
 * Injects a full-screen cover div synchronously on the mousedown/touchstart
 * event — before React Router processes the click, before any re-render,
 * before any paint. This is the earliest possible moment in the browser's
 * event pipeline.
 *
 * Call initRouteBlock() once in main.tsx before React mounts.
 * Call showCover() from any link/button that triggers navigation.
 * RouteTransition calls hideCover() once its own curtain is up.
 */

let coverEl: HTMLDivElement | null = null;

export function showCover() {
    if (coverEl) return; // already showing
    const div = document.createElement("div");
    div.id = "__route-cover";
    div.style.cssText = [
        "position:fixed",
        "inset:0",
        "z-index:2147483647", // max possible z-index
        "background:#050816",
        "pointer-events:all",
    ].join(";");
    document.body.appendChild(div);
    coverEl = div;
}

export function hideCover() {
    if (!coverEl) return;
    coverEl.remove();
    coverEl = null;
}

export function isCoverVisible() {
    return coverEl !== null;
}
