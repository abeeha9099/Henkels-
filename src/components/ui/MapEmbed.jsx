import { firm } from '../../data/site'

export default function MapEmbed({ className = '' }) {
  const { address } = firm
  return (
    <div className={`overflow-hidden rounded-[2rem] bg-mist ${className}`}>
      <iframe
        title={`Map showing ${firm.name} at ${address.street}, ${address.city}`}
        src={firm.mapEmbedUrl}
        className="h-full w-full border-0 grayscale-[30%]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
