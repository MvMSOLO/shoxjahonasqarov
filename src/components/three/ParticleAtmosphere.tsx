import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Floating particles with neural connections
function ParticleField({ count = 150, mouse }: { count?: number; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const points = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return [pos, vel];
  }, [count]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(count * count * 6);
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const posAttr = points.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    // Mouse influence
    const mouseX = mouse.current.x * 2;
    const mouseY = mouse.current.y * 2;

    for (let i = 0; i < count; i++) {
      // Add velocity and mouse influence
      posArray[i * 3] += velocities[i * 3] + (mouseX - posArray[i * 3]) * 0.0003;
      posArray[i * 3 + 1] += velocities[i * 3 + 1] + (mouseY - posArray[i * 3 + 1]) * 0.0003;
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Gentle oscillation
      posArray[i * 3] += Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.001;
      posArray[i * 3 + 1] += Math.cos(state.clock.elapsedTime * 0.15 + i) * 0.001;

      // Boundary wrap
      if (posArray[i * 3] > 10) posArray[i * 3] = -10;
      if (posArray[i * 3] < -10) posArray[i * 3] = 10;
      if (posArray[i * 3 + 1] > 6) posArray[i * 3 + 1] = -6;
      if (posArray[i * 3 + 1] < -6) posArray[i * 3 + 1] = 6;
      if (posArray[i * 3 + 2] > 4) posArray[i * 3 + 2] = -4;
      if (posArray[i * 3 + 2] < -4) posArray[i * 3 + 2] = 4;
    }
    posAttr.needsUpdate = true;

    // Update connection lines
    if (lineRef.current) {
      const linePosAttr = lineRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const linePosArray = linePosAttr.array as Float32Array;
      let lineIndex = 0;
      const connectionDistance = 2.5;

      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count && lineIndex < linePosArray.length - 6; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDistance) {
            linePosArray[lineIndex++] = posArray[i * 3];
            linePosArray[lineIndex++] = posArray[i * 3 + 1];
            linePosArray[lineIndex++] = posArray[i * 3 + 2];
            linePosArray[lineIndex++] = posArray[j * 3];
            linePosArray[lineIndex++] = posArray[j * 3 + 1];
            linePosArray[lineIndex++] = posArray[j * 3 + 2];
          }
        }
      }
      // Clear remaining
      for (let i = lineIndex; i < linePosArray.length; i++) {
        linePosArray[i] = 0;
      }
      linePosAttr.needsUpdate = true;
    }
  });

  return (
    <>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#4DD0E1"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#4DD0E1"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}

// Floating geometric shapes
function FloatingGeometry() {
  const torusRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  const icosaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.1;
      torusRef.current.rotation.y = t * 0.15;
    }
    if (octaRef.current) {
      octaRef.current.rotation.x = t * 0.08;
      octaRef.current.rotation.z = t * 0.12;
    }
    if (icosaRef.current) {
      icosaRef.current.rotation.y = t * 0.1;
      icosaRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={torusRef} position={[-6, 2, -3]}>
          <torusGeometry args={[0.8, 0.15, 16, 48]} />
          <meshBasicMaterial color="#4DD0E1" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={octaRef} position={[5, -1.5, -2]}>
          <octahedronGeometry args={[0.6]} />
          <meshBasicMaterial color="#26C6DA" wireframe transparent opacity={0.25} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={icosaRef} position={[3, 3, -4]}>
          <icosahedronGeometry args={[0.5]} />
          <meshBasicMaterial color="#00BCD4" wireframe transparent opacity={0.2} />
        </mesh>
      </Float>
    </>
  );
}

// Ambient glow orbs
function GlowOrbs() {
  const orb1 = useRef<THREE.Mesh>(null);
  const orb2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (orb1.current) {
      orb1.current.position.x = Math.sin(t * 0.2) * 4 - 5;
      orb1.current.position.y = Math.cos(t * 0.15) * 2 + 2;
    }
    if (orb2.current) {
      orb2.current.position.x = Math.cos(t * 0.18) * 4 + 4;
      orb2.current.position.y = Math.sin(t * 0.12) * 2 - 1;
    }
  });

  return (
    <>
      <mesh ref={orb1} position={[-5, 2, -5]}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial color="#0097A7" transparent opacity={0.08} />
      </mesh>
      <mesh ref={orb2} position={[4, -1, -6]}>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial color="#00838F" transparent opacity={0.06} />
      </mesh>
    </>
  );
}

// Camera follows mouse slightly
function CameraController({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  
  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.3 - camera.position.x) * 0.02;
    camera.position.y += (mouse.current.y * 0.2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function AtmosphereScene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <>
      <color attach="background" args={["#07070A"]} />
      <fog attach="fog" args={["#07070A", 8, 25]} />
      <ambientLight intensity={0.1} />
      <ParticleField mouse={mouse} count={120} />
      <FloatingGeometry />
      <GlowOrbs />
      <Sparkles
        count={50}
        scale={[20, 12, 10]}
        size={2}
        speed={0.3}
        color="#4DD0E1"
        opacity={0.4}
      />
      <CameraController mouse={mouse} />
    </>
  );
}

export function ParticleAtmosphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    // Reduce motion preference
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setIsVisible(false);
      return;
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Intersection observer for performance
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s" }}
    >
      {isVisible && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <AtmosphereScene mouse={mouse} />
        </Canvas>
      )}
    </div>
  );
}
