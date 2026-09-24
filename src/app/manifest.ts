import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Maratha Lageen - Maratha Matrimony',
    short_name: 'MarathaLageen',
    description: 'Karnataka Maratha Community Matrimonial Network',
    start_url: '/home',
    display: 'standalone',
    background_color: '#FFFDFB',
    theme_color: '#121A3D',
    icons: [
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
