import Image from 'next/image'

type ScreenshotProps = {
  src: string
  alt: string
}

/**
 * Capture d'écran au format téléphone. Le ratio est fixé sur le conteneur pour
 * éviter tout décalage de mise en page. Les fichiers de /public/install sont
 * des images transparentes tant que les vraies captures ne sont pas fournies :
 * le cadre neutre reste donc visible derrière l'image.
 */
export default function Screenshot({ src, alt }: ScreenshotProps) {
  return (
    <div className="relative mx-auto aspect-[9/19.5] w-full max-w-[260px] overflow-hidden rounded-2xl border border-white/10 bg-dark-900">
      <div
        aria-hidden="true"
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-dark-400">
          Aperçu à venir
        </span>
        <span className="text-xs leading-relaxed text-dark-500">
          Capture d’écran
        </span>
      </div>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 260px, 80vw"
        loading="lazy"
        className="relative z-10 object-cover"
      />
    </div>
  )
}
