import * as React from "react";

import { cn } from "#/lib/utils.ts";

const VERT_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG_SRC = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;
uniform float u_scroll;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / u_resolution;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / max(u_resolution.y, 1.0);

  float r = length(p);
  float a = atan(p.y, p.x);

  float spin = u_time * 0.12 + u_scroll * 2.5;
  float vortex = a + r * 5.5 + spin * 2.2;

  vec2 q = p * (2.4 + u_pointer.x * 0.35) + vec2(u_pointer.y, u_pointer.x) * 0.4;
  float n = noise(q * 2.8 + u_time * 0.04);
  float lines = abs(sin(vortex * 9.0 + n * 7.0));
  /* Lower exponent = wider bright strokes (“thicker lightning”). */
  lines = pow(lines, 1.85);

  vec3 c1 = vec3(0.09, 0.23, 0.25);
  vec3 c2 = vec3(0.25, 0.72, 0.69);
  vec3 c3 = vec3(0.18, 0.42, 0.29);

  vec3 col = mix(c1, c2, lines * 0.42 + (1.0 - r) * 0.12);
  col = mix(col, c3, smoothstep(0.0, 1.0, n) * 0.28);

  vec2 mp = u_pointer * 2.0 - 1.0;
  mp.x *= u_resolution.x / max(u_resolution.y, 1.0);
  float glow = 0.16 / (length(p - mp * 0.85) + 0.16);
  col += vec3(0.35, 0.82, 0.78) * glow * 0.2;

  float vignette = smoothstep(1.15, 0.25, r);
  col *= 0.82 + 0.18 * vignette;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compileShader(
	gl: WebGLRenderingContext,
	type: number,
	source: string,
): WebGLShader | null {
	const sh = gl.createShader(type);
	if (!sh) return null;
	gl.shaderSource(sh, source);
	gl.compileShader(sh);
	if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
		gl.deleteShader(sh);
		return null;
	}
	return sh;
}

function createProgram(
	gl: WebGLRenderingContext,
	vert: string,
	frag: string,
): WebGLProgram | null {
	const vs = compileShader(gl, gl.VERTEX_SHADER, vert);
	const fs = compileShader(gl, gl.FRAGMENT_SHADER, frag);
	if (!vs || !fs) return null;
	const prog = gl.createProgram();
	if (!prog) return null;
	gl.attachShader(prog, vs);
	gl.attachShader(prog, fs);
	gl.linkProgram(prog);
	gl.deleteShader(vs);
	gl.deleteShader(fs);
	if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
		gl.deleteProgram(prog);
		return null;
	}
	return prog;
}

export type InteractiveNeuralVortexBackgroundProps = {
	children: React.ReactNode;
	/** Applied to the outer relative shell (layout, radius, padding, shadow). */
	className?: string;
	canvasClassName?: string;
	/** Readable overlay on top of the shader (below `children`). */
	overlayClassName?: string;
	style?: React.CSSProperties;
};

function usePrefersReducedMotion(): boolean {
	const [reduced, setReduced] = React.useState(false);

	React.useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(mq.matches);
		const onChange = () => setReduced(mq.matches);
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);

	return reduced;
}

export default function InteractiveNeuralVortexBackground({
	children,
	className,
	canvasClassName,
	overlayClassName,
	style,
}: InteractiveNeuralVortexBackgroundProps) {
	const shellRef = React.useRef<HTMLDivElement>(null);
	const canvasRef = React.useRef<HTMLCanvasElement>(null);
	const pointerRef = React.useRef({ x: 0.5, y: 0.5 });
	const reducedMotion = usePrefersReducedMotion();

	React.useEffect(() => {
		if (reducedMotion) return;

		const shell = shellRef.current;
		const canvas = canvasRef.current;
		if (!shell || !canvas) return;

		const gl = canvas.getContext("webgl", {
			alpha: false,
			antialias: false,
			powerPreference: "low-power",
		});
		if (!gl) return;

		const program = createProgram(gl, VERT_SRC, FRAG_SRC);
		if (!program) return;

		const buf = gl.createBuffer();
		if (!buf) {
			gl.deleteProgram(program);
			return;
		}

		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
			gl.STATIC_DRAW,
		);

		const aPos = gl.getAttribLocation(program, "a_position");
		const uRes = gl.getUniformLocation(program, "u_resolution");
		const uTime = gl.getUniformLocation(program, "u_time");
		const uPointer = gl.getUniformLocation(program, "u_pointer");
		const uScroll = gl.getUniformLocation(program, "u_scroll");

		let raf = 0;
		let start = performance.now();

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const w = Math.max(1, Math.floor(shell.clientWidth * dpr));
			const h = Math.max(1, Math.floor(shell.clientHeight * dpr));
			if (canvas.width !== w || canvas.height !== h) {
				canvas.width = w;
				canvas.height = h;
			}
		};

		const setPointerFromClient = (clientX: number, clientY: number) => {
			const r = shell.getBoundingClientRect();
			const x = (clientX - r.left) / Math.max(r.width, 1);
			const y = 1 - (clientY - r.top) / Math.max(r.height, 1);
			pointerRef.current = {
				x: Math.min(1, Math.max(0, x)),
				y: Math.min(1, Math.max(0, y)),
			};
		};

		const onPointerMove = (e: PointerEvent) => {
			setPointerFromClient(e.clientX, e.clientY);
		};

		const onPointerLeave = () => {
			pointerRef.current = { x: 0.5, y: 0.5 };
		};

		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(shell);
		shell.addEventListener("pointermove", onPointerMove);
		shell.addEventListener("pointerleave", onPointerLeave);

		const frame = () => {
			resize();
			gl.viewport(0, 0, canvas.width, canvas.height);
			gl.useProgram(program);
			gl.bindBuffer(gl.ARRAY_BUFFER, buf);
			gl.enableVertexAttribArray(aPos);
			gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

			const t = (performance.now() - start) / 1000;
			const maxScroll = Math.max(
				1,
				document.documentElement.scrollHeight - window.innerHeight,
			);
			const scrollU = window.scrollY / maxScroll;

			gl.uniform2f(uRes, canvas.width, canvas.height);
			gl.uniform1f(uTime, t);
			gl.uniform2f(
				uPointer,
				pointerRef.current.x,
				pointerRef.current.y,
			);
			gl.uniform1f(uScroll, scrollU);

			gl.drawArrays(gl.TRIANGLES, 0, 6);
			raf = requestAnimationFrame(frame);
		};

		raf = requestAnimationFrame(frame);

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			shell.removeEventListener("pointermove", onPointerMove);
			shell.removeEventListener("pointerleave", onPointerLeave);
			gl.deleteBuffer(buf);
			gl.deleteProgram(program);
		};
	}, [reducedMotion]);

	return (
		<div
			ref={shellRef}
			style={style}
			className={cn("relative isolate overflow-hidden text-white", className)}
		>
			{reducedMotion ? (
				<div
					aria-hidden
					className={cn(
						"absolute inset-0 bg-[linear-gradient(160deg,var(--sea-ink)_0%,color-mix(in_oklab,var(--sea-ink)_78%,var(--lagoon-deep))_45%,color-mix(in_oklab,var(--palm)_55%,var(--sea-ink))_100%)]",
						canvasClassName,
					)}
				/>
			) : (
				<canvas
					ref={canvasRef}
					aria-hidden
					className={cn(
						"pointer-events-none absolute inset-0 h-full w-full",
						canvasClassName,
					)}
				/>
			)}
			<div
				aria-hidden
				className={cn(
					"pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-[color-mix(in_oklab,var(--sea-ink)_55%,transparent)] via-transparent to-[color-mix(in_oklab,var(--palm)_40%,transparent)]",
					overlayClassName,
				)}
			/>
			<div className="relative z-10">{children}</div>
		</div>
	);
}
