export interface ModernizationData {
  title: string;
  description: string;
  legacy: {
    name: string;
    protocol: string;
    characteristics: string[];
  };
  target: {
    name: string;
    protocol: string;
    characteristics: string[];
  };
  scaleMetric: {
    records: string;
    payload: string;
    latency: string;
  };
}

export interface LayeredArchitectureData {
  title: string;
  layers: {
    id: string;
    name: string;
    role: string;
    icon: string;
  }[];
}

export interface JvmComponent {
  name: string;
  description: string;
}

export interface ArchitectureData {
  modernization: ModernizationData;
  layeredArchitecture: LayeredArchitectureData;
  jvmComponents: JvmComponent[];
}
