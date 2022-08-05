// import react from '@vitejs/plugin-react'
import react from '../../plugin-react/src'
import type { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [react()],
  build: {
    // to make tests faster
    minify: false
  }
}

export default config
