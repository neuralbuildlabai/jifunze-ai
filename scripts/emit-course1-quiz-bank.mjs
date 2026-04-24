/**
 * Reads training-imports/course-1/Jifunze_Course1_Assessment_Bank_128_Questions.csv
 * and writes src/data/learning/course1AiEssentialsQuizBank.ts
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const csvPath = path.join(root, 'training-imports/course-1/Jifunze_Course1_Assessment_Bank_128_Questions.csv')
const outPath = path.join(root, 'src/data/learning/course1AiEssentialsQuizBank.ts')

function parseCsvLine(line) {
  const cells = []
  let cur = ''
  let inQ = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') {
      inQ = !inQ
      continue
    }
    if (!inQ && c === ',') {
      cells.push(cur)
      cur = ''
      continue
    }
    cur += c
  }
  cells.push(cur)
  return cells
}

function aeModuleId(n) {
  return `ae-m${String(n).padStart(2, '0')}`
}

function letterToIndex(letter) {
  const u = (letter || '').trim().toUpperCase()
  if (u === 'A') return 0
  if (u === 'B') return 1
  if (u === 'C') return 2
  if (u === 'D') return 3
  return 0
}

const raw = fs.readFileSync(csvPath, 'utf8')
const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0)
const header = parseCsvLine(lines[0])
const idx = (name) => header.indexOf(name)
const iMod = idx('module')
const iQid = idx('question_id')
const iQ = idx('question')
const iA = idx('option_a')
const iB = idx('option_b')
const iC = idx('option_c')
const iD = idx('option_d')
const iCor = idx('correct_answer')
const iExpl = idx('answer_explanation')

const byModule = new Map()
for (let li = 1; li < lines.length; li++) {
  const cells = parseCsvLine(lines[li])
  const modNum = parseInt(cells[iMod], 10)
  if (!Number.isFinite(modNum) || modNum < 1 || modNum > 16) continue
  const mid = aeModuleId(modNum)
  const choices = [cells[iA], cells[iB], cells[iC], cells[iD]].map((x) => String(x || '').trim())
  const correctIndex = letterToIndex(cells[iCor])
  const prompt = String(cells[iQ] || '').trim()
  const id = `${mid}::${cells[iQid] || `q${li}`}`
  const expl = String(cells[iExpl] || '').trim()
  const promptWithExpl = expl ? `${prompt}\n\nWhy: ${expl.replace(/\n/g, ' ')}` : prompt
  const row = { id, prompt: promptWithExpl, choices, correctIndex }
  if (!byModule.has(mid)) byModule.set(mid, [])
  byModule.get(mid).push(row)
}

let body = `/**
 * Course 1 (AI Essentials) assessment bank — generated from
 * training-imports/course-1/Jifunze_Course1_Assessment_Bank_128_Questions.csv
 * via scripts/emit-course1-quiz-bank.mjs. Do not serve raw CSV to learners.
 */

export type Course1QuizQuestion = {
  id: string
  prompt: string
  choices: readonly string[]
  correctIndex: number
}

`

for (let n = 1; n <= 16; n++) {
  const mid = aeModuleId(n)
  const rows = byModule.get(mid) || []
  const constName = `AE_M${String(n).padStart(2, '0')}`
  body += `const ${constName}: readonly Course1QuizQuestion[] = [\n`
  for (const r of rows) {
    const ch = r.choices.map((c) => JSON.stringify(c)).join(', ')
    body += `  { id: ${JSON.stringify(r.id)}, prompt: ${JSON.stringify(r.prompt)}, choices: [${ch}] as const, correctIndex: ${r.correctIndex} },\n`
  }
  body += `]\n\n`
}

body += `const BY_MODULE: Record<string, readonly Course1QuizQuestion[]> = {\n`
for (let n = 1; n <= 16; n++) {
  const mid = aeModuleId(n)
  const constName = `AE_M${String(n).padStart(2, '0')}`
  body += `  '${mid}': ${constName},\n`
}
body += `}\n\nexport function course1AiEssentialsQuizQuestionsForModule(moduleId: string): readonly Course1QuizQuestion[] {\n  return BY_MODULE[moduleId] ?? []\n}\n`

fs.writeFileSync(outPath, body, 'utf8')
console.log('Wrote', outPath)
