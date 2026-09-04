import React from 'react';
import { Database } from 'lucide-react';

export const DatabaseView: React.FC = () => {
  const codeString = `package dev.veerpratap.database;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import javax.sql.DataSource;

/**
 * Enterprise Database Connection & Pooling Infrastructure.
 * PostgreSQL 16 Primary with Redis 7 Distributed Cache.
 */
@Configuration
public class DatabaseConfig {

    @Bean
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:postgresql://db-primary.cluster:5432/production");
        config.setUsername("app_backend");
        config.setMaximumPoolSize(20);
        config.setMinimumIdle(5);
        config.setIdleTimeout(30000);
        config.setConnectionTimeout(20000);
        config.setPoolName("HikariCP-DEV-OS");
        
        // Performance optimizations
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");

        return new HikariDataSource(config);
    }
}`;

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#080A0D] text-slate-300 p-4 sm:p-6 font-mono select-text">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Banner */}
        <div className="flex items-center justify-between p-3 rounded-md bg-[#0B0F14] border border-[#1C2636]">
          <div className="flex items-center gap-2 text-xs text-[#00D9FF]">
            <Database className="w-4 h-4" />
            <span className="font-semibold">Database.java</span>
            <span className="text-slate-400">• src/skills/Database.java</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20 font-mono">
            HIKARICP POOL: 20 ACTIVE
          </span>
        </div>

        {/* Code representation */}
        <div className="rounded-lg bg-[#0B0F14] border border-[#1C2636] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-[#06080B] border-b border-[#1C2636] text-xs text-slate-400">
            <span>Source: DatabaseConfig.java</span>
            <span>HikariCP • Connection Optimization</span>
          </div>

          <pre className="p-4 text-xs overflow-x-auto text-slate-300 leading-relaxed">
            <code>
              {codeString.split('\n').map((line, idx) => (
                <div key={idx} className="flex">
                  <span className="w-8 select-none text-slate-400 shrink-0 text-right pr-3">
                    {idx + 1}
                  </span>
                  <span
                    className={
                      line.startsWith('@')
                        ? 'text-[#6DB33F]'
                        : line.includes('public DataSource') || line.includes('public class') || line.includes('return ')
                        ? 'text-[#4DA3FF]'
                        : line.includes('"')
                        ? 'text-[#00D9FF]'
                        : line.includes('//')
                        ? 'text-slate-400 italic'
                        : 'text-slate-200'
                    }
                  >
                    {line}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Database Technology Matrix */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-[#0B0F14] border border-[#1C2636] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-100">PostgreSQL</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#4ADE80]/15 text-[#4ADE80]">Primary RDBMS</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Relational schemas, B-tree indexing, ACID transactions, EXPLAIN query tuning, and read replicas.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#0B0F14] border border-[#1C2636] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-100">Redis</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00D9FF]/15 text-[#00D9FF]">Cache / KV</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Distributed session cache, token blacklisting, Redisson distributed locks, rate limit counters.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#0B0F14] border border-[#1C2636] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-100">MySQL</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#4DA3FF]/15 text-[#4DA3FF]">Secondary RDBMS</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Transactional integrity, InnoDB engine tuning, connection pooling, and replication topology.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#0B0F14] border border-[#1C2636] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-100">MongoDB</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F89820]/15 text-[#F89820]">NoSQL Document</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Dynamic schema documents, catalog indexing, aggregation pipelines, event stream persistence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
