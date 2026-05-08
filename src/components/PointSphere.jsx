"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * PointSphere — Malha esférica com dobras orgânicas + deformação reativa ao mouse
 */
export default function PointSphere({
  className = "",
  particleCount = 5000,
  sphereRadius = 2.2,
  mouseRadius = 2.0,
  mouseStrength = 1.8,
  organicAmplitude = 0.35,
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const basePositions = new Float32Array(particleCount * 3);
    const currentPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const seeds = new Float32Array(particleCount * 3);

    const colorBlue = new THREE.Color("#3b9eff");
    const colorPurple = new THREE.Color("#a855f7");
    const colorMid = new THREE.Color("#6366f1");

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < particleCount; i++) {
      const yNorm = 1 - (i / (particleCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - yNorm * yNorm);
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * radiusAtY * sphereRadius;
      const y = yNorm * sphereRadius;
      const z = Math.sin(theta) * radiusAtY * sphereRadius;

      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;
      currentPositions[i * 3] = x;
      currentPositions[i * 3 + 1] = y;
      currentPositions[i * 3 + 2] = z;

      seeds[i * 3] = Math.random() * 100;
      seeds[i * 3 + 1] = Math.random() * 100;
      seeds[i * 3 + 2] = Math.random() * 100;

      const t = (yNorm + 1) / 2;
      const color =
        t < 0.5
          ? colorPurple.clone().lerp(colorMid, t * 2)
          : colorMid.clone().lerp(colorBlue, (t - 0.5) * 2);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(currentPositions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Sprite circular
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(255,255,255,0.6)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.06,
      map: sprite,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(-10, -10);
    const mouseWorld = new THREE.Vector3(999, 999, 999);
    let mouseActive = false;

    const handleMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseActive = true;
    };
    const handleLeave = () => {
      mouseActive = false;
    };
    mount.addEventListener("mousemove", handleMove);
    mount.addEventListener("mouseleave", handleLeave);

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    // Ruído pseudo-Simplex pra dobras orgânicas
    const noise3D = (x, y, z, t) => {
      const n1 = Math.sin(x * 1.8 + t * 0.7) * Math.cos(y * 1.5 - t * 0.5);
      const n2 = Math.sin(y * 2.3 + t * 0.9) * Math.cos(z * 2.1 + t * 0.6);
      const n3 = Math.sin(z * 1.6 - t * 0.8) * Math.cos(x * 2.4 + t * 0.4);
      const fold = Math.sin(x * 4.0 + y * 3.5 + t * 1.2) * 0.3;
      return (n1 + n2 + n3) / 3 + fold;
    };

    const clock = new THREE.Clock();
    const positionAttr = geometry.attributes.position;
    const SPRING_BACK = 0.07;
    const DAMPING = 0.86;

    let rafId;
    const animate = () => {
      const time = clock.getElapsedTime();
      points.rotation.y = time * 0.1;
      points.rotation.x = Math.sin(time * 0.15) * 0.08;

      if (mouseActive) {
        raycaster.setFromCamera(mouseNDC, camera);
        const t = -raycaster.ray.origin.z / raycaster.ray.direction.z;
        mouseWorld.copy(raycaster.ray.origin).addScaledVector(raycaster.ray.direction, t);
      } else {
        mouseWorld.set(999, 999, 999);
      }

      const invRotY = -points.rotation.y;
      const cosR = Math.cos(invRotY);
      const sinR = Math.sin(invRotY);
      const localMouseX = mouseWorld.x * cosR - mouseWorld.z * sinR;
      const localMouseZ = mouseWorld.x * sinR + mouseWorld.z * cosR;
      const localMouseY = mouseWorld.y;

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
        const bx = basePositions[ix];
        const by = basePositions[iy];
        const bz = basePositions[iz];
        const sx = seeds[ix], sy = seeds[iy], sz = seeds[iz];

        const noiseVal = noise3D(bx, by, bz, time);
        const chaos = Math.sin(time * 0.6 + sx) * Math.cos(time * 0.5 + sy) * 0.4;

        const len = Math.sqrt(bx * bx + by * by + bz * bz) || 1;
        const nx = bx / len, ny = by / len, nz = bz / len;

        // Tangentes pra criar dobras laterais
        const tx = -nz, ty = 0, tz = nx;
        const bnx = ny * tz - nz * ty;
        const bny = nz * tx - nx * tz;
        const bnz = nx * ty - ny * tx;

        const radialDisp = (noiseVal + chaos * 0.3) * organicAmplitude;
        const tangentDisp = Math.sin(noiseVal * 3 + time * 0.4 + sz) * organicAmplitude * 0.5;

        let targetX = bx + nx * radialDisp + tx * tangentDisp + bnx * tangentDisp * 0.5;
        let targetY = by + ny * radialDisp + ty * tangentDisp + bny * tangentDisp * 0.5;
        let targetZ = bz + nz * radialDisp + tz * tangentDisp + bnz * tangentDisp * 0.5;

        if (mouseActive) {
          const dx = currentPositions[ix] - localMouseX;
          const dy = currentPositions[iy] - localMouseY;
          const dz = currentPositions[iz] - localMouseZ;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < mouseRadius) {
            const falloff = 1 - dist / mouseRadius;
            const force = falloff * falloff * mouseStrength;
            const sideX = dx / (dist + 0.001);
            const sideZ = dz / (dist + 0.001);

            targetX += sideX * force * 0.6;
            targetY -= force * 0.9;
            targetZ += sideZ * force * 0.6;
          }
        }

        velocities[ix] += (targetX - currentPositions[ix]) * SPRING_BACK;
        velocities[iy] += (targetY - currentPositions[iy]) * SPRING_BACK;
        velocities[iz] += (targetZ - currentPositions[iz]) * SPRING_BACK;
        velocities[ix] *= DAMPING;
        velocities[iy] *= DAMPING;
        velocities[iz] *= DAMPING;
        currentPositions[ix] += velocities[ix];
        currentPositions[iy] += velocities[iy];
        currentPositions[iz] += velocities[iz];
      }

      positionAttr.needsUpdate = true;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      mount.removeEventListener("mousemove", handleMove);
      mount.removeEventListener("mouseleave", handleLeave);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      sprite.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [particleCount, sphereRadius, mouseRadius, mouseStrength, organicAmplitude]);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full min-h-[400px] ${className}`}
      style={{ touchAction: "none" }}
    />
  );
}