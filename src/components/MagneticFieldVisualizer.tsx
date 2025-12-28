import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const MagneticFieldVisualizer = () => {
  const [currentIntensity, setCurrentIntensity] = useState([50]);
  const [show3D, setShow3D] = useState(false);

  const intensity = currentIntensity[0];
  const fieldStrength = intensity / 100;

  // Generate field lines
  const generateFieldLines = () => {
    const lines = [];
    const numLines = Math.ceil(5 + fieldStrength * 8);

    for (let i = 0; i < numLines; i++) {
      const radius = 30 + (i * 180) / numLines;
      const opacity = Math.max(0.2, 1 - (i / numLines) * 0.8);
      lines.push({ radius, opacity });
    }
    return lines;
  };

  // Generate iron filings
  const generateIronFilings = () => {
    const filings = [];
    const density = Math.ceil(fieldStrength * 100);

    for (let i = 0; i < density; i++) {
      const angle = Math.random() * 360;
      const distance = 40 + Math.random() * 160;
      const rotation = angle + 90; // Perpendicular to radial direction
      const length = 8 + Math.random() * 8;
      const x = Math.cos((angle * Math.PI) / 180) * distance;
      const y = Math.sin((angle * Math.PI) / 180) * distance;

      filings.push({ x, y, rotation, length, angle });
    }
    return filings;
  };

  const fieldLines = generateFieldLines();
  const ironFilings = generateIronFilings();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Magnetic Field Visualizer</CardTitle>
        <CardDescription>
          Visualize the circular magnetic field around a current-carrying wire
          with adjustable current intensity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Visualization Area */}
          <div className="relative bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 min-h-125 flex items-center justify-center overflow-hidden">
            <div
              className={`relative transition-all duration-500 ${
                show3D ? "transform perspective-1000 rotate-x-20" : ""
              }`}
              style={{
                width: "400px",
                height: "400px",
              }}
            >
              {/* Magnetic field lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                {fieldLines.map((line, i) => (
                  <div
                    key={`line-${i}`}
                    className="absolute border-2 border-blue-500 rounded-full transition-all duration-300"
                    style={{
                      width: `${line.radius * 2}px`,
                      height: `${line.radius * 2}px`,
                      opacity: line.opacity * fieldStrength,
                      borderStyle: "solid",
                    }}
                  >
                    {/* Field direction indicators */}
                    {i % 2 === 0 && (
                      <>
                        <div
                          className="absolute w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-t-blue-500"
                          style={{
                            top: "0%",
                            left: "50%",
                            transform: "translate(-50%, -100%) rotate(90deg)",
                          }}
                        />
                        <div
                          className="absolute w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-t-blue-500"
                          style={{
                            bottom: "0%",
                            left: "50%",
                            transform: "translate(-50%, 100%) rotate(-90deg)",
                          }}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Iron filings pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                {ironFilings.map((filing, i) => (
                  <div
                    key={`filing-${i}`}
                    className="absolute bg-gray-700 dark:bg-gray-300 rounded-full"
                    style={{
                      width: `${filing.length}px`,
                      height: "2px",
                      left: `calc(50% + ${filing.x}px)`,
                      top: `calc(50% + ${filing.y}px)`,
                      transform: `translate(-50%, -50%) rotate(${filing.rotation}deg)`,
                      opacity: 0.6 * fieldStrength,
                    }}
                  />
                ))}
              </div>

              {/* Wire (cross-section) */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-16 h-16 bg-linear-to-br from-amber-600 to-amber-800 rounded-full shadow-2xl border-4 border-amber-900 flex items-center justify-center">
                  {/* Current direction indicator (into/out of page) */}
                  <div className="relative">
                    {/* Dot for current coming out */}
                    <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
                    </div>

                    {/* Animated glow */}
                    {intensity > 0 && (
                      <div
                        className="absolute inset-0 bg-yellow-400 rounded-full animate-pulse"
                        style={{
                          opacity: 0.3 * fieldStrength,
                        }}
                      ></div>
                    )}
                  </div>

                  {/* Current label */}
                  <div className="absolute -bottom-10 text-sm font-bold text-amber-800 dark:text-amber-400 whitespace-nowrap">
                    Current: {intensity}%
                  </div>
                </div>
              </div>

              {/* Field strength visualization */}
              {intensity > 0 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div
                    className="absolute inset-0 bg-blue-400 rounded-full blur-xl"
                    style={{
                      width: `${100 + fieldStrength * 200}px`,
                      height: `${100 + fieldStrength * 200}px`,
                      opacity: 0.1 * fieldStrength,
                      animation: `pulse 2s ease-in-out infinite`,
                    }}
                  ></div>
                </div>
              )}
            </div>

            {/* 3D perspective grid */}
            {show3D && (
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full opacity-20">
                  {[...Array(10)].map((_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={`${(i + 1) * 10}%`}
                      y1="0%"
                      x2={`${(i + 1) * 10}%`}
                      y2="100%"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  ))}
                  {[...Array(10)].map((_, i) => (
                    <line
                      key={`h-${i}`}
                      x1="0%"
                      y1={`${(i + 1) * 10}%`}
                      x2="100%"
                      y2={`${(i + 1) * 10}%`}
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  ))}
                </svg>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Current Intensity</label>
                <span className="text-sm text-muted-foreground">
                  {intensity}%
                </span>
              </div>
              <Slider
                value={currentIntensity}
                onValueChange={setCurrentIntensity}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg">
              <label className="text-sm font-medium">3D Perspective View</label>
              <Switch checked={show3D} onCheckedChange={setShow3D} />
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              Understanding the Visualization
            </h4>
            <ul className="text-sm text-green-800 dark:text-green-200 space-y-1 list-disc list-inside">
              <li>
                Circular blue lines represent the magnetic field lines around
                the wire
              </li>
              <li>
                Small dark lines simulate iron filings aligning with the field
              </li>
              <li>
                The dot in the wire center shows current flowing out of the page
              </li>
              <li>Field strength increases with current intensity</li>
              <li>
                Use the Right-Hand Rule: thumb points in current direction,
                fingers curl in field direction
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MagneticFieldVisualizer;
