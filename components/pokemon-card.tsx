"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Loader2 } from "lucide-react"

interface Pokemon {
  name: string
  sprites: {
    front_default: string
  }
  types: Array<{
    type: {
      name: string
    }
  }>
  height: number
  weight: number
}

export default function PokemonCard() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [error, setError] = useState("")

  const fetchPokemon = async (name: string) => {
    try {
      setLoading(true)
      setError("")
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      if (!response.ok) throw new Error("Pokémon not found!")
      const data = await response.json()
      setPokemon(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch Pokémon")
      setPokemon(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter Pokémon name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search && fetchPokemon(search)}
        />
        <Button onClick={() => search && fetchPokemon(search)} disabled={loading || !search}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </Button>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6 text-destructive">{error}</CardContent>
        </Card>
      )}

      {pokemon && (
        <Card>
          <CardHeader>
            <CardTitle className="capitalize">{pokemon.name}</CardTitle>
            <CardDescription>Types: {pokemon.types.map((t) => t.type.name).join(", ")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            {pokemon.sprites.front_default && (
              <Image
                src={pokemon.sprites.front_default || "/placeholder.svg"}
                alt={pokemon.name}
                width={150}
                height={150}
                className="pixelated"
              />
            )}
            <div className="grid grid-cols-2 gap-4 w-full text-sm">
              <div>Height: {pokemon.height / 10}m</div>
              <div>Weight: {pokemon.weight / 10}kg</div>
              
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

