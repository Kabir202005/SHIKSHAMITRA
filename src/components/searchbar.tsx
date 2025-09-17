import React from "react"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void  // 👈 new prop
  placeholder?: string
}

export function SearchBar({ value, onChange, onSearch, placeholder = "Search..." }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}  // 🔹 Enter triggers search
          className="pl-10"
        />
      </div>
      <Button onClick={onSearch}>
        <Search className="h-4 w-4 mr-2" /> Search
      </Button>
    </div>
  )
}
