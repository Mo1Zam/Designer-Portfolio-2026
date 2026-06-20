import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, FileText, Download } from "lucide-react";

interface BookReaderProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfUrl: string;
}

export default function BookReader({ isOpen, onClose, title, pdfUrl }: BookReaderProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[600] flex flex-col bg-neutral-950/98 backdrop-blur-lg select-none"
        onClick={onClose}
      >
        {/* Top Header Controls Bar */}
        <div 
          className="h-16 border-b border-white/10 bg-neutral-950 px-6 flex items-center justify-between z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[#00f2fe]/10 border border-[#00f2fe]/20 flex items-center justify-center text-[#00f2fe]">
              <FileText size={16} />
            </div>
            <div>
              <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-[#00f2fe]/80 font-bold">Document Viewer // Native Mode</span>
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-white line-clamp-1">{title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Open in New Tab Button */}
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 py-1.5 px-3 bg-[#00f2fe] text-neutral-950 hover:bg-[#00e0ec] active:scale-95 text-[10px] uppercase tracking-[0.15em] font-bold rounded-none transition-all cursor-pointer shadow-[0_0_15px_rgba(0,242,254,0.2)]"
            >
              <span>Open in New Tab</span>
              <ExternalLink size={12} />
            </a>

            {/* Direct Download Link */}
            <a 
              href={pdfUrl} 
              download
              className="flex items-center justify-center p-2 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              title="Download File"
            >
              <Download size={15} />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-white/15 bg-white/5 text-white/70 hover:text-white hover:bg-red-500/10 hover:border-red-500/30 transition-all ml-1 flex items-center justify-center cursor-pointer"
              title="Close System Overlay"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Advice banner for Sandboxed Environments like AI Studio nested previews */}
        <div 
          className="bg-[#00f2fe]/5 border-b border-[#00f2fe]/10 text-center py-2 px-6"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-[9px] font-mono tracking-wider text-[#00f2fe]/90 uppercase">
            Advice: If the native PDF doesn't display inside this nested iframe preview, use the <a href={pdfUrl} target="_blank" rel="noreferrer" className="underline font-bold text-white hover:text-[#00f2fe]">"Open in New Tab"</a> button above.
          </span>
        </div>

        {/* Interactive PDF Container Panel */}
        <div 
          className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 flex flex-col justify-center items-center z-0"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.35, ease: "easeOut" }}
            className="w-full h-full relative bg-neutral-900 border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* PDF Embedded Viewport */}
            <iframe
              src={`${pdfUrl}#toolbar=1`}
              title={title}
              className="w-full h-full border-0 bg-neutral-900"
              frameBorder="0"
              allow="autoplay"
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
