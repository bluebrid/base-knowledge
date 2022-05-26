import { URL } from 'url'
import {
  extractSourcemap,
  formatSourcemapForSnapshot,
  isBuild
} from 'testUtils'

if (!isBuild) {
  test('js', async () => {
    const res = await page.request.get(new URL('./foo.js', page.url()).href)
    const js = await res.text()
    const lines = js.split('\n')
    expect(lines[lines.length - 1].includes('//')).toBe(false) // expect no sourcemap
  })

  test('ts', async () => {
    const res = await page.request.get(new URL('./bar.ts', page.url()).href)
    const js = await res.text()
    const map = extractSourcemap(js)
    expect(formatSourcemapForSnapshot(map)).toMatchInlineSnapshot(`
      Object {
        "mappings": "AAAO,aAAM,MAAM;",
        "sources": Array [
          "/root/bar.ts",
        ],
        "sourcesContent": Array [
          "export const bar = 'bar'
      ",
        ],
        "version": 3,
      }
    `)
  })

  test('should not output missing source file warning', () => {
    serverLogs.forEach((log) => {
      expect(log).not.toMatch(/Sourcemap for .+ points to missing source files/)
    })
  })
} else {
  test('this file only includes test for serve', () => {
    expect(true).toBe(true)
  })
}
