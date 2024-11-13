'use client'
import Image from 'next/image'
import { useState } from 'react'

interface ImageOptimizerProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export function ImageOptimizer({ src, alt, width, height, className }: ImageOptimizerProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`relative`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`duration-700 ease-in-out  ${className} ${isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'
          }`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  )
}
