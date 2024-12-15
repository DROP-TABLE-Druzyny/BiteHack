'use client'
import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PhoneInputProps {
  label?: string
  placeholder?: string
  value: string
  onChange?: (value: string) => void
  className?: string
}

export const PhoneInput = forwardRef(({ label = "Phone Number", placeholder = "123 456 789", value, onChange, className='' }: PhoneInputProps, ref) => {
  const [internalValue, setInternalValue] = useState(value)

  const formatPhoneNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})$/)
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join(' ').trim()
    }
    return input
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setInternalValue(formatted)
    onChange?.(formatted)
  }

  useImperativeHandle(ref, () => ({
    getValue: () => internalValue,
    setValue: (newValue: string) => setInternalValue(formatPhoneNumber(newValue))
  }))

  return (
    <div className="space-y-2">
      <Label htmlFor="phone">{label}</Label>
      <Input
        type="tel"
        id="phone"
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
        className={`px-6 py-2 rounded-full bg-amber-600 placeholder:text-white placeholder:opacity-80 text-white border-2 border-white shadow-md ${className}`}
        minLength={11}
        maxLength={11}
        required
      />
    </div>
  )
})

PhoneInput.displayName = 'PhoneInput'