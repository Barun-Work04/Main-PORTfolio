module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/loading.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/loading.tsx [app-rsc] (ecmascript)"));
}),
"[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/components/color-bends.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Aurora
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'ogl'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;
const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;
function Aurora(props) {
    const { colorStops = [
        '#5227FF',
        '#7cff67',
        '#5227FF'
    ], amplitude = 1.0, blend = 0.5 } = props;
    const propsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRef"])(props);
    propsRef.current = props;
    const ctnDom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const ctn = ctnDom.current;
        if (!ctn) return;
        const renderer = new Renderer({
            alpha: true,
            premultipliedAlpha: true,
            antialias: true
        });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.canvas.style.backgroundColor = 'transparent';
        let program;
        function resize() {
            if (!ctn) return;
            const width = ctn.offsetWidth;
            const height = ctn.offsetHeight;
            renderer.setSize(width, height);
            if (program) {
                program.uniforms.uResolution.value = [
                    width,
                    height
                ];
            }
        }
        window.addEventListener('resize', resize);
        const geometry = new Triangle(gl);
        if (geometry.attributes.uv) {
            delete geometry.attributes.uv;
        }
        const colorStopsArray = colorStops.map((hex)=>{
            const c = new Color(hex);
            return [
                c.r,
                c.g,
                c.b
            ];
        });
        program = new Program(gl, {
            vertex: VERT,
            fragment: FRAG,
            uniforms: {
                uTime: {
                    value: 0
                },
                uAmplitude: {
                    value: amplitude
                },
                uColorStops: {
                    value: colorStopsArray
                },
                uResolution: {
                    value: [
                        ctn.offsetWidth,
                        ctn.offsetHeight
                    ]
                },
                uBlend: {
                    value: blend
                }
            }
        });
        const mesh = new Mesh(gl, {
            geometry,
            program
        });
        ctn.appendChild(gl.canvas);
        let animateId = 0;
        const update = (t)=>{
            animateId = requestAnimationFrame(update);
            const { time = t * 0.01, speed = 1.0 } = propsRef.current;
            if (program) {
                program.uniforms.uTime.value = time * speed * 0.1;
                program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;
                program.uniforms.uBlend.value = propsRef.current.blend ?? blend;
                const stops = propsRef.current.colorStops ?? colorStops;
                program.uniforms.uColorStops.value = stops.map((hex)=>{
                    const c = new Color(hex);
                    return [
                        c.r,
                        c.g,
                        c.b
                    ];
                });
                renderer.render({
                    scene: mesh
                });
            }
        };
        animateId = requestAnimationFrame(update);
        resize();
        return ()=>{
            cancelAnimationFrame(animateId);
            window.removeEventListener('resize', resize);
            if (ctn && gl.canvas.parentNode === ctn) {
                ctn.removeChild(gl.canvas);
            }
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
    }, [
        amplitude
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ctnDom,
        className: "w-full h-full"
    }, void 0, false, {
        fileName: "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/components/color-bends.tsx",
        lineNumber: 208,
        columnNumber: 10
    }, this);
}
}),
"[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/components/navigation/bubble-menu.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "BubbleMenu",
    ()=>BubbleMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const BubbleMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call BubbleMenu() from the server but BubbleMenu is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/components/navigation/bubble-menu.tsx <module evaluation>", "BubbleMenu");
}),
"[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/components/navigation/bubble-menu.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "BubbleMenu",
    ()=>BubbleMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const BubbleMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call BubbleMenu() from the server but BubbleMenu is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/components/navigation/bubble-menu.tsx", "BubbleMenu");
}),
"[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/components/navigation/bubble-menu.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$components$2f$navigation$2f$bubble$2d$menu$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/components/navigation/bubble-menu.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$components$2f$navigation$2f$bubble$2d$menu$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/components/navigation/bubble-menu.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$components$2f$navigation$2f$bubble$2d$menu$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AboutPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$components$2f$color$2d$bends$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/components/color-bends.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$components$2f$navigation$2f$bubble$2d$menu$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/components/navigation/bubble-menu.tsx [app-rsc] (ecmascript)");
;
;
;
function AboutPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$components$2f$color$2d$bends$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                colors: [
                    "#ff5c7a",
                    "#8a5cff",
                    "#00ffd1"
                ],
                rotation: 30,
                speed: 0.3,
                scale: 1.2,
                frequency: 1.4,
                warpStrength: 1.2,
                mouseInfluence: 0.8,
                parallax: 0.6,
                noise: 0.08,
                transparent: true
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$components$2f$navigation$2f$bubble$2d$menu$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BubbleMenu"], {}, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 min-h-screen flex items-center justify-center p-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "font-heading text-6xl md:text-7xl font-bold mb-12 text-white text-center",
                            children: "About Me"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-8 text-lg md:text-xl leading-relaxed backdrop-blur-xl bg-card/30 p-12 rounded-3xl border border-primary/20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "My name is ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-accent font-semibold",
                                            children: " Barun Sahoo"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx",
                                            lineNumber: 28,
                                            columnNumber: 26
                                        }, this),
                                        ", and my relationship with technology has always been rooted in curiosity. What began as a simple urge to understand how websites function gradually evolved into a deeper commitment to building complete, well-structured systems. Today, I work across full-stack web development, designing intuitive frontends, developing reliable backend architectures, and shaping applications that feel cohesive, scalable, and intentional."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx",
                                    lineNumber: 27,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "As my technical foundation strengthened, I found myself drawn toward artificial intelligence and machine learning. Rather than treating AI as a separate domain, I explored how intelligent systems could naturally integrate into real products. This led me to work with data pipelines, machine learning models, and",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-accent font-semibold",
                                            children: " CNN-based facial emotion recognition"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx",
                                            lineNumber: 39,
                                            columnNumber: 15
                                        }, this),
                                        " systems, applying them to practical problems where intelligence enhances usability rather than complicates it."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Along the way, professional experiences exposed me to real-world development environments where I contributed across both frontend and backend workflows. I worked on building features, structuring logic, and supporting systems that required consistency, performance, and clarity. In parallel, I explored AI-assisted workflows and AI-powered content and video creation, learning how technical execution and creative storytelling can complement each other when aligned with purpose."
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "Beyond engineering, I stepped into leadership and coordination roles that shaped how I approach teamwork and responsibility. Managing digital platforms, collaborating on public-facing initiatives, and contributing to large-scale conclaves taught me that strong technical solutions emerge not just from clean code, but from communication, ownership, and shared vision. I have actively taken leadership and communication roles through ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-primary font-semibold",
                                            children: "Citizen for Public Leadership (CPL)"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx",
                                            lineNumber: 56,
                                            columnNumber: 23
                                        }, this),
                                        ", where I managed digital presence, coordinated campaigns, and worked as a core member of the CPL Policy Conclave 2025 in Delhi."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "I am currently pursuing my engineering degree at",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$PORTFOLIO$2d$PROFESSIONAL$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-primary font-semibold",
                                            children: " Sikkim Manipal Institute of Technology"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx",
                                            lineNumber: 63,
                                            columnNumber: 15
                                        }, this),
                                        " (2023–2027), where I continue to refine my skills in full-stack development and AI/ML while expanding my understanding of system design and product thinking. Looking ahead, I am focused on building technology that is thoughtful, intelligent, and durable — systems that solve real problems and grow gracefully over time."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}),
"[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/OneDrive/Desktop/PORTFOLIO-PROFESSIONAL/app/about/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__46789338._.js.map