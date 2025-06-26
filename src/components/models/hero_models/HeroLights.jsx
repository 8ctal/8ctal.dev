import * as THREE from "three";

const HeroLights = () => (
    <>
        {/* Luz principal desde arriba (spotlight centrado) */}
        <spotLight
            position={[0, 10, 0]} // Directamente arriba
            angle={Math.PI / 4}
            penumbra={0.6}
            intensity={100}
            color="#ffffff"
            castShadow
        />

        {/* Luz direccional suave desde arriba */}
        <directionalLight
            position={[0, 5, 5]}
            intensity={0.5}
            color="#ffffff"
            castShadow
        />

        {/* Luz rectangular desde arriba, suave para relleno */}
        <primitive
            object={new THREE.RectAreaLight("#ffffff", 10, 6, 6)}
            position={[0, 6, 0]}
            rotation={[-Math.PI / 2, 0, 0]} // Mirando hacia abajo
        />

        {/* Luz ambiente muy suave solo para no perder detalle en sombras */}
        <ambientLight intensity={0.1} />
    </>
);

export default HeroLights;
