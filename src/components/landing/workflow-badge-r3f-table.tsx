import { AdaptiveDpr, Environment } from "@react-three/drei";
import {
	Canvas,
	extend,
	type RootState,
	type ThreeElements,
	type ThreeEvent,
	useFrame,
	useThree,
} from "@react-three/fiber";
import {
	BallCollider,
	CuboidCollider,
	Physics,
	type RapierRigidBody,
	RigidBody,
	interactionGroups,
	useRopeJoint,
	useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
	type WorkflowBadgeData,
	WORKFLOW_BADGE_DATA,
} from "./workflow-badge-data";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
	interface ThreeElements {
		meshLineGeometry: ThreeElements["bufferGeometry"];
		meshLineMaterial: ThreeElements["shaderMaterial"] & {
			color?: THREE.ColorRepresentation;
			lineWidth?: number;
			opacity?: number;
			resolution?: [number, number] | THREE.Vector2;
			sizeAttenuation?: number;
			transparent?: boolean;
		};
	}
}

const BADGE_SCALE = 1.12;

const CARD_WIDTH = 1.14 * BADGE_SCALE;
const CARD_HEIGHT = 1.72 * BADGE_SCALE;
const CARD_DEPTH = 0.055 * BADGE_SCALE;

const CARD_TOP_ANCHOR = CARD_HEIGHT / 2 + 0.2 * BADGE_SCALE;

const FLOOR_TOP_Y = -2.22;
const SCENE_FOG_NEAR = 8;
const SCENE_FOG_FAR = 24;

const COLLISION_FLOOR = 1;
const COLLISION_BADGE = 2;
const COLLISION_ROPE = 3;

const CARD_GEOMETRY = new THREE.BoxGeometry(
	CARD_WIDTH,
	CARD_HEIGHT,
	CARD_DEPTH,
);

const CLIP_MATERIAL = new THREE.MeshStandardMaterial({
	color: "#d8dbe0",
	metalness: 0.82,
	roughness: 0.22,
});

const RING_MATERIAL = new THREE.MeshStandardMaterial({
	color: "#b8bec9",
	metalness: 0.95,
	roughness: 0.14,
});

function drawBadgeTexture(badge: WorkflowBadgeData) {
	const canvas = document.createElement("canvas");

	canvas.width = 768;
	canvas.height = 1152;

	const ctx = canvas.getContext("2d");

	if (!ctx) return new THREE.CanvasTexture(canvas);

	ctx.fillStyle = badge.cardColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	const topHeight = 284;

	ctx.fillStyle = badge.cardColor;
	ctx.fillRect(0, 0, canvas.width, topHeight);

	ctx.fillStyle = badge.inkColor;
	ctx.font = "900 58px ui-sans-serif, system-ui, sans-serif";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	ctx.fillText(
		badge.event.toUpperCase(),
		canvas.width / 2,
		140,
	);

	const bandY = topHeight;
	const bandHeight = 510;

	const bandGradient = ctx.createLinearGradient(
		0,
		bandY,
		canvas.width,
		bandY + bandHeight,
	);

	bandGradient.addColorStop(0, badge.bandColor);
	bandGradient.addColorStop(
		1,
		badge.variant === "paper"
			? "#ffffff"
			: badge.accent,
	);

	ctx.fillStyle = bandGradient;
	ctx.fillRect(0, bandY, canvas.width, bandHeight);

	ctx.save();

	ctx.translate(
		canvas.width / 2,
		bandY + bandHeight / 2,
	);

	ctx.rotate(-Math.PI / 4);

	ctx.strokeStyle = badge.accent;
	ctx.lineWidth = 102;
	ctx.lineCap = "round";

	ctx.beginPath();
	ctx.moveTo(-205, 0);
	ctx.lineTo(205, 0);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(0, -205);
	ctx.lineTo(0, 205);
	ctx.stroke();

	ctx.restore();

	const bottomY = bandY + bandHeight;

	ctx.fillStyle = badge.cardColor;
	ctx.fillRect(
		0,
		bottomY,
		canvas.width,
		canvas.height - bottomY,
	);

	ctx.fillStyle = badge.inkColor;

	ctx.font = "800 76px ui-serif, Georgia, serif";
	ctx.fillText(badge.name, 72, bottomY + 145);

	ctx.globalAlpha = 0.68;

	ctx.font = "900 38px ui-sans-serif, system-ui, sans-serif";

	ctx.fillText(
		badge.role.toUpperCase(),
		72,
		bottomY + 225,
	);

	ctx.globalAlpha = 1;

	const texture = new THREE.CanvasTexture(canvas);

	texture.colorSpace = THREE.SRGBColorSpace;
	texture.anisotropy = 4;
	texture.needsUpdate = true;

	return texture;
}

function setVectorFromRigidBody(
	target: THREE.Vector3,
	body: RapierRigidBody,
) {
	const translation = body.translation();

	target.set(
		translation.x,
		translation.y,
		translation.z,
	);
}

function TableColliders() {
	return (
		<RigidBody type="fixed" colliders={false}>
			<CuboidCollider
				args={[19, 0.5, 12]}
				position={[0, FLOOR_TOP_Y - 0.5, 0]}
				friction={1}
				restitution={0.05}
				collisionGroups={interactionGroups(
					[COLLISION_FLOOR],
					[COLLISION_BADGE],
				)}
			/>
		</RigidBody>
	);
}

function SceneLights() {
	return (
		<>
			<ambientLight intensity={0.44} color="#c8d4e8" />

			<directionalLight
				position={[3.6, 4.8, 4.4]}
				intensity={1.35}
				color="#fff2db"
				castShadow
				shadow-mapSize={[2048, 2048]}
				shadow-bias={-0.00015}
			/>

			<directionalLight
				position={[-4.8, 1.8, 2.8]}
				intensity={0.44}
				color="#98b9ff"
			/>

			<spotLight
				position={[0, 5.6, 2.8]}
				intensity={1.35}
				angle={0.48}
				penumbra={0.6}
				distance={18}
				color="#ff6a5c"
			/>

			<pointLight
				position={[0, -0.4, 2.2]}
				intensity={0.28}
				color="#e45b6f"
				distance={8}
			/>
		</>
	);
}

function StageBackdrop() {
	return (
		<mesh position={[0, 0.7, -4.2]} receiveShadow>
			<planeGeometry args={[42, 20]} />

			<meshStandardMaterial
				color="#26070d"
				emissive="#14050a"
				emissiveIntensity={0.25}
				roughness={0.95}
				metalness={0.02}
			/>
		</mesh>
	);
}

function StageFloor() {
	return (
		<mesh
			position={[0, FLOOR_TOP_Y - 0.02, 0]}
			rotation={[-Math.PI / 2, 0, 0]}
			receiveShadow
		>
			<planeGeometry args={[42, 24]} />
			<meshStandardMaterial
				color="#070b12"
				emissive="#04070d"
				emissiveIntensity={0.2}
				metalness={0.26}
				roughness={0.56}
			/>
		</mesh>
	);
}

function CameraDrift() {
	const target = useMemo(
		() => new THREE.Vector3(0, 0.22, 0),
		[],
	);

	useFrame((state: RootState) => {
		const tx = state.pointer.x * 0.24;
		const ty = 0.28 + state.pointer.y * 0.1;
		const tz = 8.95 - Math.abs(state.pointer.x) * 0.24;

		state.camera.position.x = THREE.MathUtils.lerp(
			state.camera.position.x,
			tx,
			0.035,
		);
		state.camera.position.y = THREE.MathUtils.lerp(
			state.camera.position.y,
			ty,
			0.035,
		);
		state.camera.position.z = THREE.MathUtils.lerp(
			state.camera.position.z,
			tz,
			0.03,
		);

		state.camera.lookAt(target);
	});

	return null;
}

function BadgeRig({
	badge,
}: {
	badge: WorkflowBadgeData;
}) {
	const fixed = useRef<RapierRigidBody>(null!);

	const j1 = useRef<RapierRigidBody>(null!);
	const j2 = useRef<RapierRigidBody>(null!);

	const card = useRef<RapierRigidBody>(null!);

	const band = useRef<
		THREE.Mesh<MeshLineGeometry, MeshLineMaterial>
	>(null);

	const [dragged, drag] = useState<
		false | THREE.Vector3
	>(false);

	const texture = useMemo(
		() => drawBadgeTexture(badge),
		[badge],
	);

	const vec = useMemo(() => new THREE.Vector3(), []);
	const dir = useMemo(() => new THREE.Vector3(), []);

	const curve = useMemo(
		() =>
			new THREE.CatmullRomCurve3([
				new THREE.Vector3(),
				new THREE.Vector3(),
				new THREE.Vector3(),
				new THREE.Vector3(),
			]),
		[],
	);

	const { width, height, viewport } = useThree(
		(state: RootState) => ({
			width: state.size.width,
			height: state.size.height,
			viewport: state.viewport,
		}),
	);

	const lineResolution = useMemo(() => {
		const pr = Math.min(viewport.dpr, 1.5);

		return [width * pr, height * pr] as [
			number,
			number,
		];
	}, [width, height, viewport.dpr]);

	useEffect(() => {
		return () => texture.dispose();
	}, [texture]);

	/* Rope = max-distance between segment ends (spherical-only lets bodies drift apart). */
	const ROPE_SEGMENT = 0.42 * BADGE_SCALE;
	const ROPE_MAX =
		ROPE_SEGMENT * 1.08;

	useRopeJoint(fixed, j1, [
		[0, 0, 0],
		[0, 0, 0],
		ROPE_MAX,
	]);

	useRopeJoint(j1, j2, [
		[0, 0, 0],
		[0, 0, 0],
		ROPE_MAX,
	]);

	useSphericalJoint(j2, card, [
		[0, 0, 0],
		[0, CARD_TOP_ANCHOR, 0],
	]);

	useFrame((state: RootState) => {
		if (dragged && card.current) {
			vec
				.set(state.pointer.x, state.pointer.y, 0.5)
				.unproject(state.camera);

			dir
				.copy(vec)
				.sub(state.camera.position)
				.normalize();

			vec.add(
				dir.multiplyScalar(
					state.camera.position.length(),
				),
			);

			card.current.setNextKinematicTranslation({
				x: vec.x - dragged.x,
				y: vec.y - dragged.y,
				z: 0,
			});
		}

		if (
			fixed.current &&
			j1.current &&
			j2.current &&
			card.current
		) {
			setVectorFromRigidBody(
				curve.points[0],
				fixed.current,
			);

			setVectorFromRigidBody(
				curve.points[1],
				j1.current,
			);

			setVectorFromRigidBody(
				curve.points[2],
				j2.current,
			);

			const t = card.current.translation();

			curve.points[3].set(
				t.x,
				t.y + CARD_TOP_ANCHOR,
				t.z,
			);

			band.current?.geometry.setPoints(
				curve.getPoints(32),
			);
		}
	});

	return (
		<>
			<RigidBody
				ref={fixed}
				type="fixed"
				position={badge.anchor}
				colliders={false}
			/>

			<RigidBody
				ref={j1}
				position={[
					badge.anchor[0],
					badge.anchor[1] - 0.42,
					badge.anchor[2],
				]}
				colliders={false}
				linearDamping={8}
				angularDamping={8}
				ccd
			>
				<BallCollider
					args={[0.036 * BADGE_SCALE]}
					collisionGroups={interactionGroups(
						[COLLISION_ROPE],
						[],
					)}
				/>
			</RigidBody>

			<RigidBody
				ref={j2}
				position={[
					badge.anchor[0],
					badge.anchor[1] - 0.84,
					badge.anchor[2],
				]}
				colliders={false}
				linearDamping={8}
				angularDamping={8}
				ccd
			>
				<BallCollider
					args={[0.036 * BADGE_SCALE]}
					collisionGroups={interactionGroups(
						[COLLISION_ROPE],
						[],
					)}
				/>
			</RigidBody>

			<mesh ref={band} renderOrder={1}>
				<meshLineGeometry />

				<meshLineMaterial
					color="#ee3848"
					lineWidth={19}
					resolution={lineResolution}
					sizeAttenuation={0}
					transparent
					opacity={0.95}
				/>
			</mesh>

			<RigidBody
				ref={card}
				type={
					dragged
						? "kinematicPosition"
						: "dynamic"
				}
				position={badge.initial}
				angularDamping={6}
				linearDamping={6}
				colliders={false}
				canSleep={!dragged}
				ccd
			>
				<CuboidCollider
					args={[
						CARD_WIDTH / 2,
						CARD_HEIGHT / 2,
						CARD_DEPTH / 2,
					]}
					mass={0.8}
					friction={0.92}
					restitution={0.04}
					collisionGroups={interactionGroups(
						[COLLISION_BADGE],
						[
							COLLISION_FLOOR,
							COLLISION_BADGE,
						],
					)}
				/>

				<group>
					<mesh
						position={[
							0,
							CARD_HEIGHT / 2 +
								0.08 * BADGE_SCALE,
							0.03,
						]}
						material={RING_MATERIAL}
					>
						<torusGeometry
							args={[
								0.16 * BADGE_SCALE,
								0.025 * BADGE_SCALE,
								12,
								28,
							]}
						/>
					</mesh>

					<mesh
						position={[
							0,
							CARD_HEIGHT / 2 +
								0.19 * BADGE_SCALE,
							0.03,
						]}
						scale={[
							0.72 * BADGE_SCALE,
							0.3 * BADGE_SCALE,
							0.08 * BADGE_SCALE,
						]}
						material={CLIP_MATERIAL}
					>
						<boxGeometry
							args={[
								0.42 * BADGE_SCALE,
								0.32 * BADGE_SCALE,
								0.16 * BADGE_SCALE,
							]}
						/>
					</mesh>

					<mesh
						geometry={CARD_GEOMETRY}
						castShadow
						receiveShadow
						onPointerDown={(
							e: ThreeEvent<PointerEvent>,
						) => {
							e.stopPropagation();

							const t =
								card.current.translation();

							drag(
								new THREE.Vector3()
									.copy(e.point)
									.sub(
										new THREE.Vector3(
											t.x,
											t.y,
											t.z,
										),
									),
							);

							e.target.setPointerCapture(
								e.pointerId,
							);
						}}
						onPointerUp={(
							e: ThreeEvent<PointerEvent>,
						) => {
							e.stopPropagation();

							drag(false);

							e.target.releasePointerCapture(
								e.pointerId,
							);
						}}
					>
						<meshPhysicalMaterial
							map={texture}
							roughness={0.22}
							metalness={0.08}
							clearcoat={0.95}
							clearcoatRoughness={0.16}
							ior={1.44}
							reflectivity={0.72}
						/>
					</mesh>
				</group>
			</RigidBody>
		</>
	);
}

export function WorkflowBadgeR3fTable() {
	return (
		<Canvas
			shadows
			dpr={[1, 1.5]}
			gl={{
				alpha: false,
				antialias: true,
				powerPreference: "high-performance",
			}}
			onCreated={(root: RootState) => {
				const { gl, camera, scene } = root;

				const bg = new THREE.Color("#05070d");

				gl.setClearColor(bg.getHex(), 1);
				gl.toneMapping = THREE.ACESFilmicToneMapping;
				gl.toneMappingExposure = 1.06;
				gl.shadowMap.enabled = true;
				gl.shadowMap.type = THREE.PCFSoftShadowMap;

				scene.background = bg;
				scene.fog = new THREE.Fog(
					"#05070d",
					SCENE_FOG_NEAR,
					SCENE_FOG_FAR,
				);

				camera.lookAt(0, 0.22, 0);
			}}
			camera={{
				fov: 46,
				near: 0.1,
				far: 80,
				position: [0, 0.28, 8.95],
			}}
			style={{
				width: "100%",
				height: "100%",
				maxWidth: "100%",
				touchAction: "none",
			}}
		>
			<AdaptiveDpr />
			<CameraDrift />

			<StageBackdrop />
			<StageFloor />

			<SceneLights />
			<Environment preset="city" />

			<Physics
				gravity={[0, -9.82, 0]}
				timeStep={1 / 60}
				interpolate
				numSolverIterations={12}
				numInternalPgsIterations={8}
			>
				<TableColliders />

				{WORKFLOW_BADGE_DATA.map((badge) => (
					<BadgeRig
						key={badge.id}
						badge={badge}
					/>
				))}
			</Physics>
		</Canvas>
	);
}