import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import CropImage from './crop-image';

export default function CropImageModal({
    show,
    onClose,
    srcImage,
    setSrcImage,
    onCropped,
}: {
    show: boolean;
    onClose: (value: boolean) => void;
    srcImage: string | null;
    setSrcImage: (value: string | null) => void;
    onCropped: (croppedFile: File) => void;
}) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSrcImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Dialog open={show} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Upload and Crop Image</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {srcImage ? (
                        <CropImage
                            src={srcImage}
                            onCropDone={(croppedFile) => {
                                onCropped(croppedFile);
                                onClose(false);
                                setSrcImage(null);
                            }}
                        />
                    ) : (
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Upload image
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="mt-1 block w-full"
                                />
                            </label>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}