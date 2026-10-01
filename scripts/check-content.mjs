import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function flatten(value, prefix = '') {
  if (Array.isArray(value)) return value.flatMap((child, index) => flatten(child, `${prefix}.${index}`));
  if (value && typeof value === 'object') return Object.entries(value).flatMap(([key, child]) => flatten(child, prefix ? `${prefix}.${key}` : key));
  return [prefix];
}

const en = JSON.parse(readFileSync('src/locales/en.json', 'utf8'));
const fr = JSON.parse(readFileSync('src/locales/fr.json', 'utf8'));
assert.deepEqual(flatten(en).sort(), flatten(fr).sort(), 'English and French translation keys differ');
for (const key of ['about.description', 'exp.imset.title', 'exp.imset.points.3', 'tech.kotlin', 'tech.compose', 'tech.postgresql', 'tech.gitlab']) {
  const parts = key.split('.');
  for (const [locale, dictionary] of [['en', en], ['fr', fr]]) {
    const value = parts.reduce((item, part) => item?.[part], dictionary);
    assert.ok(typeof value === 'string' && value.trim(), `${locale}: missing ${key}`);
  }
}
console.log(`Bilingual content OK: ${flatten(en).length} keys per language`);
