import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Instagram, User } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 p-12 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 mb-2">Connect // Initializing</h2>
                  <p className="text-2xl font-black italic uppercase tracking-tighter">Direct Channels</p>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-8">
                <div className="group">
                  <div className="text-[10px] font-mono opacity-20 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <User size={10} /> Name
                  </div>
                  <div className="text-xl font-light tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                    Mohammad Azam
                  </div>
                </div>

                <div className="group">
                  <div className="text-[10px] font-mono opacity-20 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Mail size={10} /> Email
                  </div>
                  <a 
                    href="mailto:sayedsha0021@gmail.com" 
                    className="text-xl font-light tracking-tight group-hover:translate-x-2 transition-transform duration-300 block hover:text-white/80"
                  >
                    sayedsha0021@gmail.com
                  </a>
                </div>

                <div className="group">
                  <div className="text-[10px] font-mono opacity-20 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Instagram size={10} /> Instagram
                  </div>
                  <a 
                    href="https://instagram.com/sayedsha0021" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xl font-light tracking-tight group-hover:translate-x-2 transition-transform duration-300 block hover:text-white/80"
                  >
                    @sayedsha0021
                  </a>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center text-[8px] font-mono opacity-20 uppercase tracking-[0.2em]">
                <span>Status: Active</span>
                <span>Loc: 52.5200° N</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
