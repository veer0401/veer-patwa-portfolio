import type { FileNode } from '../types';

export const fileSystem: FileNode[] = [
  {
    name: "VEER-PATWA",
    path: "/",
    type: "folder",
    isOpen: true,
    children: [
      {
        name: "README.md",
        path: "/README.md",
        type: "file",
        language: "markdown",
        icon: "file-text",
      },
      {
        name: "src",
        path: "/src",
        type: "folder",
        isOpen: true,
        children: [
          {
            name: "about",
            path: "/src/about",
            type: "folder",
            isOpen: false,
            children: [
              {
                name: "AboutDeveloper.java",
                path: "/src/about/AboutDeveloper.java",
                type: "file",
                language: "java",
                icon: "coffee",
              },
            ],
          },
          {
            name: "experience",
            path: "/src/experience",
            type: "folder",
            isOpen: false,
            children: [
              {
                name: "Experience.java",
                path: "/src/experience/Experience.java",
                type: "file",
                language: "java",
                icon: "git-commit-horizontal",
              },
            ],
          },
          {
            name: "skills",
            path: "/src/skills",
            type: "folder",
            isOpen: false,
            children: [
              {
                name: "JavaStack.java",
                path: "/src/skills/JavaStack.java",
                type: "file",
                language: "java",
                icon: "coffee",
              },
              {
                name: "SpringBoot.java",
                path: "/src/skills/SpringBoot.java",
                type: "file",
                language: "java",
                icon: "leaf",
              },
              {
                name: "Backend.java",
                path: "/src/skills/Backend.java",
                type: "file",
                language: "java",
                icon: "server",
              },
              {
                name: "SystemDesign.java",
                path: "/src/skills/SystemDesign.java",
                type: "file",
                language: "java",
                icon: "layers",
              },
            ],
          },
          {
            name: "projects",
            path: "/src/projects",
            type: "folder",
            isOpen: true,
            children: [
              {
                name: "InventoryMedicalPOS.java",
                path: "/src/projects/InventoryMedicalPOS.java",
                type: "file",
                language: "java",
                icon: "coffee",
              },
              {
                name: "CriminalRecordManagement.cs",
                path: "/src/projects/CriminalRecordManagement.cs",
                type: "file",
                language: "csharp",
                icon: "file-code",
              },
              {
                name: "JavaShoppingApp.java",
                path: "/src/projects/JavaShoppingApp.java",
                type: "file",
                language: "java",
                icon: "coffee",
              },
            ],
          },
          {
            name: "contact",
            path: "/src/contact",
            type: "folder",
            isOpen: false,
            children: [
              {
                name: "Contact.java",
                path: "/src/contact/Contact.java",
                type: "file",
                language: "java",
                icon: "mail",
              },
            ],
          },
        ],
      },
      {
        name: "architecture",
        path: "/architecture",
        type: "folder",
        isOpen: false,
        children: [
          {
            name: "microservices.arch",
            path: "/architecture/microservices.arch",
            type: "file",
            language: "architecture",
            icon: "network",
          },
        ],
      },
      {
        name: "pom.xml",
        path: "/pom.xml",
        type: "file",
        language: "xml",
        icon: "file-code",
      },
    ],
  },
];

// Map file paths to view types
export const fileViewMap: Record<string, { viewType: string; projectId?: string }> = {
  "/README.md": { viewType: "readme" },
  "/src/about/AboutDeveloper.java": { viewType: "about" },
  "/src/experience/Experience.java": { viewType: "experience" },
  "/src/skills/JavaStack.java": { viewType: "javastack" },
  "/src/skills/SpringBoot.java": { viewType: "springboot" },
  "/src/skills/Backend.java": { viewType: "backend" },
  "/src/skills/SystemDesign.java": { viewType: "systemdesign" },
  "/src/projects/InventoryMedicalPOS.java": { viewType: "project", projectId: "inventory-medical-pos" },
  "/src/projects/CriminalRecordManagement.cs": { viewType: "project", projectId: "criminal-record-management-system" },
  "/src/projects/JavaShoppingApp.java": { viewType: "project", projectId: "java-mobile-shopping-application" },
  "/architecture/microservices.arch": { viewType: "architecture" },
  "/src/contact/Contact.java": { viewType: "contact" },
  "/pom.xml": { viewType: "pomxml" },
};
