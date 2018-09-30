const http = require("http")
const path = require("path")
const fs = require("fs")
const express = require("express")
const multer = require("multer")

const app = express()
const httpServer = http.createServer(app)

app.get('/api/xxx', (req, res) => {
	res.json({ hi: 'hi', destPath })
})

const handleError = (err, res) => {
	res
		.status(500)
		.contentType("text/plain")
		.end("Oops! Something went wrong!" + err)
}

const destPath = path.join(path.resolve('.'), "./uploaded")

const upload = multer({
	dest: destPath
})

app.post("/api/upload", 
	upload.single("file"),
	(req, res) => {
		const tempPath = req.file.path
		const targetPath = destPath + '/' + req.file.originalname

		if (path.extname(req.file.originalname).toLowerCase() === ".png") {
			fs.rename(tempPath, targetPath, err => {
				if (err) return handleError(err, res)

				res
					.status(200)
					.contentType("text/plain")
					.end("File uploaded!")
			})
		} else {
			fs.unlink(tempPath, err => {
				if (err) return handleError(err, res)

				res
					.status(403)
					.contentType("text/plain")
					.end("Only .png files are allowed!")
			})
		}
	}
)

const PORT = process.env.PORT || 3004

httpServer.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
})
