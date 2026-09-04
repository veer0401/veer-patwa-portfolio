import type { SkillCategory } from '../types';

export const skills: SkillCategory[] = [
  {
    name: "Core Java",
    icon: "coffee",
    color: "#F89820",
    items: [
      { name: "Java 8+", level: "advanced", years: 4, related: ["Streams", "Lambda", "Optional"] },
      { name: "Java 17", level: "advanced", years: 2, related: ["Records", "Sealed Classes", "Pattern Matching"] },
      { name: "Java 21", level: "advanced", years: 1, related: ["Virtual Threads", "Pattern Matching"] },
      { name: "OOP", level: "advanced", years: 4, related: ["SOLID", "Design Patterns"] },
      { name: "Collections", level: "advanced", years: 4, related: ["List", "Map", "Set", "Queue"] },
      { name: "Streams API", level: "advanced", years: 3, related: ["Functional Programming", "Lambda"] },
      { name: "Concurrency", level: "intermediate", years: 2, related: ["Threads", "Executors", "CompletableFuture"] },
      { name: "JVM Internals", level: "intermediate", years: 2, related: ["GC", "Memory Model", "ClassLoader"] },
      { name: "Exception Handling", level: "advanced", years: 4 },
    ],
  },
  {
    name: "Spring Ecosystem",
    icon: "leaf",
    color: "#6DB33F",
    items: [
      { name: "Spring Boot", level: "advanced", years: 3, related: ["Auto Configuration", "Starters"] },
      { name: "Spring MVC", level: "advanced", years: 3, related: ["Controllers", "REST", "Validation"] },
      { name: "Spring Security", level: "intermediate", years: 2, related: ["JWT", "OAuth2", "RBAC"] },
      { name: "Spring Data JPA", level: "advanced", years: 3, related: ["Hibernate", "Repositories", "Queries"] },
      { name: "Spring Cloud", level: "intermediate", years: 1, related: ["Config", "Gateway", "Discovery"] },
      { name: "Spring Validation", level: "advanced", years: 3 },
    ],
  },
  {
    name: "Backend",
    icon: "server",
    color: "#4DA3FF",
    items: [
      { name: "REST APIs", level: "advanced", years: 4, related: ["OpenAPI", "Swagger", "HATEOAS"] },
      { name: "Microservices", level: "intermediate", years: 2, related: ["Service Mesh", "API Gateway"] },
      { name: "Authentication", level: "advanced", years: 3, related: ["JWT", "OAuth2", "Session"] },
      { name: "Authorization", level: "advanced", years: 3, related: ["RBAC", "ABAC"] },
      { name: "Caching", level: "intermediate", years: 2, related: ["Redis", "Spring Cache"] },
      { name: "Messaging", level: "familiar", years: 1, related: ["RabbitMQ", "Kafka"] },
    ],
  },
  {
    name: "Databases",
    icon: "database",
    color: "#00D9FF",
    items: [
      { name: "PostgreSQL", level: "advanced", years: 3, related: ["SQL", "Indexing", "Transactions"] },
      { name: "MySQL", level: "intermediate", years: 2, related: ["SQL", "Replication"] },
      { name: "MongoDB", level: "familiar", years: 1, related: ["NoSQL", "Aggregation"] },
      { name: "Redis", level: "intermediate", years: 2, related: ["Caching", "Pub/Sub", "Sessions"] },
    ],
  },
  {
    name: "DevOps",
    icon: "container",
    color: "#4ADE80",
    items: [
      { name: "Docker", level: "advanced", years: 3, related: ["Compose", "Multi-stage builds"] },
      { name: "Kubernetes", level: "familiar", years: 1, related: ["Pods", "Services", "Deployments"] },
      { name: "CI/CD", level: "intermediate", years: 2, related: ["GitHub Actions", "Jenkins"] },
      { name: "GitHub Actions", level: "intermediate", years: 2, related: ["Workflows", "Automation"] },
      { name: "Linux", level: "intermediate", years: 3, related: ["Bash", "SSH", "Systemd"] },
    ],
  },
  {
    name: "Cloud",
    icon: "cloud",
    color: "#FBBF24",
    items: [
      { name: "AWS", level: "intermediate", years: 2, related: ["EC2", "S3", "RDS"] },
      { name: "EC2", level: "intermediate", years: 2, related: ["Auto Scaling", "Load Balancing"] },
      { name: "S3", level: "intermediate", years: 2, related: ["Object Storage", "CDN"] },
      { name: "RDS", level: "intermediate", years: 2, related: ["PostgreSQL", "MySQL"] },
      { name: "CloudWatch", level: "familiar", years: 1, related: ["Monitoring", "Logging"] },
    ],
  },
];

// Dependency graph for the skill visualization
export const skillDependencyGraph = {
  nodes: [
    { id: "java", label: "JAVA", color: "#F89820", x: 400, y: 60 },
    { id: "spring", label: "SPRING", color: "#6DB33F", x: 200, y: 180 },
    { id: "jvm", label: "JVM", color: "#F89820", x: 400, y: 180 },
    { id: "testing", label: "TESTING", color: "#4ADE80", x: 600, y: 180 },
    { id: "rest", label: "REST API", color: "#4DA3FF", x: 100, y: 300 },
    { id: "jpa", label: "JPA", color: "#6DB33F", x: 250, y: 300 },
    { id: "security", label: "SECURITY", color: "#FF5C5C", x: 400, y: 300 },
    { id: "database", label: "DATABASE", color: "#00D9FF", x: 175, y: 420 },
    { id: "docker", label: "DOCKER", color: "#4DA3FF", x: 550, y: 300 },
    { id: "cloud", label: "CLOUD", color: "#FBBF24", x: 550, y: 420 },
  ],
  edges: [
    { from: "java", to: "spring" },
    { from: "java", to: "jvm" },
    { from: "java", to: "testing" },
    { from: "spring", to: "rest" },
    { from: "spring", to: "jpa" },
    { from: "spring", to: "security" },
    { from: "rest", to: "database" },
    { from: "jpa", to: "database" },
    { from: "testing", to: "docker" },
    { from: "docker", to: "cloud" },
  ],
};
