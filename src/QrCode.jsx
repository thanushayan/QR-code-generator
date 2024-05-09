import React, { useState } from 'react';

export const QrCode = () => {
  const [img,setImg]= useState("");
  const [loading,setLoading] = useState(false);
  const [qrData,setQrData] = useState("thanu"); 
  const [qrSize,setQrSize] = useState("150");



  async function generateQR(){
    setLoading(true);
    try{
const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${qrData}`;
setImg(url);
    }catch (error){
console.error("Error generating QR code ",error);
    }finally {
    setLoading(false);
    } 
  }

  function downloadQR( ) {
    fetch(img ).then((response)=>response.blob())
    .then((blob)=>{
      const link=document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download="qr.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    })
    .catch((error)=> {
      console.error("Error downloading QR code ",error);
    })
  }
  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait...</p>}
      {img && <img src={img}   className='qr-code-image'/>}

      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for QR code:
        </label>
        <input type="text" value={qrData} id="dataInput" placeholder="Enter data for Qr code" onChange={(e)=>setQrData(e.target.value)}/>
        <label htmlFor="sizeInput" className="input-label">
          Image Size(e.g, 150):
        </label>
        <input type="text" value={qrSize} id="sizeInput" placeholder="Enter image size" onChange={(e)=>setQrSize(e.target.value)} />
        <button className='generate-button'  disabled={loading} onClick={generateQR}>Generate QR Code</button>
        <button className='download-button' onClick= {downloadQR} >Download QR Code</button>
      </div>
      <p className='footer'>Designed by thanushayan</p>
    </div>
  );
};
