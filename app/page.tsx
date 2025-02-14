import PokemonCard from "@/components/pokemon-card"
import PokemonGrid from "@/components/pokemon-grid"

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Pokémon Search</h1>
          <p className="text-muted-foreground">Search for a Pokémon or explore random ones</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <PokemonCard />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Random Pokémon</span>
          </div>
        </div>

        <PokemonGrid />
      </div>
    </main>
  )
}

