"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2 } from "lucide-react";
import Button from "./ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 md:p-12 border border-white/[0.08] bg-white/[0.015] backdrop-blur-[40px] rounded-[2.5rem] mt-8 w-full shadow-2xl relative overflow-hidden">
      {/* Top edge glare */}
      <div className="absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      <h3 className="text-xl font-serif text-white mb-6">Send an Inquiry</h3>
      
      {submitStatus === "success" && (
        <div className="mb-6 p-4 border border-green-900/50 bg-green-950/20 text-green-400 text-sm font-sans rounded">
          Thank you! Your message has been sent successfully. We will get back to you shortly.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 border border-red-900/50 bg-red-950/20 text-red-400 text-sm font-sans rounded">
          There was an error sending your message. Please try again later.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label htmlFor="name" className="text-[10px] font-bold tracking-wider text-white/50 uppercase font-sans ml-2">Full Name</label>
            <input
              id="name"
              {...register("name")}
              placeholder="John Doe"
              className={`bg-black/40 border ${errors.name ? 'border-red-500/50' : 'border-white/[0.08]'} text-sm text-white p-4 focus:outline-none focus:border-white/20 focus:bg-black/60 transition-all rounded-xl shadow-inner backdrop-blur-md font-sans`}
            />
            {errors.name && <span className="text-[10px] text-red-400">{errors.name.message}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label htmlFor="email" className="text-[10px] font-bold tracking-wider text-white/50 uppercase font-sans ml-2">Email Address</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="john@example.com"
              className={`bg-black/40 border ${errors.email ? 'border-red-500/50' : 'border-white/[0.08]'} text-sm text-white p-4 focus:outline-none focus:border-white/20 focus:bg-black/60 transition-all rounded-xl shadow-inner backdrop-blur-md font-sans`}
            />
            {errors.email && <span className="text-[10px] text-red-400">{errors.email.message}</span>}
          </div>
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="subject" className="text-[10px] font-bold tracking-wider text-white/50 uppercase font-sans ml-2">Subject</label>
          <input
            id="subject"
            {...register("subject")}
            placeholder="Delegation Inquiry"
            className={`bg-black/40 border ${errors.subject ? 'border-red-500/50' : 'border-white/[0.08]'} text-sm text-white p-4 focus:outline-none focus:border-white/20 focus:bg-black/60 transition-all rounded-xl shadow-inner backdrop-blur-md font-sans`}
          />
          {errors.subject && <span className="text-[10px] text-red-400">{errors.subject.message}</span>}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-[10px] font-bold tracking-wider text-white/50 uppercase font-sans ml-2">Message</label>
          <textarea
            id="message"
            {...register("message")}
            rows={5}
            placeholder="How can we help you?"
            className={`bg-black/40 border ${errors.message ? 'border-red-500/50' : 'border-white/[0.08]'} text-sm text-white p-4 focus:outline-none focus:border-white/20 focus:bg-black/60 transition-all resize-y rounded-xl shadow-inner backdrop-blur-md font-sans`}
          />
          {errors.message && <span className="text-[10px] text-red-400">{errors.message.message}</span>}
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
          <Button 
            type="submit" 
            variant="primary" 
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-white/90 gap-2 rounded-full border border-transparent shadow-lg hover:shadow-white/10 transition-all disabled:opacity-70 disabled:cursor-not-allowed font-sans text-xs uppercase tracking-widest font-bold"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </div>
  );
}
