export type ReadinessQuestion = {
  id: string
  stem: string
  options: [string, string, string, string]
  correctIndex: 0 | 1 | 2 | 3
}
