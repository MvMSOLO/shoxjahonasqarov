import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, MeshReflectorMaterial, Float, RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useApp } from "@/lib/store";
import { Link } from "@tanstack/react-router";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Room = {
  id: string;
  name: string;
  tag: string;
  color: string;
  accent: string;
  percent: number;
  blurb: string;
  cta: string;
};

const ROOMS: Room[] = [
  { id: "react", name: "React Advanced", tag: "Frontend", color: "#6366F1", accent: "#A78BFA", percent: 68, blurb: "Hooks, Suspense, Server Components va arxitektura.", cta: "Davom etish" },
  { id: "node", name: "Node.js & API", tag: "Backend", color: "#10B981", accent: "#34D399", percent: 45, blurb: "Express, Fastify, REST va gRPC servislari.", cta: "Boshlash" },
  { id: "devops", name: "DevOps Basic", tag: "Infra", color: "#F59E0B", accent: "#FCD34D", percent: 42, blurb: "Docker, Kubernetes va CI/CD pipeline'lar.", cta: "Davom etish" },
  { id: "ux", name: "UI / UX Design", tag: "Design", color: "#F43F5E", accent: "#FB7185", percent: 30, blurb: "Auditoriya tadqiqoti, prototip, design system.", cta: "Boshlash" },
  { id: "py", name: "Python Backend", tag: "Backend", color: "#06B6D4", accent: "#67E8F9", percent: 55, blurb: "FastAPI, async, ORM va deployment.", cta: "Davom etish" },
  { id: "linux", name: "Linux & Shell", tag: "Sysadmin", color: "#8B5CF6", accent: "#C4B5FD", percent: 60, blurb: "Bash, networking, server hardening.", cta: "Davom etish" },
];

const SPACING = 9;

function lightingIntensity(l: "dim" | "normal" | "bright") {
  return l === "dim" ? 4 : l === "bright" ? 18 : 10;
}

function Alcove({ room, index, onActive }: { room: Room; index: number; onActive: (i: number) => void }) {
  const groupRef = useRef<THREE.Group>(null!);
  const lighting = useApp((s) => s.lighting);
  const intensity = lightingIntensity(lighting);
  const x = index * SPACING;

  // Detect when camera is near this alcove
  const { camera } = useThree();
  useFrame(() => {
    const d = Math.abs(camera.position.x - x);
    if (d < SPACING / 2) onActive(index);
  });

  const color = useMemo(() => new THREE.Color(room.color), [room.color]);
  const accent = useMemo(() => new THREE.Color(room.accent), [room.accent]);

  return (
    <group ref={groupRef} position={[x, 0, 0]}>
      {/* Back wall */}
      <mesh position={[0, 2, -3]} receiveShadow>
        <planeGeometry args={[7, 6]} />
        <meshStandardMaterial color="#0a0a1a" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* Color glow on back wall */}
      <mesh position={[0, 2, -2.98]}>
        <planeGeometry args={[5, 4]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} />
      </mesh>

      {/* Spot light from above */}
      <spotLight
        position={[0, 6, 1]}
        angle={0.6}
        penumbra={0.5}
        intensity={intensity}
        color={accent}
        castShadow
        distance={14}
      />
      {/* Rim light */}
      <pointLight position={[0, 1.5, 2.5]} intensity={intensity * 0.3} color={color} distance={6} />

      {/* Floating product (course) card */}
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
        <group position={[0, 1.6, 0]}>
          <RoundedBox args={[3, 1.9, 0.18]} radius={0.12} smoothness={6} castShadow>
            <meshPhysicalMaterial
              color="#15152e"
              metalness={0.6}
              roughness={0.25}
              clearcoat={1}
              clearcoatRoughness={0.1}
              emissive={color}
              emissiveIntensity={0.18}
            />
          </RoundedBox>
          {/* Accent bar */}
          <mesh position={[0, -0.85, 0.1]}>
            <boxGeometry args={[2.6, 0.06, 0.02]} />
            <meshBasicMaterial color={accent} />
          </mesh>
          <Html
            transform
            occlude
            position={[0, 0, 0.11]}
            distanceFactor={2.2}
            style={{ width: 360, pointerEvents: "auto" }}
          >
            <div className="rounded-2xl p-4 text-white" style={{ fontFamily: "Inter, sans-serif" }}>
              <div
                className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                style={{ background: `${room.color}33`, color: room.accent }}
              >
                {room.tag}
              </div>
              <div className="mt-2 text-2xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {room.name}
              </div>
              <div className="mt-1 text-xs text-white/70">{room.blurb}</div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${room.percent}%`, background: `linear-gradient(90deg, ${room.color}, ${room.accent})` }} />
                </div>
                <span className="text-xs font-semibold">{room.percent}%</span>
              </div>
              <Link
                to="/learning"
                className="mt-3 inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold shadow-lg transition-transform hover:scale-[1.02]"
                style={{ background: `linear-gradient(135deg, ${room.color}, ${room.accent})` }}
              >
                {room.cta} →
              </Link>
            </div>
          </Html>
        </group>
      </Float>

      {/* Pedestal */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[1.1, 1.3, 0.2, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Side dividers */}
      <mesh position={[3.5, 2, -2.5]}>
        <boxGeometry args={[0.05, 6, 1.2]} />
        <meshStandardMaterial color="#0c0c1f" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  );
}

function CameraRig({ totalRooms }: { totalRooms: number }) {
  const { camera } = useThree();
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    camera.position.set(0, 1.8, 5);
    camera.lookAt(0, 1.6, 0);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const totalDistance = (totalRooms - 1) * SPACING;
    const trigger = document.querySelector("[data-scroll-track]") as HTMLElement | null;
    if (!trigger) return;
    containerRef.current = trigger;

    const ctx = gsap.context(() => {
      const obj = { x: 0, look: 0 };
      gsap.to(obj, {
        x: totalDistance,
        look: totalDistance,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        onUpdate: () => {
          camera.position.x = obj.x;
          camera.lookAt(obj.look, 1.6, 0);
        },
      });
    });

    return () => ctx.revert();
  }, [camera, totalRooms]);

  return null;
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeGeometry args={[200, 30]} />
      <MeshReflectorMaterial
        mirror={0.5}
        blur={[400, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={4}
        roughness={0.9}
        depthScale={1}
        minDepthThreshold={0.85}
        color="#0a0a14"
        metalness={0.6}
      />
    </mesh>
  );
}

export function GalleryScene() {
  const [activeRoom, setActiveRoom] = useState(0);
  const audioEnabled = useApp((s) => s.audioEnabled);
  const volume = useApp((s) => s.volume);
  const prevRoom = useRef(0);

  // Howler soundscape
  useEffect(() => {
    if (!audioEnabled) return;
    let howl: any = null;
    let cancelled = false;
    import("howler").then(({ Howl }) => {
      if (cancelled) return;
      howl = new Howl({
        // Ambient pad — public CC0 hosted asset
        src: ["https://cdn.pixabay.com/audio/2022/03/15/audio_4f8de7e9e7.mp3"],
        loop: true,
        volume,
        html5: true,
      });
      howl.play();
    });
    return () => {
      cancelled = true;
      if (howl) howl.fade(volume, 0, 600);
      setTimeout(() => howl?.stop(), 700);
    };
  }, [audioEnabled, volume]);

  // Transition SFX
  useEffect(() => {
    if (!audioEnabled) return;
    if (prevRoom.current === activeRoom) return;
    prevRoom.current = activeRoom;
    let howl: any;
    import("howler").then(({ Howl }) => {
      howl = new Howl({
        src: ["https://cdn.pixabay.com/audio/2022/03/10/audio_d4c9a4f93d.mp3"],
        volume: volume * 0.5,
        html5: true,
      });
      howl.play();
    });
  }, [activeRoom, audioEnabled, volume]);

  return (
    <>
      <div className="sticky top-0 h-screen w-full">
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ position: [0, 1.8, 5], fov: 55 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: "radial-gradient(ellipse at center, #0d0d24 0%, #050510 70%)" }}
        >
          <fog attach="fog" args={["#050510", 8, 28]} />
          <ambientLight intensity={0.18} />
          <Environment preset="night" />
          {ROOMS.map((r, i) => (
            <Alcove key={r.id} room={r} index={i} onActive={setActiveRoom} />
          ))}
          <Floor />
          <CameraRig totalRooms={ROOMS.length} />
        </Canvas>
      </div>

      {/* Scroll track to drive ScrollTrigger */}
      <div data-scroll-track style={{ height: `${ROOMS.length * 100}vh` }} />

      {/* Room indicator */}
      <div className="pointer-events-none fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {ROOMS.map((r, i) => (
          <div key={r.id} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full transition-all"
              style={{
                background: i === activeRoom ? r.color : "rgba(255,255,255,0.25)",
                boxShadow: i === activeRoom ? `0 0 12px ${r.color}` : "none",
                transform: i === activeRoom ? "scale(1.6)" : "scale(1)",
              }}
            />
            <span
              className="text-[11px] font-medium transition-opacity"
              style={{ color: i === activeRoom ? r.accent : "rgba(255,255,255,0.45)", opacity: i === activeRoom ? 1 : 0.6 }}
            >
              {r.name}
            </span>
          </div>
        ))}
      </div>

      {/* Current room badge top right */}
      <div className="pointer-events-none fixed right-6 top-24 z-30 hidden md:block">
        <div className="glass-2 rounded-2xl px-4 py-3">
          <div className="text-[10px] uppercase tracking-widest text-white/50">Hozir</div>
          <div className="mt-0.5 text-lg font-bold text-white">{ROOMS[activeRoom].name}</div>
          <div className="text-xs" style={{ color: ROOMS[activeRoom].accent }}>{ROOMS[activeRoom].tag}</div>
        </div>
      </div>
    </>
  );
}
