import ReactCrop, {
    Crop,
    makeAspectCrop,
    centerCrop
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const TARGET_SIZE = 250;

export default function CropImage(
    {
        src,
        onCropDone,
        onClose,
        setSrcImage
    }: {
        src: string;
        onCropDone: (file: File) => void;
        onClose?: (value: boolean) => void;
        setSrcImage: (value: string | null) => void;
    }
) {
    const [crop, setCrop] = useState<Crop>({
        unit: 'px',
        x: 0,
        y: 0,
        width: TARGET_SIZE,
        height: TARGET_SIZE,
    });

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
            onClose?.(false);
        }, 'image/jpeg');
    };

    return (
        <div className="space-y-4">
            <ReactCrop 
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={setCompletedCrop}
                aspect={1}
                locked
                keepSelection 
            >
                <img ref={imgRef} src={src} alt="Crop preview" />
            </ReactCrop>
            <canvas ref={previewCanvasRef} className="hidden" />
            <div className="flex justify-between items-center pt-4 gap-4">
                <Button
                    type="button"
                    onClick={getCroppedImage}
                    className="bg-blue-500 text-white px-4 py-2 rounded w-1/2"
                >
                    Done
                </Button>
                <Button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded w-1/2"
                    onClick={() => {
                        setSrcImage(null);
                        onClose?.(false);
                    }}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}