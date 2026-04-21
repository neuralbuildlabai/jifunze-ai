import { evaluateAdaptiveStep } from '../src/learner/readinessChallengeAdaptive'

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg)
}

assert(evaluateAdaptiveStep(8, 10).status === 'passed', 'early pass at 80%')
assert(evaluateAdaptiveStep(7, 10).status === 'continue', '70% at 10 continues when recovery possible')
assert(evaluateAdaptiveStep(5, 10).status === 'failed', '50% at 10 fails when impossible')
assert(evaluateAdaptiveStep(15, 19).status === 'continue', 'borderline recovery continues')
assert(evaluateAdaptiveStep(14, 19).status === 'failed', 'cannot reach 16/20')
assert(evaluateAdaptiveStep(16, 20).status === 'passed', 'final pass')
assert(evaluateAdaptiveStep(15, 20).status === 'failed', 'final fail')

console.log('verify-readiness-adaptive: ok')
