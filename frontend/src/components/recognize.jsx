import React, { useState, useRef, useEffect } from "react";
import { Container, Button} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import webp from '../img/webp.svg';
import jpg from '../img/jpg.svg';
import bmp from '../img/bmp.svg';
import png from '../img/png.svg';
import jpeg from '../img/jpeg.svg';
import tiff from '../img/tiff.svg';
import uploadImg from '../img/uploadImg2.svg';
import uploadedImg from '../img/uploaded.svg';
import axios from "axios"

import './recognize.css'


const theme = createTheme({
	typography: {
	  fontFamily: 'Montserrat',
	  fontSize: 13,
	},
	palette: {
		text: {
		  primary: '#7f56da',
		},
	},
});

const buttonStyleUploadImg = {
	borderColor: '#5d38b1',
	color: '#e0dfe7'
};

function Recognize() {

	const [fileName, setFileName] = useState('');
	const [overlayState, setOverlayState] = useState('none');
	const [loaderState, setLoaderState] = useState(false);
	const [recognizedText, setRecognizedText] = useState([]);
	const [drag, setDrag] = useState(false);
	const fileInputRef = useRef(null);
	
	async function recognizeFunc(url) {
		try {
			const response = await axios.post("http://localhost:80/ai/recognize", {
					file_url: url,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
			setRecognizedText(response.data.result)
			setOverlayState('none');
			setLoaderState(false);

		}
		catch (err) {
			console.log("SEND MESSAGE ERROR: ", err);
		}
	}

	function dragLeaveHandler(e) {
		e.preventDefault();
		setDrag(false);
	}

	function dragStartHandler(e) {
		e.preventDefault();
		setDrag(true);
		
	}

	function dropHandler(e) {
		e.preventDefault();
		setDrag(false);
	
		const droppedFiles = e.dataTransfer.files;
	
		if (droppedFiles.length > 0) {
			setOverlayState('');
			setLoaderState(true);
			const fileToUpload = droppedFiles[0];
			setFileName(fileToUpload.name);
	
			const cloud_name = 'dlwuhl9ez';

			const formData = new FormData();
			formData.append('file', fileToUpload);
			formData.append("cloud_name", cloud_name);
			formData.append("upload_preset", "aecdrcq4");

	
			fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
				method: 'POST',
				body: formData,
			})
			.then(response => response.json())
			.then(data => {
				console.log('Cloudinary response:', data);
				recognizeFunc(data.secure_url)
			})
			.catch(error => {
				console.error('Error uploading file:', error);
			});
		}
	}


	const handleFileUpload = (event) => {
		setOverlayState('');
		setLoaderState(true);
        const file = event.target.files;
		
		if (file.length > 0) {
			const fileToUpload = file[0];
			setFileName(fileToUpload.name)
	
			const cloud_name = 'dlwuhl9ez';

			const formData = new FormData();
			formData.append('file', fileToUpload);
			formData.append("cloud_name", cloud_name);
			formData.append("upload_preset", "aecdrcq4");

	
			fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
				method: 'POST',
				body: formData,
			})
			.then(response => response.json())
			.then(data => {
				console.log('Cloudinary response:', data);
				recognizeFunc(data.secure_url)
			})
			.catch(error => {
				console.error('Error uploading file:', error);
			});
		}
		
    };

	const openFileInput = () => {
        fileInputRef.current.click();
    };

	const recognizedTextElements = recognizedText.map((innerArray, outerIndex) => (
		<div key={outerIndex}>
		  {innerArray.map((text, innerIndex) => (
			<div key={innerIndex}>{text}</div>
		  ))}
		</div>
	));

	return (
		<>
		<Container disableGutters maxWidth={false} sx={{height: "100vh"}}>
			<div className="main-container">
				<div className="main-header">
					<h2 style={{color: '#946cdc', fontWeight: 'bold', fontSize: '28px', marginBottom: '10px'}}>RecoGnize ai</h2>
					<h2>it's a <span style={{color: '#946cdc', fontWeight: 'bold', textDecoration: 'underline'}}>neural network</span> that can retrieve text from an image</h2>
					<h2 style={{marginTop: '35px'}}>supported formats:</h2>
					<div style={{marginTop: '15px'}}>
						<img src={png} alt="" />
						<img src={jpg} alt="" />
						<img src={jpeg} alt="" />
						<img src={webp} alt="" />
						<img src={bmp} alt="" />
						<img src={tiff} alt="" />
					</div>
				</div>
				<div className="main-body" style={{marginTop: '75px'}}>
					{fileName.length > 1 ?
						<div style={{display: 'flex', justifyContent: 'center'}}>
							<img style={{height: 16, margin: '4px 5px 0px 0px'}} src={uploadedImg} alt="" />
							<h2 style={{color: '#c7c7c7', fontFamily: 'Montserrat', fontSize: '18px', marginBottom: '10px', textAlign: 'center', fontWeight: '100'}}>{fileName}</h2>
						</div> 
					: null}
						<div className='signupUploadImg'>
							<div
								className={drag ? 'signupUploadImg-upload-area active' : 'signupUploadImg-upload-area'}
								onDragStart={e => dragStartHandler(e)}
								onDragLeave={e => dragLeaveHandler(e)}
								onDragOver={e => dragStartHandler(e)}
								onDrop={e => dropHandler(e)}
							>
							{drag 
							?
							<span className="loader2"></span>
							: 
							<div className='signupUploadImg-upload-area' style={drag ? { border: 'none' } : { border: 'none' }}>
								<div style={{ display: 'inline', textAlignLast: 'center' }}>
									<img src={uploadImg} alt="" style={{ width: '80px' }} />
									<h2>Drop and drag an image</h2>
									<div className="or-container">
										<div className="line"></div>
										<span className="or-text">OR</span>
										<div className="line"></div>
									</div>
									<input
									type="file"
									accept="image/*"
									onChange={handleFileUpload}
									style={{ display: 'none' }}
									ref={fileInputRef}
								/>
									<Button
										variant="outlined"
										onClick={openFileInput}
										sx={{ width: '100%', height: 50, boxShadow: 5, borderRadius: '8px' }}
										style={buttonStyleUploadImg}
										theme={theme}
									>
										BROWSE
									</Button>
								</div>
								{ loaderState === true ?
								<div className="loader-container">
									<span class="loader"></span>
								</div>
								: null
								}
							</div>
							}
						</div>
					{ recognizedText.length > 0 ?
					<div style={{width: '70vw', textAlign: '-webkit-center', marginTop: '20px', paddingBottom: '50px'}} className="recognized-text">
						<div style={{width: 'fit-content', borderRadius: 10, display: 'flex', background: '#2f30347a', border: '1px solid rgb(34, 34, 37)', background: 'rgba(47, 48, 52, 0.48)', padding: '10px 30px 10px 30px'}}>
							<h2 style={{color: '#c7c7c7', fontFamily: 'Montserrat', fontSize: '18px', fontWeight: '100'}}>{recognizedTextElements}</h2>
						</div>
					</div>
					: null}
					</div>
				</div>
			</div>
			<div className="overlay" style={{display: overlayState}}></div>
		</Container>
		</>
	)
}

export default Recognize;