// BadgeImage.tsx
import React, { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { badgeFileAtom } from '@/lib/recoil/BadgeImageAtom';
import { useAtom } from 'jotai';

const placeholderImageUrl = 'https://via.placeholder.com/256';

export default function BadgeImage() {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [badgeImageFile, setBadgeImageFile] = useAtom(badgeFileAtom);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedFile(file);
        setBadgeImageFile(file); // Set the selected file in the atom
    };


    return (
        <div className="relative border border-gray-100 rounded-lg overflow-hidden inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={`relative bg-cover bg-center h-40 w-40 filter ${isHovered ? 'blur-md' : ''}`}
                style={{backgroundImage: `url(${selectedFile ? URL.createObjectURL(selectedFile) : badgeImageFile ? URL.createObjectURL(badgeImageFile) : placeholderImageUrl})`}}
            ></div>
            {isHovered && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="hidden"
                        ref={fileInputRef}
                    />
                    <Button onClick={() => fileInputRef.current?.click()}>Choose Image</Button>
                </div>
            )}
        </div>
    );
}
