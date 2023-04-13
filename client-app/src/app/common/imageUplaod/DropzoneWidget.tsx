import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon } from "semantic-ui-react";

interface Props {
  setFiles: (files: any) => void;
}

export default function DropzoneWidget({ setFiles }: Props) {
  const onDrop = useCallback((acceptedFiles: any) => { 
    setFiles(
      // add an additional prop preview to file object
      acceptedFiles.map((file: any) => Object.assign(file, { 
        preview: URL.createObjectURL(file) 
      }))
    );
  },[setFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={isDragActive ? 'dzStyle dzActive' : 'dzStyle'}>
      <input {...getInputProps()} />
      <Icon name="upload" size='huge' className={isDragActive ? 'dzActiveColor' : ''} />
      <Header content='Drop an image' />
    </div>
  );
}
