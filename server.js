import path from 'path'
import fs from 'fs'
import {fileURLToPath} from 'url'
import {createServer} from 'vite'
import express from 'express'

const isProd = process.env.NODE_ENV === 'production'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p) => path.resolve(__dirname, p)

const getIndexHTML = async () => {
    const indexHTML = isProd
        ? resolve('./dist/client/index.html')
        : resolve('./index.html')
    return await fs.promises.readFile(indexHTML, 'utf-8')
}

async function start() {
    const app = express()
    const router = express.Router()

    let vite = null
    if (isProd) {
        app.use(express.static('./dist/client', { index: false }))
    } else {
        vite = await createServer({
            // eslint-disable-next-line no-undef
            root: process.cwd(),
            server: { middlewareMode: true },
            appType: 'custom',
            build: {
                ssr: true,
            }
        })

        app.use(vite.middlewares)
    }


    router.get('/*', async (req, res, next) => {
        try {
            const url = req.url
            let template = await getIndexHTML()

            let render = null
            if (isProd) {
                render = (await import('./dist/server/server.js')).render
            } else {
                template = await vite.transformIndexHtml(url, template)
                render = (await vite.ssrLoadModule(resolve('./src/server.ts'))).render
            }

            const appHtml = await render(url)

            const html = template
                .replace('<!--app-html-->', appHtml)

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            if (vite) {
                vite.ssrFixStacktrace(e)
            }
            next(e)
        }
    })

    // Routes
    app.use('/', router)

    app.listen(3000, () => {
        console.log(`server running: http://localhost:3000/`)
    })
}

start()
