import { Cropper } from "react-cropper";
import 'cropperjs/dist/cropper.css';

interface Props {
    imagePreview: string;
    setCropper: (cropper: Cropper) => void;
}

export default function CropperWidget({imagePreview, setCropper}: Props) {
    return (
        <Cropper 
            src={imagePreview}
            style={{height: 200, width: '100%'}}
            initialAspectRatio={1}
            aspectRatio={1}
            background={false}
            guides={false}
            preview='.img-preview'
            viewMode={1}
            autoCropArea={1}
            onInitialized={cropper => setCropper(cropper)}
        />
    );
}