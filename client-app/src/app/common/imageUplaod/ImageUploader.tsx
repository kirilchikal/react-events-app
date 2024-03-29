import { useEffect, useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import CropperWidget from "./CropperWidget";
import DropzoneWidget from "./DropzoneWidget";

interface Props {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}

export default function ImageUploader({loading, uploadPhoto}: Props) {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
    }
  }

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    }
  }, [files]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header content="Step 1 - Load photo" />
        <DropzoneWidget setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header content="Step 2 - Resize photo" />
        {files.length > 0 && <CropperWidget imagePreview={files[0].preview} setCropper={setCropper} />}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header content="Step 3 - Upload photo" />
        {files && files.length > 0 && (
          <>
            <div className="img-preview" style={{height: 200, overflow: "hidden", marginBottom: 10}} />
            <Button.Group widths={2}>
              <Button loading={loading} icon='check' onClick={onCrop} positive />
              <Button disable={loading} icon='close' onClick={() => setFiles([])} />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}
