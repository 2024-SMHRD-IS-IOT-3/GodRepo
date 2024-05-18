import React, { useState } from 'react';
import axios from 'axios';

const Mypage = () => {

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const fileChange = (e) =>{
        const file = e.target.files[0];
        setImage(file);

        // url 생성
        const lookUrl = URL.createObjectURL(file);
        setImageUrl(lookUrl);
    }

    const imgUpload = async() => {
        if(!image) return;

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post('api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Upload success: ', response.data);
            // 업로드 성공하면 추가 작업 가능            
        } catch (error) {
            console.error('Upload error: ', error);
        }
    };

    return (
        <div className="card" style={{ width: '25rem', margin: 'auto', marginTop: '20px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        {imageUrl && (
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img src={imageUrl} alt='Preview' style={{ width: '300px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
            </div>
        )}
        <div>
            <h5 className="card-title" style={{ textAlign: 'center' }}>마이펫</h5>
            <p className="card-text" style={{ textAlign: 'center' }}>마이펫마이펫</p>
            <input type='file' accept='image/*' capture='camera' onChange={fileChange} style={{ display: 'block', margin: '0 auto', marginBottom: '20px' }} />
            <button onClick={imgUpload} style={{ display: 'block', margin: '0 auto' }}>이미지 업로드</button>
        </div>
    </div>


    );
};

export default Mypage;

