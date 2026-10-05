import { Play } from 'lucide-react'
import { useUI } from '../../context/UIContext'
import { contact } from '../../data/site'
import { images } from '../../data/images'
import Modal from '../ui/Modal'

/** Plays the tour video from contact.tourVideoUrl; shows a poster until one is set. */
export default function VideoModal() {
  const { videoOpen, closeVideo } = useUI()
  return (
    <Modal open={videoOpen} onClose={closeVideo} label="AZM Gym tour video" wide bare>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        {contact.tourVideoUrl ? (
          <iframe src={`${contact.tourVideoUrl}?autoplay=1&rel=0`} title="AZM Gym tour" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full" />
        ) : (
          <>
            <img src={images.aboutInterior} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand"><Play className="h-7 w-7 translate-x-[2px] fill-current" /></span>
                <p className="mt-5 text-sm font-semibold text-white/80">Tour video coming soon</p>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
