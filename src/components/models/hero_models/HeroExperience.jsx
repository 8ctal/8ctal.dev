import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";


import { NetrunnerOffice } from "./NetrunnerOffice";
import { HeroModel } from "./HeroModel";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { Suspense } from "react";

const HeroExperience = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

    return (
        <Canvas shadows camera={{ position: [-120, 40, 300], fov: 45 }}>
            <hemisphereLight intensity={0.35} groundColor="black" />
            {/* <EightBall position[-80, 10, 100] /> */}
            {/* deep blue ambient */}
            <ambientLight intensity={0.2} color="#b9c6ea" />
            {/* Configure OrbitControls to disable panning and control zoom based on device type */}
            <OrbitControls
                enablePan={false} // Prevents panning of the scene
                enableZoom={!isTablet} // Disables zoom on tablets
                maxDistance={20} // Maximum distance for zooming out
                minDistance={5} // Minimum distance for zooming in
                minPolarAngle={Math.PI / 5} // Minimum angle for vertical rotation
                maxPolarAngle={Math.PI / 2} // Maximum angle for vertical rotation
            />

            <Suspense fallback={null}>
                <HeroLights />
                <Particles count={100} />
                <group
                    scale={isMobile ? 0.7 : 1}
                    position={[0, -3.5, 0]}
                    rotation={[0, -Math.PI / 4, 0]}
                >
                    <HeroModel />
                    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.51, 0]}>
                        <planeGeometry args={[50, 50]} />
                        <shadowMaterial opacity={0.3} />
                    </mesh>


                </group>
            </Suspense>
        </Canvas>
    );
};

export default HeroExperience;