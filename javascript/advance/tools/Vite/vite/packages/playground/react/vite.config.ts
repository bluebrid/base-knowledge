<<<<<<< HEAD
// import react from '@vitejs/plugin-react'
import react from '../../plugin-react/src'
=======
import react from '@vitejs/plugin-react'
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
import type { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [react()],
  build: {
    // to make tests faster
    minify: false
  }
}

export default config
