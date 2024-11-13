import { FC } from 'react';

interface SVGProps {
    src: string;
    alt?: string;
    className?: string;
}

const SVG: FC<SVGProps> = ({ src, alt, className }) => (
    <object type="image/svg+xml" data={src} aria-label={alt} className={className} />
);

export default SVG;
