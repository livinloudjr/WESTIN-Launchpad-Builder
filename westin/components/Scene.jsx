'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GOLD = 0xd9c7a0;

export default function Scene() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true, alpha: true, powerPreference: 'low-power' }); } catch { return; }
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = () => innerWidth < 768;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0a0c, 0.06);
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);

    // Ignition core: wireframe shell, glowing ember, orbit ring with a travelling spark
    const core = new THREE.Group();
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 1), new THREE.MeshBasicMaterial({ color: GOLD, wireframe: true, transparent: true, opacity: 0.5 }));
    const ember = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 2), new THREE.MeshBasicMaterial({ color: 0xffe2a8 }));
    const orbit = new THREE.Group();
    orbit.rotation.set(1.2, 0.3, 0);
    orbit.add(new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.006, 6, 200), new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.55 })));
    const spark = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfff1cc }));
    orbit.add(spark);
    core.add(shell, ember, orbit);
    scene.add(core);

    // Rising embers
    const N = small() ? 500 : 1400;
    const pos = new Float32Array(N * 3), spd = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const a = Math.random() * 6.283, r = 1.8 + Math.random() * 7;
      pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = Math.random() * 16 - 8; pos[i * 3 + 2] = Math.sin(a) * r - 3;
      spd[i] = 0.15 + Math.random() * 0.5;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const points = new THREE.Points(pg, new THREE.PointsMaterial({ color: GOLD, size: 0.035, transparent: true, opacity: 0.8, depthWrite: false, blending: THREE.AdditiveBlending }));
    scene.add(points);

    const m = { x: 0, y: 0, tx: 0, ty: 0 };
    let prog = 0, sp = 0, last = performance.now(), raf = 0;
    const onMove = (e) => { m.tx = e.clientX / innerWidth - 0.5; m.ty = e.clientY / innerHeight - 0.5; };
    const onScroll = () => { const h = document.documentElement.scrollHeight - innerHeight; prog = h > 0 ? scrollY / h : 0; };

    const frame = () => {
      const now = performance.now(), dt = reduce ? 0 : Math.min((now - last) / 1000, 0.05), t = reduce ? 0 : now / 1000;
      last = now;
      m.x += (m.tx - m.x) * 0.05; m.y += (m.ty - m.y) * 0.05; sp += (prog - sp) * 0.06;
      const mob = small();
      core.position.set(mob ? 0 : 2.4 - sp * 3.4, mob ? 1.6 - sp * 1.2 : 0.2 + sp * 0.8, 0);
      core.rotation.y = t * 0.15 + m.x * 1.2 + sp * 3;
      core.rotation.x = m.y * 0.8 + sp * 1.2;
      core.scale.setScalar((mob ? 0.7 : 1) * (1 + Math.sin(t * 1.6) * 0.03));
      ember.scale.setScalar(1 + Math.sin(t * 2.2) * 0.12);
      orbit.rotation.z = t * 0.2;
      spark.position.set(Math.cos(t * 1.3) * 1.9, Math.sin(t * 1.3) * 1.9, 0);
      for (let i = 0; i < N; i++) { let y = pos[i * 3 + 1] + spd[i] * dt; if (y > 8) y = -8; pos[i * 3 + 1] = y; }
      pg.attributes.position.needsUpdate = true;
      points.rotation.y = t * 0.02 + sp * 0.8;
      camera.position.set(m.x * 0.8, -m.y * 0.5 - sp * 2.5, 6 - sp * 1.5);
      camera.lookAt(0, -sp * 1.5, 0);
      el.style.opacity = String(1 - sp * 0.6); // keep content legible further down the page
      renderer.render(scene, camera);
    };
    const resize = () => { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); if (reduce) frame(); };
    const loop = () => { frame(); raf = requestAnimationFrame(loop); };

    resize();
    addEventListener('resize', resize);
    if (reduce) frame(); else { addEventListener('pointermove', onMove); addEventListener('scroll', onScroll, { passive: true }); loop(); }

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize); removeEventListener('pointermove', onMove); removeEventListener('scroll', onScroll);
      scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose(); });
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
