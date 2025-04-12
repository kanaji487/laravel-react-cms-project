import ReactCrop, {
    Crop,
    makeAspectCrop,
    centerCrop
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useRef, useState, useEffect } from 'react';

const ASPECT_RATIO = 1;
const TARGET_SIZE = 150;

export default function CropImage({ src, onCropDone, onClose }: { src: string; onCropDone: (file: File) => void; onClose?: () => void; }) {
    const [crop, setCrop] = useState<Crop>(() =>
        centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
                ASPECT_RATIO,
                100,
                100
            ),
            100,
            100
        )
    );
    const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) return;

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        if (!ctx) return;

        canvas.width = TARGET_SIZE * pixelRatio;
        canvas.height = TARGET_SIZE * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            TARGET_SIZE,
            TARGET_SIZE
        );
    }, [completedCrop]);

    const getCroppedImage = async () => {
        if (!previewCanvasRef.current) return;

        previewCanvasRef.current.toBlob((blob) => {
            if (!blob) return;
            const file = new File([blob], 'cropped.jpg', { type: 'image/jpeg' });
            onCropDone(file);
            onClose?.();
        }, 'image/jpeg');
    };

    return (
        <div className="space-y-4">
            <ReactCrop crop={crop} onChange={(c) => setCrop(c)} onComplete={setCompletedCrop} >
                <img ref={imgRef} src={src} alt="Crop preview" />
            </ReactCrop>
            <canvas ref={previewCanvasRef} className="hidden" />
            <button type='button' onClick={getCroppedImage} className="bg-blue-500 text-white px-4 py-2 rounded">Done Cropping</button>
        </div>
    );
}