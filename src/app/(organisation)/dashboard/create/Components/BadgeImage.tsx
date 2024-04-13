"use client";

import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function BadgeImage() {
    const url = "https://images.pexels.com/photos/17070821/pexels-photo-17070821/free-photo-of-pair-of-puffins-sitting-in-grass.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative border border-gray-100 rounded-lg overflow-hidden inline-block"
        onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`relative bg-cover bg-center h-40 w-40 filter ${isHovered ? 'blur-md' : ''}`}
                style={{backgroundImage: `url(${url})`}}
                
            ></div>
            {isHovered && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <Button>
                        Change 
                    </Button>
                </div>
            )}
        </div>
    );
}
