import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OerstedExperiment from "@/components/OerstedExperiment";
import MagneticFieldVisualizer from "@/components/MagneticFieldVisualizer";
import RightHandRule from "@/components/RightHandRule";

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Oersted's Experiment Teaching Aid
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Interactive visualizations of electromagnetic phenomena
          </p>
        </div>

        <Tabs defaultValue="oersted" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="oersted">Oersted's Experiment</TabsTrigger>
            <TabsTrigger value="field">Magnetic Field Visualizer</TabsTrigger>
            <TabsTrigger value="righthand">Right-Hand Rule</TabsTrigger>
          </TabsList>

          <TabsContent value="oersted">
            <OerstedExperiment />
          </TabsContent>

          <TabsContent value="field">
            <MagneticFieldVisualizer />
          </TabsContent>

          <TabsContent value="righthand">
            <RightHandRule />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
