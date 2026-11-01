import type { ImageData } from '../Gallery.types';
import type { PhotoDetail } from './Lightbox.types';

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

// Cameras step exposure compensation in thirds: -0.67 → "−2/3 EV".
function formatExposureBias(ev: number): string {
  const thirds = Math.round(ev * 3);
  if (thirds === 0) return '0 EV';
  const sign = thirds > 0 ? '+' : '−';
  const whole = Math.floor(Math.abs(thirds) / 3);
  const rest = Math.abs(thirds) % 3;
  const amount = [whole || '', rest ? `${rest}/3` : '']
    .filter(Boolean)
    .join(' ');
  return `${sign}${amount} EV`;
}

function formatFocalLength(focal?: number, focal35?: number) {
  if (focal === undefined) return undefined;
  return focal35 && focal35 !== focal
    ? `${focal} mm (${focal35} mm éq. 24×36)`
    : `${focal} mm`;
}

export function getPhotoDetails({ place, exif }: ImageData): PhotoDetail[] {
  const camera = [exif?.make, exif?.model].filter(Boolean).join(' ');

  const details: [string, string | undefined][] = [
    ['Lieu', place],
    [
      'Date',
      exif?.takenAt
        ? dateFormatter.format(new Date(`${exif.takenAt}T00:00:00Z`))
        : undefined,
    ],
    ['Appareil', camera || undefined],
    ['Objectif', exif?.lensModel],
    ['Focale', formatFocalLength(exif?.focalLength, exif?.focalLength35)],
    [
      'Ouverture',
      exif?.fNumber !== undefined ? `ƒ/${exif.fNumber}` : undefined,
    ],
    ['Vitesse', exif?.exposureTime ? `${exif.exposureTime} s` : undefined],
    ['Sensibilité', exif?.iso !== undefined ? `ISO ${exif.iso}` : undefined],
    [
      'Exposition',
      exif?.exposureBias !== undefined
        ? formatExposureBias(exif.exposureBias)
        : undefined,
    ],
  ];

  return details
    .filter((detail): detail is [string, string] => detail[1] !== undefined)
    .map(([label, value]) => ({ label, value }));
}
