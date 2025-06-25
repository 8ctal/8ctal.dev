import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Computer from "./Computer";
import { EightBall } from "../hero_models/EightBall";
import { Chromatic } from "./Chromatic";

const ContactExperience = () => {
    return (
        <Canvas shadows camera={{ position: [12, 0, -90], fov: 5 }}>
            <ambientLight intensity={1} color="#fff4e6" />

            <directionalLight position={[5, 5, 3]} intensity={2.5} color="#ffffff" />

            <directionalLight
                position={[5, 9, 1]}
                castShadow
                intensity={2.5}
                color="#ffffff"
            />

            <OrbitControls
                enableZoom={true}
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 2}
            />

            <group scale={[1, 1, 1]}>
                <mesh
                    receiveShadow
                    position={[0, -1.5, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                >
                   {/*  <planeGeometry args={[30, 30]} />
                    <meshStandardMaterial color="#000000" /> */}
                </mesh>
            </group>

            <group scale={1} position={[-2, -3, 0]} castShadow>
                <EightBall />
            </group>
        </Canvas>
    );
};

export default ContactExperience;