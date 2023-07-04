import { useState } from 'react';
import { FileInput } from '@mantine/core';
import { Modal, Button } from '@mantine/core';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;


const SettingModal = ({isOpen,toggleFunc}:{isOpen:boolean, toggleFunc: ()=>void}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post(`${apiUrl}/User/uploadPfp`, formData, 
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    }
    )}

  const FileUpload = () => {
    return <FileInput 
    placeholder='Upload Picture'
    value={file} 
    onChange={setFile}
    accept="image/png,image/jpeg" />;
  }

  return (
    <>
      <Modal
        opened={isOpen}
        onClose={() => toggleFunc()}
        title="Setting"
        transitionProps={{ transition: 'rotate-left' }}
      >
        <h3 className='text-gray-500'>Change Avatar</h3>
        <FileUpload />

        <Button className="m-3 ml-0" onClick={handleUpload}>Upload Picture</Button>
      </Modal>
    </>
  );
}

const Settings = ({isOpen, toggleFunc}:{isOpen:boolean, toggleFunc: ()=>void}) => {
    return <>
      <SettingModal isOpen={isOpen} toggleFunc={toggleFunc}/>
    </>
}

export default Settings;