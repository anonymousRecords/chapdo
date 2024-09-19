"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const SolidColorStickers = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let camera: THREE.PerspectiveCamera,
      scene: THREE.Scene,
      renderer: THREE.WebGLRenderer,
      raycaster: THREE.Raycaster,
      mouse: THREE.Vector2,
      floor: THREE.Mesh;
    let draggingSticker: THREE.Mesh | null = null;
    const stickers: THREE.Mesh[] = [];
    let lastMousePosition = new THREE.Vector2();
    let mouseVelocity = new THREE.Vector2();

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      camera.position.set(0, 10, 10);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        // @ts-ignore
        canvas: canvasRef.current,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;

      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);

      const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
      light1.position.set(5, 10, 5);
      light1.castShadow = true;
      scene.add(light1);

      const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
      light2.position.set(-5, 10, -5);
      light2.castShadow = true;
      scene.add(light2);

      floor = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshPhongMaterial({ color: 0x222222 }),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      scene.add(floor);

      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();

      createCircleSticker(-3, 0.01, 0, new THREE.Color(0xff0000));
      createTriangleSticker(0, 0.01, 0, new THREE.Color(0x00ff00));
      createDiamondSticker(3, 0.01, 0, new THREE.Color(0x0000ff));

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("resize", onWindowResize);
    }

    function createSolidColorMaterial(color: THREE.Color) {
      return new THREE.MeshPhongMaterial({
        color: color,
        side: THREE.DoubleSide,
      });
    }

    function createCircleSticker(
      x: number,
      y: number,
      z: number,
      color: THREE.Color,
    ) {
      const geometry = new THREE.CircleGeometry(1, 32);
      const material = createSolidColorMaterial(color);
      createSticker(geometry, material, x, y, z);
    }

    function createTriangleSticker(
      x: number,
      y: number,
      z: number,
      color: THREE.Color,
    ) {
      const shape = new THREE.Shape();
      shape.moveTo(0, 1);
      shape.lineTo(-1, -1);
      shape.lineTo(1, -1);
      shape.lineTo(0, 1);
      const geometry = new THREE.ShapeGeometry(shape);
      const material = createSolidColorMaterial(color);
      createSticker(geometry, material, x, y, z);
    }

    function createDiamondSticker(
      x: number,
      y: number,
      z: number,
      color: THREE.Color,
    ) {
      const shape = new THREE.Shape();
      shape.moveTo(0, 1);
      shape.lineTo(1, 0);
      shape.lineTo(0, -1);
      shape.lineTo(-1, 0);
      shape.lineTo(0, 1);
      const geometry = new THREE.ShapeGeometry(shape);
      const material = createSolidColorMaterial(color);
      createSticker(geometry, material, x, y, z);
    }

    function createSticker(
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      x: number,
      y: number,
      z: number,
    ) {
      const sticker = new THREE.Mesh(geometry, material);
      sticker.position.set(x, y, z);
      sticker.rotation.x = -Math.PI / 2;
      sticker.castShadow = true;
      sticker.receiveShadow = true;
      scene.add(sticker);
      stickers.push(sticker);
    }

    function onMouseMove(event: MouseEvent) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      mouseVelocity.x = mouse.x - lastMousePosition.x;
      mouseVelocity.y = mouse.y - lastMousePosition.y;

      lastMousePosition.copy(mouse);

      if (draggingSticker) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(floor);
        if (intersects.length > 0) {
          const targetPosition = intersects[0].point.clone();
          targetPosition.y = 0.01;

          gsap.to(draggingSticker.position, {
            x: targetPosition.x,
            y: targetPosition.y,
            z: targetPosition.z,
            duration: 0.3,
            ease: "power2.out",
          });

          const springStrength = 0.05;
          const tiltX = -mouseVelocity.y * 2 * springStrength;
          const tiltZ = mouseVelocity.x * 2 * springStrength;

          gsap.to(draggingSticker.rotation, {
            x: -Math.PI / 2 + tiltX,
            z: tiltZ,
            duration: 0.5,
            ease: "elastic.out(1.5, 0.3)",
          });
        }
      }
    }

    function onMouseDown(event: MouseEvent) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(stickers);
      if (intersects.length > 0) {
        // @ts-ignore
        draggingSticker = intersects[0].object;
        // @ts-ignore
        gsap.to(draggingSticker.position, {
          y: 0.5,
          duration: 0.2,
          ease: "back.out(2)",
        });
      }
    }

    function onMouseUp() {
      if (draggingSticker) {
        gsap.to(draggingSticker.position, {
          y: 0.01,
          duration: 0.5,
          ease: "bounce.out",
        });
        gsap.to(draggingSticker.rotation, {
          x: -Math.PI / 2,
          z: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        draggingSticker = null;
      }
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default SolidColorStickers;
