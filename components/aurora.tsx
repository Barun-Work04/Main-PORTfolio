"use client"
import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

out vec4 fragColor;

// Simplex noise function
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
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

// Rotation matrix
mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

// Full Spectrum Palette: Blue -> Cyan -> Green -> Yellow -> Orange -> Red -> Violet
vec3 spectrum(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557); // Iridescent palette
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    // Correct aspect ratio
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;
    
    // Diagonal rotation for the "sweeping" feel - approx 45 degrees
    uv *= rot(0.5); 
    
    // Mouse influence (Warp)
    vec2 mouse = uMouse * 0.1; // Gentle influence
    
    vec3 finalColor = vec3(0.0);
    
    // Create layers of sine waves / ribbons
  for(float i = 0.0; i < 3.0; i++) {
        // Space out the ribbons
        float z = i * 0.15 + 0.5;
        
        // Fluid Motion: Distort coordinate with noise + time
        float noiseVal = snoise(uv * 0.5 + uTime * 0.05 + float(i) * 0.2 + mouse);
        
        // The Arc shape: Sine wave disturbed by noise
        float dist = sin(uv.y * 1.5 + noiseVal * 2.0 + uTime * 0.1);
        
        // Thickness / Glow
    float intensity = 0.25 / abs(dist + 0.1);
        
        // Soft falloff
        intensity = pow(intensity, 1.2);
        
        // Color mapping based on position and time
        // This traverses the spectrum across the screen
        vec3 col = spectrum(uv.y * 0.2 + i * 0.2 + uTime * 0.05);
        
    finalColor += col * intensity * 0.10; // Accumulate light, slightly dimmer
    }
    
    // Vignette / Soft Edges to fade out
    // (This is implicitly handled by the sine wave receding, but we can add atmosphere)
    
    // Tone mapping to prevent harsh burnouts
  finalColor = smoothstep(0.0, 1.0, finalColor);

  // Slight transparency to soften overall look
  fragColor = vec4(finalColor, 0.6);
}
`;

interface AuroraProps {
  colorStops?: string[]; // Kept for prop compatibility
  blend?: number; // Kept for prop compatibility
  amplitude?: number; // Kept for prop compatibility
  speed?: number;
}

export default function Aurora(props: AuroraProps) {
  const { speed = 1.0 } = props;
  const propsRef = useRef<AuroraProps>(props);
  propsRef.current = props;

  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0); 
    gl.enable(gl.BLEND);
    // Softer additive blending that respects alpha
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    
    let program: Program | undefined;

    function resize() {
      if (!ctn) return;
      // Force full coverage including scrollbars/safe areas if needed
      // but offsetWidth/Height usually fine for a div
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }
    window.addEventListener('resize', resize);
    
    const mouse = { current: { x: 0, y: 0 }, target: { x: 0, y: 0 } };
    
    function handleMouseMove(e: MouseEvent) {
      mouse.target.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.target.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener('mousemove', handleMouseMove);
    
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uMouse: { value: [0, 0] }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    let animateId = 0;
    const update = (t: number) => {
      animateId = requestAnimationFrame(update);
      const { speed = 1.0 } = propsRef.current;
      
      mouse.current.x = lerp(mouse.current.x, mouse.target.x, 0.05);
      mouse.current.y = lerp(mouse.current.y, mouse.target.y, 0.05);

      if (program) {
        // Slow time progression
        program.uniforms.uTime.value = t * 0.001 * speed * 0.2; 
        program.uniforms.uMouse.value = [mouse.current.x, mouse.current.y];
        renderer.render({ scene: mesh });
      }
    };
    animateId = requestAnimationFrame(update);

    resize();

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <div ref={ctnDom} className="absolute inset-0 w-full h-full pointer-events-none -z-10" />;
}
