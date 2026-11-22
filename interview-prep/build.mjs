import { readFileSync, writeFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
for (const module of ['data','app']) {
  writeFileSync(`dist/${module}.js`,stripTypeScriptTypes(readFileSync(`src/${module}.ts`,'utf8')).replace(/[ \t]+$/gm,''));
}
