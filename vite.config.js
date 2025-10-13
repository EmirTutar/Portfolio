import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// NOTE: For GitHub Pages project pages, you may need to set base: '/<REPO_NAME>/'
// HashRouter is used, so base can remain '/' for most cases.
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/' // <---  Repo-Name
})
