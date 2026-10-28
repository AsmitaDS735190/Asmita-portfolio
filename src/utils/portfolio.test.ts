import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  generateTransmissionId,
  formatTerminalTimestamp,
  filterSkills,
  SkillItem,
  THEME_CONFIGS,
} from './portfolio.ts';

test('validateContactForm rejects empty submissions', () => {
  const result = validateContactForm({});
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.message);
});

test('validateContactForm validates email regex', () => {
  const invalid = validateContactForm({
    name: 'Asmita',
    email: 'not-an-email',
    message: 'Hello, I want to collaborate on data science!',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.email);

  const valid = validateContactForm({
    name: 'Asmita Kumari',
    email: 'kumariasmita826@gmail.com',
    message: 'Looking forward to building futuristic data science apps together.',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('generateTransmissionId returns structured code', () => {
  const txId = generateTransmissionId(1793167200000);
  assert.match(txId, /^TX-[A-Z0-9]+-[A-Z0-9]+$/);
});

test('formatTerminalTimestamp matches cyber syntax', () => {
  const formatted = formatTerminalTimestamp('2026-10-27T12:30:00Z');
  assert.equal(formatted, '2026.10.27 // 12:30:00 UTC');
});

test('filterSkills correctly segments items', () => {
  const sampleSkills: SkillItem[] = [
    {
      id: 'py',
      name: 'Python',
      category: 'languages',
      status: 'Actively Practicing',
      description: 'Data analysis and scripting',
      iconName: 'Code',
    },
    {
      id: 'ds',
      name: 'Data Science',
      category: 'datascience',
      status: 'Core Specialization',
      description: 'Statistics, data cleaning, and exploration',
      iconName: 'Database',
    },
    {
      id: 'git',
      name: 'Git & GitHub',
      category: 'tools',
      status: 'Version Control',
      description: 'Repository management and team workflows',
      iconName: 'GitBranch',
    },
  ];

  assert.equal(filterSkills(sampleSkills, 'all').length, 3);
  assert.equal(filterSkills(sampleSkills, 'languages').length, 1);
  assert.equal(filterSkills(sampleSkills, 'languages')[0].name, 'Python');
  assert.equal(filterSkills(sampleSkills, 'datascience').length, 1);
  assert.equal(filterSkills(sampleSkills, 'datascience')[0].name, 'Data Science');
});

test('THEME_CONFIGS contains valid colors', () => {
  assert.equal(THEME_CONFIGS.green.primary, '#B6FF5C');
  assert.equal(THEME_CONFIGS.purple.primary, '#A855F7');
  assert.equal(THEME_CONFIGS.cyan.primary, '#46E7FF');
});
