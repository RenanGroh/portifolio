"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import { Input, Textarea } from "@/components/atoms/Input";
import { Icon } from "@/components/atoms/Icon";
import { useTranslation } from "@/hooks/useI18n";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={cn("space-y-6", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t.contact.form.name}
          name="name"
          placeholder={t.contact.form.namePlaceholder}
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          disabled={isSubmitting}
        />
        <Input
          label={t.contact.form.email}
          name="email"
          type="email"
          placeholder={t.contact.form.emailPlaceholder}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isSubmitting}
        />
      </div>

      <Textarea
        label={t.contact.form.message}
        name="message"
        placeholder={t.contact.form.messagePlaceholder}
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        disabled={isSubmitting}
        className="min-h-[150px]"
      />

      <div className="flex items-center gap-4">
        <Button
          type="submit"
          variant="glow"
          disabled={isSubmitting}
          className="min-w-[140px]"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin">
                <Icon name="layers" size={16} />
              </span>
              {t.contact.form.sending}
            </>
          ) : (
            <>
              {t.contact.form.submit}
              <Icon name="arrow-right" size={16} />
            </>
          )}
        </Button>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <motion.p
            className="text-sm text-green-500"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {t.contact.form.success}
          </motion.p>
        )}
        {submitStatus === "error" && (
          <motion.p
            className="text-sm text-red-500"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {t.contact.form.error}
          </motion.p>
        )}
      </div>
    </motion.form>
  );
}
