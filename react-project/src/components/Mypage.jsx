import React, { useState } from 'react';
import axios from 'axios';

const Mypage = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const imgChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const uploadImg = async () => {
        if (!selectedFile) {
            alert('이미지를 선택해 주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('img', selectedFile);

        try {
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('이미지 업로드 완료:', response.data);
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
        }
    };

    return (
        <div>
            <input type='file' onChange={imgChange} />
            <button onClick={uploadImg}>이미지 업로드</button>
        </div>
    );
};

export default Mypage;
