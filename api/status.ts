import axios from 'axios'

interface IStatusResult {
  status: string
  counts: {
    up: number
    down: number
    paused: number
    total: number
  }
}

export async function getStatus() {
  const res = await axios.get('https://api.zisu.dev/status/summary')
  return res.data as IStatusResult
}
