import { createFileRoute } from "@tanstack/react-router";
import { FeaturePage, IMAGES, meta } from "@/components/site";

export const Route = createFileRoute("/health")({
  head: () => meta("Health Monitoring — NovaWatch", "Heart rate, sleep tracking and activity monitoring with NovaWatch's advanced health sensors."),
  component: () => (
    <FeaturePage
      eyebrow="Health Monitoring"
      title="Know your body, every second."
      intro="Advanced optical and electrical sensors give you a continuous, accurate picture of your wellbeing — day and night."
      image={IMAGES.health}
      sections={[
        { title: "Heart rate", text: "Continuous monitoring with alerts for unusually high or low heart rates and irregular rhythm notifications." },
        { title: "Sleep tracking", text: "Detailed analysis of light, deep and REM sleep, with a nightly sleep score and personalised tips." },
        { title: "Activity", text: "Automatic detection of 100+ workouts, step counting, calories and daily movement goals." },
      ]}
      benefits={["Spot trends early with weekly health reports", "Train smarter with real-time heart rate zones", "Wake up rested with smart silent alarms", "Share data securely with your doctor"]}
      specs={[["Heart sensor", "Optical PPG + ECG"], ["Blood oxygen", "SpO₂ on demand & overnight"], ["Workout modes", "100+"], ["Sleep stages", "Light, Deep, REM, Awake"], ["Skin temperature", "±0.1 °C"]]}
    />
  ),
});
