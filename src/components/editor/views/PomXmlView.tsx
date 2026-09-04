import React from 'react';
import profileData from '../../../data/profile.json';
import { FileCode } from 'lucide-react';

export const PomXmlView: React.FC = () => {
  const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.0</version>
        <relativePath/>
    </parent>

    <groupId>com.veerpatwa</groupId>
    <artifactId>inventory-medical-pos</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <name>Inventory Medical POS</name>
    <description>Multi-tenant inventory, POS, and billing system with Spring Boot &amp; MySQL</description>

    <properties>
        <java.version>${profileData.javaVersion}</java.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Web & REST -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Security & Auth -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>

        <!-- Spring Data JPA & MySQL -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`;

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#080A0D] text-slate-300 p-4 sm:p-6 font-mono select-text">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Banner */}
        <div className="flex items-center justify-between p-3 rounded-md bg-[#0B0F14] border border-[#1C2636]">
          <div className="flex items-center gap-2 text-xs text-amber-400">
            <FileCode className="w-4 h-4" />
            <span className="font-semibold">pom.xml</span>
            <span className="text-slate-400">• Apache Maven Project Object Model</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-500/30 font-mono">
            MAVEN 3.9 • JAVA {profileData.javaVersion}
          </span>
        </div>

        {/* Code representation */}
        <div className="rounded-lg bg-[#0B0F14] border border-[#1C2636] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-[#06080B] border-b border-[#1C2636] text-xs text-slate-400">
            <span>Root POM: /pom.xml</span>
            <span>Java {profileData.javaVersion} • Spring Boot 3.3.0</span>
          </div>

          <pre className="p-4 text-xs overflow-x-auto text-slate-300 leading-relaxed">
            <code>
              {xmlString.split('\n').map((line, idx) => (
                <div key={idx} className="flex">
                  <span className="w-8 select-none text-slate-500 shrink-0 text-right pr-3">
                    {idx + 1}
                  </span>
                  <span
                    className={
                      line.includes('<!--')
                        ? 'text-slate-500 italic'
                        : line.includes('<groupId>') || line.includes('<artifactId>')
                        ? 'text-[#4DA3FF]'
                        : line.includes('<version>')
                        ? 'text-[#F89820]'
                        : line.includes('<dependency>') || line.includes('</dependency>') || line.includes('<project') || line.includes('</project>')
                        ? 'text-[#00D9FF]'
                        : 'text-slate-300'
                    }
                  >
                    {line}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
