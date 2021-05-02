interface GitInfo {
  hash: string
  branch: string
}

interface BuildInfo {
  git: GitInfo
  time: number
  version: string
  node: string
}

declare const BUILD: BuildInfo
