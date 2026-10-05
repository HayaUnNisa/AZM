import { ArrowRight, Award, Check } from 'lucide-react'
import { useUI } from '../../context/UIContext'
import type { Trainer } from '../../data/site'
import Modal from '../ui/Modal'

export default function TrainerModal({ trainer, onClose }: { trainer: Trainer | null; onClose: () => void }) {
  const { openJoin } = useUI()
  return (
    <Modal open={!!trainer} onClose={onClose} label={trainer ? `${trainer.name} profile` : 'Trainer'} wide>
      {trainer && (
        <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
          <div className="relative h-72 sm:h-auto">
            <img src={trainer.image} alt={trainer.name} className="absolute inset-0 h-full w-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-ink-800" />
          </div>
          <div className="p-7 sm:p-10">
            <p className="eyebrow text-white/60">{trainer.role}</p>
            <h2 className="display mt-3 text-4xl">{trainer.name}</h2>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-white/70"><Award className="h-4 w-4 text-brand" /> {trainer.experience} coaching experience</p>
            <p className="mt-6 text-[15px] leading-relaxed text-white/75">{trainer.bio}</p>
            <h3 className="mt-7 text-sm font-bold">Specialties</h3>
            <ul className="mt-3 space-y-2.5">
              {trainer.specialties.map((s) => (
                <li key={s} className="flex items-center gap-3 text-sm text-white/80"><Check className="h-4 w-4 text-brand" />{s}</li>
              ))}
            </ul>
            <button onClick={() => { onClose(); openJoin('pro') }} className="btn btn-primary group mt-9">
              Train with {trainer.name.split(' ')[0]} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}
