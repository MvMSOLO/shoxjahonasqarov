import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshReflectorMaterial, Float, RoundedBox, Environment, Sparkles, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useApp } from "@/lib/store";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles as SparkIcon, X, ArrowRight } from "lucide-react";

import reactImg from "@/assets/gallery/react-cover.jpg";
import nodeImg from "@/assets/gallery/node-cover.jpg";
import devopsImg from "@/assets/gallery/devops-cover.jpg";
import uiuxImg from "@/assets/gallery/uiux.jpg";
import pythonImg from "@/assets/gallery/python.jpg";
import linuxImg from "@/assets/gallery/linux.jpg";

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
  image: string;
  details: string;
  duration: string;
  lessons: number;
};

const ROOMS: Room[] = [
  { id: "react", name: "React Advanced", tag: "Frontend", color: "#22D3EE", accent: "#67E8F9", percent: 68, blurb: "Hooks, Suspense, Server Components.", image: reactImg, details: "Zamonaviy React arxitekturasi, performance optimizatsiya va testing.", duration: "8 hafta", lessons: 24 },
  { id: "node", name: "Node.js & API", tag: "Backend", color: "#10B981", accent: "#34D399", percent: 45, blurb: "Express, REST va gRPC servislari.", image: nodeImg, details: "Production-ready API qurish, autentifikatsiya, microservices.", duration: "10 hafta", lessons: 32 },
  { id: "devops", name: "DevOps Basic", tag: "Infra", color: "#F59E0B", accent: "#FCD34D", percent: 42, blurb: "Docker, Kubernetes va CI/CD.", image: devopsImg, details: "Konteynerlash, orchestratsiya, monitoring va observability.", duration: "12 hafta", lessons: 28 },
  { id: "uiux", name: "UI / UX Design", tag: "Design", color: "#06B6D4", accent: "#22D3EE", percent: 30, blurb: "Tadqiqot, prototip, design system.", image: uiuxImg, details: "Foydalanuvchi tadqiqoti, Figma master class va dizayn tizimi.", duration: "6 hafta", lessons: 20 },
  { id: "py", name: "Python Backend", tag: "Backend", color: "#0EA5E9", accent: "#38BDF8", percent: 55, blurb: "FastAPI, async, ORM.", image: pythonImg, details: "Data engineering, ML pipelines va high-performance API.", duration: "10 hafta", lessons: 30 },
  { id: "linux", name: "Linux & Shell", tag: "Sysadmin", color: "#14B8A6", accent: "#5EEAD4", percent: 60, blurb: "Bash, networking, server hardening.", image: linuxImg, details: "System administration, bash scripting, security va networking.", duration: "8 hafta", lessons: 26 },
];

const SPACING = 9;

function lightingIntensity(l: "dim" | "normal" | "bright") {
  return l === "dim" ? 6 : l === "bright" ? 22 : 14;
}

function Alcove({ room, index, onActive, onOpen }: { room: Room; index: number; onActive: (i: number) => void; onOpen: (r: Room) => void }) {
  const lighting = useApp((s) => s.lighting);
  const intensity = lightingIntensity(lighting);
  const x = index * SPACING;
  const tex = useTexture(room.image);
  const [hovered, setHovered] = useState(false);

  const { camera } = useThree();
  useFrame(() => {
    const d = Math.abs(camera.position.x - x);
    if (d < SPACING / 2) onActive(index);
  });

  const color = useMemo(() => new THREE.Color(room.color), [room.color]);
  const accent = useMemo(() => new THREE.Color(room.accent), [room.accent]);

  return (
    <group position={[x, 0, 0]}>
      {/* Side walls */}
      <mesh position={[-3.6, 2, -1.5]}>
        <boxGeometry args={[0.1, 6, 3.2]} />
        <meshStandardMaterial color="#080814" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[3.6, 2, -1.5]}>
        <boxGeometry args={[0.1, 6, 3.2]} />
        <meshStandardMaterial color="#080814" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Framed AI poster on back wall */}
      <group position={[0, 2.2, -3]}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "default"; }}
        onClick={(e) => { e.stopPropagation(); onOpen(room); }}
      >
        {/* Frame */}
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[5.2, 4.2]} />
          <meshStandardMaterial color="#050510" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Image */}
        <mesh>
          <planeGeometry args={[5, 4]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
        {/* Neon trim */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[5.15, 4.15]} />
          <meshBasicMaterial color={accent} transparent opacity={hovered ? 0.35 : 0.18} />
        </mesh>
      </group>

      {/* Spot from above */}
      <spotLight
        position={[0, 6, 1.5]}
        angle={0.65}
        penumbra={0.55}
        intensity={hovered ? intensity * 1.6 : intensity}
        color={accent}
        castShadow
        distance={16}
        target-position={[0, 0, -2]}
      />
      <pointLight position={[0, 1.5, 2.5]} intensity={intensity * 0.25} color={color} distance={6} />

      {/* Particles */}
      <Sparkles count={28} scale={[5, 4, 3]} position={[0, 2, -1]} size={3} speed={0.4} color={room.accent} />

      {/* Floating product (course) card */}
      <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.45}>
        <group position={[0, 0.85, 0.5]}>
          <RoundedBox
            args={[3.2, 1.1, 0.16]}
            radius={0.12}
            smoothness={6}
            castShadow
            onClick={(e) => { e.stopPropagation(); onOpen(room); }}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "default")}
          >
            <meshPhysicalMaterial
              color="#0e0e22"
              metalness={0.7}
              roughness={0.2}
              clearcoat={1}
              clearcoatRoughness={0.1}
              emissive={color}
              emissiveIntensity={0.22}
            />
          </RoundedBox>
          {/* Accent stripe */}
          <mesh position={[0, -0.48, 0.09]}>
            <boxGeometry args={[2.9, 0.05, 0.02]} />
            <meshBasicMaterial color={accent} />
          </mesh>
          {/* Progress fill */}
          <mesh position={[-1.45 + (2.9 * room.percent) / 100 / 2, -0.48, 0.095]}>
            <boxGeometry args={[(2.9 * room.percent) / 100, 0.08, 0.025]} />
            <meshBasicMaterial color={color} />
          </mesh>
        </group>
      </Float>

      {/* Pedestal */}
      <mesh position={[0, 0.1, 0.5]} castShadow>
        <cylinderGeometry args={[1.2, 1.4, 0.2, 32]} />
        <meshStandardMaterial color="#15152a" metalness={0.75} roughness={0.25} />
      </mesh>
    </group>
  );
}

function CameraRig({ totalRooms }: { totalRooms: number }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 1.8, 5);
    camera.lookAt(0, 1.6, 0);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const totalDistance = (totalRooms - 1) * SPACING;
    const trigger = document.querySelector("[data-scroll-track]") as HTMLElement | null;
    if (!trigger) return;

    const ctx = gsap.context(() => {
      const obj = { x: 0, look: 0 };
      gsap.to(obj, {
        x: totalDistance,
        look: totalDistance,
        ease: "none",
        scrollTrigger: { trigger, start: "top top", end: "bottom bottom", scrub: 1.2 },
        onUpdate: () => {
          camera.position.x = obj.x;
          camera.position.y = 1.8 + Math.sin(obj.x * 0.1) * 0.08;
          camera.lookAt(obj.look, 1.5, 0);
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
      <planeGeometry args={[400, 40]} />
      <MeshReflectorMaterial
        mirror={0.55}
        blur={[400, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={5}
        roughness={0.85}
        depthScale={1}
        minDepthThreshold={0.85}
        color="#06060f"
        metalness={0.7}
      />
    </mesh>
  );
}

function AlcoveModal({ room, onClose }: { room: Room | null; onClose: () => void }) {
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      {room && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-card text-card-foreground shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 overflow-hidden">
              <img src={room.image} alt={room.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <button onClick={onClose} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70">
                <X className="h-4 w-4" />
              </button>
              <span
                className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur"
                style={{ background: `${room.color}AA` }}
              >
                {room.tag}
              </span>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold">{room.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{room.details}</p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-border p-2.5">
                  <div className="text-xs text-muted-foreground">Davomiyligi</div>
                  <div className="mt-0.5 text-sm font-bold">{room.duration}</div>
                </div>
                <div className="rounded-xl border border-border p-2.5">
                  <div className="text-xs text-muted-foreground">Darslar</div>
                  <div className="mt-0.5 text-sm font-bold">{room.lessons}</div>
                </div>
                <div className="rounded-xl border border-border p-2.5">
                  <div className="text-xs text-muted-foreground">Progress</div>
                  <div className="mt-0.5 text-sm font-bold">{room.percent}%</div>
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full" style={{ width: `${room.percent}%`, background: `linear-gradient(90deg, ${room.color}, ${room.accent})` }} />
              </div>
              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => { onClose(); navigate({ to: "/learning" }); }}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-glow-cyan transition-transform hover:scale-[1.02]"
                >
                  Davom etish <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={onClose} className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold hover:bg-accent">
                  Yopish
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function GalleryScene() {
  const [activeRoom, setActiveRoom] = useState(0);
  const [openRoom, setOpenRoom] = useState<Room | null>(null);
  const audioEnabled = useApp((s) => s.audioEnabled);
  const volume = useApp((s) => s.volume);
  const prevRoom = useRef(0);

  // Howler ambient — gated by user toggle (autoplay-safe)
  useEffect(() => {
    if (!audioEnabled) return;
    let howl: any = null;
    let cancelled = false;
    import("howler").then(({ Howl }) => {
      if (cancelled) return;
      howl = new Howl({
        src: ["https://cdn.pixabay.com/audio/2022/03/15/audio_4f8de7e9e7.mp3"],
        loop: true,
        volume,
        html5: true,
      });
      howl.play();
    });
    return () => {
      cancelled = true;
      if (howl) { try { howl.fade(volume, 0, 500); } catch {} }
      setTimeout(() => { try { howl?.stop(); } catch {} }, 600);
    };
  }, [audioEnabled]);

  // Volume live update — keep separate so changing volume doesn't restart playback
  useEffect(() => {
    if (!audioEnabled) return;
    import("howler").then(({ Howler }) => { Howler.volume(volume); });
  }, [volume, audioEnabled]);

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
          <fog attach="fog" args={["#050510", 9, 32]} />
          <ambientLight intensity={0.22} />
          <Suspense fallback={null}>
            <Environment preset="night" />
            {ROOMS.map((r, i) => (
              <Alcove key={r.id} room={r} index={i} onActive={setActiveRoom} onOpen={setOpenRoom} />
            ))}
            <Floor />
          </Suspense>
          <CameraRig totalRooms={ROOMS.length} />
        </Canvas>
      </div>

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
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/50">
            <SparkIcon className="h-3 w-3" /> Hozir
          </div>
          <div className="mt-0.5 text-lg font-bold text-white">{ROOMS[activeRoom].name}</div>
          <div className="text-xs" style={{ color: ROOMS[activeRoom].accent }}>{ROOMS[activeRoom].tag}</div>
        </div>
      </div>

      {/* Open button bottom center */}
      <div className="pointer-events-auto fixed bottom-24 left-1/2 z-30 -translate-x-1/2 lg:bottom-8">
        <button
          onClick={() => setOpenRoom(ROOMS[activeRoom])}
          className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-glow-cyan transition-transform hover:scale-105"
        >
          {ROOMS[activeRoom].name} ni ochish
        </button>
      </div>

      <AlcoveModal room={openRoom} onClose={() => setOpenRoom(null)} />
    </>
  );
}
