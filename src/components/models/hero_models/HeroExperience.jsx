import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";

import { Room } from "./Room";
import { PoolBall } from "./PoolBall";
import { LostProgrammer } from "./LostProgrammer";
import { NetrunnerOffice } from "./NetrunnerOffice";
import { MountainBike } from "./MountainBike";
import { EightBall } from "./EightBall";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { Suspense } from "react";

const HeroExperience = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

    return (
        <Canvas camera={{ position: [-120, 10, 0], fov: 62 }}>
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
                    <NetrunnerOffice />
                </group>
            </Suspense>
        </Canvas>
    );
};

export default HeroExperience;