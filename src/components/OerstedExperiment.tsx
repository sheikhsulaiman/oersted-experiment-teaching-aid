import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Power, ArrowLeftRight } from "lucide-react";

const OerstedExperiment = () => {
  const [currentOn, setCurrentOn] = useState(false);
  const [currentDirection, setCurrentDirection] = useState<"right" | "left">(
    "right"
  );
  const [needleAngle, setNeedleAngle] = useState(0);
  const [electronOffset, setElectronOffset] = useState(0);

  useEffect(() => {
    if (currentOn) {
      // Animate compass needle deflection
      const targetAngle = currentDirection === "right" ? 30 : -30;
      const interval = setInterval(() => {
        setNeedleAngle((prev) => {
          const diff = targetAngle - prev;
          if (Math.abs(diff) < 1) return targetAngle;
          return prev + diff * 0.1;
        });
      }, 16);

      // Animate electron flow
      const electronInterval = setInterval(() => {
        setElectronOffset((prev) => {
          if (currentDirection === "right") {
            return (prev + 2) % 400;
          } else {
            return (prev - 2 + 400) % 400;
          }
        });
      }, 30);

      return () => {
        clearInterval(interval);
        clearInterval(electronInterval);
      };
    } else {
      // Return to neutral position
      const interval = setInterval(() => {
        setNeedleAngle((prev) => {
          if (Math.abs(prev) < 0.5) return 0;
          return prev * 0.9;
        });
      }, 16);
      return () => clearInterval(interval);
    }
  }, [currentOn, currentDirection]);

  const toggleCurrent = () => {
    setCurrentOn(!currentOn);
  };

  const reverseCurrent = () => {
    setCurrentDirection((prev) => (prev === "right" ? "left" : "right"));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Interactive Oersted's Experiment</CardTitle>
        <CardDescription>
          Observe how electric current creates a magnetic field that deflects a
          compass needle
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Experiment Visualization */}
          <div className="relative bg-gray-50 dark:bg-gray-800 rounded-lg p-8 min-h-100 flex items-center justify-center">
            {/* Wire */}
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-linear-to-r from-amber-700 via-amber-600 to-amber-700 transform -translate-y-1/2 shadow-lg">
              {/* Electron flow animation */}
              {currentOn && (
                <>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 w-3 h-3 bg-blue-400 rounded-full transform -translate-y-1/2 shadow-glow"
                      style={{
                        left: `${((electronOffset + i * 80) % 400) / 4}%`,
                        transition: "left 0.03s linear",
                      }}
                    >
                      <div className="absolute inset-0 bg-blue-300 rounded-full animate-ping opacity-75"></div>
                    </div>
                  ))}
                </>
              )}

              {/* Current direction indicator */}
              {currentOn && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div
                    className={`flex items-center gap-1 ${
                      currentDirection === "left" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="text-yellow-400 font-bold text-sm">I</div>
                    <ArrowLeftRight className="w-4 h-4 text-yellow-400" />
                  </div>
                </div>
              )}
            </div>

            {/* Compass */}
            <div className="relative z-10">
              <div className="w-32 h-32 rounded-full bg-white dark:bg-gray-700 shadow-xl border-4 border-gray-400 dark:border-gray-500 flex items-center justify-center">
                {/* Compass needle */}
                <div
                  className="absolute w-20 h-1 transition-transform duration-300 ease-out"
                  style={{
                    transform: `rotate(${needleAngle}deg)`,
                  }}
                >
                  <div className="absolute left-0 w-1/2 h-full bg-linear-to-r from-red-600 to-red-500 rounded-l-full shadow-lg"></div>
                  <div className="absolute right-0 w-1/2 h-full bg-linear-to-l from-gray-400 to-gray-300 rounded-r-full shadow-lg"></div>
                </div>

                {/* Center pin */}
                <div className="absolute w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-full shadow-inner"></div>
              </div>

              {/* Deflection angle indicator */}
              {currentOn && Math.abs(needleAngle) > 1 && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {Math.abs(needleAngle).toFixed(1)}°
                </div>
              )}
            </div>

            {/* Magnetic field lines indicator */}
            {currentOn && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute left-1/2 transform -translate-x-1/2 border-2 border-dashed ${
                      currentDirection === "right"
                        ? "border-green-400"
                        : "border-purple-400"
                    } rounded-full opacity-30`}
                    style={{
                      width: `${150 + i * 80}px`,
                      height: `${150 + i * 80}px`,
                      top: `calc(50% - ${75 + i * 40}px)`,
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg">
              <Power
                className={`w-5 h-5 ${
                  currentOn ? "text-green-500" : "text-gray-400"
                }`}
              />
              <label className="text-sm font-medium">Current</label>
              <Switch checked={currentOn} onCheckedChange={toggleCurrent} />
            </div>

            <Button
              variant="outline"
              onClick={reverseCurrent}
              disabled={!currentOn}
              className="flex items-center gap-2"
            >
              <ArrowLeftRight className="w-4 h-4" />
              Reverse Current Direction
            </Button>
          </div>

          {/* Explanation */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              What's happening?
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              When electric current flows through the wire, it creates a
              circular magnetic field around it. This magnetic field interacts
              with the compass needle (which is itself a small magnet), causing
              it to deflect. Reversing the current direction reverses the
              magnetic field direction, deflecting the needle in the opposite
              direction.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OerstedExperiment;
