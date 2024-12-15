'use client'
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AuthCodeInputProps {
  label?: string
  placeholder?: string
  value: string
  onChange?: (value: string) => void
  className?: string
}

export const AuthCodeInput = forwardRef(({ label = "Authentication Code", placeholder = "123456", value, onChange, className='' }: AuthCodeInputProps, ref) => {
  const [internalValue, setInternalValue] = useState(value)

  useEffect(() => {
    setInternalValue(value)
  }, [value])

  const formatAuthCode = (input: string) => {
    const cleaned = input.replace(/\D/g, '')
    return cleaned.slice(0, 6)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAuthCode(e.target.value)
    setInternalValue(formatted)
    onChange?.(formatted)
  }

  useImperativeHandle(ref, () => ({
    getValue: () => internalValue,
    setValue: (newValue: string) => setInternalValue(formatAuthCode(newValue))
  }))

  return (
    <div className="space-y-2 flex flex-col justify-center items-center">
      <Label htmlFor="auth-code">{label}</Label>
      <Input
        type="text"
        id="auth-code"
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
        className={`px-6 py-2 rounded-full bg-amber-600 placeholder:text-white placeholder:opacity-80 text-white border-2 border-white shadow-md ${className}`}
        maxLength={6}
        minLength={6}
        required
      />
    </div>
  )
})