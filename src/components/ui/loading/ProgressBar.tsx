"use client";

// components/LoadingProgressBar.tsx
import { Progress } from '@nextui-org/progress';

export default function LoadingProgressBar() {
    return (
        <Progress
            size="sm"
            isIndeterminate
            aria-label="Loading..."
            className="w-full fixed top-0 left-0 right-0"
        />
    );
}
