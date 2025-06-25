import * as THREE from "three";

const HeroLights = () => (
    <>
        {/* Main spotlight for dramatic top lighting */}
        <spotLight
            position={[0, 5, 0]}
            angle={0.3}
            penumbra={0.5}
            intensity={80}
            color="ffffff"
            castShadow
        />
        {/* Accent light for side highlights */}
        <spotLight
            position={[3, 3, 3]}
            angle={0.4}
            penumbra={0.6}
            intensity={40}
            color="ffffff"
        />
        {/* Fill light for shadows */}
        <spotLight
            position={[-3, 2, -2]}
            angle={0.5}
            penumbra={0.8}
            intensity={30}
            color="ffffff"
        />
        {/* Ambient light for base illumination */}
        <primitive
            object={new THREE.RectAreaLight("ffffff", 5, 4, 3)}
            position={[0, 2, 2]}
            rotation={[-Math.PI / 4, 0, 0]}
            intensity={10}
        />
        {/* Subtle point lights for specular highlights */}
        <pointLight position={[2, 1, 2]} intensity={5} color="#ffffff" />
        <pointLight position={[-2, 1, -2]} intensity={5} color="#ffffff" />
        {/* Lower right accent light */}
        <spotLight
            position={[4, -1, 2]}
            angle={0.6}
            penumbra={0.7}
            intensity={35}
            color="ffffff"
        />
        {/* Bottom fill light */}
        <spotLight
            position={[0, -2, 0]}
            angle={0.8}
            penumbra={1}
            intensity={25}
            color="ffffff"
        />
        {/* Lower left rim light */}
        <spotLight
            position={[-10, -10, -50]}
            angle={0.9}
            penumbra={0.8}
            intensity={20}
            color="ffffff"
        />
    </>
);

export default HeroLights;