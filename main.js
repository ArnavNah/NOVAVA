import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  createIcons,
  Activity,
  Sun,
  Zap,
  Layers,
  TrendingUp,
  ArrowRight,
  Star,
  MousePointer2,
  Clock,
  Code,
  Image,
  Palette,
  Cpu,
  ShieldCheck,
  SlidersHorizontal,
  Atom,
  Folder,
  FileText,
  Wand2
} from 'lucide';

// ----------------------------------------------------
// 1. Initialize Lucide Icons
// ----------------------------------------------------
createIcons({
  icons: {
    Activity,
    Sun,
    Zap,
    Layers,
    TrendingUp,
    ArrowRight,
    Star,
    MousePointer2,
    Clock,
    Code,
    Image,
    Palette,
    Cpu,
    ShieldCheck,
    SlidersHorizontal,
    Atom,
    Folder,
    FileText,
    Wand2
  }
});

// ----------------------------------------------------
// 2. Interactive Tab Switcher (Architecture Section)
// ----------------------------------------------------
window.switchTab = function(tabId) {
  for(let i = 1; i <= 3; i++) {
    const viz = document.getElementById('viz-' + i);
    const tab = document.getElementById('tab-' + i);
    const ind = tab.querySelector('.viz-indicator');
    
    if(i === tabId) {
      viz.classList.remove('hidden');
      viz.classList.add('flex', 'animate-viz-fade-in');
      tab.classList.add('border-indigo-500/30');
      tab.classList.remove('border-white/10');
      ind.classList.add('bg-indigo-500', 'shadow-[0_0_15px_rgba(99,102,241,0.5)]');
      ind.classList.remove('bg-slate-800', 'border', 'border-white/20');
    } else {
      viz.classList.add('hidden');
      viz.classList.remove('flex', 'animate-viz-fade-in');
      tab.classList.add('border-white/10');
      tab.classList.remove('border-indigo-500/30');
      ind.classList.add('bg-slate-800', 'border', 'border-white/20');
      ind.classList.remove('bg-indigo-500', 'shadow-[0_0_15px_rgba(99,102,241,0.5)]');
    }
  }
  // Re-run createIcons to process any newly visible Lucide elements
  createIcons({
    icons: {
      Activity,
      Sun,
      Zap,
      Layers,
      TrendingUp,
      ArrowRight,
      Star,
      MousePointer2,
      Clock,
      Code,
      Image,
      Palette,
      Cpu,
      ShieldCheck,
      SlidersHorizontal,
      Atom,
      Folder,
      FileText,
      Wand2
    }
  });
};

// ----------------------------------------------------
// 3. Typewriter Code Animation (Integration Section)
// ----------------------------------------------------
(() => {
  const codeEl = document.querySelector("#typing-code");
  if (!codeEl) return;

  const fullCode = `import { VortexCanvas, VolumetricShell } from '@vortex/core';

export default function App() {
  return (
    <VortexCanvas engine="webgl2" gravity>
      <div className="relative z-10">
        <VolumetricShell 
          thickness={3.0} 
          density={0.2}
        >
          <h1>Hello Vortex</h1>
        </VolumetricShell>
      </div>
    </VortexCanvas>
  );
}`;

  let index = 0;
  let started = false;

  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function highlight(code) {
    return escapeHTML(code)
      .replace(/\b(import|from|export default function|return)\b/g, '<span class="text-pink-400">$1</span>')
      .replace(/('@vortex\/core'|"webgl2"|"relative z-10")/g, '<span class="text-emerald-300">$1</span>')
      .replace(/\b(App)\b/g, '<span class="text-indigo-300">$1</span>')
      .replace(/\b(engine|gravity|className|thickness|density)\b/g, '<span class="text-indigo-200">$1</span>')
      .replace(/(3\.0|0\.2)/g, '<span class="text-orange-300">$1</span>')
      .replace(/(&lt;\/?[^&]+?&gt;)/g, '<span class="text-blue-300">$1</span>');
  }

  function typeCode() {
    codeEl.innerHTML = highlight(fullCode.slice(0, index));
    index++;

    if (index <= fullCode.length) {
      setTimeout(typeCode, 18);
    }
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        typeCode();
        observer.disconnect();
      }
    },
    { threshold: 0.35 }
  );

  observer.observe(codeEl);
})();

// ----------------------------------------------------
// 4. Pricing Monthly/Annually Dynamic Toggle
// ----------------------------------------------------
(() => {
  const toggle = document.getElementById('billing-toggle');
  const proPrice = document.getElementById('pro-price');
  const studioPrice = document.getElementById('studio-price');
  const proPeriod = document.getElementById('pro-period');
  const studioPeriod = document.getElementById('studio-period');
  const labelMonthly = document.getElementById('label-monthly');
  const labelAnnually = document.getElementById('label-annually');

  if(toggle && proPrice && studioPrice) {
    toggle.addEventListener('change', (e) => {
      proPrice.classList.remove('price-pop');
      studioPrice.classList.remove('price-pop');
      void proPrice.offsetWidth; // Force reflow to restart CSS animation
      void studioPrice.offsetWidth;
      proPrice.classList.add('price-pop');
      studioPrice.classList.add('price-pop');

      if (e.target.checked) {
        proPrice.innerHTML = '$39';
        studioPrice.innerHTML = '$159';
        proPeriod.innerHTML = '/mo<br><span class="text-[10px] text-indigo-400 block -mt-1">billed annually</span>';
        studioPeriod.innerHTML = '/mo<br><span class="text-[10px] text-indigo-400 block -mt-1">billed annually</span>';
        
        labelAnnually.classList.add('text-white', 'bg-white/10');
        labelAnnually.classList.remove('text-slate-400');
        labelMonthly.classList.remove('text-white', 'bg-white/10');
        labelMonthly.classList.add('text-slate-400');
      } else {
        proPrice.innerHTML = '$49';
        studioPrice.innerHTML = '$199';
        proPeriod.innerHTML = '/mo';
        studioPeriod.innerHTML = '/mo';

        labelMonthly.classList.add('text-white', 'bg-white/10');
        labelMonthly.classList.remove('text-slate-400');
        labelAnnually.classList.remove('text-white', 'bg-white/10');
        labelAnnually.classList.add('text-slate-400');
      }
    });
  }
})();

// ----------------------------------------------------
// 5. GSAP ScrollTrigger Animations
// ----------------------------------------------------
gsap.registerPlugin(ScrollTrigger);

// Hero Title Word Reveal
const heroTl = gsap.timeline({
  scrollTrigger: { trigger: '.hero-heading', start: 'top 85%' },
  defaults: { ease: 'power4.out' }
});

heroTl.to('.hero-heading .reveal-word', {
  y: '0%', duration: 1.2, stagger: 0.08, delay: 0.2
})
.to('.gs-reveal', {
  opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out'
}, "-=1");

// Generic Section Fade-ins
gsap.utils.toArray('.gs-fade').forEach(element => {
  gsap.fromTo(element,
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 85%' }
    }
  );
});

// ----------------------------------------------------
// 6. Three.js Iridescent Wave Background Canvas
// ----------------------------------------------------
const hexToNormalizedRGB = (hex) => {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return [r / 255, g / 255, b / 255];
};

function extendMaterial(BaseMaterial, cfg) {
  const physical = THREE.ShaderLib.physical;
  const baseVert = physical.vertexShader;
  const baseFrag = physical.fragmentShader;
  const baseUniforms = physical.uniforms;
  const baseDefines = physical.defines || {};

  const uniforms = THREE.UniformsUtils.clone(baseUniforms);
  const defaults = new BaseMaterial(cfg.material || {});

  if (defaults.color) uniforms.diffuse.value = defaults.color;
  if ('roughness' in defaults) uniforms.roughness.value = defaults.roughness;
  if ('metalness' in defaults) uniforms.metalness.value = defaults.metalness;

  Object.entries(cfg.uniforms || {}).forEach(([key, u]) => {
    uniforms[key] = u !== null && typeof u === 'object' && 'value' in u ? u : { value: u };
  });

  let vert = `${cfg.header}\n${cfg.vertexHeader || ''}\n${baseVert}`;
  let frag = `${cfg.header}\n${cfg.fragmentHeader || ''}\n${baseFrag}`;

  for (const [inc, code] of Object.entries(cfg.vertex || {})) {
    vert = vert.replace(inc, `${inc}\n${code}`);
  }
  for (const [inc, code] of Object.entries(cfg.fragment || {})) {
    frag = frag.replace(inc, `${inc}\n${code}`);
  }

  return new THREE.ShaderMaterial({
    defines: { ...baseDefines },
    uniforms,
    vertexShader: vert,
    fragmentShader: frag,
    lights: true,
    fog: !!cfg.material?.fog
  });
}

const noiseShader = `
  float random (in vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123); }
  float noise (in vec2 st) {
      vec2 i = floor(st); vec2 f = fract(st); float a = random(i); float b = random(i + vec2(1.0, 0.0)); float c = random(i + vec2(0.0, 1.0)); float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f); return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
  float cnoise(vec3 P){
      vec3 Pi0 = floor(P); vec3 Pi1 = Pi0 + vec3(1.0); Pi0 = mod(Pi0, 289.0); Pi1 = mod(Pi1, 289.0);
      vec3 Pf0 = fract(P); vec3 Pf1 = Pf0 - vec3(1.0); vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x); vec4 iy = vec4(Pi0.yy, Pi1.yy);
      vec4 iz0 = Pi0.zzzz; vec4 iz1 = Pi1.zzzz; vec4 ixy = permute(permute(ix) + iy); vec4 ixy0 = permute(ixy + iz0); vec4 ixy1 = permute(ixy + iz1);
      vec4 gx0 = ixy0 / 7.0; vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5; gx0 = fract(gx0); vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0); vec4 sz0 = step(gz0, vec4(0.0));
      gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5); vec4 gx1 = ixy1 / 7.0; vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5; gx1 = fract(gx1);
      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1); vec4 sz1 = step(gz1, vec4(0.0)); gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);
      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x); vec3 g100 = vec3(gx0.y,gy0.y,gz0.y); vec3 g010 = vec3(gx0.z,gy0.z,gz0.z); vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x); vec3 g101 = vec3(gx1.y,gy1.y,gz1.y); vec3 g011 = vec3(gx1.z,gy1.z,gz1.z); vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
      vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110))); g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
      vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111))); g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
      float n000 = dot(g000, Pf0);
      float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
      float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
      float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
      float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
      float n111 = dot(g111, Pf1);
      vec3 fade_xyz = fade(Pf0); vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z); vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y); float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x);
      return 2.2 * n_xyz;
  }
`;

function createStackedPlanesBufferGeometry(n, width, height, spacing, heightSegments) {
  const geometry = new THREE.BufferGeometry();
  const numVertices = n * (heightSegments + 1) * 2;
  const numFaces = n * heightSegments * 2;
  const positions = new Float32Array(numVertices * 3);
  const indices = new Uint32Array(numFaces * 3);
  const uvs = new Float32Array(numVertices * 2);

  let vertexOffset = 0, indexOffset = 0, uvOffset = 0;
  const totalWidth = n * width + (n - 1) * spacing;
  const xOffsetBase = -totalWidth / 2;

  for (let i = 0; i < n; i++) {
    const xOffset = xOffsetBase + i * (width + spacing);
    const uvXOffset = Math.random() * 300;
    const uvYOffset = Math.random() * 300;

    for (let j = 0; j <= heightSegments; j++) {
      const y = height * (j / heightSegments - 0.5);
      positions.set([xOffset, y, 0, xOffset + width, y, 0], vertexOffset * 3);
      const uvY = j / heightSegments;
      uvs.set([uvXOffset, uvY + uvYOffset, uvXOffset + 1, uvY + uvYOffset], uvOffset);

      if (j < heightSegments) {
        const a = vertexOffset, b = vertexOffset + 1, c = vertexOffset + 2, d = vertexOffset + 3;
        indices.set([a, b, c, c, b, d], indexOffset);
        indexOffset += 6;
      }
      vertexOffset += 2;
      uvOffset += 4;
    }
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  return geometry;
}

const initThree = () => {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('#020617', 0.015);

  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 20);

  scene.add(new THREE.AmbientLight(0xffffff, 1));
  const dirLight = new THREE.DirectionalLight('#a5b4fc', 1.2);
  dirLight.position.set(0, 3, 10);
  scene.add(dirLight);

  const beamProps = {
    width: 2.5,
    height: 35,
    count: 12,
    speed: 0.8,
    noiseIntensity: 1.8,
    scale: 0.15,
    rotation: 12
  };

  const beamMaterial = extendMaterial(THREE.MeshStandardMaterial, {
    header: `varying vec3 vEye; varying float vNoise; varying vec2 vUv; varying vec3 vPosition; uniform float time; uniform float uSpeed; uniform float uNoiseIntensity; uniform float uScale; ${noiseShader}`,
    vertexHeader: `
      float getPos(vec3 pos) { vec3 noisePos = vec3(pos.x * 0., pos.y - uv.y, pos.z + time * uSpeed * 3.) * uScale; return cnoise(noisePos); }
      vec3 getCurrentPos(vec3 pos) { vec3 newpos = pos; newpos.z += getPos(pos); return newpos; }
      vec3 getNormal(vec3 pos) { vec3 curpos = getCurrentPos(pos); vec3 nextposX = getCurrentPos(pos + vec3(0.01, 0.0, 0.0)); vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.01, 0.0)); vec3 tangentX = normalize(nextposX - curpos); vec3 tangentZ = normalize(nextposZ - curpos); return normalize(cross(tangentZ, tangentX)); }
    `,
    vertex: {
      '#include <begin_vertex>': `transformed.z += getPos(transformed.xyz);`,
      '#include <beginnormal_vertex>': `objectNormal = getNormal(position.xyz);`
    },
    fragment: {
      '#include <dithering_fragment>': `float randomNoise = noise(gl_FragCoord.xy); gl_FragColor.rgb -= randomNoise / 15. * uNoiseIntensity;`
    },
    material: { fog: true, transparent: true },
    uniforms: {
      diffuse: { value: new THREE.Color(...hexToNormalizedRGB('#020617')) },
      time: { value: 0 },
      roughness: { value: 0.3 },
      metalness: { value: 0.4 },
      uSpeed: { value: beamProps.speed },
      envMapIntensity: { value: 10 },
      uNoiseIntensity: { value: beamProps.noiseIntensity },
      uScale: { value: beamProps.scale }
    }
  });

  const mesh = new THREE.Mesh(
    createStackedPlanesBufferGeometry(beamProps.count, beamProps.width, beamProps.height, 0, 120),
    beamMaterial
  );
  mesh.rotation.z = THREE.MathUtils.degToRad(beamProps.rotation);
  mesh.position.x = 8;
  mesh.scale.set(1.5, 1.5, 1);
  scene.add(mesh);

  // Pointer Interaction Parallax
  let mouseX = 0;
  let mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (beamMaterial.uniforms.time) {
      beamMaterial.uniforms.time.value += 0.1 * delta;
    }

    // Subtle Camera Parallax
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThree);
} else {
  initThree();
}

// ----------------------------------------------------
// 7. Video Intersection Observer Playback
// ----------------------------------------------------
(() => {
  function playVideo(video) {
    const promise = video.play();
    if (promise && typeof promise.catch === "function") {
      promise.catch(() => {});
    }
  }

  function setupVideo(video) {
    if (video.__auraVideoReady === true) return;
    video.__auraVideoReady = true;
    video.removeAttribute("data-aura-video-ready");
    video.removeAttribute("data-aura-video-played");
    video.muted = true;
    video.playsInline = true;

    const preset = video.dataset.auraVideoPreset || "loop-in-view";
    if (preset === "hover") {
      video.addEventListener("mouseenter", () => {
        playVideo(video);
      });
      video.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
      });
      return;
    }

    if (!("IntersectionObserver" in window)) {
      playVideo(video);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (preset === "play-once" && video.__auraVideoPlayed === true) {
            return;
          }
          playVideo(video);
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.35 });

    if (preset === "play-once") {
      video.addEventListener("ended", () => {
        video.__auraVideoPlayed = true;
      }, { once: true });
    }

    observer.observe(video);
  }

  function setupVideos() {
    document
      .querySelectorAll("video[data-aura-video-preset]")
      .forEach(setupVideo);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupVideos);
  } else {
    setupVideos();
  }
})();
