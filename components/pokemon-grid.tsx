"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Loader2, RefreshCw } from "lucide-react"

interface Pokemon {
  id: number
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

export default function PokemonGrid() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)

  const getRandomPokemonIds = useCallback((count: number) => {
    const ids = new Set<number>()
    while (ids.size < count) {
      // There are 1008 Pokémon in total
      ids.add(Math.floor(Math.random() * 1008) + 1)
    }
    return Array.from(ids)
  }, [])

  const fetchPokemons = useCallback(async () => {
    try {
      setLoading(true)
      const randomIds = getRandomPokemonIds(9)
      const promises = randomIds.map((id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()))
      const results = await Promise.all(promises)
      setPokemons(results)
    } catch (error) {
      console.error("Failed to fetch Pokémon:", error)
    } finally {
      setLoading(false)
    }
  }, [getRandomPokemonIds])

  useEffect(() => {
    fetchPokemons()
  }, [fetchPokemons])

  if (loading && pokemons.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={fetchPokemons} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id}>
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
        ))}
      </div>
    </div>
  )
}

