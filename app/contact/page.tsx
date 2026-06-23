import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-transparent w-full min-h-screen pt-24 md:pt-32">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-6 mb-16 md:mb-20">
        <div className="max-w-3xl flex flex-col gap-6">
          <span className="text-2xs font-semibold tracking-[0.25em] text-accent uppercase font-sans">
            Inquiries
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-white tracking-tight leading-none">
            Connect with the Secretariat
          </h1>
          <p className="text-sm md:text-lg text-neutral-400 font-sans leading-relaxed">
            Reach out to our organizing team for queries regarding institutional delegation codes, logistics, accommodation arrangements, or sponsorships.
          </p>
        </div>
      </section>

      {/* Main Details Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Coordinates Grid (Cols 1-7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
            
            {/* Official Email */}
            <div className="p-8 border border-white/[0.08] bg-white/[0.015] backdrop-blur-[40px] rounded-[2rem] flex flex-col gap-4 group hover:border-white/[0.15] transition-all duration-500 shadow-xl relative overflow-hidden">
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <div className="text-accent mb-2">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold tracking-wider text-white uppercase font-sans">
                Official Email
              </h3>
              <div className="flex flex-col gap-1.5 mt-1 text-xs">
                <a href="mailto:officialiemmun@gmail.com" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
                  officialiemmun@gmail.com
                  <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                </a>
              </div>
            </div>

            {/* Phone Contacts */}
            <div className="p-8 border border-white/[0.08] bg-white/[0.015] backdrop-blur-[40px] rounded-[2rem] flex flex-col gap-4 group hover:border-white/[0.15] transition-all duration-500 shadow-xl relative overflow-hidden h-full">
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <div className="text-accent mb-2">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold tracking-wider text-white uppercase font-sans">
                Phone Contacts
              </h3>
              <div className="flex flex-col gap-5 mt-2">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase font-sans">Soumik Mondal</span>
                  <a href="tel:+919830966366" className="text-sm text-white/80 hover:text-white transition-colors">
                    +91 98309 66366
                  </a>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase font-sans">Sreeparna Barman</span>
                  <a href="tel:+919330335795" className="text-sm text-white/80 hover:text-white transition-colors">
                    +91 93303 35795
                  </a>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase font-sans">Debjit Dey</span>
                  <a href="tel:+919734432577" className="text-sm text-white/80 hover:text-white transition-colors">
                    +91 97344 32577
                  </a>
                </div>
              </div>
            </div>

            {/* Venue Info */}
            <div className="p-8 border border-white/[0.08] bg-white/[0.015] backdrop-blur-[40px] rounded-[2rem] flex flex-col gap-4 group hover:border-white/[0.15] transition-all duration-500 sm:col-span-2 shadow-xl relative overflow-hidden">
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <div className="text-accent mb-2">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold tracking-wider text-white uppercase font-sans">
                Conference Venue
              </h3>
              <div className="flex flex-col gap-1 mt-2">
                <strong className="text-sm text-white font-sans">IEM Gurukul Building</strong>
                <p className="text-sm text-white/70 leading-relaxed font-sans">
                  Y2, EP Block, Sector V, Bidhannagar<br />
                  Kolkata, West Bengal 700091
                </p>
              </div>
            </div>

            {/* Social Channels */}
            <div className="p-8 border border-white/[0.08] bg-white/[0.015] backdrop-blur-[40px] rounded-[2rem] flex flex-col gap-4 group hover:border-white/[0.15] transition-all duration-500 sm:col-span-2 shadow-xl relative overflow-hidden">
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <h3 className="text-sm font-bold tracking-wider text-white uppercase font-sans">Social Channels</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                <a href="https://www.instagram.com/iemmun2k26" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors">
                  <Instagram className="w-4 h-4 text-accent shrink-0" /> Instagram
                </a>
                <a href="https://www.facebook.com/share/19qVDhXmPn/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors">
                  <Facebook className="w-4 h-4 text-accent shrink-0" /> Facebook
                </a>
                <a href="https://www.linkedin.com/company/iemmun/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4 text-accent shrink-0" /> LinkedIn
                </a>
                <a href="https://x.com/iemmun2024" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors">
                  <Twitter className="w-4 h-4 text-accent shrink-0" /> Twitter
                </a>
              </div>
            </div>
          </div>

          {/* Map Embed Section (Cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-sm font-bold tracking-wider text-white/50 uppercase font-sans">
              Conference Venue Map
            </h3>
            <div className="relative w-full aspect-square border border-white/[0.08] bg-white/[0.015] backdrop-blur-[40px] rounded-[2rem] overflow-hidden group shadow-2xl transition-all duration-500 hover:border-white/[0.15]">
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4183.014317444636!2d88.43386840000001!3d22.574513699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02751153ddb371%3A0x816e6fee5a5aac55!2sIEM%20Gurukul%20Building!5e1!3m2!1sen!2sin!4v1782158547225!5m2!1sen!2sin"
                className="w-full h-full border-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                style={{ filter: "grayscale(0.6) invert(0.9) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
