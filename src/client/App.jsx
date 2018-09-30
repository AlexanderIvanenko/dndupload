import React, { Component } from 'react'
import './App.css'

const sendFile = (file) => {
	var formData = new FormData()
	formData.append('file', file, file.name)

	fetch('/api/upload', {
		method: 'POST',
		body: formData
	}).then(response => {
		if(response.status === 200) {
			alert('Uploaded! Check /uploaded folder for the new file')
		}
		else {
			alert(response.status + ' ' + response.body)
		}
	})
}

class App extends Component {
	componentDidMount() {
		this.onDragOver = this.onDragOver.bind(this)
		this.onDrop = this.onDrop.bind(this)
	}

	onDragOver(e) {
		e = e || event
		e.preventDefault()
	}

	onDrop(e) {
		e = e || event
		e.preventDefault()

		if (e.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			for (var i = 0; i < e.dataTransfer.items.length; i++) {
				// If dropped items aren't files, reject them
				if (e.dataTransfer.items[i].kind === 'file') {
					var file = e.dataTransfer.items[i].getAsFile();
					console.log('... file[' + i + '].name = ' + file.name)
					sendFile(file)
				}
			}
		} else {
			// Use DataTransfer interface to access the file(s)
			for (var i = 0; i < e.dataTransfer.files.length; i++) {
				console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i]);
				sendFile(file)
			}
		}
	}

	render() {
		return (
			<div className='App'>
				<h1>Drag file over the box and Drop for upload</h1>
				<div style={{ marginBottom: '24px' }}>
					<div id="holder" onDragOver={this.onDragOver} onDrop={this.onDrop}>
						Drag'n'Drop File here
					</div>
				</div>
				<div style={{display:'none'}}>
					<form method="post" encType="multipart/form-data" action="/api/upload">
						<input id='file' type="file" name="file" />
						<input id='submit' type="submit" value="Submit" />
					</form>
				</div>
			</div>
		)
	}
}

export default App
