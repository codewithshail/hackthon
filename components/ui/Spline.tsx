"use client"
import Spline from "@splinetool/react-spline";

const SplineComponent: React.FC = () => {
  const sceneUrl = 'https://prod.spline.design/Zslt-RTg8JFjc06Q/scene.splinecode';

  console.log('Scene URL:', sceneUrl);

  return (
    <div style={{ height: '100vh' }}>
      {Spline ? <Spline scene={sceneUrl} /> : 'Loading Spline...'}
    </div>
  );
};

export default SplineComponent;